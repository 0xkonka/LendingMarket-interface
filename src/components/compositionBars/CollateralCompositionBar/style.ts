import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .CollateralCompositionBar.Row {
    align-items: center;
  }
`;

export default staticStyles;
