import React from 'react';
import { Link } from 'react-router-dom'

const usersAPI = `http://localhost:3001/users`

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    loginUser = (e) => {
        e.preventDefault()
        // Send the user info to the backend
        fetch(usersAPI)
            .then(resp => resp.json())
            .then(user => {
                // Redirect to /notes path
                this.props.history.push(`/notes`)
            })
    }

    render() {
        return (
            <div className={`app`}>
                <form onSubmit={ this.loginUser }>
                    <input onChange={ this.state.handleChange } type='text' value={ this.state.username } placeholder='Enter a Username' />
                    <br />
                    <input className='Card-button' type='submit' />
                </form>
            </div>
        )
    }
}

export default Login
