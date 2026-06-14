import classnames from 'classnames';

import type { CallType } from '@/entities/call';

import styles from './TypeSelectionModal.module.scss';

interface ITypeSelectionModalProps {
  callType: CallType;
  callTypesArr: readonly CallType[];
  onSelectType: (type: CallType) => void;
  onClose: () => void;
}

export const TypeSelectionModal = ({
  callType,
  onSelectType,
  callTypesArr,
  onClose,
}: ITypeSelectionModalProps) => {
  const handleTypeSelect = (
    e: React.MouseEvent<HTMLDivElement>,
    type: CallType,
  ) => {
    e.stopPropagation();
    onSelectType(type);
    onClose();
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
