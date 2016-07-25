import React, { PropTypes } from 'react';
import { generateData, calcTotal } from './util';

const Gen = React.createClass({
  propTypes: {
    onGen: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  },
  getDefaultProps() {
    return {
      onGen: () => {},
      x: 20,
      y: 18,
      z: 1,
    };
  },
  getInitialState() {
    return {
      nums: '',
    };
  },
  componentDidMount() {
    const vals = this.getVals();
    this.props.onGen(generateData(vals.x, vals.y, vals.z));
  },
  onGen(e) {
    e.preventDefault();
    const vals = this.getVals();
    this.props.onGen(generateData(vals.x, vals.y, vals.z));
    this.setState({
      nums: calcTotal(vals.x, vals.y, vals.z),
    });
  },
  getVals() {
    return {
      x: parseInt(this.refs.x.value, 10),
      y: parseInt(this.refs.y.value, 10),
      z: parseInt(this.refs.z.value, 10),
    };
  },
  render() {
    const { x, y, z } = this.props;
    return (<div style={{ padding: '0 20px' }}>
      <h2>big data generator</h2>
      <form onSubmit={this.onGen}>
        <span style={{ marginRight: 10 }}>
          x: <input ref="x" defaultValue={x} type="number" min="1" required style={{ width: 50 }} />
        </span>
        <span style={{ marginRight: 10 }}>
          y: <input ref="y" defaultValue={y} type="number" min="1" required style={{ width: 50 }} />
        </span>
        <span style={{ marginRight: 10 }}>
          z: <input ref="z" defaultValue={z} type="number" min="1" required style={{ width: 50 }} />
        </span>
        <button type="submit">Generate</button>
        <p>total nodes: {this.state.nums || calcTotal(x, y, z)}</p>
      </form>
      <p style={{ fontSize: 12 }}>
        x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）
      </p>
    </div>);
  },
});
export default Gen;
