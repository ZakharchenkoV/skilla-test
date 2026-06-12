import { useGetCallsQuery } from '../../entities/call/api/callsApi';
import { CallsTable } from '../../widgets';

import styles from './CallsPage.module.scss';

export const CallsPage = () => {
  const { data, isLoading } = useGetCallsQuery({ limit: 50 });

  return (
    <div className={styles['calls-page-wrapper']}>
      <CallsTable data={data} />

      {isLoading && <div>Loading...</div>}
    </div>
  );
};
