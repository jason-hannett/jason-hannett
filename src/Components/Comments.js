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
        comment: '',
        isEditing: false
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
    .then(response => {
      this.props.getComments()
    })
  }

  updateComment = () => {
    console.log('update button pressed')
    console.log(this.props.comment.id)
    console.log(this.props.comment.comment)
    const {id} = this.props.comment
    const {comment} = this.state
    axios.put(`/api/update-comment/${id}`, {comment: comment})
    .then(response => {
      console.log(response.data)
      this.editToggle()
      this.props.getComments()
    })
  }

  editToggle = () => {
    console.log('edit button pressed')
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  inputHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

  

  render(){
    // console.log(this.props)
    console.log(this.state.comment)
  return (
                        <div className='comment-info'>
                            <p>{this.props.comment.username}:</p>
                            {this.state.isEditing ? null : 
                            <p className='comment'>{this.props.comment.comment}</p>}
                            {this.props.user.username === this.props.comment.username ? (
                             <div className='comment-buttons'>
                               {this.state.isEditing ? (
                                 <>
                                 <input className='edit-comment-input'
                                        value={this.state.comment}
                                        name='comment'
                                        onChange={this.inputHandler} />
                                 <button onClick={this.updateComment}>save</button>
                                 <button onClick={this.editToggle} className='comment-delete'>cancel</button>
                                 </>
                               ): (
                               <>
                               <button className='comment-edit-button' onClick={this.editToggle}>edit</button>
                               <img onClick={this.deleteComment} className='comment-delete' src='https://www.freeiconspng.com/uploads/trash-can-icon-21.png' height='17px'/>
                                </>)}
                            </div>)
                          :(
                            null
                          )}
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
