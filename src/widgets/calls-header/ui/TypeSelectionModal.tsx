import type { CallType } from '../../../pages/calls-page/CallsPage';
import styles from './TypeSelectionModal.module.scss';
import classnames from 'classnames';

interface ITypeSelectionModalProps {
  callType: CallType;
  callTypesArr: CallType[];
  setCallType: React.Dispatch<React.SetStateAction<CallType>>;
  setTypesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TypeSelectionModal = ({
  callType,
  setCallType,
  callTypesArr,
  setTypesModalOpen,
}: ITypeSelectionModalProps) => {
  const handleTypeSelect = (
    e: React.MouseEvent<HTMLDivElement>,
    type: CallType,
  ) => {
    e.stopPropagation();
    setCallType(type);
    setTypesModalOpen(false);
  };

  return (
    <div className={styles['modal-wrapper']}>
      {callTypesArr.map((type) => (
        <div
          key={type}
          className={classnames(styles['modal-item'], {
            [styles['active']]: callType === type,
          })}
          onClick={(e) => handleTypeSelect(e, type)}
        >
          {type}
        </div>
      ))}
    </div>
  );
};
