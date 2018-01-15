/* https://github.com/codesuki/react-d3-components/issues/9 */
import React from 'react';
import ReactDOM from 'react-dom';

import BarChart from './BarChart';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import ScatterPlot from './ScatterPlot';
import PieChart from './PieChart';

import PropTypes from 'prop-types';

const createClass = (chartType) => {
  class Chart extends React.Component {
    constructor() {
      super();
      this.state = { size: { w: 0, h: 0 } };
      this.fitToParentSize = this.fitToParentSize.bind(this);
    }

    fitToParentSize() {
      let elem = ReactDOM.findDOMNode(this);
      const w = elem.parentNode.offsetWidth;
      const h = elem.parentNode.offsetHeight;
      const currentSize = this.state.size;
      if (w !== currentSize.w || h !== currentSize.h) {
        this.setState({
          size: { w, h },
        });
      }
    }

    getChartClass() {
      let Component;
      switch (chartType) {
        case 'BarChart':
          Component = BarChart;
          break;
        case 'LineChart':
          Component = LineChart;
          break;
        case 'AreaChart':
          Component = AreaChart;
          break;
        case 'ScatterPlot':
          Component = ScatterPlot;
          break;
        case 'PieChart':
          Component = PieChart;
          break;
        default:
          console.error('Invalid Chart Type name.');
          break;
      }
      return Component;
    }

    componentDidMount() {
      window.addEventListener('resize', this.fitToParentSize);
      this.fitToParentSize();
    }

    componentWillReceiveProps() {
      this.fitToParentSize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitToParentSize);
    }

    render() {
      let Component = this.getChartClass();
      let { width, height, margin, ...others } = this.props;

      width = this.state.size.w || 100;
      height = this.state.size.h || 100;

      return (
        <Component
          width = {width}
          height = {height}
          margin = {margin}
          {...others}
        />
      );
    }
  }
  Chart.defaultProps = {
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };
  Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.object,
  };
  return Chart;
};

const ResponsiveBarChart = createClass('BarChart');
const ResponsiveLineChart = createClass('LineChart');
const ResponsiveAreaChart = createClass('AreaChart');
const ResponsiveScatterPlot = createClass('ScatterPlot');
const ResponsivePieChart = createClass('PieChart');

export {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsiveAreaChart,
  ResponsiveScatterPlot,
  ResponsivePieChart,
};

export default {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsiveAreaChart,
  ResponsiveScatterPlot,
  ResponsivePieChart,
};
