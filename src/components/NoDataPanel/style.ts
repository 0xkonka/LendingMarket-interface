import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .NoDataPanel {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default staticStyles;
