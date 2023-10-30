import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TableHeader {
    display: block;
    width: 100%;
    padding: 0 27px;

    &__inner {
      display: flex;
      flex-direction: row;
      flex: 2;
      width: 100%;
      margin-bottom: 10px;
      @include respond-to(sm) {
        margin-bottom: 3px;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      text-align: center;

      &:first-child {
        align-items: flex-start;
        text-align: left;
      }

      &:last-of-type,
      &:nth-last-of-type(2) {
        max-width: 60px;
      }

      @include respond-to(sm) {
        &:last-child {
          align-items: flex-end;
        }
      }
    }

    &__title,
    .TextWithModal__text {
      font-size: $fontSizeRegular;
    }
  }
`;

export default staticStyles;
