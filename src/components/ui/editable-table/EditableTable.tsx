'use client';
import { RootState } from '@/store/store';
import { IUser } from '@/types/user.interface';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Form, Table } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EditableCell } from './EditableCell';
import OperationButtons, { OperationButtonsProps } from './OperationButtons';
import { useUserTableActions } from './table-acitons';

const EditableTable: React.FC = () => {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');

  const [page, setPage] = useState<number>(
    newParams.has('page') ? Number(newParams.get('page')) : 1,
  );
  const [limit, setLimit] = useState<number>(
    newParams.has('limit') ? Number(newParams.get('limit')) : 10,
  );
  const { replace } = useRouter();
  const pathname = usePathname();

  const { users, loading } = useSelector((state: RootState) => state.users);
  const { isEditing, onCancel, onSave, onDelete, onEdit } = useUserTableActions(
    {
      users,
      editingId,
      form,
      setEditingId,
    },
  );

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '20px',
      editable: false,
      alignType: 'center',
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      width: '50px',
      inputType: 'url',
      editable: true,
      render: (avatar: IUser['avatar']) => {
        return <Image src={avatar} alt='user avatar' width={40} height={40} />;
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '100%',
      editable: true,
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      width: '100%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      alignType: 'center',
      editable: false,
      render: (_: any, record: IUser) => {
        const OperationButtonsProps: OperationButtonsProps = {
          editable: isEditing(record.id),
          editingId,
          onEdit: () => onEdit(record),
          onSave: () => onSave(record.id),
          onCancel: () => onCancel(),
          onDelete: () => onDelete(record.id),
        };
        return <OperationButtons {...OperationButtonsProps} />;
      },
    },
  ];

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IUser) => ({
        record,
        inputType: col.dataIndex === 'avatar' ? 'url' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record.id),
      }),
    };
  });

  const paginationConfig: TablePaginationConfig = {
    current: page,
    pageSize: limit,
    total: users.length,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
    onChange: (page, limit) => {
      setLimit(limit);
      setPage(page);
      onCancel();
      replace(`${pathname}?page=${page}&limit=${limit}`);
    },
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <div className='container'>
      <Form form={form} component={false}>
        <Table
          loading={loading}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={users}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={paginationConfig}
        />
      </Form>
    </div>
  );
};

export default EditableTable;
