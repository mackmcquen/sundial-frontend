export const fetchNotes = (notes) => {
    return  { type: 'FETCH_NOTES', notes }
}

export const newNote = (note) => {
    return { type: 'POST_NOTE', note }
}

export const editNote = (note) => {
    return { type: 'PATCH_NOTE', note }
}

export const deleteNote = (note) => {
    console.log(note)
    return { type: 'DELETE_NOTE', note }
}
