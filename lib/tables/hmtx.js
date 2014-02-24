var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var HMTX = function(buffer,length,font){
    this.buffer = buffer;
    this._blength = length;
    this._font = font;
    this.debug = false;
    return this;
}

butil.inherits(HMTX,EventEmitter,{

});

HMTX.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;

    me.hMetrics = [];
    me.leftSideBearing = [];
    
    for(j=0; j < me.font.hhea.numOfHMetrics; j++){
        var item = {};
        item.advanceWidth  = me.buffer.readUInt16BE(offset); offset+=2;
        item.lsb  = me.buffer.readInt16BE(offset); offset+=2;
        me.hMetrics.push(item);
    }
    
    for(j=0; j < me.font.maxp.numGlyphs; j++){
         me.leftSideBearing.push(me.buffer.readInt16BE(offset)); offset+=2; 
    }
    
    if (me.debug===true){
        console.log('HMTX','hMetrics',me.hMetrics);
    }

    me.emit('readed');
}

exports.HMTX = HMTX;