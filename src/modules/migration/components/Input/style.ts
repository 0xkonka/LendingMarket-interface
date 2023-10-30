import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .InputContainer {
    display: flex;
    align-items: center;
    border-radius: $base-radius;
    border: 1px solid;
    height: 72px;
    padding: 4px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.02), 0px 1px 8px rgba(0, 0, 0, 0.08);
  }

  .InputContainerDisabled {
    box-shadow: unset;
  }

  .Input {
    border: unset;
    outline: unset;
    background: unset;
    height: 100%;
    width: 100%;
    font-size: $lg-font-size;
    padding: 16px 24px;
    flex: 1;
  }

  .InputLeftContent {
    display: flex;
    align-items: center;
    position: relative;
    border-right: 1px solid;
    max-height: 32px;
    padding-right: 20px;
    padding-left: 20px;
  }
`;

export default staticStyles;
