import React from 'react'
import { Switch, Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoteView from './NoteView';
import NoteForm from './NoteForm';
import { isLoadingSelector, noteByIdSelector } from '../../redux/notesSlice';

export default function Note({ startConfirm }) {
    const match = useRouteMatch();
    const { noteId } = useParams();
    const note = useSelector(noteByIdSelector(noteId));
    const isLoading = useSelector(isLoadingSelector);
    
    return (
        <div className="container mt-3">
            { (!note && !isLoading) ? <Redirect to="/notfound"/> :
                (isLoading) ? <p className="text-muted text-center mt-3">Loading...</p> :
                    <Switch>
                        <Route path={`${match.path}/edit`}>
                            <NoteForm key={note.id} note={note} startConfirm={startConfirm} />
                        </Route>
                        <Route path={`${match.path}`}>
                            <NoteView key={note.id} note={note} />
                        </Route>
                    </Switch>
            }
        </div>
    )
}