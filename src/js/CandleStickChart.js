function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import { BarSeries, CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CrossHairCursor, CurrentCoordinate, EdgeIndicator, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { OHLCTooltip, MovingAverageTooltip } from "react-stockcharts/lib/tooltip";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { ema, sma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
const mouseEdgeAppearance = {
  textFill: "#542605",
  stroke: "#05233B",
  strokeOpacity: 1,
  strokeWidth: 3,
  arrowWidth: 5,
  fill: "#BCDEFA"
};

class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableInteractiveObject: false,
      suffix: 1
    };
  }

  handleReset() {
    this.setState({
      suffix: this.state.suffix + 1
    });
  }

  render() {
    const ema50 = ema().id(2).options({
      windowSize: 50
    }).merge((d, c) => {
      d.ema50 = c;
    }).stroke("#2196f3").accessor(d => d.ema50);
    const ema20 = ema().id(0).options({
      windowSize: 20
    }).merge((d, c) => {
      d.ema20 = c;
    }).accessor(d => d.ema20);
    const smaVolume70 = sma().id(3).options({
      windowSize: 70,
      sourcePath: "volume"
    }).merge((d, c) => {
      d.smaVolume70 = c;
    }).accessor(d => d.smaVolume70);
    const {
      type,
      data: initialData,
      width,
      ratio
    } = this.props;
    const calculatedData = ema20(ema50(smaVolume70(initialData)));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(calculatedData);
    const margin = {
      left: 70,
      right: 70,
      top: 20,
      bottom: 30
    };
    const height = this.props.chartHeight;
    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;
    const showGrid = true;
    const yGrid = showGrid ? {
      innerTickSize: -1 * gridWidth,
      tickStrokeOpacity: 0.2
    } : {};
    const xGrid = showGrid ? {
      innerTickSize: -1 * gridHeight,
      tickStrokeOpacity: 0.2
    } : {};
    return /*#__PURE__*/React.createElement(ChartCanvas, {
      height: height,
      width: width,
      ratio: ratio,
      margin: {
        left: 70,
        right: 70,
        top: 20,
        bottom: 30
      },
      type: type,
      seriesName: `${this.state.ticker}_${this.state.suffix}`,
      data: data,
      xScale: xScale,
      xAccessor: xAccessor,
      displayXAccessor: displayXAccessor
    }, /*#__PURE__*/React.createElement(Chart, {
      id: 2,
      yExtents: [d => d.volume, smaVolume70.accessor()],
      height: 100,
      origin: (w, h) => [0, h - 100]
    }, /*#__PURE__*/React.createElement(YAxis, {
      axisAt: "left",
      orient: "left",
      ticks: 5,
      tickStroke: "#000000",
      stroke: "#000000",
      tickFormat: format(".2s")
    }), /*#__PURE__*/React.createElement(BarSeries, {
      yAccessor: d => d.volume,
      fill: d => d.close > d.open ? "#26A69A" : "#EF5350",
      stroke: false
    }), /*#__PURE__*/React.createElement(LineSeries, {
      yAccessor: smaVolume70.accessor(),
      stroke: smaVolume70.stroke()
    }), /*#__PURE__*/React.createElement(CurrentCoordinate, {
      yAccessor: smaVolume70.accessor(),
      fill: smaVolume70.stroke()
    }), /*#__PURE__*/React.createElement(CurrentCoordinate, {
      yAccessor: d => d.volume,
      fill: "#9B0A47"
    }), /*#__PURE__*/React.createElement(EdgeIndicator, {
      itemType: "last",
      orient: "right",
      edgeAt: "right",
      yAccessor: d => d.volume,
      displayFormat: format(".4s"),
      fill: "#0F0F0F"
    }), /*#__PURE__*/React.createElement(EdgeIndicator, {
      itemType: "last",
      orient: "right",
      edgeAt: "right",
      yAccessor: smaVolume70.accessor(),
      displayFormat: format(".4s"),
      fill: smaVolume70.fill()
    })), /*#__PURE__*/React.createElement(Chart, {
      id: 1,
      height: height - 50,
      yPan: true,
      yExtents: [d => [d.high, d.low], ema20.accessor(), ema50.accessor()],
      padding: {
        top: 10,
        bottom: 20
      }
    }, /*#__PURE__*/React.createElement(XAxis, _extends({
      axisAt: "bottom",
      orient: "bottom",
      tickStroke: "#000000",
      stroke: "#000000",
      opacity: 0.5
    }, xGrid, {
      ticks: 12
    })), /*#__PURE__*/React.createElement(YAxis, _extends({
      axisAt: "right",
      orient: "right",
      ticks: 5,
      tickStroke: "#000000",
      stroke: "#000000",
      opacity: 0.5
    }, yGrid)), /*#__PURE__*/React.createElement(MouseCoordinateY, _extends({
      at: "right",
      orient: "right",
      displayFormat: format(".2f")
    }, mouseEdgeAppearance)), /*#__PURE__*/React.createElement(CandlestickSeries, {
      opacity: "1.0",
      stroke: d => d.close > d.open ? "#26A69A" : "#EF5350",
      wickStroke: d => d.close > d.open ? "#26A69A" : "#EF5350",
      fill: d => d.close > d.open ? "#26A69A" : "#EF5350"
    }), /*#__PURE__*/React.createElement(OHLCTooltip, {
      origin: [-40, 0]
    }), /*#__PURE__*/React.createElement(MovingAverageTooltip, {
      onClick: e => console.log(e),
      origin: [-38, 15],
      options: [{
        yAccessor: ema20.accessor(),
        type: ema20.type(),
        stroke: ema20.stroke(),
        windowSize: ema20.options().windowSize
      }, {
        yAccessor: ema50.accessor(),
        type: ema50.type(),
        stroke: ema50.stroke(),
        windowSize: ema50.options().windowSize
      }]
    }), /*#__PURE__*/React.createElement(LineSeries, {
      yAccessor: ema20.accessor(),
      stroke: ema20.stroke(),
      highlightOnHover: true
    }), /*#__PURE__*/React.createElement(LineSeries, {
      yAccessor: ema50.accessor(),
      stroke: ema50.stroke(),
      highlightOnHover: true
    }), /*#__PURE__*/React.createElement(CurrentCoordinate, {
      yAccessor: ema20.accessor(),
      fill: ema20.stroke()
    }), /*#__PURE__*/React.createElement(CurrentCoordinate, {
      yAccessor: ema50.accessor(),
      fill: ema50.stroke()
    }), /*#__PURE__*/React.createElement(EdgeIndicator, {
      itemType: "last",
      orient: "right",
      edgeAt: "right",
      yAccessor: d => d.close,
      lineStroke: "#ffffff",
      fill: d => d.close > d.open ? "#6BA583" : "#DB0000"
    }), /*#__PURE__*/React.createElement(EdgeIndicator, {
      itemType: "last",
      orient: "right",
      edgeAt: "right",
      yAccessor: ema20.accessor(),
      fill: ema20.fill()
    }), /*#__PURE__*/React.createElement(EdgeIndicator, {
      itemType: "last",
      orient: "right",
      edgeAt: "right",
      yAccessor: ema50.accessor(),
      fill: ema50.fill()
    }), /*#__PURE__*/React.createElement(ZoomButtons, {
      onReset: this.handleReset.bind(this)
    })), /*#__PURE__*/React.createElement(CrossHairCursor, {
      stroke: "#000000"
    }));
  }

}

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  chartHeight: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};
CandleStickChart.defaultProps = {
  type: "svg"
};
CandleStickChart = fitWidth(CandleStickChart);
export default CandleStickChart;