import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { saveUpdateNote, deleteNote } from '../../redux/notesSlice';

export default function NoteForm({ note, startConfirm }) {
    const [titleValue, setTitleValue] = useState(note.title);
    const [textValue, setTextValue] = useState(note.text);
    const handleTitleChange = (e) => setTitleValue(e.target.value);
    const handleTextChange = (e) => setTextValue(e.target.value);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(saveUpdateNote({ ...note, title: titleValue, text: textValue }));
        history.push(`/notes/${note.id}`);
    }

    const handleStartDelete = () => {
        startConfirm(
            `Are you sure you want to delete ${note.title}?`, 
            "Delete", 
            () => handleDelete())
    }

    const handleDelete = () => {
        dispatch(deleteNote(note.id));
        history.push(`/notes`);
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col d-flex">
                    <input type="text" 
                        className="form-control" 
                        value={titleValue} 
                        onChange={handleTitleChange} />
                    <Button variant="danger" className="ms-3" onClick={handleStartDelete}>Delete</Button>
                    <Button variant="primary" className="ms-3" onClick={handleSave}>Save</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <textarea 
                        className="note-textarea form-control w-100 mt-3" 
                        onChange={handleTextChange}
                        value={textValue}/>
                </div>
            </div>
        </React.Fragment>
    )
}
