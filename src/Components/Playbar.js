import React, {Component} from 'react' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setSongInfo} from '../redux/songsReducer'
import axios from 'axios' 

class Playbar extends Component{

    constructor(props){
        super(props)

        this.state = {
            artst: '',
            title: '',
            file: '',
            image: '',
            isPlaying: false,
            song: []
        }
    }


    getSong = () => {
        axios.get(`/api/song/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    artist: response.data.artist_name,
                    title: response.data.title,
                    file: response.data.file,
                    image: response.data.image
                })
            })
    }

    render(){
        // console.log(this.response.data.image)
        return(
            <footer>
                <div className='playbar-song-info'>
                    <div className='playbar-song-img'>
                        <img src={this.props.song.image}/>
                    </div>
                    <div className='playbar-artist-title'>
                        <p className='playbar-artist'>{this.props.song.artist_name}</p>
                        <p className='playbar-title'>{this.props.song.title}</p>
                    </div>
                </div>
                <div className='playbar-buttons'>
                    <img src='https://cdn3.iconfinder.com/data/icons/line/36/rewind-512.png' className='previous' height='25px' />
                    <img src='https://image.flaticon.com/icons/svg/483/483054.svg' className='play' height='25px' />
                    <img src='https://cdn3.iconfinder.com/data/icons/line/36/fastforward-512.png' className='next' height='25px' />
                </div>
                <div className='playbar-volume'>
                    <img/>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = reduxState => {
    
    return {
        user: reduxState.reducer,
        song: reduxState.songsReducer,
        artist: reduxState.artistReducer
    }};

export default withRouter(connect(mapStateToProps, {setSongInfo})(Playbar));