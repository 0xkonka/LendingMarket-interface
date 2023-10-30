import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .VideoContainerParent {
    position: relative;
    padding-top: 56.25%;
    width: 100%;
    border-radius: $base-radius;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid;
  }

  .VideoContainerChild {
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 56.25%;
    width: 100%;
    cursor: pointer;
  }

  .VideoContainerCloseButton {
    position: absolute;
    top: -44px;
    right: 0;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 64px;
    padding: 4px 8px;
    font-weight: 600;
    transition: background 0.15s ease;
  }

  .VideoContainerCloseButton > span {
    margin-left: 4px;
  }

  .VideoEmbedContainer {
    border-radius: $base-radius;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 769px) {
    .VideoContainerFloating {
      position: fixed;
      width: 280px;
      /* 16:9 ratio */
      height: 158px;
      /* bottom attribute isn't working. Work around: */
      top: calc(100vh - 158px - 16px);
      left: calc(100vw - 280px - 16px);
      z-index: 9999;
      padding-top: unset;
    }
  }

  @media (min-width: 1025px) {
    .VideoContainerFloating {
      width: 360px;
      /* 16:9 ratio */
      height: 203px;
      /* bottom attribute isn't working. Work around: */
      top: calc(100vh - 203px - 32px);
      left: calc(100vw - 360px - 32px);
    }
  }

  @media (min-width: 1441px) {
    .VideoContainerFloating {
      width: 440px;
      /* 16:9 ratio */
      height: 248px;
      /* bottom attribute isn't working. Work around: */
      top: calc(100vh - 248px - 32px);
      left: calc(100vw - 440px - 32px);
    }
  }

  @media (min-width: 1800px) {
    .VideoContainerFloating {
      width: 640px;
      /* 16:9 ratio */
      height: 360px;
      /* bottom attribute isn't working. Work around: */
      top: calc(100vh - 360px - 32px);
      left: calc(100vw - 640px - 32px);
    }
  }
`;

export default staticStyles;
