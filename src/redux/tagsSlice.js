import { TAGS } from '../services/data';

const initialState = TAGS;

const nextTagId = (tags) => tags.reduce((currentMaxId, tag) => Math.max(tag._id, currentMaxId), -1) + 1;

export const CREATE_TAG = 'tags/tagCreated';
export const DELETE_TAG = 'tags/tagDeleted';

export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TAG:
            return [ ...state, { _id: nextTagId(state), ...action.payload } ];
        case DELETE_TAG:
            return state.filter( t => t._id !== action.payload._id );
        default:
            return state;
    }
}