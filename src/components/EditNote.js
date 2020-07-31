import React from 'react';
import { editNote } from '../actions/note'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const notesAPI = `http://localhost:3001/notes`

class EditNote extends React.Component {

    state = { title: '', content: ''}

    handleSubmit = (event) => {
        const noteID = this.props.match.params.id
        const showNote = this.props.notes.find((note) => note.id == noteID)
        event.preventDefault()
        const reqObj = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({...this.state, user_id: 1})
        }
        fetch(notesAPI+`/${noteID}`, reqObj)
            .then(resp => resp.json()) 
            .then(editNote =>{ 
            console.log(editNote)
            this.props.noteEdit(editNote)
            this.props.history.push(`/notes/${editNote.id}`)
        })
    }

    handleChange = (e) => {
        this.setState({
            [ e.target.name ]: e.target.value
        })
        console.log(e.target.name, e.target.value)
    }

    componentDidMount() {
        const noteID = this.props.match.params.id
        const showNote = this.props.notes.find((note) => note.id == noteID)
        this.setState({
            title: showNote.title,
            content: showNote.content
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className={`app`}>
                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.handleChange } type='text' value={ this.state.title } name='title' placeholder='Edit the title of your note' />
                    <br />
                    <textarea onChange={ this.handleChange } type='text' value={ this.state.content } name='content' placeholder='Edit your note' />
                    <br />
                    <input className="Card-button" type='submit' />
                </form>
                <Link to={`/notes`} className="Card-button" type="button"> Back to Notes </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { notes: state.notes }
}

const mapDispatchToProps = (dispatch) => {
    return { noteEdit: (note) => { dispatch(editNote(note)) } }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
