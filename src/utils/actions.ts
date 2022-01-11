import _ from "lodash";
import { bindActionCreators } from "redux";
import * as actions from "../store/actions";

const bindDispatch = _.memoize((dispatch: any) => ({
  dispatch,
  actions: bindActionCreators(actions, dispatch),
}));
export default bindDispatch;
