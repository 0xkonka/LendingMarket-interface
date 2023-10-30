import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .ReactModal__Content.LTVInfoModal__wrapper {
    max-width: 100% !important;
  }

  .LTVInfoModal {
    .Caption {
      max-width: 500px;
    }

    &__content {
      padding: 20px;
      border-radius: $borderRadius;
      @include respond-to(xl) {
        padding: 20px 15px;
      }
      @include respond-to(sm) {
        padding: 20px 10px;
      }

      .TextWithModal__text {
        font-size: 14px;
      }

      .Row__title {
        font-size: 14px;
      }
    }

    &__title {
      display: flex;
      align-items: center;
      .TokenIcon {
        &__image {
          margin-left: 3px;
          margin-right: 0;
        }
      }
      .MultipleIcons {
        margin-right: 0;
        margin-left: 3px;
        .TokenIcon__image {
          margin-right: 0 !important;
          margin-left: 0 !important;
        }
      }
    }

    &__subTitle {
      margin-right: 10px;
      font-size: $fontSizeRegular;
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
  }
`;

export default staticStyles;
