import type { ICall } from '@/entities/call';
import { useGetRecordMutation } from '@/entities/call';

export const useCallRecord = () => {
  const [getRecord] = useGetRecordMutation();

  const playRecord = async (call: ICall) => {
    try {
      const audioBlob = await getRecord({
        record: call.record,
        partnershipId: call.partnership_id,
      }).unwrap();

      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error(error);
      alert('Не удалось получить запись звонка');
    }
  };

  return {
    playRecord,
  };
};
