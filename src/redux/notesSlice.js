// import { NOTES } from '../services/data';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as NotesService from '../services/NotesServiceRemote';

//const nextNoteId = (notes) => notes.reduce((currentMaxId, note) => Math.max(note.id, currentMaxId), -1) + 1;

// Selectors
export const allNotesSelector = state => state.notes.entities;
export const isLoadingSelector = state => state.notes.loading === 'loading';
export const noteByIdSelector = (id) => state => state.notes.entities.find(n => n.id === id);

// Async Thunks
export const fetchNotes = createAsyncThunk(
    'notes/fetchAll',
    async () => {
        const resp = await NotesService.getNotes();
        return resp.notes;
    }
)

export const createNewNote = createAsyncThunk(
    'notes/createNewNote',
    async () => {
        const newNote = { title: "New Note", text: "", tags: [], lastSaved: Date.now() }
        const resp = await NotesService.createNote(newNote);
        return resp.note;
    }
)

export const saveUpdateNote = createAsyncThunk(
    'notes/updateNote',
    async (updatedNote) => {
        const resp = await NotesService.updateNote({ ...updatedNote, lastSaved: Date.now() });
        return updatedNote;
    }
)

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId) => {
        const resp = await NotesService.deleteNote(noteId);
        return noteId;
    }
)

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        loading: 'loading',
        entities: []
    },
    reducers: {
        // notesLoaded: (state, action) => {
        //     state = action.payload;
        // },
        // noteCreated: (state, action) => {
        //     const newNote = { id: nextNoteId(state), title: "New Note", text: "", tags: [], lastSaved: Date.now() }
        //     state.push(newNote);
        //     if(action.payload.callback) action.payload.callback(newNote);
        // },
        // noteUpdated: (state, action) => {
        //     const note = state.find(n => n.id === action.payload.id);
        //     const updatedNote = { ...note, ...action.payload, lastSaved: Date.now() };
        //     state[state.indexOf(note)] = updatedNote;
        // },
        // noteDeleted: (state, action) => {
        //     state.splice(state.findIndex(n => n.id === action.payload.id), 1);
        // }
        notesLoading: (state) => {
            state.loading = 'loading';
        },
    },
    extraReducers: {
        [fetchNotes.fulfilled]: (state, action) => {
            state.entities = action.payload;
            state.loading = 'success';
        },
        [createNewNote.fulfilled]: (state, action) => {
            state.entities.push({ id: action.payload.id, ...action.payload.note });
        },
        [saveUpdateNote.fulfilled]: (state, action) => {
            const note = state.entities.find(n => n.id === action.payload.id);
            note.title = action.payload.title;
            note.text = action.payload.text;
            note.lastUpdated = action.payload.lastSaved;
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.entities.splice(state.entities.findIndex(n => n.id === action.payload), 1);
        }
    }
})

export default notesSlice.reducer;

export const { notesLoading } = notesSlice.actions;
// export const { notesLoaded, noteCreated, noteUpdated, noteDeleted } = notesSlice.actions;

// export function fetchNotes() {
//     return async function fetchNotesThunk(dispatch, getState) {
//         const response = await NotesService.getNotes();
//         dispatch(notesLoaded(response.data));
//     }
// }

// export function saveNewNote() {
//     return async function saveNewNoteThunk(dispatch, getState) {
//         const resp = await fetch(NOTES_ENDPOINT, getFetchOptions("POST", noteData))
//         const newNote = await resp.note.json();
//         dispatch(noteCreated(newNote))
//     }
// }

// const initialState = NOTES;

// const nextNoteId = (notes) => notes.reduce((currentMaxId, note) => Math.max(note.id, currentMaxId), -1) + 1;

// export const CREATE_NOTE = 'notes/noteCreated';
// export const UPDATE_NOTE = 'notes/noteUpdated';
// export const DELETE_NOTE = 'notes/noteDeleted';

// export default function notesReducer(state = initialState, action) {
//     switch (action.type) {
//         case CREATE_NOTE:
//             return [ ...state, { id: nextNoteId(state), ...action.payload } ];
//         case UPDATE_NOTE:
//             return state.map( n => (n.id !== action.payload.id) ? n : { ...n, ...action.payload } );
//         case DELETE_NOTE:
//             return state.filter( n => n.id !== action.payload );
//         default:
//             return state;
//     }
// }

