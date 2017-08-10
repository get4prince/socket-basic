var moment = require('moment');
var time = moment(moment().valueOf()).format('LT');

var generateMessage = (from,text)=>{
  return{
    from,
    text,
    time
  }
}

var generateLocationMessage = (from,latitude,longitude)=>{
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    time
  }
}
module.exports = {
  generateMessage,
  generateLocationMessage
};
