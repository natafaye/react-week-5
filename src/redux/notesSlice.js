import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as NotesService from '../services/NotesServiceRemote';

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

// Slice & Reducers

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        loading: 'loading',
        entities: []
    },
    reducers: {
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
