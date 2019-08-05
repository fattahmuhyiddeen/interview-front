import { combineReducers } from "redux";

import health from './health';
import orders from './orders';
import modalForm from './modalForm';

export default combineReducers({
    health,
    orders,
    modalForm
});
