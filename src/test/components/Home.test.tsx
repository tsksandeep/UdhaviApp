import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import Home from "../../components/Home/Home";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";

let store: any;
describe("Testing ReassignLocationMenu component", () => {
  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore({ app: { isAppLoading: true } });
  });
  it("renders as expected", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
