import Taro, { Component } from '@tarojs/taro'
import './index.scss'

function debounce(delay,fn)
{
  let t = null;
  return function() {
    let _this = this, _args = arguments;
    t = setTimeout(
      () => {
        t && clearTimeout(t);
        fn.apply(_this, _args);
        t = null;
      }, delay)
  }
}

export class ChartView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: null,
      height: null
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeHandler);
    setTimeout(this.initCanvas, 0)
  }

  componentWillUnmount() {       
    window.removeEventListener('resize', this.resizeHandler);
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props.wrapperClass!==prevProps.wrapperClass){
      setTimeout(this.initCanvas, 0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.wrapperClass!==nextProps.wrapperClass){
      this.setState({
        width: null,
        height: null
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.wrapperClass===nextProps.wrapperClass && this.state.width===nextState.width && this.state.height===nextState.height)
    {
      return false;
    }
    return true;
  }

  initCanvas = () => {
    const { canvasId, wrapperClass } = this.props;
    this.canvas = document.getElementById(canvasId);

    let width, height;
    if(!wrapperClass) {
      width = this.canvas.width;
      height = this.canvas.height;
    }
    else {
      width = this.canvas.parentNode.clientWidth;
      height = this.canvas.parentNode.clientHeight;
    }

    if(this.state.width!==width || this.state.height!==height){
      if(this.chart) {
        this.chart.clear()
      }
      this.setState({ width, height }, () => {
        this.chart = this.props.onInit(this.canvas, width, height)
      })
    }
  }    
    
  resizeHandler = debounce(200, (e) => {
    this.initCanvas();
  })

  render() {
    const { canvasId, wrapperClass } = this.props;
    const { width, height } = this.state;

    return (
      <div className={wrapperClass? wrapperClass: 'f2-wrapper'}>
        <canvas id={canvasId} width={width} height={height}/>
      </div>
    )
  }
}

