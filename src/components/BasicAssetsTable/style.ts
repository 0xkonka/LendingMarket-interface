import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TableHeaderWrapper .TableHeaderButton.BasicAssetsTable__title {
    span {
      font-size: $fontSizeSmall;
      @include respond-to(xl) {
        font-size: $fontSizeXSmall;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
