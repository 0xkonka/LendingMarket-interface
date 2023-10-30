import ContainedButton from 'components/basic/ContainedButton';
import OutlineButton from 'components/basic/OutlineButton';

type TableButtonColProps = {
  title: string;
  linkTo: string;
  disabled?: boolean;
  withoutBorder?: boolean;
  onClick?: (event: any) => void;
};

export default function TableButtonCol({
  title,
  linkTo,
  disabled,
  withoutBorder,
  onClick = () => {},
}: TableButtonColProps) {
  return (
    <>
      {!withoutBorder ? (
        <ContainedButton
          href={linkTo}
          disabled={disabled}
          onClick={onClick}
          size="small"
          className="TableButtonCol__button"
        >
          {title}
        </ContainedButton>
      ) : (
        <OutlineButton
          href={linkTo}
          disabled={disabled}
          onClick={onClick}
          size="small"
          className="TableButtonCol__button"
          color="third"
        >
          {title}
        </OutlineButton>
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TableButtonCol__button {
          width: 90px !important;
          min-height: 27px !important;
          max-height: 27px !important;
          font-size: 12px !important;
          padding: 4px 24px;
        }
      `}</style>
    </>
  );
}
