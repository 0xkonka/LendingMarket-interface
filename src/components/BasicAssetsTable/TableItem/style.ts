import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TableItem {
    &.TableItem__withHeight {
      min-height: 70px;
      @include respond-to(xl) {
        min-height: 60px;
      }
      @include respond-to(lg) {
        min-height: 50px;
      }
      @include respond-to(md) {
        min-height: 60px;
      }
    }

    .TableItem__token-inner {
      align-items: flex-start;
      max-width: 240px;
      @include respond-to(lg) {
        max-width: 200px;
      }
      @include respond-to(sm) {
        max-width: 80px;
      }
    }
    .TableItem__tokenIcon {
      &__image,
      .MultipleIcons {
        @include respond-to(sm) {
          margin-right: 4px !important;
        }
        .TokenIcon__image {
          margin-right: 0 !important;
        }
      }
    }

    .TableItem__content {
      flex: 3;
      display: flex;
      justify-content: space-between;
      .TableColumn {
        align-items: center;
        justify-content: center;
      }
    }

    .FreezedWarning.TableItem__freezedWarning {
      font-size: $fontSizeMedium;
      @include respond-to(xl) {
        font-size: $fontSizeSmall;
      }
      @include respond-to(lg) {
        font-size: $fontSizeXSmall;
      }
    }

    .ValuePercent .ValuePercent__value,
    .Value .Value__value {
      @include respond-to(sm) {
        font-size: $fontSizeSmall;
      }
    }

    .ThirtyDayAverage {
      @include respond-to(xs) {
        flex-direction: column;
        .ThirtyDayAverage__text {
          margin: 0;
        }
      }
      .ValuePercent__value,
      .ThirtyDayAverage__text {
        @include respond-to(sm) {
          font-size: $fontSizeXSmall !important;
        }
      }
    }

    .TableColumn {
      justify-content: center;
      .Value {
        align-items: center;
      }
    }

    &__borrow {
      &:disabled {
        .TableColumn {
          &:last-of-type {
            flex: 2;
          }
        }
      }
    }

    .BasicAssetsTable__button {
      width: 90px;
      min-height: 32px;
      font-size: $fontSizeSmall;
      @include respond-to(xl) {
        width: 70px;
        min-height: 26px;
      }
      @include respond-to(lg) {
        width: 50px;
        font-size: $fontSizeXSmall;
      }
      @include respond-to(md) {
        width: 70px;
        font-size: $fontSizeSmall;
      }
    }
  }
`;

export default staticStyles;
