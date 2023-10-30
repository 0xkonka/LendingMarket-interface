import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .LockConfirmation {
    .TxConfirmationView {
      width: 100%;
    }
  }
`;

export default staticStyles;
