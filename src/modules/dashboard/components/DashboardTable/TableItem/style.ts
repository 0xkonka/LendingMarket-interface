import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TableItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    &__regular {
      padding: 18px 22px 17px 25px;
      min-height: 70px;
      border-top: 1px solid #eaeff5;
    }

    &__withInfo {
      position: relative;
    }

    .TableItem__inner {
      align-items: flex-start;
    }

    &__assetColor {
      display: inline-block;
      position: absolute;
      left: 0;
      width: 2px;
      height: 25px;
    }

    .TableItem__token {
      .TokenIcon__name {
        font-size: $fontSizeMedium;
      }
      .TokenIcon__image {
        margin-right: 5px;
      }
      .MultipleIcons {
        margin-right: 5px;
        .TokenIcon__image {
          margin-right: 0;
        }
      }
    }

    .TableCol {
      &:nth-of-type(3) {
        max-width: 160px;
        flex-basis: content;
      }
    }

    .Value {
      .Value__Value {
        @include respond-to(xl) {
          font-size: $fontSizeRegular;
        }
        @include respond-to(lg) {
          font-size: $fontSizeMedium;
        }
      }
      .SubValue {
        @include respond-to(xl) {
          font-size: $fontSizeSmall;
        }
        @include respond-to(lg) {
          font-size: $fontSizeXSmall;
        }
      }
    }
  }
`;

export default staticStyles;
