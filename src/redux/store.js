import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'; // Import the combined root reducer
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;