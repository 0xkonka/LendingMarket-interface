import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .Menu {
    display: flex;
    justify-content: center;
    padding: 4px 16px;
    box-shadow: $boxShadow;

    &__container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: $maxDeskWidth;
    }

    &__logo-inner {
      display: flex;
      align-items: center;

      @include respond-to(sm) {
        display: none;
      }
    }

    &__back-button {
      position: absolute;
      padding: 15px;
      left: 0;

      img {
        width: 20px;
        height: 20px;
      }
    }

    &__title-inner {
      display: none;

      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        width: 100%;
        padding: 0 35px 0 0;
      }

      p {
        font-size: $fontSizeRegular;
        text-transform: capitalize;
      }
    }

    &__right-inner {
      display: flex;
      align-items: center;
    }

    &__navigation-inner {
      padding: 0 20px 0 42px;
      height: 100%;

      @include respond-to(md) {
        display: none;
      }

      ul {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    &__linkHidden {
      display: none;
    }

    &__burger-inner {
      display: none;
      @include respond-to(md) {
        display: block;
        margin-right: 5px;
      }
      @include respond-to(sm) {
        margin-right: 0;
        position: absolute;
        right: 0;
      }
    }

    &__buttons-inner {
      display: flex;
      align-items: center;
      gap: 8px;

      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
