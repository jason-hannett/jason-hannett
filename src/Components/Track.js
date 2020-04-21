import React, {Component} from 'react' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setSongInfo} from '../redux/songsReducer'
import axios from 'axios'

class Track extends Component{

    constructor(props){
        super(props)

        this.state = {
            title: '',
            image: '',
            file: '',
            description: '',
            genre: []
        }
    }

    addSong = () => {
        console.log('button pressed')
        const {id} = this.props.user
        axios.post('/api/new-song', {...this.state, id})
        .then(response => {
            const {title, image, file, description, genre} = response.data
            this.props.setSongInfo(title, image, file, description, genre)
            this.props.history.push('/dashboard')
            })  
        }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    goBack = (props) => {
        this.props.history.goBack()
    }

    render(){
        // console.log(this.state)
        return(
            <div>
                Track
                <div className='upload-container'>
                        <h2>Upload</h2>
                        <div className='upload-input-container'>
                            <img src={this.state.image} height='100px'/>
                            <input 
                                    value={this.state.title}
                                    name='title'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='title'
                                    type='Title'/>                         
                            <input 
                                    value={this.state.image}
                                    name='image'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='Image'/>
                            <input 
                                    value={this.state.file}
                                    name='file'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='File'/>                         
                            <input 
                                    value={this.state.description}
                                    name='description'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='Description'/>                         
                        </div>        
                        <button onClick={this.goBack}>Cancel</button> 
                        <button onClick={this.addSong}>Upload</button> 
                    </div>
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.reducer
    }
}

export default connect(mapStateToProps, {setSongInfo})(withRouter(Track));