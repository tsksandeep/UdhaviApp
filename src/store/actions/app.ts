import * as Types from "../types/app";

const changeAppLoading = (payload: boolean) => ({
  type: Types.IS_APP_LOADING,
  payload,
});

export { changeAppLoading };
