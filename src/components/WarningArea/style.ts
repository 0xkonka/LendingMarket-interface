import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .WarningArea {
    padding: 12px 15px;
    border-width: 1px;
    border-style: solid;
    border-radius: $borderRadius;
    @include respond-to(sm) {
      margin: 0 auto 20px;
    }

    &__top-line {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      img {
        margin-top: 3px;
        position: absolute;
        left: 0;
        width: 20px;
        @include respond-to(xl) {
          width: 16px;
          margin-top: 2px;
        }
      }
      p {
        padding-left: 30px;
        font-size: $fontSizeLarge;
        position: relative;
        @include respond-to(xl) {
          font-size: $fontSizeMedium;
          padding-left: 25px;
        }
      }
    }

    &__content {
      font-size: $fontSizeRegular;
      @include respond-to(xl) {
        font-size: $fontSizeSmall;
      }
    }
  }

  .WarningAreaWithMargin {
    margin-top: 20px;
    @include respond-to(lg) {
      margin-top: 10px;
    }
    @include respond-to(md) {
      margin-top: 20px;
    }
  }
  .WarningAreaTopLine {
    margin-bottom: 10px;
    p {
      font-weight: 600;
    }
  }
`;

export default staticStyles;
