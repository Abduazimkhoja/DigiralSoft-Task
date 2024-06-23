import {
  IconCancle,
  IconEdit,
  IconSave,
  IconTrash,
} from '@/assets/icons/icons';
import { Button, Popconfirm, Space } from 'antd';
import { FC } from 'react';

export interface OperationButtonsProps {
  editable: boolean;
  editingId: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const OperationButtons: FC<OperationButtonsProps> = ({
  editable,
  editingId,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <Space>
      {editable ? (
        <>
          <Button
            onClick={onSave}
            type='primary'
            icon={<IconSave width='18' height='auto' color='fff' />}
            size='middle'
          />
          <Popconfirm title='Sure to cancel?' onConfirm={onCancel}>
            <Button
              type='primary'
              icon={<IconCancle width='18' height='auto' color='fff' />}
              size='middle'
              style={{ backgroundColor: '#db5e5e' }}
            />
          </Popconfirm>
        </>
      ) : (
        <>
          <Button
            disabled={editingId !== ''}
            onClick={onEdit}
            type='primary'
            icon={<IconEdit width='18' height='auto' color='fff' />}
            size='middle'
          />
          <Popconfirm title='Sure to cancel?' onConfirm={onDelete}>
            <Button
              disabled={editingId !== ''}
              type='primary'
              icon={<IconTrash width='18' height='auto' color='fff' />}
              size='middle'
              style={{ backgroundColor: '#db5e5e' }}
            />
          </Popconfirm>
        </>
      )}
    </Space>
  );
};

export default OperationButtons;
