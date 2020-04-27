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
                 <div className='dashboard-background'>
                     {this.state.likes.length === 0 
                    ? 
                     <h2 className='no-likes'>You haven't liked any songs!</h2>
                    :
                    <div>{likedSongs}</div>}
                </div>   
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