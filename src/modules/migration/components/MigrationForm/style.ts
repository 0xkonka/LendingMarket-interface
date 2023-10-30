import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .MigrationForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 560px;
    width: 100%;

    &__title {
      font-size: 32px;
      margin-bottom: 20px;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      width: 100%;
    }

    &__row {
      display: flex;
      align-items: center;
      gap: 15px;

      @include respond-to(sm) {
        flex-direction: column;
      }
    }

    &__select {
      width: 100%;

      p {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }

    &__select-button {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 10px;

      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: contain;
        margin-right: 10px;
      }
    }

    &__status-label {
      b {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
`;

export default staticStyles;
