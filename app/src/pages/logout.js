import React from 'react'
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Background from '../chained_background.jpg'
import '../App.css';
import {connect} from 'react-redux'
const styles = {
  background: {
    flexGrow: 1,
    height: '100vh',
    background: 'no-repeat 20% 60%',
    backgroundImage: `url(${Background})`,
    zIndex: '-99'
  },
}

class Logout extends React.Component {

  logout() {
    this
      .props
      .auth
      .logout(this.props)
  }

  render() {
    return (
      <div style={styles.background}>
        <Button
          className="animated infinite pulse"
          style={{
          position: 'absolute',
          top: '50%',
          height: '25%',
          width:'100%',
          margin:'auto',
          fontSize: '28px'
        }}
        disableRipple='true'
          color="contrast"
          onClick={this
            .logout
            .bind(this)}>
            Log Out
        </Button>
      </div>
    )
  }
}


const connector = connect(state => state)
export default connector(Logout)