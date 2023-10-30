import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .Value {
    font-family: 'Inter';
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &__line {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
    }

    &__subValue--line {
      margin-top: 2px;
    }

    &__leftSided {
      align-items: flex-start;
    }

    &__value {
      font-size: 12;
      font-weight: 600;
      white-space: nowrap;
    }

    &__symbol {
      font-weight: 600;
      margin-left: 5px;
      white-space: nowrap;
    }

    &__token-icon {
      .TokenIcon__dollar {
        margin-right: 5px !important;
        font-size: $fontSizeLarge;
        @include respond-to(xl) {
          font-size: $fontSizeRegular;
        }
        @include respond-to(lg) {
          font-size: $fontSizeMedium;
        }
        @include respond-to(md) {
          font-size: $fontSizeRegular;
        }
      }
    }

    &__withSmallDecimals {
      .Value__symbol {
        font-size: $fontSizeRegular;
        font-weight: 400;
        margin-left: 3px;
        @include respond-to(xl) {
          font-size: $fontSizeSmall;
        }
      }
    }

    .Value__tooltip {
      padding: 5px 10px;
      font-size: $fontSizeMedium;
      font-weight: 600;
      @include respond-to(xl) {
        font-size: $fontSizeSmall;
      }
      white-space: nowrap;
    }
  }
`;

export default staticStyles;
