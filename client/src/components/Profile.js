import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import '../styles/Profile.css'
import AvatarImage from './AvatarImage.js';

const datePickerStyle = {
  backgroundColor: '#FFF',
  width: '120px'
}

const buttonStyle = {
  marginTop: '10px',
  display: 'flex'
}

// const editProfileButtonStyle = {
//   width: '120px',
//   paddingTop: '5px'
// }

const raiseButtonStyle = {
  height: '25px',
  fontSize: '12px',
  marginBottom: '0',
  position: 'absolute',
  right: '100px',
  top: '0'
}

const img = require('../images/avatar.png')

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const {user} = this.props
    const userInfo = {
      firstName: user.first_name ? user.first_name : 'First Name',
      lastName: user.last_name ? user.last_name : 'Last Name',
      userName: user.display_name ? user.display_name : 'Username',
      dOfB: user.dob ? user.dob : 'Date of Birth',
      height: user.height_cm ? user.height_cm : 'Height',
      weight: user.weight_kg ? user.weight_kg : 'Weight',
      img: user.avatar ? user.avatar : img,
      userId: user.user_id
    }

    return (
        <div className="profileContainer">
          <h1 className="profile"> Profile </h1>
          <div className="inputFields">
            <div className="topContainer">
                <div className="topLeftContainer">
                  <TextField
                    floatingLabelText={userInfo.firstName}
                    style={{marginRight: '30px', width: '120px'}}
                    disabled
                  /> <br />
                  <TextField
                    floatingLabelText={userInfo.lastName}
                    style={{marginRight: '30px', width: '130%'}}
                    disabled
                  /><br />
                  <TextField
                    floatingLabelText={userInfo.userName}
                    style={{marginRight: '30px', width: '130%'}}
                    disabled
                  /><br />
                </div>

                <div className="topRightContainer">
                  <List className="avatarContainer">
                    <ListItem
                      disabled={true}
                      rightAvatar={
                        <Avatar size={130} icon={<AvatarImage img={userInfo.img} />} />
                      }
                    />
                  </List>
                  {/* <RaisedButton
                      label="Edit Profile"
                      primary={false}
                      backgroundColor='#EE773E'
                      labelColor='#fff'
                      buttonStyle={editProfileButtonStyle}
                      style={raiseButtonStyle}
                  /> */}
                </div>
            </div>

            <div className="bottomContainer">
            <TextField
            floatingLabelText={userInfo.dOfB}
            style={{marginRight: '30px', width: '97%'}}
            disabled
          /> <br />
              <div className="height">
              <TextField
                floatingLabelText={userInfo.height}
                style={{marginRight: '30px', width: '97%'}}
                disabled
              />
              <span className="suffix">cm</span>
              </div>
              <div className="weight">
                <TextField
                  floatingLabelText={userInfo.weight}
                  style={{marginRight: '30px', width: '97%'}}
                  disabled
                />
                <span className="suffix">kg</span>
              </div>
              <br />
            </div>
          </div>

          <RaisedButton
              label="Start New Workout"
              primary={false}
              backgroundColor='#EE773E'
              labelColor='#fff'
              style={buttonStyle}
              href={`/users/${userInfo.userId}/sessions/pick/new`}
          />
          <RaisedButton
              label="View Workout History"
              primary={false}
              backgroundColor='#EE773E'
              labelColor='#fff'
              style={buttonStyle}
              href={`/users/${userInfo.userId}/sessions`}
          />
      </div>
    )
  }
}
export default Profile
