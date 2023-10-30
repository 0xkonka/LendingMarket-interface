import { ReactNode } from 'react';
import { MigrationInfoProvider } from 'libs/migration-provider/hooks/use-migration-info';

interface CustomScrollProps {
  children: ReactNode;
}

export default function MigrationDataHoc({ children }: CustomScrollProps) {
  return <MigrationInfoProvider>{children}</MigrationInfoProvider>;
}
