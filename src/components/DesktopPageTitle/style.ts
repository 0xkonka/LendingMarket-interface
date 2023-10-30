import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .DesktopPageTitle {
    position: relative;
    margin-bottom: 5px;
    @include respond-to(sm) {
      display: none;
    }
    h2 {
      font-weight: 600;
      line-height: 1;
      margin-bottom: 10px;
      font-size: $fontSizeXXLarge;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .DesktopPageTitle__subTitle {
        font-size: $fontSizeRegular;
        @include respond-to(xl) {
        }
        .Link {
          display: inline-flex;
          align-items: center;
          img {
            width: 12px;
            height: 12px;
            margin-left: 5px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
