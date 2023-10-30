import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .MainDashboardTable {
    &__inner {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;

      @include respond-to(lg) {
        flex-direction: column;
      }
    }

    &__left-inner,
    &__right-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    &__left-inner {
      .TableHeader__item:nth-of-type(2) {
        p {
          white-space: nowrap;
        }
      }
    }

    .TableHeader__title,
    .TableHeader .TextWithModal__text {
      font-size: $fontSizeSmall;
    }
  }
`;

export default staticStyles;
