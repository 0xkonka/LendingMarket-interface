import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .PercentBlock__no-value,
  .PercentBlock__value .ValuePercent__value {
    font-size: $fontSizeLarge;
    margin-top: 5px;
    font-weight: 600;
    @include respond-to(md) {
      font-size: $fontSizeSmall;
    }
    @include respond-to(sm) {
      font-size: $fontSizeRegular;
    }
  }
`;

export default staticStyles;
