import React, {Component} from 'react';
import {Card, CardHeader, CardText, Checkbox, Divider, List, ListItem, RaisedButton, Subheader} from "material-ui";
import "../consent/PricingTable.css"

const permissions = [
  "Cookies",
  "Facebook friends",
  "Location",
  "Browser history",
];

const features = [
  "Personalization of movie suggestions",
  "HD streaming",
  "Stream on 2 devices",
  "Downloading videos on phone",
];
class BadflixConsent extends Component {

  state = {
    credit: 0,
    checkedFeatures: []
  };

  updateCredit = (index, event, isInputChecked) => {
    if (isInputChecked) {
      if (this.state.checkedFeatures.indexOf(index) === -1) {
        this.setState({checkedFeatures: this.state.checkedFeatures.concat([index])});
      }
    } else {
      var i = this.state.checkedFeatures.indexOf(index);
      this.state.checkedFeatures.splice(i, 1);
      this.setState({checkedFeatures: this.state.checkedFeatures});
    }
    this.forceUpdate();
  };

  render() {
    const self = this;

    return (
      <div>

        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-md-12">
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>
              <CardHeader
                textStyle={{padding: 0}}
                style={{background: "green"}}
                title={<h2 style={{color: "white"}}>We would love to give you following features:</h2>}
              />
              <CardText style={{padding: 0}}>
                <List style={{margin: 0, padding: 0}}>
                  <Subheader>Features</Subheader>
                  {
                    features.map(function (e) {
                      return (
                        <div key={e}>
                          <ListItem
                            primaryText={e}
                          />
                          <Divider/>
                        </div>
                      );
                    })
                  }
                </List>
              </CardText>
            </Card>
          </div>
        </div>

        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-md-12">
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>
              <CardHeader
                textStyle={{padding: 0}}
                style={{background: "YellowGreen"}}
                title={<h2 style={{color: "white"}}>Please give us access to following data to unlock extra features:</h2>}
              />
              <CardText style={{padding: 0}}>
                <List style={{margin: 0, padding: 0}}>
                  <Subheader>Data</Subheader>
                  {
                    permissions.map(function (e) {
                      return (
                        <div key={e}>
                          <ListItem
                            primaryText={e}
                          />
                          <Divider/>
                        </div>
                      );
                    })
                  }
                </List>
              </CardText>
            </Card>
          </div>
        </div>

        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-md-12" style={{textAlign: "right"}}>
            <RaisedButton label="Cancel" primary={false} style={{marginRight: "20px"}}/>
            <RaisedButton label="Agree" primary={true} onClick={() => window.location.hash = "#thank-you"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BadflixConsent;