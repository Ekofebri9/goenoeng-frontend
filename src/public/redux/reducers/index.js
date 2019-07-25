import { combineReducers } from 'redux';

import user from './user';
import store_product from './store_product';

const appReducer = combineReducers({
    user,
    store_product
});

export default appReducer;