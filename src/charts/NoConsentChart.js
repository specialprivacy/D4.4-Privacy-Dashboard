import React, {Component} from 'react';
import {muiThemeable} from "material-ui/styles";

import { ResponsivePie } from '@nivo/pie'
import {
  Card,
  CardText,
} from "material-ui";
import {updateInterval} from "../AppContainer";

class NoConsentChart extends Component {

  state = {
    hasConsent: []
  };

  componentDidMount() {
    setTimeout(this.update, updateInterval);
  }

  update = () => {
    setTimeout(this.update, updateInterval);

    var hasConsent = Object.entries(this.props.getStatistics().hasConsent);
    hasConsent = hasConsent.map((elem) => {
      var obj = {};
      obj.id = (elem[0] === "true") ? "Yes" : "No";
      obj.label = (elem[0] === "true") ? "Yes" : "No";
      obj.value = elem[1].count;
      return obj;
    });
    var total = hasConsent.reduce((a, b) => { return a + b.value; }, 0);
    hasConsent.map((elem) => {
      elem.value = Number.parseFloat(((elem.value / total) * 100).toFixed(2));
      return elem;
    });

    this.setState({hasConsent: hasConsent});
  };


  render() {
    return (
      <Card>
        <CardText>
          <div className="row">
            <div className="col-md-12">
              <h2>Was consent given? Are there other legal bases?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2" style={{height: "300px"}}>
              <ResponsivePie
                data={this.state.hasConsent}
                innerRadius={0.4}
                padAngle={3}
                cornerRadius={5}
                borderWidth={1}
                sliceLabel={(elem) => elem.value + "%"}
                label={(elem) => elem.label}
                borderColor="inherit:darker(0.2)"
                colors="set3"
                radialLabelsLinkDiagonalLength={8}
                radialLabelsLinkHorizontalLength={8}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                margin={{
                  "top": 15,
                  "right": 15,
                  "bottom": 15,
                  "left": 15
                }}
              />
            </div>
          </div>
        </CardText>
      </Card>
    );
  }

}

export default muiThemeable()(NoConsentChart);