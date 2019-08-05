import getStore from '../';
import config from '../../config'
export const NAMESPACE = 'publicData';
export const GET_PUBLIC_DATA = `${NAMESPACE}/GET_PUBLIC_DATA`;
export const GET_PUBLIC_DATA_SUCCESS = `${NAMESPACE}/GET_PUBLIC_DATA_SUCCESS`;
export const GET_PUBLIC_DATA_FAIL = `${NAMESPACE}/GET_PUBLIC_DATA_FAIL`;

export const GET_ROUTES = `${NAMESPACE}/GET_ROUTES`;
export const GET_ROUTES_SUCCESS = `${NAMESPACE}/GET_ROUTES_SUCCESS`;
export const GET_ROUTES_FAIL = `${NAMESPACE}/GET_ROUTES_FAIL`;

export const getPublicData = () => {
    getStore().dispatch({ type: GET_PUBLIC_DATA });
    fetch(`${config.apiDomain}api/airports`)
        .then(response => response.json())
        .then(response => getPublicDataSuccess(response))

}
export const getPublicDataSuccess = (data) => getStore().dispatch({ type: GET_PUBLIC_DATA_SUCCESS, data });
export const getPublicDataFail = () => getStore().dispatch({ type: GET_PUBLIC_DATA_FAIL });

export const getRoutes = () => {
    getStore().dispatch({ type: GET_ROUTES });

}

const initialState = {
    loading: false,
    carriers: [],
    aircrafts: [],
    airports: [],
    getRouteLoading: false,
    showRoute: false,
    routes: []
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PUBLIC_DATA:
            return { ...state, loading: true };
        case GET_PUBLIC_DATA_SUCCESS:
            const airports = action.data.map((airport) => ({
                value: airport.id, label: `${airport.name} (${airport.code})`
            }));
            return { ...state, loading: false, airports }
        case GET_ROUTES:
            return { ...state, getRouteLoading: true };
        default:
            return state;
    }
}

export default appReducer;
