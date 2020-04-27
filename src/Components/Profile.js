import React, {Component} from 'react' 
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getLikedSongs} from '../redux/likesReducer'
import {setArtistInfo} from '../redux/artistReducer'
import {setSongInfo} from '../redux/songsReducer'
import Player from './Player'
import Likes from './Likes'
import axios from 'axios'


class Profile extends Component{

    constructor(props){
        super(props)

        this.state = {
            profile_pic: '',
            username: '',
            bio: '',
            likes: [],
            songs: [],
            isEditing: false
        
        }
    }

    componentDidMount(){
        this.getUserSongs()
    }

    getUserSongs = () => {
        const {id} = this.props.user
        axios.get(`/api/user-songs/${id}`)
        .then(response => {
            this.setState({songs: response.data})
        })
    }

    viewLikes = (props) => {
        this.props.history.push('/likes')
    }

    udpateUser = () => {
        const {id} = this.props.user
        const {profile_pic, bio} = this.state
        axios.put(`/api/update-user/${id}`, {profile_pic: profile_pic, bio: bio})
        .then(response => {
            this.editToggle()
        })
    }


    editToggle = () => {
        this.setState({isEditing: !this.state.isEditing})
    }
    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        console.log(this.props)
        // const likedSongs = this.state.likes.map((element, index) => {
        //     return <Player key={`liked: ${index}`} likedSong={element}/>
        // })
        const userSongs = this.state.songs.map((element, index) => {
            return <Player key={`userSongs: ${index}`} song={element} getUserSongs={this.getUserSongs}/>
        })
        return(
            <div>
                <div className='profile-background'>
                    <div className='profile-info-container'>
                        {this.state.isEditing
                         ? 
                        <>
                            <img src={this.props.user.profile_pic} className='profile-profile-img'/>
                            <input
                                    value={this.state.profile_pic}
                                    name='profile_pic' 
                                    onChange={this.inputHandler}
                                    className='edit-profile-pic'/>
                        </>
                        :
                        <>
                            <img onClick={this.editToggle} src={this.props.user.profile_pic} className='profile-profile-img'/>
                            <h2 className='profile-username'>{this.props.user.username}</h2>
                        </>}
                        <div className='profile-bio-container'>
                            {this.state.isEditing ? 
                            <>
                                <input 
                                    className='profile-bio-input' 
                                    placeholder={this.props.user.bio}
                                    value={this.state.bio}
                                    name='bio' 
                                    onChange={this.inputHandler}/> 
                            </>
                            : 
                            <div onClick={this.editToggle} className='profile-bio-container'>
                                <p className='profile-bio-text'>{this.props.user.bio}</p>
                            </div>
                            }
                        </div> 
                        <div>
                            {this.state.isEditing ?
                            <>
                                <button 
                                        className='profile-edit-save' 
                                        onClick={this.udpateUser}>Save Changes</button>
                                <button 
                                        className='profile-edit-cancel' 
                                        onClick={this.editToggle}>Cancel</button>
                            </>
                            : null}
                        </div> 
                    </div>
                        <div className='profile-songs-container'>
                            {this.state.songs.length === 0 ? 
                            <>
                            <h2 id='no-songs'color='black'>You haven't uploaded any Songs!</h2>
                            </>
                            :
                            <>
                            {userSongs}
                            </>}
                        </div>
                    <div className='profile-right-container'></div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    
    return {
        artist: reduxState.artistReducer,
        songs: reduxState.songsReducer,
        user: reduxState.reducer,
        likes: reduxState.likesReducer
    }};

export default withRouter(connect(mapStateToProps, {setArtistInfo, setSongInfo, getLikedSongs})(Profile));