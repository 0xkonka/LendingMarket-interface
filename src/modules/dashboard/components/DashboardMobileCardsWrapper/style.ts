import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .DashboardMobileCardsWrapper {
    padding: 0 10px;
    display: none;
    @include respond-to(sm) {
      display: flow-root;
    }
  }
`;

export default staticStyles;
