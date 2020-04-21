import React, {Component} from 'react' 
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUserInfo} from '../redux/reducer.js'
import axios from 'axios'

class Auth extends Component{

    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            profile_pic: ''
        }
    }

    register = () => {
        axios.post('/api/register', this.state)
        .then(response => {
            console.log(response.data)
            const {id, username, profile_pic} = response.data
            this.props.setUserInfo(id, username, profile_pic)
            this.props.history.push('/yes-no')
        })
        .catch(err => console.log(err))
    }

    login = () => {
        const {username, password} = this.state
        axios.post('/api/login', {username, password})
        .then(response => {
            console.log(response.data)
            const {id, username, profile_pic} = response.data
            this.props.setUserInfo(id, username, profile_pic)
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err))
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className='auth-background'>
                {this.props.location.pathname === '/' 
                ? 
                (  <div className='login-container'>
                        <h2 id='login-header'>Login</h2>
                        <img id='login-logo' src={'https://images.vexels.com/media/users/3/158737/isolated/preview/3353b3a06bc810221952cccbbb189b47-record-rarity-vinyl-illustration-by-vexels.png'} height='90px'alt='logo'/>
                        <div className='login-input-container'>
                            <input 
                                    value={this.state.username}
                                    name='username'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='username'
                                    className='login-input-2'/>
                            <input 
                                    value={this.state.password}
                                    name='password'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='password'
                                    type='password'
                                    className='login-input-1'/>
                         </div>       
                        <button className='login-button' onClick={this.login}>login</button>
                        <p className='login-text'>Don't have an account? <Link to='/register'><span>Register here.</span></Link></p>
                   </div> 
                ):(
                    <div className='register-container'>
                        <h2 id='register-header'>Register</h2>
                        <img id='login-logo' src={'https://images.vexels.com/media/users/3/158737/isolated/preview/3353b3a06bc810221952cccbbb189b47-record-rarity-vinyl-illustration-by-vexels.png'} height='90px' alt='logo'/>
                        <div className='register-input-container'>
                            <input 
                                    value={this.state.username}
                                    name='username'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='Username'
                                    className='login-input-2'/>
                            <input 
                                    value={this.state.password}
                                    name='password'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='password'
                                    type='Password'
                                    className='login-input-1'/>                        
                            <input 
                                    value={this.state.profile_pic}
                                    name='profile_pic'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='Profile picture'
                                    className='login-input-1'/>                        
                        </div>        
                        <button className='login-button' onClick={this.register}>Register</button> 
                       <Link to='/'><p>back</p></Link> 
                    </div>
                )}
            </div>
        )
    }

}

export default connect(null, {setUserInfo})(withRouter(Auth))