import React, {Component} from 'react';
import {Step, StepButton, Stepper} from "material-ui/Stepper";
import CircularProgress from "material-ui/CircularProgress";
import {generateRandomKey} from "../AppContainer";


class DataTimelineOverview extends Component {

  state = {
    stepArr: []
  };

  componentDidMount() {
    setTimeout(this.updateOverview, 0);
  }

  updateOverview = () => {
    setTimeout(this.updateOverview, 1000);

    var tmp = this.props.getStepArr();
    if (typeof tmp !== "undefined") {
      this.setState({stepArr: tmp});
    } else {
      this.setState({stepArr: []});
    }
  };

  render() {
    const self = this;

    return (
      <Stepper>
        {
          this.state.stepArr.map((e) => {
            return (
              <Step key={generateRandomKey()}>
                <StepButton onClick={() => {self.props.readBuffer(e)}}>
                  <b>{new Date(e.timestamp).toLocaleDateString() + " " + new Date(e.timestamp).toLocaleTimeString()}</b>
                </StepButton>
              </Step>
            );
          })
        }
        <Step>
          <StepButton onClick={() => {self.props.readBuffer(null)}}><CircularProgress size={15} /></StepButton>
        </Step>
      </Stepper>
    )
  }
}

export default DataTimelineOverview;