import React, {Component} from 'react' 
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setArtistInfo} from '../redux/artistReducer'
import {setSongInfo} from '../redux/songsReducer'
import Player from './Player'
import axios from 'axios'

class Song extends Component{

    constructor(props){
        super(props)

        this.state = {
            song: []
        }
    }

    componentDidMount(){
            axios.get(`/api/song/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    song: response.data
                })
            })
    }

    render(){
        console.log(this.state.song)
        const song = this.state.song.map((element, index) => {
            return <Player key={`singleSong: ${index}`} song={element}/>
        })
        return(
            <div>
                <div className='dashboard-background'>
                <div>{song}</div>
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