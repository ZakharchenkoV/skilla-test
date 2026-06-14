import { useState } from 'react';
import { useGetCallsQuery } from '../../entities/call/api/callsApi';
import { CallsTable } from '../../widgets';
import { CallsHeader } from '../../widgets/calls-header/ui/CallsHeader';

import styles from './CallsPage.module.scss';

export type CallType = 'Все типы' | 'Входящие' | 'Исходящие';

export const CallsPage = () => {
  const { data, isLoading } = useGetCallsQuery({ limit: 50 });
  const defaultFilter: CallType = 'Все типы';
  const [callType, setCallType] = useState(defaultFilter);
  const callTypesArr: CallType[] = ['Все типы', 'Входящие', 'Исходящие'];

  return (
    <div className={styles['calls-page-wrapper']}>
      <CallsHeader
        callType={callType}
        setCallType={setCallType}
        callTypesArr={callTypesArr}
        defaultFilter={defaultFilter}
      />
      <CallsTable data={data} callType={callType} />

      {isLoading && <div>Loading...</div>}
    </div>
  );
};
