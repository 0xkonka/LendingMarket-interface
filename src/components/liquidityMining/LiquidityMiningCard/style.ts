import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .LiquidityMiningCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .LiquidityMiningCard__noData {
      font-size: $fontSizeMedium;
      @include respond-to(xl) {
        font-size: $fontSizeSmall;
      }
      @include respond-to(lg) {
        font-size: $fontSizeXSmall;
      }
      @include respond-to(md) {
        font-size: $fontSizeSmall;
      }
    }

    &__left {
      @include respond-to(sm) {
        align-items: flex-start;
      }
    }
    &__right {
      @include respond-to(sm) {
        align-items: flex-end;
      }
    }

    .LiquidityMiningCard__tooltip {
      display: block;
      padding: 7px 10px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
    }

    .LiquidityMiningCard__valueWithTooltip {
      cursor: pointer;
    }
  }
`;

export default staticStyles;
