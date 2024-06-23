import { AppDispatch } from '@/store/store';
import { deleteUserById, fetchUsers } from '@/store/user/user.acitons';
import { setUsers } from '@/store/user/user.slice';
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
      // form.setFieldsValue({
      //   name: '',
      //   avatar: '',
      //   lastName: '',
      //   ...record,
      // });
      console.log(record);
      
      setEditingId(String(record.id));
    },

    onCancel() {
      setEditingId('');
    },

    async onSave(id: string) {
      try {
        // const row = (await form.validateFields()) as IUser;
        console.log(id);

        // const newData = [...users];
        // const index = newData.findIndex((item) => key === item.id);
        // if (index > -1) {
        //   const item = newData[index];
        //   newData.splice(index, 1, {
        //     ...item,
        //     ...row,
        //   });
        //   setUsers(newData);
        //   setEditingId('');
        // } else {
        //   newData.push(row);
        //   setUsers(newData);
        //   setEditingId('');
        // }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    },

    onDelete(userId: IUser['id']) {
      dispatch(deleteUserById(userId));
    },
  };
};
