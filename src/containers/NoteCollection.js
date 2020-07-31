import React, { Component } from 'react';
import Note from '../components/NoteCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class NoteCollection extends Component {
    render() {
        console.log(this.props)
        return (
            <>
            <div className="navbar">
                <Link to={'/newnote'} className="Card-button" type="button"> New Note </Link>
            </div>
            <div className="Note-list">
                {
                    this.props.notes.map(noteObj => {
                        return <Note key={ noteObj.id } note={ noteObj } />
                    })
                }
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { notes: state.notes }
}

export default connect(mapStateToProps)(NoteCollection)
