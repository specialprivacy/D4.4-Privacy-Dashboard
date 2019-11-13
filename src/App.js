import React, {Component} from 'react';
import './styles/App.css';
import DataTimelineContainer from './timeline/DataTimelineContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import getMuiTheme from "material-ui/styles/getMuiTheme";
// import specialTheme from "./themes/youShopTheme"
import specialTheme from "./themes/specialTheme"
// import tlabsTheme from "./themes/tlabsTheme"
// import proximusTheme from "./themes/proximusTheme"
// import reutersTheme from "./themes/reutersTheme"
import {Card, CardText, Tab, Tabs} from "material-ui";
import ControllerInfo from "./sidebar/ControllerInfo";
// import NoConsentChart from "./charts/NoConsentChart";
import ControllerPolicies from "./consent/ControllerPolicies";
import FrontPage from "./FrontPage";
// import BadflixConsent from "./StudentProjects/BadflixConsent";
// import BadflixConsentV2 from "./StudentProjects/BadflixConsentV2";
// import ThankYou from "./StudentProjects/ThankYou";


class App extends Component {

  state = {
    switch: false,
  };

  componentDidMount() {
    const self = this;

    window.onhashchange = function () {
      self.forceUpdate();
    };
  }

  triggerPolicyRequest = () => {
    this.setState({switch: !this.state.switch});
  };

  render() {
    /*
    var content = <BadflixConsent/>;
    if (window.location.hash === "#v2") {
      content = <BadflixConsentV2/>
    } else if (window.location.hash === "#thank-you") {
      content = <ThankYou/>;
    }
    */

    var theme = specialTheme;
    /*
    var queryString = (new URL(window.location.href)).searchParams.get("theme");
    if (queryString === "proximus") {
      theme = proximusTheme;
    } else if (queryString === "tlabs") {
      theme = tlabsTheme;
    } else if (queryString === "reuters") {
      theme = reutersTheme;
    }
    */

    const iconMenu = <div>
      <IconMenu
        iconButtonElement={<IconButton iconStyle={{color: "white"}}><MoreVertIcon/></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem leftIcon={<AccountCircle/>}>My profile</MenuItem>
        <MenuItem leftIcon={<Settings/>}>Settings</MenuItem>
        <MenuItem leftIcon={<DirectionsRun/>}>Logout</MenuItem>
      </IconMenu>
    </div>;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>

          <div className="background-container" style={{borderBottom: "10px solid " + theme.palette.primary1Color}}>
            <div className="background-image" style={{background: "url(" + theme.backgroundImage + ")"}}/>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 col-sm-12 col-sm-offset-0">

                <div className="row">
                  <div className="col-md-12">
                    <AppBar
                      title="SPECIAL Privacy Settings"
                      showMenuIconButton={false}
                      style={{display: "flex"}}
                      iconElementRight={iconMenu}
                    />
                  </div>
                </div>

                {/*content*/}

                <div className="row">
                  <div className="col-md-12">
                    <Card>
                      <CardText>
                        <ControllerInfo/>
                      </CardText>
                    </Card>
                  </div>
                </div>

                <div className="row" style={{marginTop: "20px"}}>
                  <div className="col-md-12">
                    <Tabs>

                      <Tab label="General Information">
                        <FrontPage
                          getStatistics={this.props.getStatistics}
                          getDimensions={this.props.getDimensions}
                        />
                      </Tab>

                      <Tab label="Timeline">
                        <DataTimelineContainer
                          controls={this.state.controls}
                          toggleChecked={this.toggleChecked}
                          readBuffer={this.props.readBuffer}
                          getStepArr={this.props.getStepArr}
                        />
                      </Tab>

                      <Tab label="Policies" onActive={this.triggerPolicyRequest}>
                        <ControllerPolicies
                          getPolicies={this.props.getPolicies}
                          switch={this.state.switch}
                        />
                      </Tab>

                    </Tabs>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;