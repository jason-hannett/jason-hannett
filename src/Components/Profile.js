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
            profilePic: '',
            username: '',
            bio: '',
            likes: []
        
        }
    }

    componentDidMount(){
        axios.get(`/api/all-liked-songs/${this.props.user.id}`)
        .then(response => {
            this.setState({likes: response.data})
        })
    }

    // componentWillMount(){
    //     this.props.user.username = this.props.song.username ?
    //     axios.get()
    // }

    viewLikes = (props) => {
        this.props.history.push('/likes')
    }

    render(){
        console.log(this.props)
        // const likedSongs = this.state.likes.map((element, index) => {
        //     return <Player key={`liked: ${index}`} likedSong={element}/>
        // })
        return(
            <div>
                <div className='profile-background'>
                    <div className='profile-info-container'>
                        <img src={this.props.user.profile_pic} className='profile-profile-img'/>
                        <h2 className='profile-username'>{this.props.user.username}</h2>
                        <div className='profile-bio-container'>
                            <input className='profile-bio-input' placeholder='bio'/>
                        </div>
                        <p className='profile-view-likes-button' onClick={this.viewLikes}>view all</p>
                        <div className='likes-container'>
                            {/* {likedSongs} */}
                        </div>   
                    </div>
                    <div className='profile-songs-container'></div>
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