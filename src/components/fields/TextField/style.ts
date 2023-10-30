import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TextField {
    width: 100%;
    margin: 0 auto;
    position: relative;

    &__disabled {
      .TextField__wrapper {
        opacity: 0.5;
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: $borderRadius;
      transition: $transition;
    }

    .TextField__input {
      input {
        padding: 13px 15px 13px;
        @include respond-to(lg) {
          padding: 11px 15px 11px;
        }
        @include respond-to(md) {
          padding: 13px 15px 13px;
        }
      }
    }

    &__error-text {
      position: absolute;
      top: calc(100% - 20px);
      width: 100%;
      text-align: center;
      font-size: $fontSizeMedium;
      @include respond-to(lg) {
        font-size: $fontSizeSmall;
        top: calc(100% - 15px);
      }
      @include respond-to(md) {
        font-size: $fontSizeMedium;
        top: calc(100% - 20px);
      }
    }
  }
`;

export default staticStyles;
