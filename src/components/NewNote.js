import React from 'react';
import { newNote } from '../actions/note'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const notesAPI = `http://localhost:3001/notes`

class NewNote extends React.Component {

    state = { title: '', content: ''}

    handleSubmit = (event) => {
        event.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({...this.state, user_id: 1})
        }
        fetch(notesAPI, reqObj)
            .then(resp => resp.json()) 
            .then(newNote =>{ 
            console.log(newNote)
            this.props.createNote(newNote)
            this.props.history.push(`/notes/${newNote.id}`)
        })
    }

    handleChange = (e) => {
        this.setState({
            [ e.target.name ]: e.target.value
        })
        console.log(e.target.name, e.target.value)
    }

    render() {
        console.log(this.props)
        return (
            <div className={`app`}>
                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.handleChange } type='text' value={ this.state.title } name='title' placeholder='Title your new note' />
                    <br />
                    <textarea onChange={ this.handleChange } type='text' value={ this.state.content } name='content' placeholder='Write your new note' />
                    <br />
                    <input className="Card-button" type='submit' />
                </form>
                <Link to={`/notes`} className="Card-button" type="button"> Back to Notes </Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { createNote: (note) => { dispatch(newNote(note)) } }
}
  
export default connect(null, mapDispatchToProps)(NewNote);
