import React, {Component} from "react";
import DataPurposeChart from "./charts/DataPurposeChart";
import ProcessingDataChart from "./charts/ProcessingDataChart";
import RecipientStorageChart from "./charts/RecipientStorageChart";
import DataNotEuStorageChart from "./charts/DataNotEuStorageChart";
import DetailsDialog from "./dialogs/DetailsDialog";

class FrontPage extends Component {

  state = {
    open: false,
    selectedType: "",
    selectedQuery: "",
  };

  openDetails = (type, query) => {
    this.setState({open: true, selectedType: type, selectedQuery: query});
    this.forceUpdate();
  };

  closeDetails = () => {
    this.setState({open: false, selectedType: "", selectedQuery: ""});
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <div>
          <DataPurposeChart
            getStatistics={this.props.getStatistics}
            openDetails={this.openDetails}
          />
        </div>
        <div style={{marginTop: "20px"}}>
          <ProcessingDataChart
            getStatistics={this.props.getStatistics}
            getDimensions={this.props.getDimensions}
            openDetails={this.openDetails}
          />
        </div>
        <div style={{marginTop: "20px"}}>
          <RecipientStorageChart
            getStatistics={this.props.getStatistics}
            getDimensions={this.props.getDimensions}
            openDetails={this.openDetails}
          />
        </div>
        <div style={{marginTop: "20px"}}>
          <DataNotEuStorageChart
            getStatistics={this.props.getStatistics}
            getDimensions={this.props.getDimensions}
            openDetails={this.openDetails}
          />
        </div>
        <DetailsDialog
          getDimensions={this.props.getDimensions}
          open={this.state.open}
          selectedType={this.state.selectedType}
          selectedQuery={this.state.selectedQuery}
          closeDetails={this.closeDetails}
        />
      </div>
    );
  }
}

export default FrontPage;