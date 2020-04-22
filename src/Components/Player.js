import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
// import AudioPlayer from "react-h5-audio-player";
import {connect} from 'react-redux'
import {getLikedSongs} from '../redux/likesReducer'
import {setSongInfo} from '../redux/songsReducer'
import {postComment} from '../redux/commentsReducer'
import Comments from './Comments'
import axios from 'axios'



class Player extends Component {

  constructor(props){
    super(props)

    this.state = {
        comment: '',
        userComments: [],
        isLiked: false
    }
  }

  componentDidMount(){
  this.getComments()
  }

  getComments = () => {
    const {song_id} = this.props.song
    axios.get(`/api/comments/${song_id}`)
    .then(response => {
      this.setState({userComments: response.data})
    })
  }

   likeSong = () => {
      const {song_id} = this.props.song
      axios.post(`/api/like-song/${song_id}`)
      .then(response => {
          this.props.getLikedSongs()
          this.likeToggle()
      })
    }

    unlikeSong = () => {
      console.log('unlike')
      const {song_id} = this.props.song
      axios.delete(`api/unlike/${song_id}`)
      .then(response => {
        // this.props.history.push('/likes')
      })
    }

    likeToggle = () => {
      console.log('like button pressed')
      this.setState({
        isLiked: !this.state.isLiked
      })
    }



  commentHandler = () => {
    const {comment} = this.state
    const {song_id} = this.props.song
    axios.post(`/api/comment/${song_id}`, {comment})
    .then(response => {
      const {comment} = response.data
      this.props.postComment(comment)
      this.getComments()
    })
  }

  inputHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

  render(){
    console.log(this.props.likes)
    const allComments = this.state.userComments.map((element, index) => {
      return <Comments key={index} comment={element} getComments={this.getComments}/>
    })
  return (
    <div className="Player">
        <div className='player-container'>
            <img src={this.props.song.image} className='song-art' alt='song-art'/>
                <img className='play-button' src='https://www.pngfind.com/pngs/m/427-4277341_add-play-button-to-image-online-overlay-play.png' height='8px' className='play-button'/>
            <div className='song-info-container'>
                <p onClick={() => this.props.history.push(`/song/${this.props.song.song_id}`)} className='song-info-title'>{this.props.song.title}</p>
                <Link to='/profile'><p className='song-info-artist'>{this.props.song.artist_name}</p></Link>
            </div>
            <div className='player-date-container'>
                <p>{this.props.song.date}</p>
            </div>
            <div className='player-song-time'>
                <audio>{this.props.song.file}</audio>   
            </div>
            <div className='player-interact-container'>
                {this.state.isLiked ? 
                (<><img className='player-input-button' src='https://pngimg.com/uploads/like/like_PNG73.png' height='20px'/></>) 
                : (<button onClick={this.likeSong} className='player-like-button'>like</button> )}
                <input onChange={this.inputHandler} 
                       className='player-input' 
                       name='comment' 
                       value={this.state.comment} 
                       placeholder='comment'></input>
                <button onClick={this.commentHandler} className='player-submit-button'>submit</button>
            </div>

            </div>
            <div className='comments-container'>
              {allComments}
          </div>
   </div>
  );
  }
}

const mapStateToProps = reduxState => {
  return {
      user: reduxState.reducer,
      likes: reduxState.likesReducer,
      comments: reduxState.commentsReducer

  }
}

export default withRouter(connect(mapStateToProps, {getLikedSongs, setSongInfo, postComment})(Player));
