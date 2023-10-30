import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationWithdrawPill {
    display: flex;
    align-items: center;
    color: $green;
    background: rgba($green, 0.1);
    border-radius: 64px;
    padding: 6px 8px;
    padding-right: 12px;
  }

  .MigrationWithdrawPill > span {
    font-weight: 600;
    font-size: $xs-font-size;
  }

  .MigrationWithdrawPillCheck {
    margin-right: 2px;
  }
`;

export default staticStyles;
