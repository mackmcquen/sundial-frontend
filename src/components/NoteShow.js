import React from 'react';
import { deleteNote } from '../actions/note'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const usersAPI = `http://localhost:3001/users`
const notesAPI = `http://localhost:3001/notes`

class NoteShow extends React.Component {

    state = { note: {}, isLoading: true }

    deleteNote = () => {
        const noteID = this.props.match.params.id
        const showNote = this.props.notes.find((note) => note.id == noteID)
        const reqObj = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }
        fetch(`${notesAPI}/${showNote.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(this.props)
            this.props.noteDelete(showNote.id)
            this.props.history.push(`/notes`)
        })
    }

    componentDidMount() {
        const noteID = this.props.match.params.id
        const showNote = this.props.notes.find((note) => note.id == noteID)
        console.log(showNote)
        this.setState({ note: showNote, isLoading: false })
        console.log(noteID)
    }

    render() {
        console.log(this.state)
        const noteID = this.props.match.params.id
        return (
            !this.state.isLoading ?
            <div className="Note-card">
            { this.state.note.title }
            <br />
            { this.state.note.content }
            <br />
            <Link to={ `/editnote/${noteID}` } className="Card-button" type="button"> Edit </Link>
            <button onClick={ this.deleteNote }
            className="Card-button" type="button"> Delete </button>
            <br />
            <Link to={ `/notes` } className="Card-button" type="button"> Back to Notes </Link>
            </div>
            : null
        )
    }
}

const mapStateToProps = (state) => {
    return { notes: state.notes }
}

const mapDispatchToProps = (dispatch) => {
    return { noteDelete: (note) => { dispatch(deleteNote(note)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShow)