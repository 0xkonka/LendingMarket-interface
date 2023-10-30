import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/variables';

  .Preloader {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    text-align: center;
    padding: 10px;

    &__text {
      margin-bottom: 20px;
      @include respond-to(lg) {
        font-size: $fontSizeMedium;
        margin-bottom: 15px;
      }
      h4 {
        font-weight: 600;
        margin-bottom: 5px;
      }
    }

    &__dots {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin: 8px;
    }

    &__sub-text {
      margin-top: 25px;
      max-width: 450px;
      text-align: center;
      @include respond-to(lg) {
        margin-top: 20px;
      }
      h4 {
        margin-bottom: 7px;
      }
      h4,
      p {
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

    &__background {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      object-fit: cover;

      @include respond-to(sm) {
        display: none;
      }
    }
  }

  .PreloaderSmall {
    padding: 0;
    min-height: 30px;
    .Preloader__dot {
      width: 10px;
      height: 10px;
      margin: 3px;
    }
  }
`;

export default staticStyles;
