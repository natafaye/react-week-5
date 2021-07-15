import notesReducer, { DELETE_NOTE } from './notesSlice'

test('Deletes a note based on an id', () => {
    const initialState = [{
        _id: 1,
        title: "Address of Doctor's Office",
        text: "123 Main St\nReno, NV 85858",
        tags: [],
        lastSaved: Date.now()
    }]

    const action = { type: DELETE_NOTE, payload: 1 }
    const newNotesState = notesReducer(initialState, action)
    expect(newNotesState.length).toBe(0)

    
    const action = { type: DELETE_NOTE, payload: 23 }
    const newNotesState = notesReducer(initialState, action)
    expect(newNotesState.length).toBe(1)
})