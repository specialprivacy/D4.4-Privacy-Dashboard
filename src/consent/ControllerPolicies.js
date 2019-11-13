import React, {Component} from 'react';
import {Card, CardHeader, CardText, List, ListItem, Toggle} from "material-ui";
import Divider from "material-ui/Divider";
import {generateRandomKey} from "../AppContainer";

import Extension from 'material-ui/svg-icons/action/extension';
import Assignment from 'material-ui/svg-icons/action/assessment';
import {event2text} from "../VocabLabelsGenerator";
import muiThemeable from "material-ui/styles/muiThemeable";

var primaryColor = "";
var accentColor = "";
class ControllerPolicies extends Component {
  constructor(props) {
    super(props);
    primaryColor = props.muiTheme.palette.primary1Color;
    accentColor = props.muiTheme.palette.accent1Color;
  }

  render() {
    return (
      <div style={{marginTop: "20px"}}>
        {
          this.props.getPolicies().map((a) => {
            let policySummary = a.links.policies.reduce((result, current) => {
              current.data = current.dataCollection;
              current.purpose = current.purposeCollection;
              current.processing = current.processingCollection;
              current.storage = current.storageCollection;
              current.recipient = current.recipientCollection;

              for (let key of ["data", "purpose", "processing", "storage", "recipient"]) {
                if (result[key].indexOf(current[key]) === -1) {
                  result[key].push(current[key]);
                }
              }
              return result;
            }, {
              data: [],
              purpose: [],
              processing: [],
              storage: [],
              recipient: []
            });

            return (
              <Card
                key={generateRandomKey()}
                expandable={true}
                initiallyExpanded={false}
                style={{marginTop: "20px"}}>
                <div style={{height: "42px", padding: "10px", backgroundColor: accentColor, color: "white"}}>
                  {<span>Policies of {a.name}</span>}
                </div>
                <CardHeader
                  subtitle={<span>There are {a.links.policies.length} policies for this application. <br /> Application code: {a.id}.</span>}
                  actAsExpander={true}
                  showExpandableButton={true}
                  avatar={<Extension style={{color: primaryColor}}/>}
                />
                <CardText expandable={false} style={{paddingLeft: "55px", paddingRight: "75px", fontSize: "12pt"}}>
                  <div>{event2text(policySummary, "policy")}</div>
                </CardText>
                <CardText expandable={true}>
                  <List>
                    {
                      a.links.policies.map(function(e) {
                        e.data = e.dataCollection;
                        e.purpose = e.purposeCollection;
                        e.processing = e.processingCollection;
                        e.storage = e.storageCollection;
                        e.recipient = e.recipientCollection;

                        return (
                          <div key={generateRandomKey()}>
                            <Divider/>
                            <ListItem
                              leftIcon={<Assignment style={{fill: primaryColor}}/>}
                              rightToggle={<Toggle/>}
                              secondaryText={<p>You gave consent to this policy.</p>}
                            >
                                <span key={generateRandomKey()}>
                                  <p><b>Description:</b> { e.explanation }</p>
                                  <hr />
                                  <p>{ event2text(e, "policy") }</p>
                                  <hr />
                                </span>
                            </ListItem>
                          </div>
                        )
                      })
                    }
                  </List>
                </CardText>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

export default muiThemeable()(ControllerPolicies);