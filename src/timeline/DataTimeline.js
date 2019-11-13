import React, {Component} from 'react';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import IconButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardHeader, CardText, List, ListItem} from "material-ui";
import {generateRandomKey} from "../AppContainer";

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import PanTool from 'material-ui/svg-icons/action/pan-tool';

import Account from 'material-ui/svg-icons/action/account-circle';
import Admin from 'material-ui/svg-icons/action/face';
import AnyContact from 'material-ui/svg-icons/communication/contacts';
import Arts from 'material-ui/svg-icons/av/fiber-smart-record';
import AuxPurpose from 'material-ui/svg-icons/action/extension';
import Browsing from 'material-ui/svg-icons/av/web';
import Charity from 'material-ui/svg-icons/action/favorite';
import Communicate from 'material-ui/svg-icons/action/record-voice-over';
import Current from 'material-ui/svg-icons/action/offline-pin';
import Custom from 'material-ui/svg-icons/action/accessibility';
import Delivery from 'material-ui/svg-icons/action/card-giftcard';
import Develop from 'material-ui/svg-icons/device/developer-mode';
import Downloads from 'material-ui/svg-icons/file/cloud-download';
import Education from 'material-ui/svg-icons/maps/layers';
import Feedback from 'material-ui/svg-icons/action/feedback';
import Finmgt from 'material-ui/svg-icons/action/fingerprint';
import Gambling from 'material-ui/svg-icons/maps/local-atm';
import Gaming from 'material-ui/svg-icons/hardware/videogame-asset';
import Government from 'material-ui/svg-icons/communication/business';
import Health from 'material-ui/svg-icons/image/healing';
import Historical from 'material-ui/svg-icons/action/history';
import Login from 'material-ui/svg-icons/action/https';
import Marketing from 'material-ui/svg-icons/action/info';
import News from 'material-ui/svg-icons/action/chrome-reader-mode';
import OtherContact from 'material-ui/svg-icons/action/assignment-ind';
import Payment from 'material-ui/svg-icons/editor/attach-money';
import Sales from 'material-ui/svg-icons/action/receipt';
import Search from 'material-ui/svg-icons/action/search';
import State from 'material-ui/svg-icons/action/assessment';
import Tailoring from 'material-ui/svg-icons/action/build';
import Telemarketing from 'material-ui/svg-icons/hardware/tv';

import muiThemeable from 'material-ui/styles/muiThemeable';
import {event2text, getLabel} from "../VocabLabelsGenerator";

var iconColor;
var cardHeaderStyle;
var moreMenuStyle = {position: "absolute", top: "12px", right: "12px"};
var moreButtonStyle = {minWidth: "auto", height: "auto", lineHeight: "auto"};
var menuOrigin = {horizontal: 'right', vertical: 'top'};

var purposeIcons;

class DataTimeline extends Component {
  constructor(props) {
    super(props);
    iconColor = props.muiTheme.palette.primary1Color;
    cardHeaderStyle = {
      backgroundColor: props.muiTheme.palette.accent1Color,
      fontFamily: props.muiTheme.fontFamily,
      color: "white",
      fontSize: "12pt",
      fontWeight: "bold"
    };

    purposeIcons = {
      "Account": <Account color={iconColor}/>,
      "Admin": <Admin color={iconColor}/>,
      "AnyContact": <AnyContact color={iconColor}/>,
      "Arts": <Arts color={iconColor}/>,
      "AuxPurpose": <AuxPurpose color={iconColor}/>,
      "Browsing": <Browsing color={iconColor}/>,
      "Charity": <Charity color={iconColor}/>,
      "Communicate": <Communicate color={iconColor}/>,
      "Current": <Current color={iconColor}/>,
      "Custom": <Custom color={iconColor}/>,
      "Delivery": <Delivery color={iconColor}/>,
      "Develop": <Develop color={iconColor}/>,
      "Downloads": <Downloads color={iconColor}/>,
      "Education": <Education color={iconColor}/>,
      "Feedback": <Feedback color={iconColor}/>,
      "Finmgt": <Finmgt color={iconColor}/>,
      "Gambling": <Gambling color={iconColor}/>,
      "Gaming": <Gaming color={iconColor}/>,
      "Government": <Government color={iconColor}/>,
      "Health": <Health color={iconColor}/>,
      "Historical": <Historical color={iconColor}/>,
      "Login": <Login color={iconColor}/>,
      "Marketing": <Marketing color={iconColor}/>,
      "News": <News color={iconColor}/>,
      "OtherContact": <OtherContact color={iconColor}/>,
      "Payment": <Payment color={iconColor}/>,
      "Sales": <Sales color={iconColor}/>,
      "Search": <Search color={iconColor}/>,
      "State": <State color={iconColor}/>,
      "Tailoring": <Tailoring color={iconColor}/>,
      "Telemarketing": <Telemarketing color={iconColor}/>,
    };
  }

  state = {
    text: "",
  };

  generateIconMenu = (self, elem) => {
    return <IconMenu
      iconButtonElement={<IconButton style={moreButtonStyle}><MoreVertIcon style={{color: "grey"}}/></IconButton>}
      style={moreMenuStyle}
      targetOrigin={menuOrigin}
      anchorOrigin={menuOrigin}
    >
      <MenuItem primaryText={
        <div>
          <b>Purpose:</b><br/>
          {elem.purpose.split("#")[1]}
        </div>}
      />
      <Divider/>
      <MenuItem leftIcon={<PanTool/>}>Withdraw consent</MenuItem>
      <MenuItem leftIcon={<ContentCreate/>}>Rectify</MenuItem>
      <MenuItem leftIcon={<ContentClear/>}>Erase</MenuItem>
    </IconMenu>;
  };

  render() {
    const self = this;

    if (this.props.data.length === 0) {
      return (
        <div style={{textAlign: "center"}}><CircularProgress size={60} thickness={7} /></div>
      );
    } else {
      return (
        <div>
          <Timeline style={{position: "relative", padding: "10px 2px", width: "95%", margin: "0px auto"}}>
            {
              groupBy(this.props.data, function(e) {
                return Math.floor(e.timestamp / (self.props.avgFreq * self.props.avgNumEvents));
              }).map(function (self, chunk) {

                let summary = chunk.values.reduce((result, current) => {
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
                  <TimelineEvent
                    key={generateRandomKey()}
                    title=""
                    createdAt={<span>Data processed on {new Date(chunk.values[0].timestamp).toLocaleDateString()} at {new Date(chunk.values[0].timestamp).toLocaleTimeString()}</span>}
                    icon={purposeIcons[chunk.values[0].purpose.split("#")[1]]}
                    iconColor={iconColor}
                    cardHeaderStyle={cardHeaderStyle}
                    container="card">
                    <div>
                      <CardText style={{fontSize: "12pt"}}>{event2text(summary)}</CardText>
                    </div>
                    <div>
                      {
                        groupBy(chunk.values, self.props.groupByKey)
                          .map((groups) => groups.values)
                          .map(function(groups) {
                            var title = getLabel(groups[0][self.props.groupByKey], true);
                            let groupsSummary = groups.reduce((result, current) => {
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
                                style={{marginTop: "10px"}}>
                                <CardHeader
                                  title={<span>{self.props.groupByKey.charAt(0).toLocaleUpperCase() + self.props.groupByKey.slice(1) + ": " + title}</span>}
                                  subtitle={<span>{event2text(groupsSummary)}</span>}
                                  actAsExpander={true}
                                  showExpandableButton={true}
                                  avatar={purposeIcons[groups[0].purpose.split("#")[1]]}/>
                                <CardText expandable={true}>
                                  <List>
                                    {
                                      groups.map(function(e) {
                                        return (
                                          <div key={generateRandomKey()}>
                                            <Divider/>
                                            <ListItem
                                              leftIcon={purposeIcons[e.purpose.split("#")[1]]}
                                              secondaryText={<p><b>Processed on {new Date(e.timestamp).toLocaleDateString()} at {new Date(e.timestamp).toLocaleTimeString()}</b></p>}
                                              rightIconButton={self.generateIconMenu(self, e)}>
                                            <span key={generateRandomKey()}>
                                              <p><b>Process:</b> { e.process }</p>
                                              <p><small>Event code: { e.eventID }</small></p>
                                              <hr />
                                              <p>{ event2text(e) }</p>
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
                  </TimelineEvent>
                );
              }.bind(null, this))
            }
          </Timeline>
          <div style={{textAlign: "center", marginBottom: "20px"}}>
            <RaisedButton
              primary={true}
              label="Load more"
              onClick={this.props.loadMore} />
          </div>
        </div>
      );
    }
  }
}

export default muiThemeable()(DataTimeline);

// https://stackoverflow.com/a/34890276
function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({key: v, values: [x]});
    }
    return rv;
  }, []);
}