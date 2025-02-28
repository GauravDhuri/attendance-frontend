import Calendar from 'react-calendar';
import './Calendar.css'

function CustomCalendar({ setDate, date }) {
  const today = new Date();

  return (
    <div className="calendar-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Calendar
        onChange={setDate}
        value={date}
        style={{ width: '100%', fontSize: '1.2rem' }}
        maxDate={today}
      />
    </div>
  );
}

export default CustomCalendar;
