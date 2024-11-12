import { useState, useEffect } from "react";
import { useFetchStocks } from "../api/hooks/useFetchData";

const Dashboard = () => {
  const [chartType, setChartType] = useState("line");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [topN, setTopN] = useState(5);
  const [error, setError] = useState(null);

  // Initialize default date range to the past 30 days
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setDateRange({
      start: thirtyDaysAgo.toISOString().split("T")[0], // Set start date as 30 days ago
      end: today.toISOString().split("T")[0], // Set end date as today
    });
  }, []);

  // Fetch stock data using the parameters
  const { data: stocks, isLoading } = useFetchStocks(
    dateRange,
    chartType,
    topN
  );

  // Handler for chart type change
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Handler for date change
  const handleDateChange = (startOrEnd, date) => {
    setDateRange((prev) => ({ ...prev, [startOrEnd]: date }));
  };

  // Handler for Top N change
  const handleTopNChange = (event) => {
    setTopN(event.target.value);
  };

  // Function to handle the fetch and validation
  const handleFetchData = () => {
    if (!dateRange.start || !dateRange.end) {
      setError("Both start and end dates are required");
      return; // Prevent fetch if dates are missing
    }
    setError(null); // Reset error if dates are valid
  };

  // Trigger the fetch when the user changes the filters
  useEffect(() => {
    handleFetchData(); // Validate the date range
  }, [dateRange, topN, chartType]); // Re-run validation whenever filters change

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Stock Data Visualization</h2>

      <div className="filter-panel">
        <label>
          Chart Type:
          <select value={chartType} onChange={handleChartTypeChange}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </label>

        <label>
          Date Range:
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateChange("start", e.target.value)}
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateChange("end", e.target.value)}
          />
        </label>

        <label>
          Top N Stocks:
          <input
            type="number"
            value={topN}
            onChange={handleTopNChange}
            min="1"
          />
        </label>
      </div>

      {/* Show error message if validation fails */}
      {error && <div className="error-message">{error}</div>}

      {/* <div className="chart-container">
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <Chart
            type={chartType}
            data={processChartData(chartType)} // Pass processed data based on chart type
          />
        )}
      </div> */}

      <div className="extra-options">
        <button className="btn">Export Data</button>
        <button className="btn">Adjust Display Settings</button>
      </div>
    </div>
  );
};

export default Dashboard;
