import { useState } from 'react';

import { CALL_TYPES, type CallType, DEFAULT_CALL_TYPE } from '@/entities/call';
import { useGetCallsQuery } from '@/entities/call/api/callsApi';
import { CallsHeader } from '@/widgets/calls-header';
import { CallsTable } from '@/widgets/calls-table';

import styles from './CallsPage.module.scss';

export const CallsPage = () => {
  const { data, isLoading } = useGetCallsQuery({ limit: 50 });
  const [callType, setCallType] = useState<CallType>(DEFAULT_CALL_TYPE);

  return (
    <div className={styles['calls-page-wrapper']}>
      <CallsHeader
        callType={callType}
        setCallType={setCallType}
        callTypesArr={CALL_TYPES}
        defaultFilter={DEFAULT_CALL_TYPE}
      />
      <CallsTable data={data} callType={callType} />

      {isLoading && <div>Loading...</div>}
    </div>
  );
};
