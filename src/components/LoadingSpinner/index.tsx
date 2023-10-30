import staticStyles from './style';
import LoadingLogo from 'images/radiant/LoadingLogo';

interface LoadingSpinnerProps {
  loading: boolean;
  size?: number;
}

export default function LoadingSpinner({ loading, size = 200 }: LoadingSpinnerProps) {
  if (!loading) return null;

  return (
    <div className={'LoadingSpinner'}>
      <LoadingLogo />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
