import {
  SET_LAYOUT_SETTINGS,
  SET_DEFAULT_LAYOUT_SETTINGS,
} from "../actions/LayoutActions";
import { EgretLayoutSettings } from "../../EgretLayout/settings";

const initialState = {
  settings: {
    ...EgretLayoutSettings,
  },
  defaultSettings: {
    ...EgretLayoutSettings,
  },
};

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAYOUT_SETTINGS:
      return {
        ...state,
        settings: { ...action.data },
      };
    case SET_DEFAULT_LAYOUT_SETTINGS:
      return {
        ...state,
        defaultSettings: { ...action.data },
      };
    default:
      return { ...state };
  }
};

export default LayoutReducer;
