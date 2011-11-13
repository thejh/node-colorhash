var blueMidnightWish = require('insanehash').crypto.bmw

function rangeport(num, fromStart, fromEnd, toStart, toEnd) {
  num -= fromStart
  num /= fromEnd - fromStart
  num *= toEnd - toStart
  num += toStart
  return num
}

module.exports = function(str, format) {
  function component(i) {
    var srcNum = parseInt(hashstr.slice(4*i, 4*i+4), 16)
    return Math.floor(rangeport(srcNum, 0, 0xffff, 0x80, 0xff))
  }
  var hashstr = blueMidnightWish(str)
  var result = [component(0), component(1), component(2)]
  if (format == null)
    return result
  else if (format === 'css')
    return '#'+result.map(function(n){return n.toString(16)}).join('')
  else
    throw new Error('unknown format')
}
