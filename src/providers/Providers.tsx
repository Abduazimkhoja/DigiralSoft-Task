'use client';
import { makeStore } from '@/store/store';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

interface IProviders {
  children: ReactNode;
}

const Providers: FC<IProviders> = ({ children }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default Providers;
