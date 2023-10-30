import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .ContentWrapper {
    position: relative;
    border-radius: $borderRadius;
    border: solid 1px rgba(255, 255, 255, 0.5);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2) -6%,
      rgba(255, 255, 255, 0.6) 59%
    );

    &__fullHeight {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex: 1;
      margin-bottom: 10px;
      @include respond-to(md) {
        padding: 40px 20px;
      }
      @include respond-to(sm) {
        max-height: 100%;
        padding: 0;
        background: transparent !important;
        box-shadow: none !important;
      }
    }

    &__back-button {
      position: absolute;
      left: 35px;
      top: 30px;
      min-width: 75px;
      height: 35px;
      border-radius: $borderRadius;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $fontSizeSmall;
      transition: $transition;

      @include respond-to(sm) {
        display: none;
      }
      span {
        width: 5px;
        height: 5px;
        margin-right: 5px;
        border-radius: 50%;
        transition: $transition;
        display: flex;
        align-items: center;
        justify-content: center;

        &:after {
          content: '';
          line-height: 0;
          display: inline-block;
          transform: rotate(135deg);
          padding: 2px;
          position: relative;
          left: 1px;
          transition: $transition;
        }
      }
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .ContentWrapper {
        @include respond-to(sm) {
          display: block;
        }
      }
    }
  }
`;

export default staticStyles;
