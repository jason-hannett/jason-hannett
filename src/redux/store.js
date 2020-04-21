import {combineReducers, createStore} from 'redux';
import reducer from './reducer'
import artistReducer from './artistReducer'
import songsReducer from './songsReducer'
import likesReducer from './likesReducer'
import commentsReducer from './commentsReducer'

const rootReducer = combineReducers({
    reducer,
    artistReducer,
    songsReducer,
    likesReducer,
    commentsReducer
})

export default createStore(rootReducer)