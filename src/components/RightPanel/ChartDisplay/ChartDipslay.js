import React, { Component } from "react";
import Chart from "chart.js";
import moment from "moment";
import classes from "./ChartDisplay.module.scss";

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mychart = null;
  }

  prepareData = data => {
    let d = {
      labels: [],
      data: []
    };
    Object.keys(data).forEach(k => {
      d.labels.push(new Date(data[k].Day));
      d.data.push({
        x: new Date(data[k].Day),
        y: data[k].stockPrice
      });
    });
    console.log(d);
    return d;
  };

  componentDidUpdate() {
    if (this.props.data) {
      let data = this.prepareData(this.props.data);
      this.mychart.data.labels = data.labels;
      this.mychart.data.datasets[0].data = data.data;

      this.mychart.update();
    }
  }

  componentDidMount() {
    // console.log(this.props.data);
    if (this.props.data !== null) {
      const { labels, data } = this.prepareData(this.props.data);

      // console.log(min, max);
      let config = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Stocks",
              backgroundColor: "rgba(201, 32, 32, 0.1)",
              borderColor: "rgba(201, 32, 32, 1.0)",
              fill: true,
              data: data,
              type: "line",
              pointRadius: 2,
              lineTension: 0,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,

          title: {
            text: "Stocks"
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: false,
                ticks: {
                  minRotation: 0,
                  maxRotation: 0,
                  autoSkip: true
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Price"
                },
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              title: function(t, d) {
                let index = t[0].index;
                let data1 = d.datasets[0].data[index].x;
                return moment(data1).format("MMM DD, YYYY");
              },
              label: function(t, d) {
                let index = t.index;
                return "Stock Price: Rs. " + d.datasets[0].data[index].y;
              }
            }
          }
        }
      };

      let ctx = this.myRef.current.getContext("2d");
      Chart.defaults.global.defaultFontColor = "black";
      this.mychart = new Chart(ctx, config);
    }
  }

  render() {
    return (
      <div className={classes.Chart}>
        <canvas ref={this.myRef} id="myChart" className="col " />
      </div>
    );
  }
}

export default ChartDisplay;
