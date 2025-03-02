import { TextField } from '@mui/material';
import { getStartAndEndDate } from '../../utils/utils';
import './DateRange.css'

function DateRange({ startDate, handleStartDateChange, endDate, handleEndDateChange, setStartDate, setEndDate, isCustomRange, setIsCustomRange }) {
  const handleOnQuickSelection = (selection) => {
    const { start, end } = getStartAndEndDate(selection);
    setStartDate(start);
    setEndDate(end);
  }

  return (
    <>
      <div className="quick-selection">
        <button onClick={() => handleOnQuickSelection('week')} disabled={isCustomRange}>This Week</button>
        <button onClick={() => handleOnQuickSelection('month')} disabled={isCustomRange}>This Month</button>
        <button onClick={() => handleOnQuickSelection('year')} disabled={isCustomRange}>This Year</button>
        <button onClick={() => setIsCustomRange(!isCustomRange)}>Custom Range</button>
      </div>

      {isCustomRange ? <div className="date-range">
        <label>Start Date: </label>
        <TextField
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          sx={{
            width: '140px',
            height: '40px',
            '& input': {
              padding: '8px'
            },
          }}
        />
        <label>End Date: </label>
        <TextField
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          sx={{
            width: '140px',
            height: '40px',
            '& input': {
              padding: '8px'
            },
          }}
        />
      </div> : <></>}
    </>
  )
}

export default DateRange;