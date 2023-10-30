import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationRemoveInputIcons {
    position: relative;
    display: flex;
  }

  .MigrationRemoveEthIcon {
    position: relative;
    margin-left: -12px;
  }

  .MigrationRemoveRdntIcon {
    position: relative;
  }

  .MigrationSectionContainer .MigrationSectionTitle {
    margin-bottom: 16px;
  }

  .MigrationRemoveInput {
    margin-bottom: 16px;
  }
`;

export default staticStyles;
