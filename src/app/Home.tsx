import UserDrawer from '@/components/ui/user/drawer/UserDrawer';
import EditableTable from '@/components/ui/user/editable-table/EditableTable';
import { Flex, Spin } from 'antd';
import { FC, Suspense } from 'react';

const Home: FC = () => {
  return (
    <Flex className='container' gap='30px' vertical>
      <Flex justify='space-between' gap='20px' align='center'>
        <h2 className='heading-2'>User Table</h2>
        <UserDrawer />
      </Flex>

      <Suspense key='UserTable' fallback={<Spin size='large' />}>
        <EditableTable />
      </Suspense>
    </Flex>
  );
};

export default Home;
