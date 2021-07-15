import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
//import { createStore } from 'redux';
//import rootReducer from './reducer';

// const store = createStore(rootReducer);
// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default configureStore({
    reducer: {
        notes: notesReducer
    }
})