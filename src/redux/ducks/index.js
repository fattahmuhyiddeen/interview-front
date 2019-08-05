import { combineReducers } from "redux";

import publicData from './publicData'
import health from './health'

export default combineReducers({
    publicData,
    health
});
