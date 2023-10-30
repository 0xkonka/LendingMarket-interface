import { ReactNode } from 'react';

import ScreenWrapper from '../ScreenWrapper';

interface SwapConfirmationWrapperProps {
  pageTitle: string;
  children?: ReactNode;
}

export default function SwapConfirmationWrapper({
  pageTitle,
  children,
}: SwapConfirmationWrapperProps) {
  return (
    <ScreenWrapper pageTitle={pageTitle} isTitleOnDesktop={true}>
      {children}
    </ScreenWrapper>
  );
}
