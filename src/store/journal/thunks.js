import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"

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
 
export const startSaveNote = ()=> {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const {uid} = getState().auth;
        const {active: note} = getState().journal
        const noteToFirestore = {...note}
        delete noteToFirestore.id
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFirestore,{merge:true})
        dispatch(updateNote(note))

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())
        //await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(await fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToActiveNote(photosUrls))
         
    }
}

///ERwW6oLkwihYN1iUodIRHq4cpkZ2/journal/notes/4GPDMctctGqYNKyw6dO9