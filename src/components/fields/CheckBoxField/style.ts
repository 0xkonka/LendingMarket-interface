import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .CheckBoxField {
    position: relative;

    input[type='checkbox'] {
      width: auto;
      display: none;
      opacity: 1 !important;
    }

    label {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 1em;
    }

    p {
      font-size: 12px;
    }

    input:disabled + label {
      cursor: default !important;
      opacity: 1 !important;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);
      position: relative;
      width: 25px;
      min-width: 25px;
      height: 25px;
      border-radius: 5px;
      transform: scale(1);
      transition: all 0.2s ease;

      svg {
        position: absolute;
        width: 14px;
        height: 11px;
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
      }
    }

    input:checked + .CheckBoxField__label span svg {
      stroke-dashoffset: 0;
    }
  }
`;

export default staticStyles;
