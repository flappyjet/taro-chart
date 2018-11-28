var F2 = require('./utils/f2')

if (process.env.TARO_ENV === 'weapp') {
  //适配微信小程序
  F2.Util.addEventListener = function (source, type, listener) {
    source.addListener(type, listener);
  };

  F2.Util.removeEventListener = function (source, type, listener) {
    source.removeListener(type, listener);
  };

  F2.Util.createEvent = function (event, chart) {
    const type = event.type;
    let x = 0;
    let y = 0;
    const touches = event.touches;
    if (touches && touches.length > 0) {
      x = touches[0].x;
      y = touches[0].y;
    }

    return {
      type,
      chart,
      x,
      y
    };
  };
}

module.exports = { F2: F2 }
