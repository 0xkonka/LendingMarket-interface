import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TableValueCol__value {
    align-items: center;
    width: 100%;
    .Value__value {
      @include respond-to(xl) {
        font-size: $fontSizeMedium;
      }
      @include respond-to(sm) {
        font-size: $fontSizeSmall;
      }
    }
    .SubValue {
      @include respond-to(xl) {
        font-size: $fontSizeXSmall;
      }
    }
  }
  .boldy {
    .Value__value {
      font-weight: bold;
      color: #036003;
    }
  }
  .boldness {
    font-family: 'Inter';
    font-weight: bold;
    font-size: 18px;
  }
`;

export default staticStyles;
