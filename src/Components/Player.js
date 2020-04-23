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
        isLiked: false,
        title: '',
        image: '',
        description: '',
        isEditing: false,
        isPlaying: false
    }
  }


  togglePlay = () => {
    this.setState({isPlaying: !this.state.isPlaying})
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
      const {id} = this.props.song
      axios.delete(`api/unlike/${id}`)
      .then(response => {
        this.props.getAllLikes()
      })
    }

    likeToggle = () => {
      console.log('like button pressed')
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    editToggle = () => {
      console.log('like button pressed')
      this.setState({
        isEditing: !this.state.isEditing
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

  updateSong = () => {
    console.log('update button pressed')
    console.log(this.props.song)
    const {song_id} = this.props.song
    const {title, image, description} = this.state
    axios.put(`/api/update-song/${song_id}`, {title: title, image: image, description: description})
    .then(response => {
      console.log(response.data)
      this.props.history.push(`/song/${this.props.song.song_id}`)
      this.props.getSong()
      this.getComments()
    })
  }

  inputHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

profile = () => {
  this.props.history.push(`/profile/${this.props.user.id}`)
}

deleteSong = () => {
  const {song_id} = this.props.song
  console.log('delete')
  console.log(this.props.song.song_id)
  axios.delete(`/api/delete-song/${song_id}`)
  .then(() => {
    {this.props.location.pathname === '/dashboard' ? 
    this.props.getAllSongs() : this.props.getUserSongs()}
  })
}



  render(){
    console.log(this.props)
    const allComments = this.state.userComments.map((element, index) => {
      return <Comments key={index} comment={element} getComments={this.getComments}/>
    })
  return (
    <div>
      {this.props.location.pathname === `/edit-song/${this.props.song.song_id}` ?
        <div className='edit-player-container'>
          <div className='edit-left-container'>
           <div className='edit-player-image'>
            <img src={this.state.image} height='100px'/>
          </div>
           </div> 
        <div className='edit-player-song-info'>
            <input 
                  className='edit-song-title'
                  onChange={this.inputHandler}
                  value={this.state.title}
                  name='title' 
                  placeholder={this.props.song.title}/>
            <input className='edit-song-image'
                  onChange={this.inputHandler}
                  value={this.state.image}
                  name='image' 
                  placeholder='image'/>
            <input className='edit-description'
                  onChange={this.inputHandler}
                  value={this.state.description}
                  name='description' 
                  placeholder={this.props.song.description}/>
          <div>
            <button className='edit-button' onClick={this.updateSong}>save changes</button>
          </div>
        </div>
      </div>
   
      :
    <div className="Player">
        <div className='player-container'>
            <img src={this.props.song.image} className='song-art' alt='song-art'/>
                <img onClick={this.togglePlay} className='play-button' src='https://image.flaticon.com/icons/svg/483/483054.svg' height='8px' className='play-button'/>
            <div className='song-info-container'>
                <p onClick={() => this.props.history.push(`/song/${this.props.song.song_id}`)} className='song-info-title'>{this.props.song.title}</p>
                <p onClick={this.profile}className='song-info-artist'>{this.props.song.artist_name}</p>
            </div>
            <div className='player-date-container'>
              {this.props.user.username === this.props.song.username ? <> <button onClick={() => this.props.history.push(`/edit-song/${this.props.song.song_id}`)}>edit</button> 
              <img className='player-delete-song' onClick={this.deleteSong} src='https://www.freeiconspng.com/uploads/trash-can-icon-21.png' height='15px'/></> : null}
                <p>{this.props.song.date}</p>
            </div>
            <div className='player-song-time'>
                <audio>{this.props.song.file}</audio>   
            </div>
            <div className='player-interact-container'>
                {this.state.isLiked || this.props.location.pathname === '/likes' ? 
                (<><img onClick={this.unlikeSong} className='player-input-button' src='https://pngimg.com/uploads/like/like_PNG73.png' height='20px'/></>) 
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
   }
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
