import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .MarketMobileCard {
    &__topRows {
      .Row {
        margin-top: 10px;
        .Row__title {
          font-size: $fontSizeMedium;
        }
      }
    }

    &__button-inner,
    &__isFreezed--inner {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
    }

    &__cards {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    &__card--title {
      font-size: $fontSizeMedium;
      margin-bottom: 10px;
      font-weight: 600;
      span {
        font-weight: 400;
        font-size: $fontSizeSmall;
        margin-left: 5px;
      }
    }

    &__loop-button {
      margin-top: 10px;
      font-size: $fontSizeXSmall;
      font-weight: 600;
      color: #7159ff;
      margin: 5px 1px;
      width: 60px;
      min-height: 24px;
    }

    &__loop-badge {
      .TokenIcon__image {
        width: 30px;
        height: 30px;
      }
      .ValuePercent__value {
        font-size: 18px !important;
      }

      .LiquidityMiningAPYLine__title {
        font-size: 18px !important;
      }
    }
  }
`;

export default staticStyles;
