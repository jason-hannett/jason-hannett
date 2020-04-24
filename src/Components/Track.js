import React, {Component} from 'react' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setSongInfo} from '../redux/songsReducer'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import { v4 as randomString } from 'uuid'
import axios from 'axios'

class Track extends Component{

    constructor(props){
        super(props)

        this.state = {
            title: '',
            image: '',
            file: '',
            description: '',
            isUploading: false,
            genre: [],
            url: 'http://via.placeholder.com/450x450'
        }
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${this.props.song.title.randomString()}-${file.name.replace(/\s/g, '-')}`;
    
        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        axios.get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
            const { signedRequest, url } = response.data;
            this.uploadFile(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
      };

      uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios.put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, url });
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    

    addSong = () => {
        console.log('button pressed')
        const {id} = this.props.user
        axios.post('/api/new-song', {...this.state, id})
        .then(response => {
            const {title, image, file, description, genre} = response.data
            this.props.setSongInfo(title, image, file, description, genre)
            this.props.history.goBack()
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
        const { url, isUploading } = this.state;
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
                            {/* <input 
                                    value={this.state.file}
                                    name='file'
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder='File'
                                    className='login-input-1'/>
                                                      */}
                                   <> 
                                        <Dropzone
                                                    onDropAccepted={this.getSignedRequest}
                                                    style={{
                                                        position: 'relative',
                                                        width: 50,
                                                        height: 50,
                                                        borderWidth: 3,
                                                        marginTop: 10,
                                                        borderColor: 'rgb(102, 102, 102)',
                                                        borderStyle: 'dashed',
                                                        borderRadius: 5,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        fontSize: 10,
                                                    }}
                                                    accept="image/*"
                                                    multiple={false}
                                                    >
                                                    {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
                                            </Dropzone>
                                    </>                      
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