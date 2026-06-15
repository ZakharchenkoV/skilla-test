import classnames from 'classnames';

import type { ICall } from '@/entities/call';
import AvatarPlaceholder from '@/shared/assets/images/avatar-placeholder.svg?react';
import CallIncomingIcon from '@/shared/assets/images/call-incoming.svg?react';
import CallOutgoingIcon from '@/shared/assets/images/call-outgoing.svg?react';
import PlayIcon from '@/shared/assets/images/play.svg?react';
import { formatDuration } from '@/shared/lib/formatDuration';

import { useCallRecord } from '../model/useCallRecord';
import styles from './CallRow.module.scss';

interface ICallPlayProps {
  call: ICall;
}

export const CallRow = ({ call }: ICallPlayProps) => {
  const { playRecord } = useCallRecord();
  return (
    <tr key={call.id} className={styles['call-row']}>
      <td>
        {call.in_out === 0 ? (
          <CallOutgoingIcon
            className={classnames(styles['call-img'], {
              [styles['outgoing-success']]: call.status === 'Дозвонился',
              [styles['fail']]: call.status === 'Не дозвонился',
            })}
          />
        ) : (
          <CallIncomingIcon
            className={classnames(styles['call-img'], {
              [styles['incoming-success']]: call.status === 'Дозвонился',
              [styles['fail']]: call.status === 'Не дозвонился',
            })}
          />
        )}
      </td>

      <td>{call.date ? call.date.split(' ')[1].slice(0, 5) : ''}</td>

      <td>
        {call.person_avatar ? (
          <img
            className={styles['avatar']}
            src={call.person_avatar}
            alt={call.person_name}
          />
        ) : (
          <AvatarPlaceholder />
        )}
      </td>

      <td>
        {call.contact_name && (
          <div className={styles['call-row__contact-name']}>
            {call.contact_name}
          </div>
        )}

        <div
          className={call.contact_name && styles['call-row__contact-number']}
        >
          {call.in_out === 0 ? call.to_number : call.from_number}
        </div>
      </td>

      <td className={styles['call-row__source']}>{call.source || ''}</td>

      <td />

      <td className={styles['call-row__duration']}>
        <PlayIcon
          className={classnames({
            [styles.disabled]: !call.record,
          })}
          onClick={() => {
            if (!call.record) return;

            playRecord(call);
          }}
        />
        <p className={styles['call-row__duration-value']}>
          {formatDuration(call.time)}
        </p>
      </td>
    </tr>
  );
};
