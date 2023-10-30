import { useThemeContext, SpinLoader } from 'aave-ui-kit';

export function LoadingContentSpinner() {
  const { currentTheme } = useThemeContext();

  return (
    <div className="LoadingContentSpinner">
      <SpinLoader color={currentTheme.brand.main} />
      <style jsx global>
        {`
          .LoadingContentSpinner {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
          }
        `}
      </style>
    </div>
  );
}
