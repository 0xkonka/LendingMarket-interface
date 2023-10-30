import classNames from 'classnames';
import { ReactElement } from 'react';
import staticStyles from './style';
import { useThemeContext } from 'aave-ui-kit';

interface InputProps {
  classes?: string;
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  inputLeftContent?: ReactElement;
  inputRightContent?: ReactElement;
  placeholder?: string;
}

export default function Input({
  classes,
  value,
  onChange,
  isDisabled = false,
  inputLeftContent,
  inputRightContent,
  placeholder,
}: InputProps) {
  const { currentTheme } = useThemeContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <>
      <div
        className={classNames(classes, 'InputContainer', isDisabled && 'InputContainerDisabled')}
      >
        {inputLeftContent && <div className="InputLeftContent">{inputLeftContent}</div>}
        <input
          value={value}
          disabled={isDisabled}
          className="Input"
          onChange={handleInputChange}
          placeholder={placeholder}
        ></input>
        {inputRightContent && <div className="InputRightContent">{inputRightContent}</div>}
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .Input {
            color: ${currentTheme.text.main}CC;
          }
          .InputContainer {
            background: ${currentTheme.interface.mainTable};
          }
          .InputContainer,
          .InputLeftContent {
            border-color: ${currentTheme.interface.offset1};
          }
          .InputContainerDisabled {
            background: ${currentTheme.interface.hover};
          }
        `}
      </style>
    </>
  );
}
