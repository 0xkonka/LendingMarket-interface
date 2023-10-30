import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .MenuLink {
    cursor: pointer;
    font-weight: 300;
    text-transform: capitalize;
    height: 100%;

    &:hover {
      .MenuLink__title {
        p {
          b {
            opacity: 0;
          }
        }
        strong {
          opacity: 1;
          font-weight: 600;
        }
      }
    }

    .MenuLink__title {
      position: relative;
      padding: 15px 10px;
      height: 64px;
      font-size: 13px;
      backface-visibility: hidden;
      transform: translateZ(0);
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        transition: $transition;
        position: relative;
        display: inline-block;
        letter-spacing: 0.25px;
        b {
          opacity: 1;
          font-weight: 400;
          transition: $transition;
        }
      }

      strong {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: $transition;
        font-weight: 600;
        white-space: nowrap;
        letter-spacing: 0.25px;
      }

      i {
        position: absolute;
        left: 50%;
        transform: translateY(-4px) translateX(-50%);
        width: 0;
        top: 0;
        height: 4px;
        transition: all 0.4s ease;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: inherit;
          transition: $transition;
        }
      }
    }

    &__active {
      .MenuLink__title {
        p {
          b {
            opacity: 0;
          }
        }
        strong {
          opacity: 1;
        }
        i {
          width: 100% !important;
        }
      }
    }

    &__hidden {
      display: none;
    }
  }
`;

export default staticStyles;
