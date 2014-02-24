var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var FPGM = function(buffer,length){
    this.buffer = buffer;
    this._blength = length;
    this.debug = false;
    this._data = [];
    
    return this;
}


butil.inherits(FPGM,EventEmitter,{

});

FPGM.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;
    
    for(j=0; j < me._blength; j+=1){
        me._data.push( me.buffer.readUInt8(offset) ); offset+=1;
    }
    
    me.emit('readed',me);
}

exports.FPGM = FPGM;