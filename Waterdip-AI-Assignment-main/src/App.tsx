import './App.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import hotelBooking from './hotelBooking.json';
import TimeSeries from './components/TimeSeries';
import ColumnChart from './components/ColumnChart';
import Sparkline from './components/Sparkline';

interface BookingData {
  hotel: string;
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: string;
  children: string;
  babies: string;
  country: string;
}

function App() {
  const [displayMessage, setDisplayMessage] = useState<string>("Data Available: From July-2015 to August-2015 ");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [visitorsPerDay, setVisitorsPerDay] = useState<Map<string, number>>(new Map());
  const [adultVisitorsPerDay, setAdultVisitorsPerDay] = useState<Map<string, number>>(new Map());
  const [childrenVisitorsPerDay, setChildrenVisitorsPerDay] = useState<Map<string, number>>(new Map());
  const [visitorsPerCountry, setVisitorsPerCountry] = useState<Map<string, number>>(new Map());

  const filterDataByDateRange = () => {
    setVisitorsPerCountry(new Map());
    setVisitorsPerDay(new Map());
    setAdultVisitorsPerDay(new Map());
    setChildrenVisitorsPerDay(new Map())
    if (startDate && endDate && endDate > startDate) {
      hotelBooking.filter((booking: BookingData) => {
        const bookingDate = new Date(
          parseInt(booking.arrival_date_year),
          getMonthNumber(booking.arrival_date_month),
          parseInt(booking.arrival_date_day_of_month)
        );

        if (bookingDate >= startDate && bookingDate <= endDate) {
          const totalVisitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);
          const country = booking.country;
          const dateKey = formatDate(bookingDate);

          setVisitorsPerCountry((prevVisitorsPerCountry) => {
            const newVisitorsPerCountry = new Map(prevVisitorsPerCountry);
            if (newVisitorsPerCountry.has(country)) {
              newVisitorsPerCountry.set(country, newVisitorsPerCountry.get(country)! + totalVisitors);
            } else {
              newVisitorsPerCountry.set(country, totalVisitors);
            }
            return newVisitorsPerCountry;
          });

          setVisitorsPerDay((prevVisitorsPerDay) => {
            const newVisitorsPerDay = new Map(prevVisitorsPerDay);
            if (newVisitorsPerDay.has(dateKey)) {
              newVisitorsPerDay.set(dateKey, newVisitorsPerDay.get(dateKey)! + Number(booking.adults));
            } else {
              newVisitorsPerDay.set(dateKey, totalVisitors);
            }
            return newVisitorsPerDay;
          });
          setAdultVisitorsPerDay((prevAdultVisitorsPerDay) => {
            const newAdultVisitorsPerDay = new Map(prevAdultVisitorsPerDay);
            if (newAdultVisitorsPerDay.has(dateKey)) {
              newAdultVisitorsPerDay.set(dateKey, newAdultVisitorsPerDay.get(dateKey)! + totalVisitors);
            } else {
              newAdultVisitorsPerDay.set(dateKey, totalVisitors);
            }
            return newAdultVisitorsPerDay;
          });
          setChildrenVisitorsPerDay((prevChildrenVisitorsPerDay) => {
            const newChildrenVisitorsPerDay = new Map(prevChildrenVisitorsPerDay);
            if (newChildrenVisitorsPerDay.has(dateKey)) {
              newChildrenVisitorsPerDay.set(dateKey, newChildrenVisitorsPerDay.get(dateKey)! + Number(booking.children) + Number(booking.babies));
            } else {
              newChildrenVisitorsPerDay.set(dateKey, totalVisitors);
            }
            return newChildrenVisitorsPerDay;
          });

          return true;
        } else {
          return false;
        }
      });
      setDisplayMessage("");
    } else {
      setDisplayMessage("Select Valid Range Please!")
    }
  };

  const getMonthNumber = (month: string): number => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.indexOf(month);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='container'>
      <h1 className='header'>Dashboard</h1>
      <div className='date-picker'>
        <DatePicker
          className='dateBox'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText='Staring Date'
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={150}
          showMonthDropdown
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          className='dateBox'
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText='Ending Date'
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={150}
          showMonthDropdown
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button className='button' onClick={filterDataByDateRange}>Filter Data</button>

      {displayMessage !== "" ? (
        <div className='displayMessage'>
          <h2>{`${displayMessage}`}</h2>
          <p>Please select dates first to see the data</p>
        </div>
      ) : null}
      <div>
      </div>

      <div className='graphs'>
        {visitorsPerDay.size !== 0 ? (
          <div className='visitorsPerDay'>
            <TimeSeries visitorsPerDay={visitorsPerDay} />
          </div>
        ) : null}

        {visitorsPerCountry.size !== 0 ? (
          <div className='visitorsPerCountry'>
            <ColumnChart visitorsPerCountry={visitorsPerCountry} />
          </div>
        ) : null}

        <div className='sparkline'>
          {adultVisitorsPerDay.size !== 0 ? (
            <div className='adultVisitorsPerDay'>
              <Sparkline visitorsPerDay={adultVisitorsPerDay} visitor='Adult Visitor' />
            </div>
          ) : null}
          {childrenVisitorsPerDay.size !== 0 ? (
            <div className='childrenVisitorsPerDay'>
              <Sparkline visitorsPerDay={childrenVisitorsPerDay} visitor='Children Visitor' />
            </div>
          ) : null}
        </div>




      </div>

    </div>
  );
}

export default App;
