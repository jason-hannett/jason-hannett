import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
// import AudioPlayer from "react-h5-audio-player";
import {connect} from 'react-redux'
import {getLikedSongs} from '../redux/likesReducer'
import {setSongInfo} from '../redux/songsReducer'
import {postComment} from '../redux/commentsReducer'
import axios from 'axios'



class Comments extends Component {

  constructor(props){
    super(props)

    this.state = {
        comment: ''
    }
  }

  // inputHandler = (event) => {
  //   this.setState({
  //       [event.target.name]: event.target.value
  //   })

  deleteComment = () => {
    console.log('delete button')
    console.log(this.props.comment.id)
    const {id} = this.props.comment
    axios.delete(`/api/delete-comment/${id}`)
  }

  render(){
    console.log(this.props)
  return (
                        <div className='comment-info'>
                            <p>{this.props.comment.username}:</p>
                            <p className='comment'>{this.props.comment.comment}</p>
                            <button onClick={this.deleteComment} className='comment-delete'>delete</button>
                        </div>
  );
  }
}

const mapStateToProps = reduxState => {
  return {
      user: reduxState.reducer,
      comments: reduxState.commentsReducer

  }
}

export default withRouter(connect(mapStateToProps, {setSongInfo, postComment})(Comments));
