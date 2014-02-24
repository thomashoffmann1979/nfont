var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var LOCA = function(buffer,length,font){
    this.buffer = buffer;
    this._font = font;
    this._blength = length;
    this.debug = false;
    this._data = [];
    return this;
}

butil.inherits(LOCA,EventEmitter,{

});
LOCA.prototype._read = function(){
    var me = this,
        startOffset = me._startOffset,
        offset = startOffset,
        j;
    if (me._font.tables.head.indexToLocFormat === 0){
        for(j=0; j < me._blength; j+=1){
            me._data.push( me.buffer.readUInt16BE(offset) ); offset+=2;
        }
    }else{
        for(j=0; j < me._blength; j+=1){
            me._data.push( me.buffer.readUInt32BE(offset) ); offset+=4;
        }
    }
    me.emit('readed',me);
}

LOCA.prototype.read = function(offset){
    var me = this;
    me._startOffset = offset;
    //console.log('LOCA',typeof me._font.tables.head);
    if (typeof me._font.tables.head!='undefined'){
        me._read();
    }else{
        me._font.once('headReaded',me._read.bind(me));   
    }
}

exports.LOCA = LOCA;