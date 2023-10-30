import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .NotHaveEnoughFundsToRepayHelpModal {
    &__content {
      p {
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .TextWithModal__text {
      margin-top: 2px;
      font-size: $fontSizeSmall;
      text-align: left;
      max-width: 160px;
      @include respond-to(lg) {
        font-size: $fontSizeXSmall;
        max-width: 130px;
      }
    }
  }
`;

export default staticStyles;
