import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .Row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    font-size: $fontSizeSmall;
    @include respond-to(sm) {
      font-size: $fontSizeRegular;
    }

    &__column {
      display: block;
      text-align: center;
      .Row__title-inner {
        margin-bottom: 3px;
      }
      .Row__title {
        padding-right: 0;
      }
      .Row__content {
        display: block;
      }
    }

    &__title-inner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    &__content {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
    }

    &__title {
    }
    &__subtitle {
      padding-top: 5px;
      font-size: $fontSizeSmall !important;
      @include respond-to(xl) {
        font-size: $fontSizeXSmall !important;
      }
    }

    &__normal {
      .Row__title-inner {
        font-weight: 400;
      }
    }

    &__light {
      .Row__title-inner {
        font-weight: 300;
      }
    }

    &__withMargin {
      margin-bottom: 12px;
    }
  }
`;

export default staticStyles;
