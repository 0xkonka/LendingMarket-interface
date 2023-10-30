import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .GraphLegend {
    align-items: center !important;
    padding: 5px 8px;
    position: relative;
    z-index: 2;
    .Row__title-inner {
      .Row__title {
        font-size: $fontSizeMedium;
        font-weight: 300;
        @include respond-to(lg) {
          font-size: $fontSizeSmall;
        }
        @include respond-to(sm) {
          font-size: $fontSizeMedium;
        }
      }
    }

    &__inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    &__item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 10px;
      white-space: nowrap;
    }

    &__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
      position: relative;
      bottom: 2px;
    }

    &__name {
      font-size: $fontSizeMedium;
      @include respond-to(xl) {
        font-size: $fontSizeXSmall;
      }
    }
  }
`;

export default staticStyles;
