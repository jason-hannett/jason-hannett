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
            <div className='auth-background'>
                <div className='login-container'>
                        <h2 id='login-header'>Upload</h2>
                        <img id='upload-logo' src={'https://images.vexels.com/media/users/3/158737/isolated/preview/3353b3a06bc810221952cccbbb189b47-record-rarity-vinyl-illustration-by-vexels.png'} height='90px' alt='logo'/>
                        <div className='upload-input-container'>
                            <img src={this.state.image} height='100px'/>
                            <input 
                                    value={this.state.title}
                                    name='title'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='title'
                                    type='Title'
                                    className='login-input-2'/>                         
                            <input 
                                    value={this.state.image}
                                    name='image'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='Image'
                                    className='login-input-1'/>
                            <input 
                                    value={this.state.file}
                                    name='file'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='File'
                                    className='login-input-1'/>                         
                            <input 
                                    value={this.state.description}
                                    name='description'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='Description'
                                    className='login-input-1'/>                         
                        </div>        
                        <button className='login-button' onClick={this.addSong}>Upload</button> 
                        <button className='login-button' onClick={this.goBack}>Cancel</button> 
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