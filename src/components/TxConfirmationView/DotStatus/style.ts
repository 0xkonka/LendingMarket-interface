import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .DotStatus {
    font-size: $fontSizeSmall;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap;
    .DotStatus__loader {
      left: 5px;
      margin-left: 5px;
      top: 3px;
    }

    &__dot {
      width: 10px;
      height: 10px;
      margin-left: 5px;
      border-radius: 50%;
    }
  }
`;

export default staticStyles;
