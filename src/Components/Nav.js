import React, {Component} from 'react' 
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {logoutUser} from '../redux/reducer';
import axios from 'axios'

class Nav extends Component{

    constructor(props){
        super(props)

        this.state = {
            search: '',
            profile_pic: '',
            username: ''
        }
    }

     logout = (props) => {
        axios.get('/api/logout')
        .then(() => {
          this.props.logoutUser();
          this.props.history.push('/')
        })
      }

      toProfile = (props) => {
          this.props.history.push(`/profile/${this.props.user.id}`)
      }

      toLikes = () => {
          this.props.history.push('/likes')
      }

    render(){
        console.log(this.props.user)
        return(
            <header className='nav-container'>
                    <div className='nav-logo'>
                        <img className='nav-logo-img' src={'https://images.vexels.com/media/users/3/158737/isolated/preview/3353b3a06bc810221952cccbbb189b47-record-rarity-vinyl-illustration-by-vexels.png'} height='30px' alt='logo'/>
                        <h2 className='nav-header-name'>Jack</h2>
                    </div>
                <div className='nav-links'>
                    <Link to='/dashboard'><button className='nav-dashboard'>Dashboard</button></Link>
                    <Link to='upload'><button className='nav-upload'>Upload</button></Link>
                </div>
                <div className='search-container'>
                    <input className='nav-search' placeholder='search'/>
                    <img className='nav-search-button' src='https://img.icons8.com/ios/500/search--v1.png' height='20px'/>
                </div>
                <div className='nav-profile-info'>
                    <div className='nav-profile-img'>
                        <img src={this.props.user.profile_pic} height='30px' alt='profile'/>
                    </div>
                    <div className='nav-username'>
                    <h3 onClick={this.toProfile}>{this.props.user.username}</h3>
                    <div className='nav-like-container'>
                        <button onClick={this.toLikes} className='nav-like-button'>Likes</button>
                    </div>
                    </div>
                </div>
                <button onClick={this.logout}className='logout-button'>Logout</button>
            </header>
        )
    }

}

const mapStateToProps = reduxState => {
    
    return {
        user: reduxState.reducer
    }};

export default withRouter(connect(mapStateToProps, {logoutUser})(Nav));