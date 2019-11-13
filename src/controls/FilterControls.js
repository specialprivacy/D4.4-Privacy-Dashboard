import React, {Component} from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class FilterControls extends Component {

  render() {
    const radBtnStyle = {
      fontSize: "16px",
      padding: "6px",
      width: "auto",
      float: "left"
    };

    return (
      <List style={{marginBottom: "20px"}}>
        <Subheader>Group by:</Subheader>
        <RadioButtonGroup name="groupBy" defaultSelected="purpose" onChange={this.props.changeGroupBy}>
          <RadioButton
            value="purpose"
            label="Purpose"
            style={radBtnStyle}
          />
          <RadioButton
            value="data"
            label="Data"
            style={radBtnStyle}
          />
          <RadioButton
            value="processing"
            label="Processing"
            style={radBtnStyle}
          />
          <RadioButton
            value="recipient"
            label="Recipient"
            style={radBtnStyle}
          />
          <RadioButton
            value="storage"
            label="Storage"
            style={radBtnStyle}
          />
        </RadioButtonGroup>
      </List>
    );
  };

}

export default FilterControls;