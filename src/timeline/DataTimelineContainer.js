import React, {Component} from 'react';
import DataTimeline from "./DataTimeline";
import FilterControls from "../controls/FilterControls";
import {Card, CardText} from "material-ui";
import DataTimelineOverview from "./DataTimelineOverview";

const chunkSize = 60;
const avgNumEvents = 10;

class DataTimelineContainer extends Component {

  state = {
    data: [],
    limit: chunkSize,
    avgFreq: 0,
    groupByKey: "purpose"
  };

  changeGroupBy = (e, v) => {
    this.setState({groupByKey: v});
  };

  loadMore = () => {
    this.setState({limit: this.state.limit + chunkSize});
  };

  componentDidMount() {
    const self = this;

    setTimeout(function() {
      self.setState(self.props.readBuffer(null));
    }, 2500);
  };

  render() {
    return (
      <div style={{marginTop: "20px"}}>

        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardText>
                <FilterControls
                  changeGroupBy={this.changeGroupBy}
                />
              </CardText>
            </Card>
          </div>
        </div>

        <div className="col-md-12" style={{marginTop: "20px"}}>
          <div className="row">
            <DataTimelineOverview
              getStepArr={this.props.getStepArr}
              readBuffer={this.props.readBuffer}
            />
          </div>
          <div className="row">
            <DataTimeline
              data={this.state.data.slice(0, this.state.limit)}
              avgFreq={this.state.avgFreq}
              avgNumEvents={avgNumEvents}
              loadMore={this.loadMore}
              groupByKey={this.state.groupByKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DataTimelineContainer;