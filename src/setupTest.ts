import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });
const originalConsoleError = console.error;

console.error = (message) => {
  if (/Warning/.test(message)) {
    throw new Error(message);
  }
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }
  originalConsoleError(message);
};
