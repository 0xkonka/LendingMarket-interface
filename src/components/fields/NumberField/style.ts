import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .NumberField {
    width: 100% !important;
    margin: 0 auto;
    position: relative;

    &__disabled {
      .NumberField__wrapper {
        opacity: 0.5;
      }
    }

    &__top-row {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .Row__title-inner .Row__title,
      .Value .Value__value {
        font-size: $fontSizeMedium;
        @include respond-to(lg) {
          font-size: $fontSizeSmall;
        }
        @include respond-to(md) {
          font-size: $fontSizeMedium;
        }
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      border-radius: $borderRadius;
      transition: $transition;
      border: 1px solid #d8d9e0;
    }

    .NumberField__input {
      input {
        padding: 15px 5px 14px 0;
        @include respond-to(lg) {
        }
        @include respond-to(md) {
        }
      }
    }

    &__maxButton {
      font-weight: 600;
      font-size: $fontSizeMedium;
      white-space: nowrap;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        transform: scale(0.9);
      }
      @include respond-to(lg) {
        font-size: $fontSizeSmall;
      }
      @include respond-to(md) {
        font-size: $fontSizeMedium;
      }
    }

    &__error-text {
      width: 100%;
      font-size: $fontSizeMedium;
      @include respond-to(lg) {
        font-size: $fontSizeSmall;
        top: calc(100% + 18px);
      }
      @include respond-to(md) {
        font-size: $fontSizeMedium;
        top: calc(100% + 20px);
      }
    }

    .Preloader {
      padding: 0;
      .Preloader__dot {
        width: 7px;
        height: 7px;
        margin: 0 4px;
      }
    }
  }
`;

export default staticStyles;
