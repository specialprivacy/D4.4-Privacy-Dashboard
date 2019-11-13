import React, {Component} from 'react';
import App from "./App";
import {data, purpose, processing, storage, recipient} from "./VocabLabelsGenerator";

var request = require('request').defaults({jar: true});
var EventSource = require("eventsource");


var buffer = [];
var statistics = {
  data: {},
  hasConsent: {},
  process: {},
  processing: {},
  purpose: {},
  recipient: {},
  storage: {},
};
var policies = [];

const extChunkSize = 500;
const vocabData = Object.keys(data);
const vocabPurpose = Object.keys(purpose);
const vocabProcessing = Object.keys(processing);
const vocabStorage = Object.keys(storage);
const vocabRecipient = Object.keys(recipient);

const url = "https://demonstrator-special.tenforce.com";

export const updateInterval = 700;

class AppContainer extends Component {

  state = {};

  componentDidMount() {
    const self = this;
    this.generateData();

    request(url + "/users/current", function (err, res, body) {
      if (res.statusCode === 401) {
        console.log(res);
        if (res.headers.hasOwnProperty("location")) {
          // window.location = res.headers.location;
          console.log("redirect to " + res.headers.location);
        } else {
          console.log("cannot read HTTP Header Location -> can't redirect");
        }
      }
    });

    request(url + "/applications", function(err, res, body) {
      if (!err) {
        var applications = JSON.parse(body);
        applications.applications.forEach((a) => {
          request(url + a.links.policies, function(e, r, b) {
            if (!e) {
              a.links = JSON.parse(b);
              policies.push(a);
            }
          });
        })
      }
    });

    setTimeout(this.log, 200);
  }

  generateData = () => {
    setTimeout(this.generateData, 100);

    var dataRandom = Math.floor(Math.random() * Math.floor(vocabData.length));
    var hasConsentRandom = Math.floor(Math.random() * Math.floor(2));
    var processingRandom = Math.floor(Math.random() * Math.floor(vocabProcessing.length));
    var purposeRandom = Math.floor(Math.random() * Math.floor(vocabPurpose.length));
    var recipientRandom = Math.floor(Math.random() * Math.floor(vocabRecipient.length));
    var storageRandom = Math.floor(Math.random() * Math.floor(vocabStorage.length));

    var obj = {
      eventID: generateRandomKey(),
      data: vocabData[dataRandom],
      hasConsent: (hasConsentRandom === 1),
      process: "Application process",
      processing: vocabProcessing[processingRandom],
      purpose: vocabPurpose[purposeRandom],
      recipient: vocabRecipient[recipientRandom],
      storage: vocabStorage[storageRandom],
      timestamp: Math.floor(Math.random() * Math.floor(Date.now()))
    };

    buffer.unshift(obj);
    if (buffer.length > 5000) {
      buffer.pop();
    }
    this.processEvent(obj, statistics);
  };

  getBuffer = () => {
    return buffer;
  };

  readBuffer = (element) => {
    var data;
    if (element === null) {
      data = buffer.slice(0, extChunkSize);
    } else {
      data = buffer.slice(buffer.indexOf(element), buffer.length + extChunkSize);
    }
    var n = (data.length === 0) ? 1 : data.length;
    var freqIndicator = data.map(function (e) {
      var index = data.indexOf(e);
      if (index === data.length - 1) {
        return 0;
      }
      return data[index].timestamp - data[index + 1].timestamp;
    }).reduce((a, b) => a + b, 0) / n;

    return {
      data: data,
      avgFreq: Math.floor(freqIndicator)
    };
  };

  getStepArr = () => {
    if (buffer.length === 0) {
      return [];
    }

    var tmp = [];
    tmp[0] = buffer[buffer.length-1];
    tmp[1] = buffer[Math.floor(buffer.length/2)];
    tmp[2] = buffer[0];
    return tmp;
  };

  processEvent = (obj, target) => {
    for (let key of ["data", "hasConsent", "process", "processing", "purpose", "recipient", "storage"]) {
      if (target[key].hasOwnProperty(obj[key])) {
        target[key][obj[key]].count++;
      } else {
        target[key][obj[key]] = {count: 1};
      }
    }
  };

  getDimensions = (key, query) => {
    const self = this;

    var statistics = {
      data: {},
      hasConsent: {},
      process: {},
      processing: {},
      purpose: {},
      recipient: {},
      storage: {}
    };

    buffer.filter(function(elem) {
      return elem[key] === query;
    }).forEach(function(obj) {
      self.processEvent(obj, statistics);
    });

    return statistics;
  };

  getStatistics = () => {
    return statistics;
  };

  getPolicies = () => {
    return policies;
  };

  render() {
    return (
      <App
        getDimensions={this.getDimensions}
        readBuffer={this.readBuffer}
        getStepArr={this.getStepArr}
        getStatistics={this.getStatistics}
        getPolicies={this.getPolicies}
      />
    );
  }
}

export default AppContainer;


// https://stackoverflow.com/a/27747377
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}

export const generateRandomKey = () => {
  var arr = new Uint8Array((12 || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};