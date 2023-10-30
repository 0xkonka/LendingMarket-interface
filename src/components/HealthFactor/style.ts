import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .HealthFactor {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .HealthFactor__noIcon {
      .TextWithModal__button {
        display: none;
      }
    }

    &.HealthFactor__column {
      margin: 0;
      display: block;
      text-align: center;
      .ValuePercent {
      }
      .TextWithModal {
        display: inline-block;
        margin-bottom: 5px;
      }
    }

    &__no-value {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      text-align: center;
      font-size: $fontSizeLarge;
      @include respond-to(xl) {
        font-size: $fontSizeMedium;
      }
      @include respond-to(lg) {
        font-size: $fontSizeSmall;
      }
      @include respond-to(md) {
        font-size: $fontSizeMedium;
      }
      @include respond-to(sm) {
        font-size: $fontSizeRegular;
      }
    }
  }
`;

export default staticStyles;
