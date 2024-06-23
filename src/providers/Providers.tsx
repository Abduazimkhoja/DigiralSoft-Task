'use client';
import StoreProvider from '@/store/StoreProvider';
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
