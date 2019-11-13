import React, {Component} from 'react';
import {Card, CardHeader, CardText, Checkbox, Divider, List, ListItem, RaisedButton, Subheader} from "material-ui";
import "../consent/PricingTable.css"

class ThankYou extends Component {

  render() {
    const self = this;

    return (
      <div>
        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-md-12">
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>
              <CardHeader
                textStyle={{padding: 0}}
                style={{background: "YellowGreen"}}
                title={<h2 style={{color: "white"}}>Thank you for participating!</h2>}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default ThankYou;