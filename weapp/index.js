import Taro, { Component } from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
import { Renderer } from '../utils/renderer'
import './index.scss'

export class ChartView extends Component {
  static options = { addGlobalClass: true }

  state = {
    width: null,
    height: null
  }

  componentDidMount () {
    this.initCanvas()
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props.wrapperClass!==prevProps.wrapperClass){
      this.initCanvas()
    }
  }

  componentWillReceiveProps(nextProps) {console.log('will',nextProps)
    if(this.props.wrapperClass!==nextProps.wrapperClass){
      this.setState({
        width: null,
        height: null
      })
    }
  }

  initCanvas = () => {
    const { canvasId, wrapperClass } = this.props;

    let ctx = wx.createCanvasContext(canvasId, this.$scope)
    this.canvas = new Renderer(ctx);

    const query = wx.createSelectorQuery().in(this.$scope)

    query.select(wrapperClass? `.${wrapperClass}`: ".f2-canvas").boundingClientRect(res => {
      if(res && res.width && res.height) {
        this.setState({ width: res.width, height: res.height })
        this.props.onInit(this.canvas, res.width, res.height)
      }
    }).exec()
  }

  touchStart = (e) => {
    this.canvas.emitEvent('touchstart', [e]);
  }
  touchMove = (e) => {
    this.canvas.emitEvent('touchmove', [e]);
  }
  touchEnd = (e) => {
    this.canvas.emitEvent('touchend', [e]);
  }
  press = (e) => {
    this.canvas.emitEvent('press', [e]);
  }

  render() {
    const { canvasId, wrapperClass } = this.props;
    const { width, height } = this.state;
    const innerStyle = (width && height)? `width: ${width}px; height: ${height}px;`: null;

    return (
      <View className={wrapperClass? wrapperClass: 'f2-wrapper'}>
        <Canvas className="f2-canvas"
          canvasId={canvasId}
          style={innerStyle}
          onTouchstart={this.touchStart}
          onTouchmove={this.touchMove}
          onTouchend={this.touchEnd}
          onLongtap={this.press}
        />
      </View>
    )
  }
}
