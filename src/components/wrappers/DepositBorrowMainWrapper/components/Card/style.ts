import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .Card {
    width: 100%;
    &__content {
      width: 100%;
      padding: 5px 15px 10px;
      @include respond-to(xl) {
        padding: 5px 10px 10px;
      }
      @include respond-to(sm) {
        padding: 10px 20px 15px;
      }

      .Row__content {
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }

    &__value {
      .Value__line {
        width: 100%;
        justify-content: flex-end;
      }
    }

    .TokenIcon {
      &__image {
        margin-right: 5px !important;
      }
    }
    .MultipleIcons {
      margin-right: 5px !important;
      .TokenIcon__image {
        margin-right: 0 !important;
      }
    }

    .TokenIcon .TokenIcon__name,
    .Value .Value__value {
      font-size: $fontSizeLarge;
      @include respond-to(xl) {
        font-size: $fontSizeRegular;
      }
      @include respond-to(lg) {
        font-size: $fontSizeSmall;
      }
      @include respond-to(md) {
        font-size: $fontSizeMedium;
      }
    }

    .TokenIcon,
    .Value {
      margin-top: 5px;
    }

    .Value {
      flex: 1;
    }

    .TokenIcon .TokenIcon__name {
      @include respond-to(md) {
        max-width: 120px;
      }

      b {
        font-weight: 400;
        transition: $transition;
      }
    }
  }
`;

export default staticStyles;
