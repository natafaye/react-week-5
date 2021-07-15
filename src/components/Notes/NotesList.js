import React, { useEffect } from 'react';
import { Switch, Route, NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, createNewNote, notesLoading, isLoadingSelector, allNotesSelector } from '../../redux/notesSlice';
import Note from './Note';

export default function NotesList({ startConfirm }) {
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const notes = useSelector(allNotesSelector);
    const isLoading = useSelector(isLoadingSelector);
    
	const reloadNotes = async () => {
        try {
            dispatch(notesLoading());
            await dispatch(fetchNotes()).unwrap();
        }
        catch (error) {
            console.log(error.message);
        }
	}
	useEffect(() => {
		reloadNotes();
	}, [])

	const handleCreateNote = async () => {
        const resp = await dispatch(createNewNote()).unwrap();
        history.push(`/notes/${resp.id}/edit`)
	}

    return (
        <React.Fragment>
            <div className="sidebar inner-sidebar p-3">
                <div className="position-sticky pt-2">
                    <div className="d-grid">
                        <Button variant="warning" className="mb-3 float-end" onClick={handleCreateNote}>+ New Note</Button>
                    </div>
                    { (isLoading) ? <p className="text-muted text-center mt-3">Loading...</p> :
                        <Nav variant="pills" className="flex-column">
                            { notes.map(note => 
                                <Nav.Item key={note.id}>
                                    <Nav.Link as={NavLink} to={`${match.url}/${note.id}`}>{note.title}</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    }
                </div>
            </div>
            <div className="main inner-main px-2">
                <Switch>
                    <Route path={`${match.path}/:noteId`}>
                        <Note startConfirm={startConfirm} />
                    </Route>
                    <Route path={`${match.path}`}>
                        <p className="m-3 mt-5 text-center">Please select a note to view.</p>
                    </Route>
                </Switch>
            </div>
        </React.Fragment>
    )
}
