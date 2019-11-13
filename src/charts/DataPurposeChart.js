import React, {Component} from 'react';
import {muiThemeable} from "material-ui/styles";
import {getLabel} from "../VocabLabelsGenerator";

import { ResponsivePie } from '@nivo/pie'
import {
  Card,
  CardText,
  Table, TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn
} from "material-ui";
import {generateRandomKey, updateInterval} from "../AppContainer";

class DataPurposeChart extends Component {

  state = {
    purpose: [
      {
        "id": "",
        "label": "",
        "value": 100,
      }
    ],
    data: []
  };

  componentDidMount() {
    setTimeout(this.update, updateInterval);
  }

  update = () => {
    setTimeout(this.update, updateInterval);

    var data = Object.entries(this.props.getStatistics().data);
    data.sort((a, b) => a[1].count - b[1].count);
    data = data.map((elem) => {
      var obj = {};
      obj.dataCategory = elem[0];
      obj.value = elem[1].count;
      return obj;
    });
    var dataTotal = data.reduce((a, b) => {
      return a + b.value
    }, 0);
    data = data.reverse().slice(0, 5);
    data.map((elem) => {
      elem.percentage = ((elem.value / dataTotal) * 100).toFixed(2) + "%";
      return elem;
    });

    var purpose = Object.entries(this.props.getStatistics().purpose);
    purpose = purpose.map((elem) => {
      var obj = {};
      obj.id = getLabel(elem[0], true);
      obj.label = obj.id;
      obj.key = elem[0];
      obj.value = elem[1].count;
      return obj;
    });
    var total = purpose.reduce((a, b) => { return a + b.value; }, 0);
    purpose.map((elem) => {
      elem.value = Number.parseFloat(((elem.value / total) * 100).toFixed(2));
      return elem;
    });

    this.setState({data: data, purpose: purpose});
  };


  render() {
    return (
      <Card>
        <CardText>
          <div className="row">
            <div className="col-md-12">
              <h2>What data is processed and for what purposes?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Table style={{marginBottom: "0px"}} onRowSelection={(rowNumber) => this.props.openDetails("data", this.state.data[rowNumber[0]].dataCategory)}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={{width: "75%"}}>Data category</TableHeaderColumn>
                    <TableHeaderColumn>%</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows={true}>
                  {
                    this.state.data.map((elem) => {
                      return (
                        <TableRow key={generateRandomKey()}>
                          <TableRowColumn style={{width: "75%", cursor: "pointer"}}>{getLabel(elem.dataCategory, true) + " data"}</TableRowColumn>
                          <TableRowColumn>{elem.percentage}</TableRowColumn>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </div>
            <div className="col-md-6" style={{height: "300px"}}>
              <ResponsivePie
                data={this.state.purpose}
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
                onClick={(node, e) => this.props.openDetails("purpose", node.key)}
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

export default muiThemeable()(DataPurposeChart);