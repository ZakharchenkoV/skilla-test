import { useGetCallsQuery } from '../../entities/call/api/callsApi';

export const CallsPage = () => {
  const { data, isLoading } = useGetCallsQuery({
    limit: 50,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.results?.map((call) => (
        <div key={call.id}>{call.contact_company}</div>
      ))}
    </div>
  );
};
