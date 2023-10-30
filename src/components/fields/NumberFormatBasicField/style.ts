import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .BasicField {
    width: 100%;
    input {
      border: none;
      background: transparent;
      font-family: 'Roboto';
      transition: $transition;
      font-size: $fontSizeLarge;
      width: 100%;
    }
  }
`;

export default staticStyles;
