import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .AddATokenButton {
    border-radius: $borderRadius;
    border: 1px solid #7159ff;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 15px;
    padding: 6px 10px;
    font-size: $fontSizeSmall;

    @include respond-to(xl) {
      margin-top: 12px;
      padding: 5px 8px;
      font-size: $fontSizeXSmall;
    }

    @include respond-to(sm) {
      padding: 6px 10px;
      font-size: $fontSizeSmall;
      align-self: center;
    }

    &:active {
      .AddATokenButton__circle {
        transform: scale(0.9);
      }
    }

    &:disabled {
      &:hover,
      &:active {
        box-shadow: $boxShadow;
        .AddATokenButton__circle {
          transform: scale(1);
        }
      }
    }

    &__circle {
      width: 20px;
      min-width: 20px;
      height: 20px;
      margin-left: 7px;
      border-radius: 50%;
      position: relative;
      transition: $transition;
      display: flex;
      align-self: center;
      justify-content: center;
      &:after,
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: $borderRadius;
      }
      &:after {
        width: 10px;
        height: 2px;
        @include respond-to(xl) {
          width: 8px;
        }
        @include respond-to(sm) {
          width: 10px;
        }
      }
      &:before {
        width: 2px;
        height: 10px;
        @include respond-to(xl) {
          height: 8px;
        }
        @include respond-to(sm) {
          height: 10px;
        }
      }
    }
  }
`;

export default staticStyles;
