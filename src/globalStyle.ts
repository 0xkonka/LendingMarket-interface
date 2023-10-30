import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/variables';
  @import 'src/_mixins/font-face';

  @include font-face('Inter', '/fonts/Inter/Inter-Regular');
  @include font-face('Inter', '/fonts/Inter/Inter-Light', 300);
  @include font-face('Inter', '/fonts/Inter/Inter-Medium', 500);
  @include font-face('Inter', '/fonts/Inter/Inter-Bold', 600);

  @include font-face('PP Mori', '/fonts/PPMori/PPMori-Regular');
  @include font-face('PP Mori', '/fonts/PPMori/PPMori-Extralight', 300);
  @include font-face('PP Mori', '/fonts/PPMori/PPMori-SemiBold', 600);
  @include font-face('PP Mori', '/fonts/PPMori/PPMori-ExtraBold', 700);

  @include font-face('Nunito', '/fonts/Nunito/Nunito-Regular');
  @include font-face('Nunito', '/fonts/Nunito/Nunito-Extralight', 300);
  @include font-face('Nunito', '/fonts/Nunito/Nunito-SemiBold', 600);
  @include font-face('Nunito', '/fonts/Nunito/Nunito-ExtraBold', 700);

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    &:after,
    &:before {
      box-sizing: border-box;
    }
  }

  html {
    -webkit-text-size-adjust: none;
    position: relative;
    height: 100%;
  }

  body {
    font-family: 'PP Mori';
    font-size: $fontSizeRegular;
    min-width: 365px;
    overscroll-behavior: none;
  }

  input,
  textarea,
  select,
  input:disabled,
  textarea:disabled,
  select:disabled,
  input[type='search'],
  input[type='date'],
  input[type='date']:disabled {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    outline: none;
    opacity: 1;
    font-family: 'PP Mori';
    &::placeholder {
      font-family: 'PP Mori';
    }
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  input[type='text']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  input[type='text']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }

  a:focus,
  a:active,
  a:hover,
  button::-moz-focus-inner,
  input[type='reset']::-moz-focus-inner,
  input[type='button']::-moz-focus-inner,
  input[type='submit']::-moz-focus-inner,
  select::-moz-focus-inner,
  input[type='file'] > input[type='button']::-moz-focus-inner {
    border: 0;
    outline: 0;
  }

  a {
    transition: $transition;
    outline: none;
    text-decoration: none;
    display: inline-block;
    position: relative;
    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      outline: none;
    }
    &:hover {
      opacity: 0.8;
    }
    &:active {
      transform: none;
    }
    @include respond-to(sm) {
      transition: none;
    }
  }

  button {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    transition: $transition;
    font-family: 'PP Mori';
    &:disabled {
      cursor: default;
    }
  }

  .ButtonLink {
    &:active,
    &:hover {
      opacity: 1;
      transform: none;
    }
  }

  html,
  body,
  #root,
  .Main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
  }

  ul {
    list-style: none;
    li {
      list-style: none;
    }
  }

  .drift-frame-controller-align-right {
    right: auto !important;
    left: 0 !important;
    bottom: 0 !important;
    height: 60px !important;
    width: 55px !important;
    @include respond-to(sm) {
      left: auto !important;
      right: 5px !important;
      display: none !important;
    }
  }

  body > img:last-of-type {
    display: none;
  }

  .Body__mobileMenu-open {
    .drift-frame-controller-align-right {
      right: auto !important;
      left: -10px !important;
    }
  }
  .Body__filters-open,
  .Body__mobileMenu-open {
    #PrivateWrapper__content-wrapper {
    }
  }

  .italic {
    font-style: italic;
  }

  #nash-ramp-modal {
    z-index: 1000;
  }

  .Main__NetworkMismatch {
    border: none;

    .NetworkMismatch__onlyText {
      text-align: center;
    }

    .NetworkMismatch__textInner {
      display: flex;
      flex-direction: column;
      align-items: center !important;
      justify-content: center !important;

      p {
        margin-right: 0 !important;
      }

      Button {
        margin-top: 10px;
      }
    }
  }
`;

export default staticStyles;
