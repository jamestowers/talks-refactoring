import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.window.document.cookie = jest.fn(() => {
  return { matches: false, addListener: jest.fn(), removeListener: jest.fn() };
});
