import React, { Component } from 'react';
import NoteCollection from '../containers/NoteCollection';
import NoteCard from './NoteCard';
import Login from './Login';
import NoteShow from './NoteShow';
import NewNote from './NewNote';
import EditNote from './EditNote';
import { connect } from 'react-redux';
import { fetchNotes } from '../actions/note';
import { Route, Switch } from 'react-router-dom';
import '../App.css'

const notesAPI = `http://localhost:3001/notes`

class App extends Component {

  state = { notes: [] }

  componentDidMount() {
    fetch(notesAPI)
      .then(resp => resp.json())
      .then(noteJSON => {
        this.props.addNotes(noteJSON)
      })
  }

  imageClick = () => {
    console.log("pyramids clicked!")
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <div className="App-header"> 
          <img className="App-logo" src="../pyramids.png" alt="pyramids" onClick={ this.imageClick } />
          <h1 className="sundial-title">sundial</h1>

          <Switch>
            <Route path={ '/login' } component={ Login } />
            <Route path={ '/notes/:id' } component={ NoteShow } />
            <Route path={ '/newnote' } component={ NewNote } />
            <Route path={ '/editnote/:id' } component={ EditNote } />
            <Route path={ '/notes' } component={ NoteCollection } />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { addNotes: (notes) => { dispatch(fetchNotes(notes)) } }
}

export default connect(null, mapDispatchToProps)(App);
