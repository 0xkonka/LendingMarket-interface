import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .ValueWithSmallDecimals {
    font-size: $fontSizeRegular;
    font-weight: 400;
    margin-left: 3px;
    @include respond-to(xl) {
      font-size: $fontSizeSmall;
    }
  }
`;

export default staticStyles;
