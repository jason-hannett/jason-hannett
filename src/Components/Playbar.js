import React, {Component} from 'react' 

class Playbar extends Component{

    constructor(props){
        super(props)

        this.state = {
            artistName: '',
            songTitle: '',
            file: '',
            isPlaying: false,
            songs: []
        }
    }

    render(){
        return(
            <footer>
                <div className='playbar-song-info'></div>
                <div className='playbar-buttons'></div>
                <div className='playbar-volume'></div>
            </footer>
        )
    }
}

export default Playbar;