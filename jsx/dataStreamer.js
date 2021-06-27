import React from "react";

function getDisplayName(ChartComponent) {
  const name =
    ChartComponent.displayName || ChartComponent.name || "ChartComponent";
  return name;
}

export default function dataStreamer(ChartComponent) {
  const LENGTH = 200;

  class StreamingComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: 0,
        data: this.getData(0),
      };
      this.onKeyPress = this.onKeyPress.bind(this);
      this.speed = 1000;
    }

    componentDidUpdate(prevProps) {
      if (this.props.startDate !== prevProps.startDate) {
        var startDate = Date.parse(this.props.startDate);
        for (let i = 0; i < this.props.data.length; ++i) {
          let date = this.props.data[i].date;
          if (date >= startDate) {
            let offset = Math.max(0, i - LENGTH);
            let newData = this.getData(offset);
            this.updateData(newData, offset);
            return;
          }
        }
      }
    }

    componentDidMount() {
      document.addEventListener("keydown", this.onKeyPress);
    }

    componentWillUnmount() {
      if (this.interval) clearInterval(this.interval);
      document.removeEventListener("keydown", this.onKeyPress);
    }

    getData(offset) {
      let newData = this.props.data.slice(0, offset + 1 + LENGTH);
      // Experiment for updating same candle
      // if (offset > 0) {
      //   let latest = newData.pop();
      //   for (let i = 0; i < offset - 1; i ++) {
      //     newData.pop();
      //   }
      //   newData[newData.length - 1].close = latest.close;
      // }

      let currentPrice = newData[newData.length - 1];
      this.setState({
        currentPrice: currentPrice,
      });
      return newData;
    }

    updateData(newData, offset) {
      this.setState({
        offset: offset,
        data: newData,
      });
      this.props.onPriceChanged(this.state.currentPrice);
    }

    onKeyPress(e) {
      const keyCode = e.which;
      switch (keyCode) {
        case 83:
          // s - Start Data Stream
          this.func = () => {
            let newOffset = this.state.offset + 1;
            if (newOffset + LENGTH < this.props.data.length) {
              let newData = this.getData(newOffset);
              this.updateData(newData, newOffset);
            }
          };
          break;
        case 32:
          // Space (32) - Stop Data Stream
          this.func = null;
          if (this.interval) clearInterval(this.interval);
        default:
          break;
      }
      if (this.func) {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(this.func, this.speed);
      }
    }
    render() {
      const { type } = this.props;
      const { data } = this.state;

      return (
        <ChartComponent
          ref="component"
          data={data}
          type={type}
          chartHeight={this.props.chartHeight}
        />
      );
    }
  }

  StreamingComponent.defaultProps = {
    type: "svg",
  };

  StreamingComponent.displayName = `dataStreamer(${getDisplayName(
    ChartComponent
  )})`;

  return StreamingComponent;
}
