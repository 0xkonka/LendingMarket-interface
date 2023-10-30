import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationDepositPillContainer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .MigrationDepositPill {
    display: flex;
    align-items: center;
    color: $purple;
    background: rgba($purple, 0.1);
    border-radius: 64px;
    padding: 4px 8px;
  }

  .MigrationDepositPill > span,
  .MigrationDepositDepositApr {
    font-weight: 600;
    font-size: $xs-font-size;
  }

  .MigrationDepositDepositApr {
    padding-right: 8px;
  }
`;

export default staticStyles;
