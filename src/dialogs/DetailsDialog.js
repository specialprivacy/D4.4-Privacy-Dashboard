import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import {ResponsivePie} from "@nivo/pie";
import {getLabel} from "../VocabLabelsGenerator";
import {generateRandomKey, updateInterval} from "../AppContainer";
import NavigationClose from "material-ui/svg-icons/navigation/close"

class DetailsDialog extends Component {

  state = {
    inputData: {}
  };

  componentDidMount() {
    this.update();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(nextState.inputData.data).length > 0;
  }

  update = () => {
    setTimeout(this.update, updateInterval);

    // TODO: fix this
    this.setState({inputData: this.props.getDimensions(this.props.selectedType, this.props.selectedQuery)})
  };

  render() {
    if (this.props.selectedType === "" || this.props.selectedQuery === "") {
      return (
        <div></div>
      );
    }

    var data = this.state.inputData;
    data = Object.entries(data).map((e) => {
      return e;
    });

    var labelType = this.props.selectedType.charAt(0).toLocaleUpperCase() + this.props.selectedType.slice(1);
    var labelQuery = getLabel(this.props.selectedQuery);
    labelQuery = labelQuery.charAt(0).toLocaleUpperCase() + labelQuery.slice(1);

    return(
      <Dialog
        title={
          <div>
            <span>{labelType + ": " + labelQuery}</span>
            <span style={{float: "right"}}>
              <IconButton
                onClick={this.props.closeDetails}
                style={{padding: "0px"}}
              >
                <NavigationClose/>
              </IconButton>
            </span>
          </div>
        }
        open={this.props.open}
        onRequestClose={this.props.closeDetails}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={true}
      >
        {
          data.filter((e) => {
            return !(e[0] === "hasConsent" || e[0] === this.props.selectedType)
          }).map((e) => {
            var total = this.state.inputData[this.props.selectedType][this.props.selectedQuery].count;
            var statistics = Object.entries(e[1]).map((value) => {
              var percentage = Number.parseFloat(((value[1].count / total) * 100).toFixed(2));

              if (e[0] === "process") {
                return {
                  id: value[0],
                  label: value[0],
                  value: percentage,
                };
              } else {
                return {
                  id: getLabel(value[0], true),
                  label: getLabel(value[0], true),
                  value: percentage,
                };
              }
            });

            return (
              <div key={generateRandomKey()}>
                <div className="row" style={{marginBottom: "40px"}}>
                  <h3 style={{paddingLeft: "15px", paddingRight: "35px", fontWeight: "400"}}>
                    {e[0].charAt(0).toLocaleUpperCase() + e[0].slice(1) + ((e[0] === "process") ? "es" : "")} related to {getLabel(this.props.selectedQuery) + " " + this.props.selectedType}
                  </h3>
                  <Divider/>
                  <div className="col-md-12" style={{height: "300px"}}>
                    <ResponsivePie
                      data={statistics}
                      innerRadius={0.4}
                      padAngle={3}
                      cornerRadius={5}
                      borderWidth={1}
                      sliceLabel={(elem) => elem.value + "%"}
                      label={(elem) => getLabel(elem.label, true)}
                      borderColor="inherit:darker(0.2)"
                      colors="set3"
                      radialLabelsLinkDiagonalLength={8}
                      radialLabelsLinkHorizontalLength={8}
                      radialLabelsLinkStrokeWidth={1}
                      radialLabelsLinkColor="inherit"
                      margin={{
                        "top": 45,
                        "right": 15,
                        "bottom": 15,
                        "left": 45
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        }
      </Dialog>
    );
  }

}

export default DetailsDialog;