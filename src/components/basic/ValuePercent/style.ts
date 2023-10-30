import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .ValuePercent {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 1;

    &__value {
      font-family: 'Roboto';
      font-weight: 400;
      font-size: $fontSizeLarge;

      span {
        font-weight: 400;
        margin-left: 3px;
      }
    }
  }
`;

export default staticStyles;
