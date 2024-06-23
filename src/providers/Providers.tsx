'use client';
import StoreProvider from '@/store/StoreProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { FC, ReactNode } from 'react';

interface IProviders {
  children: ReactNode;
}

const Providers: FC<IProviders> = ({ children }) => {
  return (
    <StoreProvider>
      {/* <AntdRegistry>{children}</AntdRegistry> */}
      {children}
    </StoreProvider>
  );
};

export default Providers;
