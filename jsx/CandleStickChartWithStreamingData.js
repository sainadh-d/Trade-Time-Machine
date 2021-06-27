import CandleStickChart from "./CandleStickChart";
import dataStreamer from "./dataStreamer";

const CandleStickChartWithStreamingData = dataStreamer(CandleStickChart);

export default CandleStickChartWithStreamingData;
