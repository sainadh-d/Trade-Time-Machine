import React from "react";
import Chart from "./CandleStickChartWithStreamingData";
import { fetchData } from "./data";

class ChartComponent extends React.Component {
  componentDidMount() {
    console.log(this.props.startDate);
    fetchData().then(data => {
      this.setState({
        data
      });
    });
  }

  render() {
    if (this.state == null) {
      return /*#__PURE__*/React.createElement("div", null, "Loading...");
    }

    return /*#__PURE__*/React.createElement(Chart, {
      onPriceChanged: this.props.onPriceChanged,
      type: "hybrid",
      data: this.state.data,
      chartHeight: 800 // Static Chart Height
      ,
      startDate: this.props.startDate,
      ticker: this.props.ticker
    });
  }

}

export default ChartComponent;