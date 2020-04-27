import React, {Component} from 'react' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setArtistInfo} from '../redux/artistReducer'
import {setSongInfo} from '../redux/songsReducer'
import Player from './Player'
import Playbar from './Playbar'
import axios from 'axios'

class Dashboard extends Component{

    constructor(props){
        super(props)

        this.state = {
            songs: []
        }
    }

    componentDidMount(){
        this.getAllSongs()
    }

    getAllSongs = () => {
        axios.get('/api/all-songs')
        .then(response => {
            this.setState({songs: response.data})
        })
    }

    render(){
        console.log(this.props)
        const allSongs = this.state.songs.map((element, index) => {
            return <Player key={`song: ${index}`} song={element} getAllSongs={this.getAllSongs}/>
        })
        return(
            <div className='auth-background'>
                <div className='dashboard-background'>
                    {allSongs}
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

export default withRouter(connect(mapStateToProps, {setArtistInfo, setSongInfo})(Dashboard));