import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationLooseContinueButton {
    display: flex;
    justify-content: center;
  }

  .MigrationLooseContinueButton > span {
    color: $purple;
    font-size: $base-font-size;
    font-weight: 600;
    cursor: pointer;
    padding: 16px;
  }

  .MigrationLooseContinueButton > span:hover {
    text-decoration: underline;
  }
`;

export default staticStyles;
