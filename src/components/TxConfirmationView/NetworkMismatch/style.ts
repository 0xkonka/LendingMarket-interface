import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .NetworkMismatch {
    padding: 10px 15px 15px;
    border-radius: $borderRadius;
    width: 100%;
    text-align: left;
    font-size: $fontSizeMedium;
    @include respond-to(xl) {
      font-size: $fontSizeSmall;
      padding: 10px 15px;
    }
    @include respond-to(lg) {
      font-size: $fontSizeXSmall;
      padding: 10px;
    }
    @include respond-to(md) {
      font-size: $fontSizeSmall;
      padding: 10px 15px;
    }
    @include respond-to(sm) {
      font-size: $fontSizeMedium;
    }

    &__top-inner {
      margin-bottom: 10px;

      h4 {
        font-size: $fontSizeRegular;
        margin-bottom: 10px;
        @include respond-to(xl) {
          font-size: $fontSizeMedium;
        }
        @include respond-to(lg) {
          font-size: $fontSizeSmall;
          margin-bottom: 5px;
        }
        @include respond-to(md) {
          font-size: $fontSizeMedium;
          margin-bottom: 10px;
        }
        @include respond-to(sm) {
          font-size: $fontSizeRegular;
        }
      }
    }
    &__onlyText {
      margin-bottom: 0;
    }

    .NetworkMismatch__textInner {
      display: flex;
      justify-content: space-between;
      p {
        margin-right: 15px;
        flex: 1;
      }
    }

    &__bottom-inner {
      display: flex;
      justify-content: space-between;
    }

    &__bottom-text {
      margin-right: 5px;
    }

    .NetworkMismatch__bottomText {
      .TextWithModal__text {
        white-space: nowrap;
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
        @include respond-to(sm) {
          font-size: $fontSizeMedium;
        }
      }
    }
  }
`;

export default staticStyles;
