import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .SubValue {
    font-size: 10px;

    &__symbol {
      margin-left: 5px;
    }
    &__usdSymbol {
      margin-left: 0;
      margin-right: 3px;
    }
    &__symbolUSD {
      display: none;
    }
  }
`;

export default staticStyles;
