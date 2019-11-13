import React, {Component} from 'react';
import {muiThemeable} from "material-ui/styles";

import {
  Card,
  CardText,
} from "material-ui";
import {ResponsiveBar} from "@nivo/bar";
import {getLabel} from "../VocabLabelsGenerator";
import {updateInterval} from "../AppContainer";

const prefix = "http://www.specialprivacy.eu/vocabs/locations#";
const sPrefix = "https://www.specialprivacy.eu/vocabs/locations#";

class DataNotEuStorageChart extends Component {

  state = {
    storage: [],
    statistics: []
  };

  componentDidMount() {
    setTimeout(this.update, updateInterval);
  }

  update = () => {
    setTimeout(this.update, updateInterval);

    var data = Object.entries(this.props.getStatistics().storage);
    data.sort((a, b) => a[1].count - b[1].count);
    data = data.map((elem) => {
      var obj = {};
      obj.storage = elem[0].split("#")[1];
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
      var arr = self.props.getDimensions("storage", prefix + e.storage);
      var obj = {storage: getLabel(prefix + e.storage, true), key: e.key};

      if (typeof arr.storage[prefix + e.storage] !== "undefined") {
        obj.total = arr.storage[prefix + e.storage].count;
      } else if (typeof arr.storage[sPrefix + e.storage] !== "undefined") {
        obj.total = arr.storage[sPrefix + e.storage].count;
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
    statistics = statistics.sort((a, b) => { 
      if (b.storage < a.storage) {
        return -1;
      }
      if (b.storage > a.storage) {
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
    this.setState({storage: reducedData, statistics: statistics.reverse()});
  };


  render() {
    return (
      <Card>
        <CardText>
          <div className="row">
            <div className="col-md-12">
              <h2>Where is which data stored?</h2>
            </div>
          </div>
          <div className="row">
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
                  getLabel("http://www.specialprivacy.eu/vocabs/data#UniqueId", true)
                ]}
                indexBy="storage"
                onClick={(node, e) => this.props.openDetails("storage", node.data.key)}
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

export default muiThemeable()(DataNotEuStorageChart);