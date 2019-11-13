import React, {Component} from 'react';
import {Card, CardHeader, CardText, Divider, List, ListItem, RaisedButton, Subheader} from "material-ui";
import ActionDone from "material-ui/svg-icons/action/done";
import NavigationCancel from "material-ui/svg-icons/navigation/cancel";
import ActionHelp from "material-ui/svg-icons/action/help";
import theme from "../data/controller.json";
import "./PricingTable.css"

class PricingTable extends Component {

  state = {};

  render() {
    var scoreOne, scoreTwo, scoreThree;
    var creditOne = scoreOne = 100;
    var creditTwo = scoreTwo = 700;
    var creditThree = scoreThree = 1700;

    return (
      <div className="row" style={{marginTop: "20px"}}>
        <div className="col-md-2 col-md-offset-3">
          <Card style={{padding: 0}}>
            <CardHeader
              textStyle={{padding: 0}}
              style={{background: theme.palette.avatarColor}}
              title={<h2 style={{color: "white"}}>Less data disclosure /<br /> basic functionality</h2>}
            />
            <CardText style={{padding: 0}}>
              <List style={{margin: 0, padding: 0}}>
                <Subheader>Features</Subheader>
                {
                  theme.consentsV2.userFeatures.map(function (e) {
                    creditOne -= e.price;
                    var icon = (creditOne < 0) ? <NavigationCancel className="feature-not-available-icon"/> :
                      <ActionDone className="feature-available-icon"/>;

                    return (
                      <div key={e.label}>
                        <ListItem className={(creditOne < 0) ? "hide-feature" : ""} primaryText={e.label} rightIcon={icon}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
                <Subheader>Personal data processing</Subheader>
                {
                  theme.consentsV2.controllerFeatures.map(function (e) {
                    scoreOne -= e.credit;
                    var icon = (scoreOne < 0) ? <NavigationCancel className="feature-not-available-icon"/> :
                      <ActionDone className="feature-available-icon"/>;

                    return (
                      <div key={e.label}>
                        <ListItem className={(scoreOne < 0) ? "hide-feature" : ""} primaryText={e.label} rightIcon={icon}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
              </List>
            </CardText>
            <CardText style={{textAlign: "center"}}>
              <RaisedButton
                label="Apply"
                primary={true}
              />
            </CardText>
          </Card>
        </div>
        <div className="col-md-2">
          <Card style={{padding: 0}}>
            <CardHeader
              textStyle={{padding: 0}}
              style={{background: theme.palette.cardHeader1Color}}
              title={<h2 style={{color: "white"}}>More data disclosure /<br /> advanced functionality</h2>}
            />
            <CardText style={{padding: 0}}>
              <List style={{margin: 0, padding: 0}}>
                <Subheader>Features</Subheader>
                {
                  theme.consentsV2.userFeatures.map(function (e) {
                    creditTwo -= e.price;
                    var icon = (creditTwo < 0) ? <NavigationCancel className="feature-not-available-icon"/> :
                      <ActionDone className="feature-available-icon"/>;

                    return (
                      <div key={e.label}>
                        <ListItem className={(creditTwo < 0) ? "hide-feature" : ""} primaryText={e.label} rightIcon={icon}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
                <Subheader>Personal data processing</Subheader>
                {
                  theme.consentsV2.controllerFeatures.map(function (e) {
                    scoreTwo -= e.credit;
                    var icon = (scoreTwo < 0) ? <NavigationCancel className="feature-not-available-icon"/> :
                      <ActionDone className="feature-available-icon"/>;

                    return (
                      <div key={e.label}>
                        <ListItem className={(scoreTwo < 0) ? "hide-feature" : ""} primaryText={e.label} rightIcon={icon}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
              </List>
            </CardText>
            <CardText style={{textAlign: "center"}}>
              <RaisedButton
                label="Apply"
                primary={true}
              />
            </CardText>
          </Card>
        </div>
        <div className="col-md-2">
          <Card style={{padding: 0}}>
            <CardHeader
              textStyle={{padding: 0}}
              style={{background: theme.palette.accent1Color}}
              title={<h2 style={{color: "white"}}>Most data disclosure /<br /> maximum functionality</h2>}
            />
            <CardText style={{padding: 0}}>
              <List style={{margin: 0, padding: 0}}>
                <Subheader>Features</Subheader>
                {
                  theme.consentsV2.userFeatures.map(function (e) {
                    creditThree -= e.price;
                    var icon = (creditThree < 0) ? <NavigationCancel className="feature-not-available-icon"/> :
                      <ActionDone className="feature-available-icon"/>;

                    return (
                      <div key={e.label}>
                        <ListItem className={(creditThree < 0) ? "hide-feature" : ""} primaryText={e.label} rightIcon={icon}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
                <Subheader>Personal data processing</Subheader>
                {
                  theme.consentsV2.controllerFeatures.map(function (e) {
                    scoreThree -= e.credit;
                    var icon = (scoreThree < 0) ? <NavigationCancel className="feature-not-available-icon"/> :
                      <ActionDone className="feature-available-icon"/>;

                    return (
                      <div key={e.label}>
                        <ListItem className={(scoreThree < 0) ? "hide-feature" : ""} primaryText={e.label} rightIcon={icon}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
              </List>
            </CardText>
            <CardText style={{textAlign: "center"}}>
              <RaisedButton
                label="Apply"
                primary={true}
              />
            </CardText>
          </Card>
        </div>

        <div className="col-md-2"
             style={{cursor: "pointer"}}
             onClick={() => {window.location.hash = "custom-consent";}}
        >
          <Card id="custom-consent" style={{padding: 0}}>
            <CardHeader
              textStyle={{padding: 0}}
              style={{background: "grey"}}
              title={<h2 style={{color: "white"}}>Custom disclosure /<br /> and functionality</h2>}
            />
            <CardText style={{padding: 0}}>
              <List style={{margin: 0, padding: 0}}>
                <Subheader>Features</Subheader>
                {
                  theme.consentsV2.userFeatures.map(function (e) {
                    return (
                      <div key={e.label}>
                        <ListItem primaryText={e.label} rightIcon={<ActionHelp/>} disabled={true}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
                <Subheader>Personal data processing</Subheader>
                {
                  theme.consentsV2.controllerFeatures.map(function (e) {
                    return (
                      <div key={e.label}>
                        <ListItem primaryText={e.label} rightIcon={<ActionHelp/>} disabled={true}/>
                        <Divider/>
                      </div>
                    );
                  })
                }
              </List>
            </CardText>
            <CardText style={{textAlign: "center"}}>
              <RaisedButton
                label="Apply"
                primary={true}
              />
            </CardText>
          </Card>
        </div>

      </div>
    );
  }

}

export default PricingTable;