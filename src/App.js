import React, { Component } from 'react';
import Summary from './Summary';
import AllEntries from './AllEntries';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      projectSummary: null,
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3002/timesheet')
      .then(response => response.json())
      .then(data => {
        const displayObj = {};
        // console.log("data", data);
        for (let entryObj of data) {
          if (displayObj[entryObj.project_code] === undefined) {
            displayObj[entryObj.project_code] = { client: null, project: null, hours: 0, billableHours: 0, billableAmount: 0};
          }
          displayObj[entryObj.project_code].client = entryObj.client;
          displayObj[entryObj.project_code].project = entryObj.project;
          displayObj[entryObj.project_code].hours += Number(entryObj.hours);
          if (entryObj.billable_rate > 0) displayObj[entryObj.project_code].billableHours += Number(entryObj.hours);
          displayObj[entryObj.project_code].billableAmount += Number(entryObj.hours) * Number(entryObj.billable_rate);
          }
        this.setState({projectSummary: displayObj});
        })
  }

  displayNumberCommasDecimal = (num) => {
    let hunDec = (Math.ceil((num * 1000) / 10) / 100).toFixed(2);
    const parts = hunDec.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  render() {
    console.log("this.state.timesheetSummary", this.state.projectSummary);
    return (
      <div className="App">
        <Summary projectSummary={this.state.projectSummary} displayNumberCommasDecimal={this.displayNumberCommasDecimal}/>
        <AllEntries projectSummary={this.state.projectSummary} displayNumberCommasDecimal={this.displayNumberCommasDecimal}/>
      </div>
    );
    }
}

export default App;
