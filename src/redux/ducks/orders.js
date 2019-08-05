import getStore from '../';
import config from '../../config';
export const NAMESPACE = 'orders';
export const GET_ORDERS = `${NAMESPACE}/GET_ORDERS`;
export const GET_ORDERS_SUCCESS = `${NAMESPACE}/GET_ORDERS_SUCCESS`;
export const GET_ORDERS_FAIL = `${NAMESPACE}/GET_ORDERS_FAIL`;


export const getOrders = () => {
    getStore().dispatch({ type: GET_ORDERS });
    fetch(`${config.apiDomain}${config.api.list_orders}`)
        .then(response => {
            response.json().then(function (data) {
                data.reverse();
                checkOrdersSuccess(data)
            });
        })
        .catch((_) => checkOrdersFail());

}
export const checkOrdersSuccess = (data) => getStore().dispatch({ type: GET_ORDERS_SUCCESS, data });
export const checkOrdersFail = () => getStore().dispatch({ type: GET_ORDERS_FAIL });


const initialState = {
    data: [],
    isLoading: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return { ...state, isLoading: true };
        case GET_ORDERS_SUCCESS:
            return { ...state, isLoading: false, data: action.data }
        case GET_ORDERS_FAIL:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

export default reducer;
