import React from 'react';
import { Link } from 'react-router-dom'

const NoteCard = props => {
    return (
        <div className="Note-card">
            <h3 className="Note-title"> { props.note.title } </h3>
            <p className="Note-content"> { props.note.content } </p>
            <Link to={`/notes/${props.note.id}`} className="Card-button" type="button"> View </Link>
            <Link to={`/editnote/${props.note.id}`} className="Card-button" type="button"> Edit </Link>
        </div>
    )
}

export default NoteCard
