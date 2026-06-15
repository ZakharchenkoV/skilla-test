import { Fragment, useMemo } from 'react';

import type {
  CallType,
  ICall,
  ICallsResponse,
} from '@/entities/call/model/types';
import { getDateLabel } from '@/shared/lib/date/getDateLabel';

import { CallRow } from './CallRow';
import styles from './CallsTable.module.scss';

interface CallsTableProps {
  data?: ICallsResponse;
  callType: CallType;
}

export const CallsTable = ({ data, callType }: CallsTableProps) => {
  const results = data?.results ?? [];

  const filteredCalls =
    callType === 'Входящие'
      ? results.filter((call) => call.in_out === 1)
      : callType === 'Исходящие'
        ? results.filter((call) => call.in_out === 0)
        : results;

  const groupedCalls = useMemo(
    () =>
      filteredCalls.reduce(
        (acc, call) => {
          const date = call.date_notime;

          if (!acc[date]) {
            acc[date] = [];
          }

          acc[date].push(call);

          return acc;
        },
        {} as Record<string, ICall[]>,
      ) ?? {},
    [filteredCalls],
  );

  const sortedGroups = useMemo(
    () =>
      Object.entries(groupedCalls).sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime(),
      ),
    [groupedCalls],
  );

  return (
    <div className={styles['table-wrapper']}>
      <table>
        <thead>
          <tr>
            <th>Тип</th>
            <th>Время</th>
            <th>Сотрудник</th>
            <th>Звонок</th>
            <th>Источник</th>
            <th>Оценка</th>
            <th>Длительность</th>
          </tr>
        </thead>

        <tbody>
          {sortedGroups.map(([date, calls]) => (
            <Fragment key={date}>
              {getDateLabel(date) !== 'Сегодня' && (
                <tr>
                  <td colSpan={7} className={styles['date-separator']}>
                    {getDateLabel(date)}
                    <span className={styles['date-count']}>{calls.length}</span>
                  </td>
                </tr>
              )}
              {calls.map((call) => (
                <CallRow key={call.id} call={call} />
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
