import React from 'react';
import './summary.css';

const Summary = (props) => {

  const displayTotalHours = () => {
    let summaryObj = props.projectSummary;
    let totalHours = 0;
    for (let projObj in summaryObj) {
      totalHours += summaryObj[projObj].hours;
    }
    return props.displayNumberCommasDecimal(totalHours);
  }

  const displayBillableAmount = () => {
    let summaryObj = props.projectSummary;
    let totalBillableAmount = 0;
    for (let projObj in summaryObj) {
      totalBillableAmount += summaryObj[projObj].billableAmount;
    }
    return props.displayNumberCommasDecimal(totalBillableAmount);
  }

    return (
      <div className='summary'>
        <div id='summary-hours'><p className='summary-label'>Hours Tracked</p><p className='summary-result'>{displayTotalHours()}</p></div>
        <div id='summary-billable-amount'><p className='summary-label'>Billable Amount</p><p className='summary-result'>${displayBillableAmount()}</p></div>
      </div>
    )
}

export default Summary;