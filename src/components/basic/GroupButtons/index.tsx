import { useCallback } from 'react';
import ContainedButton from '../ContainedButton';

interface GroupButtonsProps {
  values: { value: any; label: any }[];
  selectedValue: any;
  setSelectedValue: (value: any) => void;
}

export default function GroupButtons({
  values,
  selectedValue,
  setSelectedValue,
}: GroupButtonsProps) {
  const handleChange = useCallback(
    (value: string) => () => {
      setSelectedValue(value);
    },
    [setSelectedValue]
  );

  return (
    <div className="GroupButtons">
      {values.map((item) => {
        const isSelected = selectedValue === item.value;

        return (
          <ContainedButton
            key={item.value}
            size="small"
            color={isSelected ? 'primary' : 'fourth'}
            disabled={isSelected}
            fullWidth
            className="GroupButtons__button"
            onClick={handleChange(item.value)}
          >
            {item.label}
          </ContainedButton>
        );
      })}
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .GroupButtons {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
