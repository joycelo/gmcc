import React from 'react';
import './allentries.css';

const AllEntries = (props) => {

  const displayTableHeaders = () => {
    return (<tr id='table-header-row'>
      <td className='table-header-cell-name'>Name</td>
      <td className='table-header-cell-name'>Clients</td>
      <td className='table-header-cell-num'>Hours</td>
      <td className='table-header-cell-num'>Billable Hours</td>
      <td className='table-header-cell-num'>Billable Amount</td>
    </tr>)
  }

  const displayRows = () => {
    const summaryObj = props.projectSummary;
    const rows = [];
    for (let projObj in summaryObj) {
      if (summaryObj[projObj].client !== null) {
        let client = summaryObj[projObj].client;
        let project = summaryObj[projObj].project;
        let hours = props.displayNumberCommasDecimal(summaryObj[projObj].hours);
        let billableHours = props.displayNumberCommasDecimal(summaryObj[projObj].billableHours);
        let billableAmount = props.displayNumberCommasDecimal(summaryObj[projObj].billableAmount);

        rows.push (<tr className='row'>
          <td className='name-cell'>{client}</td>
          <td className='name-cell'>{project}</td>
          <td className='num-cell-1'>{hours}</td>
          {/* JML: For Billable Hours percentage, the example table (.png image) rounds to the nearest whole number; 
          however, I left it rounded to nearest hundredth decimal place for percentages that would have rounded to 100% but are not exactly 100% (ex. 99.62%),
          for purposes of accuracy. */}
          <td className='num-cell-2'>{billableHours} <span className='billable-percentage'>({displayBillablePercentage(billableHours, hours)}%)</span></td>
          <td className='num-cell-3'>{billableAmount < 1 ? '-' : ('$' + billableAmount)}</td>
        </tr>)
    }
  }
    return rows;
  }
   
  const displayTable = () => {
    let rows = displayRows();
    return rows.map((el, i) => {
      return (
        <React.Fragment key={'row' + i}>{el}</React.Fragment>
      )
    })
  }

  const displayBillablePercentage = (billableHours, hours) => {
    if (billableHours == 0) return 0;
    else if (billableHours === hours) return 100;
    let billablePercentageRaw = (billableHours / hours) * 100;
    return props.displayNumberCommasDecimal(billablePercentageRaw);
  }

    return (
      <div className="all-entries">
        <table id='project-summary-table'>
          <tbody>
            {displayTableHeaders()}
            {displayTable()}
          </tbody>
        </table>
      </div>
    );
}

export default AllEntries;
