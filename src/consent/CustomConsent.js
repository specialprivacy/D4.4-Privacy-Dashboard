import React, {Component} from 'react';
import {Card, CardHeader, CardText, Checkbox, Divider, List, ListItem, RaisedButton, Subheader} from "material-ui";
import theme from "../data/controller.json";
import "./PricingTable.css"

class CustomConsent extends Component {

  state = {
    credit: 0,
    checkedFeatures: []
  };

  updateCredit = (credit, label, event, isInputChecked) => {
    if (isInputChecked) {
      if (this.state.checkedFeatures.indexOf(label) === -1) {
        this.setState({
          checkedFeatures: this.state.checkedFeatures.concat([label]),
          credit: this.state.credit + credit
        });
        this.forceUpdate();
      }
    } else {
      var index = this.state.checkedFeatures.indexOf(label);
      if (index !== -1) {
        this.state.checkedFeatures.splice(index, 1);
        this.setState({
          checkedFeatures: this.state.checkedFeatures,
          credit: this.state.credit - credit
        });
        this.forceUpdate();
      }
    }
  };

  render() {
    const self = this;

    return (
      <div>
        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-md-4 col-md-offset-2">
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>
              <CardHeader
                textStyle={{padding: 0}}
                style={{background: theme.palette.accent1Color}}
                title={<h2 style={{color: "white"}}>Data disclosure</h2>}
              />
              <CardText style={{padding: 0}}>
                <List style={{margin: 0, padding: 0}}>
                  <Subheader>Personal data processing</Subheader>
                  {
                    theme.consentsV2.controllerFeatures.map(function (e) {
                      return (
                        <div key={e.label}>
                          <ListItem
                            primaryText={e.label}
                            secondaryText={<span>+{e.credit} points</span>}
                            rightIcon={<Checkbox
                              onCheck={self.updateCredit.bind(null, e.credit, e.label)}
                            />}
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

          <div className="col-md-4">
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>
              <CardHeader
                textStyle={{padding: 0}}
                style={{background: theme.palette.avatarColor}}
                title={<h2 style={{color: "white"}}>Functionality</h2>}
              />
              <CardText style={{padding: 0}}>
                <div className="credit-score">
                  <h1>{this.state.credit}</h1>
                </div>
                <List style={{margin: 0, padding: 0}}>
                  <Subheader>Features</Subheader>
                  {
                    // TODO: if checkbox is checked don't disable it, that's all
                    theme.consentsV2.userFeatures.map(function (e) {
                      return (
                        <div key={e.label}>
                          <ListItem
                            primaryText={e.label}
                            secondaryText={<span>-{e.price} points</span>}
                            rightIcon={<Checkbox
                              ref={e.label}
                              disabled={self.state.checkedFeatures.indexOf(e.label) === -1 && self.state.credit - e.price < 0}
                              onCheck={self.updateCredit.bind(null, -e.price, e.label)}
                            />}
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
          <div className="col-md-3 col-md-offset-7" style={{textAlign: "right"}}>
            <RaisedButton label="Apply" primary={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomConsent;