import { AppDispatch } from '@/store/store';
import {
  deleteUserById,
  editUserById,
  fetchUsers,
} from '@/store/user/user.acitons';
import { IUser } from '@/types/user.interface';
import { FormInstance } from 'antd/es/form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface ITableAction {
  users: IUser[];
  editingId: string;
  form: FormInstance<any>;
  setEditingId: (id: string) => void;
}

export const useUserTableActions = ({
  users,
  editingId,
  form,
  setEditingId,
}: ITableAction) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return {
    isEditing(id: string) {
      return id === editingId;
    },

    onEdit(record: Partial<IUser>) {
      form.setFieldsValue({
        name: '',
        avatar: '',
        lastName: '',
        ...record,
      });

      setEditingId(String(record.id));
    },

    onCancel() {
      setEditingId('');
    },

    async onSave(key: string) {
      try {
        const row = (await form.validateFields()) as IUser;

        const newData = [...users];
        const index = newData.findIndex((item) => key === item.id);
        if (index > -1) {
          const item = newData[index];
          if (
            item.name === row.name &&
            item.lastName === row.lastName &&
            item.avatar === row.avatar
          )
            return setEditingId('');
          newData.splice(index, 1, {
            ...item,
            ...row,
          });

          dispatch(editUserById({ ...item, ...row }));

          // setUsers(newData);
          setEditingId('');
        } else {
          setEditingId('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    },

    onDelete(userId: IUser['id']) {
      dispatch(deleteUserById(userId));
    },
  };
};
