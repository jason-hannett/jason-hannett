import React, {Component} from 'react' 
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class Nav extends Component{

    constructor(props){
        super(props)

        this.state = {
            search: '',
            profilePic: '',
            username: ''
        }
    }

     logout = (props) => {
        axios.get('/api/logout')
        .then(() => {
          //Clear user info on state or reduxState
          this.props.history.push('/')
        })
      }

    render(){
        return(
            <header className='nav-container'>
                <div className='nav-links'>
                    <img src={'https://images.vexels.com/media/users/3/158737/isolated/preview/3353b3a06bc810221952cccbbb189b47-record-rarity-vinyl-illustration-by-vexels.png'} height='50px' alt='logo'/>
                    <Link to='/dashboard'><h2>Dashboard</h2></Link>
                    <Link to='upload'><h2>Upload</h2></Link>
                </div>
                <div className='search-container'>
                    <input placeholder='search'/>
                    <button>search</button>
                </div>
                <div className='nav-profile-info'>
                    <div className='nav-profile-img'>
                        <img src={this.state.profilePic} alt='profile'/>
                    </div>
                    <div className='nav-username'>
                    <Link to='/profile'><h3>username{this.state.username}</h3></Link>
                    </div>
                </div>
                <button onClick={this.logout}className='logout-button'>Logout</button>
            </header>
        )
    }

}

export default withRouter(Nav);