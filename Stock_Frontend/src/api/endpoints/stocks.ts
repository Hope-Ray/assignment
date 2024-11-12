import axiosInstance from "../axiosInstance";

export const fetchStocksChart = async (dateRange, chartType, topN) => {
  const { start, end } = dateRange;

  // Ensure the backend endpoint URL uses the correct chart type
  const { data } = await axiosInstance.get(`/api/${chartType}-chart`, {
    params: {
      startDate: start,
      endDate: end,
      topN,
    },
  });

  console.log("Fetched data:", data); // Log the response data for debugging
  return data;
};
