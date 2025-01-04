
### Hotel Booking Dashboard
This project is a single-page dashboard that visualizes hotel booking data using various charts. 
- The dashboard is built using React.js (preferably in TypeScript) and allows filtering of data by date range.

### Project Features
Date Range Selector: Filters the data and updates all charts based on the selected date range.
- 4 Charts:
- Time Series Chart: Displays the number of visitors per day (total = adults + children + babies).
- Column Chart: Shows the number of visitors per country.
- Sparkline Charts:
- Sparkline 1: Total number of adult visitors.
- Sparkline 2: Total number of children visitors.


### Chart References
- Time Series Chart: Zoomable Time Series
- Column Chart: Column with Data Labels
- Sparkline Charts: Basic Sparklines

### Data
- The dataset includes 1,000 records of hotel bookings with the following fields:
- arrival_date_year: Year of the arrival.
- arrival_date_month: Month of the arrival.
- arrival_date_day_of_month: Day of the arrival.
- adults: Number of adults in the booking.
- children: Number of children in the booking.
- babies: Number of babies in the booking.
- country: The country from which the travelers originate.

## Technologies Used

- **React.js** (with **TypeScript**) 
- **ApexCharts** for chart visualizations
- **Axios** for API calls
- **Jest** for testing


### Version Control
The project is version-controlled using Git. Follow best practices with meaningful commit messages and proper branching strategies.
