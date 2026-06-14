import { useEffect, useRef, useState } from 'react';
import ArrowImage from '../../../shared/assets/images/arrow.svg?react';
import CloseImage from '../../../shared/assets/images/close.svg?react';
import styles from './CallsHeader.module.scss';
import { TypeSelectionModal } from './TypeSelectionModal';
import classnames from 'classnames';
import type { CallType } from '../../../pages/calls-page/CallsPage';

interface CallsHeaderProps {
  callType: CallType;
  setCallType: React.Dispatch<React.SetStateAction<CallType>>;
  callTypesArr: CallType[];
  defaultFilter: CallType;
}

export const CallsHeader = ({
  callType,
  setCallType,
  callTypesArr,
  defaultFilter,
}: CallsHeaderProps) => {
  const isFilterChanged = callType !== defaultFilter;
  const [typesModalOpen, setTypesModalOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const typesOpenModalHandler = () => {
    setTypesModalOpen((prev) => !prev);
  };

  const resetFilters = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCallType(defaultFilter);
    setTypesModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setTypesModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles['calls-header']}>
      <div className={styles['header-left']}>
        <div
          ref={filterRef}
          className={classnames(styles['header-item'], {
            [styles['multi']]: isFilterChanged,
          })}
          onClick={typesOpenModalHandler}
        >
          <div
            className={classnames({
              [styles['active']]: isFilterChanged,
            })}
          >
            {callType}
          </div>
          <ArrowImage
            className={classnames(styles['arrow'], {
              [styles['arrow-open']]: typesModalOpen,
            })}
          />

          {typesModalOpen && (
            <div
              className={styles['types-modal']}
              onClick={(e) => e.stopPropagation()}
            >
              <TypeSelectionModal
                callType={callType}
                setCallType={setCallType}
                callTypesArr={callTypesArr}
                setTypesModalOpen={setTypesModalOpen}
              />
            </div>
          )}
        </div>

        {isFilterChanged && (
          <div className={styles['header-item']} onClick={resetFilters}>
            <div className={styles['reset-filters']}>Сбросить фильтры</div>
            <CloseImage />
          </div>
        )}
      </div>

      <div className={styles['header-item']}>DaysFilter</div>
    </div>
  );
};
