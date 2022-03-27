import { css } from '@emotion/native';

const AuthStyleComponent = {
  container: css`
    width: 100%;
    flex: 1;
    padding: 24px;
    background: #fdf6e4;
    align-items: center;
    margin-top: 100px;
  `,
  header: css`
    width: 100%;
    min-width: 220px;
    text-align: center;
    font-family: 'Pacifico';
    font-size: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
    color: #560cce;
  `,
  button: css`
    margin: 30px auto 20px auto;
    background: #560cce;
    border: none;
    width: 200px;
  `,
};

export default AuthStyleComponent;
