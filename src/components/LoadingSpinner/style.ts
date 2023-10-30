import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .LoadingSpinner {
    position: absolute;
    z-index: 90;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(113, 89, 255, 0.1);
    backdrop-filter: blur(20px);

    img {
      width: 90px;
      height: 90px;
      animation: rotation 2s infinite linear;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
`;

export default staticStyles;
