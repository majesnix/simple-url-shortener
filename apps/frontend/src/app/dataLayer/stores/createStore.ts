import RootStore from "./RootStore";
import App from "../models/App";

const createStore = (): RootStore => {
  return new RootStore({
    app: new App({}),
  });
};

export default createStore;
