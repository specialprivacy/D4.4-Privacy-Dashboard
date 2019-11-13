import React, {Component} from 'react';
import {muiThemeable} from "material-ui/styles";

import { ResponsiveBar } from '@nivo/bar'
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

const prefix = "http://www.specialprivacy.eu/vocabs/processing#";
const sPrefix = "https://www.specialprivacy.eu/vocabs/processing#";

class ProcessingDataChart extends Component {

  state = {
    processing: [],
    statistics: []
  };

  componentDidMount() {
    // const self = this;
    setTimeout(this.update, updateInterval);
  }

  update = () => {
    setTimeout(this.update, updateInterval);

    var data = Object.entries(this.props.getStatistics().processing);
    data.sort((a, b) => a[1].count - b[1].count);
    data = data.map((elem) => {
      var obj = {};
      obj.processingName = elem[0].split("#")[1];
      obj.key = elem[0];
      obj.value = elem[1].count;
      return obj;
    });
    var dataTotal = data.reduce((a, b) => {
      return a + b.value
    }, 0);
    var reducedData = data.reverse().slice(0, 5);
    reducedData.map((elem) => {
      elem.percentage = ((elem.value / dataTotal) * 100).toFixed(2) + "%";
      return elem;
    });

    const self = this;
    var statistics = [];
    var allKeys = [];
    data.forEach(function(e) {
      var arr = self.props.getDimensions("processing", prefix + e.processingName);
      var obj = {processing: getLabel(prefix + e.processingName, true), key: e.key};

      if (typeof arr.processing[prefix + e.processingName] !== "undefined") {
        obj.total = arr.processing[prefix + e.processingName].count;
      } else if (typeof arr.processing[sPrefix + e.processingName] !== "undefined") {
        obj.total = arr.processing[sPrefix + e.processingName].count;
      } else {
        return;
      }

      Object.entries(arr.data).forEach(function(elem) {
        var key = getLabel(elem[0], true);
        if (allKeys.indexOf(key) === -1){
          allKeys.push(key);
        }
        obj[key] = Number.parseFloat(((elem[1].count / obj.total) * 100).toFixed(2));
      });
      statistics.push(obj);
    });
    statistics.sort((a, b) => { 
      if (b.processing < a.processing) {
        return -1;
      }
      if (b.processing > a.processing) {
        return 1;
      }
      return 0;
    });
    statistics = statistics.map(function (obj) {
      for (var i=0; i < allKeys.length; i++) {
        if (!obj.hasOwnProperty(allKeys[i])) {
          obj[allKeys[i]] = 0;
        }
      }
      return obj;
    });
    this.setState({processing: reducedData, statistics: statistics.reverse()});
  };

  render() {
    return (
      <Card>
        <CardText>
          <div className="row">
            <div className="col-md-12">
              <h2>What kind of processing took place? Which data was used?</h2>
            </div>
          </div>
          <div className="row">
            <div className="hidden">
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={{width: "75%"}}>Processing</TableHeaderColumn>
                    <TableHeaderColumn>%</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows={true}>
                  {
                    this.state.processing.map((elem) => {
                      const self = this;

                      return (
                        <TableRow key={self.state.processing.indexOf(elem) + 1}>
                          <TableRowColumn style={{width: "75%"}}>{elem.processingName}</TableRowColumn>
                          <TableRowColumn>{elem.percentage}</TableRowColumn>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </div>
            <div className="col-md-12" style={{height: "300px"}}>
              <ResponsiveBar
                data={this.state.statistics}
                keys={[
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Activity", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Anonymized", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#AudiovisualActivity", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Computer", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Content", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Demographic", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Derived", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Financial", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Government", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Health", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Interactive", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Judicial", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Location", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Navigation", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Online", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#OnlineActivity", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Physical", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#PhysicalActivity", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Political", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Preference", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Profile", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Purchase", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Social", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#State", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#Statistical", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#TelecomActivity", true),
                  getLabel("http://www.specialprivacy.eu/vocabs/data#UniqueId", true),
                ]}
                indexBy="processing"
                onClick={(node, e) => this.props.openDetails("processing", node.data.key)}
                margin={{
                  "top": 35,
                  "right": 35,
                  "bottom": 80,
                  "left": 35
                }}
                colors="set3"
                colorBy="id"
                groupMode="stacked"
                innerPadding={5}
                borderRadius={5}
                layout="vertical"
                borderColor="inherit:darker(1.6)"
                labelSkipWidth={35}
                labelSkipHeight={13}
                labelTextColor="inherit:darker(4)"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                  {
                    "dataFrom": "keys",
                    "anchor": "bottom",
                    "direction": "row",
                    "justify": false,
                    "translateX": 25,
                    "translateY": 70,
                    "itemsSpacing": 0,
                    "itemWidth": 125,
                    "itemHeight": 20,
                    "itemDirection": "left-to-right",
                    "itemOpacity": 1,
                    "symbolSize": 10,
                  }
                ]}
              />
            </div>
          </div>
        </CardText>
      </Card>
    );
  }

}

export default muiThemeable()(ProcessingDataChart);