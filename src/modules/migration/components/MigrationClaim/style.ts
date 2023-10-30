import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationTableItemValue.GreenApplied {
    color: $green;
  }
`;

export default staticStyles;
