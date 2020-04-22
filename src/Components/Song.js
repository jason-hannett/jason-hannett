import React, {Component} from 'react' 
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setArtistInfo} from '../redux/artistReducer'
import {setSongInfo} from '../redux/songsReducer'
import Player from './Player'
import Comments from './Comments'
import axios from 'axios'

class Song extends Component{

    constructor(props){
        super(props)

        this.state = {
            song: [],
            userComments: []
        }
    }

    componentDidMount(){
        this.getSong()
    }

    getSong = () => {
        axios.get(`/api/song/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    song: response.data
                })
            })
    }

    render(){
        console.log(this.props)
        const song = this.state.song.map((element, index) => {
            return <Player key={`singleSong: ${index}`} song={element} getSong={this.getSong}/>
        })
        const allComments = this.state.userComments.map((element, index) => {
            return <Comments key={index} comment={element} getComments={this.getComments}/>
          })
        return(
            <div className='auth-background'>
                <div className='dashboard-background'>
                <div>{song}</div>
                <div className='comments-container'>{allComments}</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    
    return {
        artist: reduxState.artistReducer,
        songs: reduxState.songsReducer
    }};

export default withRouter(connect(mapStateToProps, {setArtistInfo, setSongInfo})(Song));