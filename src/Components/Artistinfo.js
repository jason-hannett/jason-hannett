import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {setArtistInfo} from '../redux/artistReducer'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Artistinfo extends Component{

    constructor(props){
        super(props)

        this.state = {
            artist_name: '',
            profile_pic: '',
            age: undefined
        }
    }

    artistHandler = () => {
        const {artist_name, profile_pic, age} = this.state 
        const {id} = this.props.user
        axios.post('/api/new-artist', {id, artist_name, profile_pic, age})
        .then(response => {
            const {artist_id, artist_name, profile_pic, age} = response.data
            this.props.setArtistInfo(artist_id, artist_name, profile_pic, age)
            this.props.history.push('/dashboard')
        })
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        // console.log(this.props)
        return(
            <div className='auth-background'>
                <div className='artist-info-container'>
                    <h2 className='artist-info-header'>Artist Info</h2>
                    <div className='artist-input-container'>
                    <input 
                            value={this.state.artist_name}
                            name='artist_name'
                            onChange={(event) => this.inputHandler(event)}
                            placeholder='Artist name'
                            className='login-input-2'/>
                    <input 
                        value={this.state.profile_pic}
                        name='profile_pic'
                        onChange={(event) => this.inputHandler(event)}
                        placeholder='Profile picture'
                        className='login-input-1'/>
                    <input 
                        value={this.state.age}
                        name='age'
                        onChange={(event) => this.inputHandler(event)}
                        placeholder='Age'
                        className='login-input-1'/>
                    </div>       
                    <button className='login-button' onClick={this.artistHandler}>Submit</button>
                </div>
           </div> 
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.reducer
    }};

export default connect(mapStateToProps, {setArtistInfo})(withRouter(Artistinfo))