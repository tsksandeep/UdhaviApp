import { css } from "@emotion/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const totalStatusBarHeight = (10 + getStatusBarHeight()).toString();

const BackButtonStyleComponent = {
  container: css`
    position: absolute;
    top: ${totalStatusBarHeight}px;
    left: 20px;
  `,
  image: css`
    width: 35px;
    height: 35px;
  `,
};

export default BackButtonStyleComponent;
