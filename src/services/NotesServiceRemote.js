import { createServer, Model } from "miragejs";
import { NOTES, TAGS } from "./data";

const NOTES_ENDPOINT = "/notes"; //'https://crudcrud.com/api/60160ea878fe4ae4b53ed215f2fd8b64/notes';

// MOCK SERVER

createServer({
    models: {
        note: Model,
        tag: Model
    },
    seeds(server) {
        server.db.loadData({
            notes: NOTES,
            tags: TAGS
        });
    },
    routes() {
        this.get(NOTES_ENDPOINT);
        this.get(NOTES_ENDPOINT + "/:id");
        this.post(NOTES_ENDPOINT, (schema, request) => {
            const newNote = JSON.parse(request.requestBody);
            return schema.notes.create(newNote);
        });
        this.put(NOTES_ENDPOINT + "/:id", (schema, request) => {
            const id = request.params.id;
            const noteData = JSON.parse(request.requestBody);
            return schema.notes.find(id).update(noteData);
        });
        this.delete(NOTES_ENDPOINT + "/:id");
    }
});

// NOTES SERVICE

const getFetchOptions = (method, data) => ({ 
    method: method, 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})

export const getNotes = async () => {
    try {
        const resp = await fetch(NOTES_ENDPOINT);
        return await resp.json();
    } 
    catch(e) {
        console.log(e);
        return null;
    }
}

export const createNote = async (noteData) => {
    try {
        const resp = await fetch(NOTES_ENDPOINT, getFetchOptions("POST", { note: noteData }))
        return await resp.json();
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

export const updateNote = async (updatedNote) => {
    try {
        const resp = await fetch(NOTES_ENDPOINT + "/" + updatedNote.id, getFetchOptions("PUT", { note: updatedNote }));
        return resp;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

export const deleteNote = async (noteId) => {
    try {
        const resp = await fetch(NOTES_ENDPOINT + "/" + noteId, { method: "DELETE" })
        return resp;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}