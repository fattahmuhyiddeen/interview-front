import getStore from '../';
import config from '../../config';
export const NAMESPACE = 'order';
export const CANCEL_ORDERS = `${NAMESPACE}/CANCEL_ORDERS`;
export const CANCEL_ORDERS_SUCCESS = `${NAMESPACE}/CANCEL_ORDERS_SUCCESS`;
export const CANCEL_ORDERS_FAIL = `${NAMESPACE}/CANCEL_ORDERS_FAIL`;


export const cancelOrder = (id) => {
    getStore().dispatch({ type: CANCEL_ORDERS });
    fetch(`${config.apiDomain}${config.api.cancel_order}`,
        {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(cancelOrderSuccess)
        .catch(cancelOrderFail);

}
export const cancelOrderSuccess = () => getStore().dispatch({ type: CANCEL_ORDERS_SUCCESS });
export const cancelOrderFail = () => getStore().dispatch({ type: CANCEL_ORDERS_FAIL });


const initialState = {
    isCancelling: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case CANCEL_ORDERS:
            return { ...state, isCancelling: true };
        case CANCEL_ORDERS_SUCCESS:
        case CANCEL_ORDERS_FAIL:
            return { ...state, isCancelling: false };
        default:
            return state;
    }
}

export default reducer;
