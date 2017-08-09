var expect = require('expect');

var {generateMessage} = require('./message.js');
describe('generalMessage',()=>{
  it('should generate corrent message object',()=>{
      var from = 'jen';
      var text = 'some message',
      var message = generateMessage(from,text);
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from,text});
  });
});
