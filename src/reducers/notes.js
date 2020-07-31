export default (state=[], action) => {
    switch(action.type) {
        case 'FETCH_NOTES':
            return action.notes
        case 'POST_NOTE':
            return [...state, action.note]
        case 'PATCH_NOTE':
            return state.map( (note) => note.id === action.note.id ? action.note : note )
        case 'DELETE_NOTE':
            console.log(action)
            // debugger
            return state.filter(({ id }) => id !== action.note);
        default:
        return state
    }
}