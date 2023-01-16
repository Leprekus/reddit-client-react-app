export default function calculate (value) {

    var output;
    if(value < 1000) {
        output = value
    }
    if(value >= 1000 && value <= 999999) {
      output = Math.floor(value / 1000) + 'k'
    }
    if(value >= 1000000 && value <= 999999999) {
      output = Math.floor(value / 1000000) + 'm'
    }
    if(value >= 1000000000 && value <= 999999999999) {
      output = Math.floor(value / 1000000000) + 'b'
    }
    return output
  }