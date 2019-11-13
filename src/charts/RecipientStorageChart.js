import React, {Component} from 'react';
import {muiThemeable} from "material-ui/styles";

import { ResponsivePie } from '@nivo/pie'
import {
  Card,
  CardText,
  Table, TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn
} from "material-ui";
import {getLabel} from "../VocabLabelsGenerator";
import {updateInterval} from "../AppContainer";

class RecipientStorageChart extends Component {

  state = {
    recipient: [],
    storage: []
  };

  componentDidMount() {
    setTimeout(this.update, updateInterval);
  }

  update = () => {
    setTimeout(this.update, updateInterval);

    var data = Object.entries(this.props.getStatistics().recipient);
    data.sort((a, b) => a[1].count - b[1].count);
    data = data.map((elem) => {
      var obj = {};
      obj.recipient = getLabel(elem[0], true);
      obj.key = elem[0];
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

    var storage = Object.entries(this.props.getStatistics().storage);
    storage = storage.map((elem) => {
      var obj = {};
      obj.id = getLabel(elem[0], true);
      obj.label = obj.id;
      obj.key = elem[0];
      obj.value = elem[1].count;
      return obj;
    });
    var total = storage.reduce((a, b) => { return a + b.value; }, 0);
    storage.map((elem) => {
      elem.value = Number.parseFloat(((elem.value / total) * 100).toFixed(2));
      return elem;
    });

    this.setState({recipient: data, storage: storage});
  };


  render() {
    return (
      <Card>
        <CardText>
          <div className="row">
            <div className="col-md-12">
              <h2>Where is data stored? With whom was it shared?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" style={{height: "300px"}}>
              <ResponsivePie
                data={this.state.storage}
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
                onClick={(node, e) => this.props.openDetails("storage", node.key)}
                margin={{
                  "top": 15,
                  "right": 15,
                  "bottom": 15,
                  "left": 15
                }}
              />
            </div>
            <div className="col-md-6">
              <Table onRowSelection={(rowNumber) => this.props.openDetails("recipient", this.state.recipient[rowNumber[0]].key)}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={{width: "75%"}}>Data recipients</TableHeaderColumn>
                    <TableHeaderColumn>%</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows={true}>
                  {
                    this.state.recipient.map((elem) => {
                      const self = this;

                      return (
                        <TableRow key={self.state.recipient.indexOf(elem) + 1}>
                          <TableRowColumn style={{width: "75%", cursor: "pointer"}}>{elem.recipient}</TableRowColumn>
                          <TableRowColumn>{elem.percentage}</TableRowColumn>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }

}

export default muiThemeable()(RecipientStorageChart);