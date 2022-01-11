import { css } from "@emotion/native";
import { theme } from "../../core/theme";

const TextInputStyleComponent = {
  container: css`
    width: 100%;
    margin-vertical: 12px;
  `,
  input: css`
    background-color: ${theme.colors.surface};
  `,
  description: css`
    font-size: 13px;
    color: ${theme.colors.secondary};
    padding-top: 8px;
  `,
  error: css`
    font-size: 13px;
    color: ${theme.colors.error};
    padding-top: 8px;
  `,
};

export default TextInputStyleComponent;