import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux'
import {getTx} from '../action-creators/txs'
import {prop, path, compose, last, split} from 'ramda'
import {userify} from '../lib/userify'
import {Link} from "react-router-dom"
import {
  AppBar,
  List,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Toolbar,
  Button,
  IconButton,
  Icon,
  Snackbar
} from 'material-ui'

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  firstButton: {
    marginLeft: -12,
    marginRight: 12
  },
  lastButton: {
    marginLeft: 12,
    marginRight: -12
  }
})

class ReceiptTicket extends React.Component {
  // /profile/user_rcmontgo/ba44400c583b0c952e5a0040a3009130 maybe dispatch to an
  // action creator to pull txs/{id} out of the redux state store
  componentWillMount() {
    const txID = prop('match')(this.props)
      ? path(['match', 'params', 'tx'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)
    console.log("txID=",txID)
    this
      .props
      .getTx(txID)
  }
  render() {

    return (
      <div>
        <AppBar position="static">
        <Toolbar className="flex" color="contrast">
          <Link to={`/profile/${this.props.activeUser.id}`} style={{ textDecoration: 'none', color: 'transparent' }}>
            <IconButton color="inherit">
              <Icon color="accent" style={{ fontSize: 36 }}>
                keyboard_arrow_left
              </Icon>
            </IconButton>
          </Link>
          <Typography color="inherit" className="flex-auto" type="title">
            New Widget Form
          </Typography>
          <Button type="submit" color="inherit">
            Save
          </Button>
        </Toolbar>
      </AppBar>
        <Card >
          <CardContent>
            <Typography type="h2">
              Receipt Ticket
            </Typography>
            <Typography component="h3">
              <b>Sender:
              </b>{`  ${userify(this.props.tx.sender)}`}
            </Typography>
            <Typography component="h3">
              <b>Recipient:
              </b>
              {`  ${userify(this.props.tx.recipient)}`}
            </Typography>
            <Typography type="body1">
              <b>Amount:
              </b>{`  ${this.props.tx.amount}`}
            </Typography>
            <Typography component="p">
              <b>Description:
              </b>{`  ${this.props.tx.description}`}
            </Typography>
            <Typography component="p">
              <b>Date:
              </b>{`  ${this.props.tx.timeStamp}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense>Dispute</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("mapState in receipt")
  return {tx: state.singleTransaction,activeUser: state.activeUser}
}

const mapActionToProps = dispatch => {
  console.log("action fired")
  return {
    getTx: txID => {
      console.log("inside action")
      dispatch(getTx(txID))
    }
  }
}

const connector = connect(mapStateToProps, mapActionToProps)

export default connector(withStyles(styles)(ReceiptTicket));