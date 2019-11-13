import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';

// var color;
var name;
var address;
var website;
var email;
var description;
var logo;

class ControllerInfo extends Component {
  constructor(props) {
    super(props);
    logo = props.muiTheme.logo;
    name = props.muiTheme.name;
    address = props.muiTheme.address;
    website = props.muiTheme.website;
    email = props.muiTheme.email;
    description = props.muiTheme.description;
    // color = props.muiTheme.palette.primary1Color;
  }

  state = {
    policyOpen: false,
  };

  togglePolicy = () => {
    this.setState({policyOpen: !this.state.policyOpen});
  };

  redirect = () => {
    window.location.hash = "#consent";
  };

  emailRedirect = () => {
    window.location = "#";
  };

  render() {
    const leftAlign = {float: "left", width: "auto"};

    return (
      <div className="row">
        <div className="col-md-4 col-xs-4" style={{textAlign: "center", paddingTop: "24px"}}>
          <img className="img-responsive" src={logo} alt=""/>
        </div>
        <div className="col-md-8 col-xs-8">
          <List>
            <div style={{clear: "both"}}>
              <Subheader style={leftAlign}>Name:</Subheader>
              <ListItem primaryText={name} style={leftAlign}/>
            </div>
            <div style={{clear: "both"}}>
              <Subheader style={leftAlign}>Address:</Subheader>
              <ListItem primaryText={<span>{address}</span>} style={leftAlign}/>
            </div>
            <div style={{clear: "both"}}>
              <Subheader style={leftAlign}>Description:</Subheader>
              <ListItem primaryText={description} style={leftAlign}/>
            </div>
            <div style={{clear: "both"}}>
              <Subheader style={leftAlign}>Website:</Subheader>
              <ListItem primaryText={website} style={leftAlign}/>
            </div>
            <div style={{clear: "both"}}>
              <Subheader style={leftAlign}>Email address:</Subheader>
              <ListItem primaryText={email} onClick={this.emailRedirect} style={leftAlign}/>
            </div>
          </List>
        </div>
      </div>
    );
  }

}

export default muiThemeable()(ControllerInfo);