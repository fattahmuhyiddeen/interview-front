import { combineReducers } from "redux";

import health from './health';
import orders from './orders';
import order from './order';
import modalForm from './modalForm';

export default combineReducers({
    health,
    orders,
    order,
    modalForm
});
