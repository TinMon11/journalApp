import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice"

export const startNewNote = ()=> {
    return async (dispatch, getState) => {
        // uid me lo dará firebase

        dispatch(savingNewNote())

        const {uid} = getState().auth

        const newNote = {
            title: '',
            body: '',
            data: new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc,newNote)

        newNote.id = newDoc.id;

        console.log(newDoc)

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        // dispatch activar nota
    }
}

export const startLoadingNotes = ()=> {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        if (!uid) throw new Error ('User UID no existe')

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }
}