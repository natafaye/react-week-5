import * as ActionTypes from './ActionTypes';

// Note Action Creators

export const createNote = (data) => ({
    type: ActionTypes.CREATE_NOTE,
    payload: data
});

export const updateNote = (data) => ({
    type: ActionTypes.UPDATE_NOTE,
    payload: data
});

export const deleteNote = (data) => ({
    type: ActionTypes.DELETE_NOTE,
    payload: data
});

// Tag Action Creators

export const createTag = (data) => ({
    type: ActionTypes.CREATE_TAG,
    payload: data
});

export const deleteTag = (data) => ({
    type: ActionTypes.DELETE_TAG,
    payload: data
});