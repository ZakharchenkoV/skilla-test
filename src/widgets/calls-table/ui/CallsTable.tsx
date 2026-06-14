import classnames from 'classnames';
import { Fragment, useMemo } from 'react';

import type {
  CallType,
  ICall,
  ICallsResponse,
} from '@/entities/call/model/types';
import AvatarPlaceholder from '@/shared/assets/images/avatar-placeholder.svg?react';
import CallIncomingIcon from '@/shared/assets/images/call-incoming.svg?react';
import CallOutgoingIcon from '@/shared/assets/images/call-outgoing.svg?react';
import { getDateLabel } from '@/shared/lib/date/getDateLabel';
import { formatDuration } from '@/shared/lib/formatDuration';

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
                <tr key={call.id} className={styles['call-item']}>
                  <td>
                    {call.in_out === 0 ? (
                      <CallOutgoingIcon
                        className={classnames(styles['call-img'], {
                          [styles['outgoing-success']]:
                            call.status === 'Дозвонился',
                          [styles['fail']]: call.status === 'Не дозвонился',
                        })}
                      />
                    ) : (
                      <CallIncomingIcon
                        className={classnames(styles['call-img'], {
                          [styles['incoming-success']]:
                            call.status === 'Дозвонился',
                          [styles['fail']]: call.status === 'Не дозвонился',
                        })}
                      />
                    )}
                  </td>

                  <td>
                    {call.date ? call.date.split(' ')[1].slice(0, 5) : ''}
                  </td>

                  <td>
                    {call.person_avatar ? (
                      <img
                        src={call.person_avatar}
                        alt={call.person_name}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <AvatarPlaceholder />
                    )}
                  </td>

                  <td>
                    {call.contact_name && (
                      <div className={styles['text-primary']}>
                        {call.contact_name}
                      </div>
                    )}

                    <div
                      className={
                        call.contact_name ? styles['text-secondary'] : ''
                      }
                    >
                      {call.in_out === 0 ? call.to_number : call.from_number}
                    </div>
                  </td>

                  <td className={styles['call-item__source']}>
                    {call.source || ''}
                  </td>

                  <td />

                  <td>{formatDuration(call.time)}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
