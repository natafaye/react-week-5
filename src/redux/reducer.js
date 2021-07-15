import notesReducer from './notesSlice';
import tagsReducer from './tagsSlice';

// Could use combineReducer here instead to handle this for you
const rootReducer = (state = {}, action) => {
    return {
        notes: notesReducer(state.notes, action),
        tags: tagsReducer(state.tags, action)
    }
}

export default rootReducer;