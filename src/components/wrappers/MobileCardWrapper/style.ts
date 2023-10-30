import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .MobileCardWrapper {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    width: 100%;
    margin-bottom: 10px;

    &__symbol--inner {
      padding: 10px 15px;
    }

    &__content {
      padding: 10px 15px 20px;
    }

    .TokenIcon__name {
      max-width: 250px;
      b {
        font-size: 14px;
      }
    }

    .Row .Row__title,
    .Value .SubValue,
    .TextWithModal__text {
      font-size: 14px;
    }

    .Row__center {
      align-items: center;
    }
  }
`;

export default staticStyles;
