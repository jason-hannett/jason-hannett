import React, {Component} from 'react' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setArtistInfo} from '../redux/artistReducer'
import {setSongInfo} from '../redux/songsReducer'
import {getLikedSongs} from '../redux/likesReducer'
import Player from './Player'
import axios from 'axios'

class Likes extends Component{

    constructor(props){
        super(props)

        this.state = {
            likes: []
        }
    }

    componentDidMount(){
        this.getAllLikes()
    }

    getAllLikes = () => {
        axios.get(`/api/all-liked-songs/${this.props.user.id}`)
        .then(response => {
            this.setState({likes: response.data})
        })
    }


    render(){
       console.log(this.props)
    //    console.log(this.state.songs)
        const likedSongs = this.state.likes.map((element, index) => {
            return <Player key={`like: ${index}`} song={element} getAllLikes={this.getAllLikes}/>
        })
        return(
            <div className='auth-background'>
                {this.props.location.pathname === '/likes' 
                ?(
                 <div className='dashboard-background'>
                    <div>{likedSongs}</div>
                </div>
                ):(
                <div className='profile-info-container'>
                        <div className='liked-songs-container'>
                            <img height='45px' className='liked-song-img'/>
                            <div className='liked-song-info'>
                                 <p className='liked-artist-name'>{this.props.likedSong.title}</p> 
                                <p className='liked-song-title'>title</p>
                            </div>
                        </div>
                </div>)}
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    
    return {
        artist: reduxState.artistReducer,
        songs: reduxState.songsReducer,
        likes: reduxState.likesReducer,
        user: reduxState.reducer
    }};

export default withRouter(connect(mapStateToProps, {setArtistInfo, setSongInfo, getLikedSongs})(Likes));