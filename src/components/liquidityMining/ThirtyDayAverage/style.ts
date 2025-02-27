import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .ThirtyDayAverage {
    display: flex;
    align-items: center;

    .ThirtyDayAverage__text {
      white-space: nowrap;
      &:first-child {
        margin-right: 3px;
      }
      &:last-child {
        margin-left: 3px;
        @include respond-to(sm) {
          display: none;
        }
      }
    }
    .ValuePercent__value {
      font-weight: 600;
    }
  }

  .ThirtyDayAverage__normal {
    .ValuePercent__value,
    .ThirtyDayAverage__text {
      font-size: $fontSizeMedium !important;
      @include respond-to(xl) {
        font-size: $fontSizeSmall !important;
      }
      @include respond-to(lg) {
        font-size: $fontSizeXSmall !important;
      }
      @include respond-to(md) {
        font-size: $fontSizeSmall !important;
      }
    }
  }

  .ThirtyDayAverage__small {
    .ValuePercent__value,
    .ThirtyDayAverage__text {
      font-size: $fontSizeSmall !important;
      @include respond-to(lg) {
        font-size: $fontSizeXSmall !important;
      }
      @include respond-to(sm) {
        font-size: 8px !important;
      }
    }
  }
`;

export default staticStyles;
