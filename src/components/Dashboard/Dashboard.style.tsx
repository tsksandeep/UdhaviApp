import { css } from "@emotion/native";

const DashboardComponentStyle = {
  container: css`
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    padding: 70px 30px 0 30px;
  `,
  header: css`
    width: 100%;
    text-align: center;
    font-family: "Pacifico";
    font-size: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
    color: #560CCE;
  `,
  messageWrapper: css`
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  `,
  message: css`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 34px;
    color: #fff;
    background-color: #2ed573;
    text-transform: uppercase;
  `,
  submitRequestButton: css`
    margin-top: 30px;
    border: 2px solid rgb(196, 34, 255);
  `,
  logoutButton: css`
    margin-top: auto;
    margin-bottom: 100px;
    border: 2px solid rgb(196, 34, 255);
  `,
};

export default DashboardComponentStyle;
