import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .DepositBorrowMainWrapper {
    display: flex;
    flex: 1;
    gap: 30px;

    @include respond-to(md) {
      flex-direction: column;
    }

    &__left-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      @include respond-to(md) {
        order: 1;
        display: block;
        flex: unset;
      }

      .ContentWrapperWithTopLine,
      .ContentWrapperWithTopLine__content,
      .DepositBorrowMainWrapper__content {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .ContentWrapperWithTopLine__content {
        padding: 30px 35px;
      }
    }

    &__right-inner {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 400px;

      @include respond-to(xl) {
        width: 340px;
      }
      @include respond-to(md) {
        width: 100%;
        order: 0;
      }

      .ContentWrapperWithTopLine__content {
        background: #fff;
        border: none;
        backdrop-filter: none;
        padding: 30px 30px 10px;
      }

      .Card__content {
        border-bottom: solid 1px #d8d9e0;
      }
    }

    .DepositBorrowMainWrapper__total {
      padding: 20px 15px;
      @include respond-to(xl) {
        padding: 15px 10px;
      }
      @include respond-to(lg) {
        padding: 10px;
      }
      @include respond-to(md) {
        padding: 15px 10px;
      }
      @include respond-to(sm) {
        padding: 15px 20px;
      }
    }

    .DepositBorrowMainWrapper__changeMarket-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px 0 10px;
      font-size: $fontSizeLarge;
      @include respond-to(xl) {
        margin: 20px 0 10px;
        font-size: $fontSizeMedium;
      }
      @include respond-to(lg) {
        font-size: $fontSizeSmall;
      }
      @include respond-to(md) {
        font-size: $fontSizeMedium;
      }
      @include respond-to(sm) {
        margin: 30px 10px;
        font-size: $fontSizeRegular;
        order: 2;
      }
      .MarketSwitcher__text-button {
        font-size: $fontSizeLarge;
        margin-left: 5px;
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

      .DropdownWrapper__icon {
        display: none;
      }

      .MarketSwitcher__content {
        width: 130px;
      }
      .MarketSwitcher__title {
        font-size: $fontSizeSmall;
        padding: 13px 5px;
      }
      .MarketSwitcher__subLogo {
        height: 39px;
      }
      .MarketSwitcher__market {
        height: 40px;
      }
      .MarketSwitcher__logo-inner {
        img {
          width: 65px;
          max-height: 16px;
        }
        span {
          font-size: $fontSizeSmall;
        }
      }
      .MarketSwitcher__marketText {
        line-height: 1.3;
        font-size: $fontSizeXSmall;
        letter-spacing: 5px;
        left: 3px;
      }
    }
  }
`;

export default staticStyles;
