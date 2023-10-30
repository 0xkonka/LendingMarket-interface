import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .LoopMain {
    &__1-click-loop-form {
      padding: 0;
    }
  }
`;

export default staticStyles;
