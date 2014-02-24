var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var GLYF = function(buffer,length,font){
    this.buffer = buffer;
    this._font = font;
    this._blength = length;
    this.debug = false;
    this._data = [];
    
    return this;
}


butil.inherits(GLYF,EventEmitter,{

});

GLYF.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;
    
    me.numberOfContours = me.buffer.readInt16BE(offset); offset+=1;
    me.xMin = me.buffer.readInt16BE(offset); offset+=1;
    me.yMin = me.buffer.readInt16BE(offset); offset+=1;
    me.xMax = me.buffer.readInt16BE(offset); offset+=1;
    me.yMax = me.buffer.readInt16BE(offset); offset+=1;
    
    me.endPtsOfContours = [];
    
    for(j=0; j < (me.numberOfContours); j+=1){
        me.endPtsOfContours.push( me.buffer.readUInt16BE(offset) ); offset+=2;
    }
    me.instructionLength  = me.buffer.readUInt16BE(offset); offset+=2;
    
    me.instructions = [];
    me.flags = [];
    me.xCoordinates = [];
    me.yCoordinates = [];
    for(j=0; j < (me.instructionLength); j+=1){
        me.instructions.push( me.buffer.readUInt8(offset) ); offset+=1;
    }
    for(j=0; j < (me.instructionLength); j+=1){
        me.flags.push( me.buffer.readUInt8(offset) ); offset+=1;
    }
    for(j=0; j < (me.instructionLength); j+=1){
        if (me.xShort(me.flags[j])){
            me.xCoordinates.push( me.buffer.readUInt16BE(offset) ); offset+=2;
        }else{
            me.xCoordinates.push( me.buffer.readUInt8(offset) ); offset+=1;
        }
    }
    for(j=0; j < (me.instructionLength); j+=1){
        if (me.yShort(me.flags[j])){
            me.yCoordinates.push( me.buffer.readUInt16BE(offset) ); offset+=2;
        }else{
            me.yCoordinates.push( me.buffer.readUInt8(offset) ); offset+=1;
        }
    }
    /*
    Composite Glyph Description !!!!! still missing
    */
    me.emit('readed',me);
}
GLYF.prototype.curve = function(n){
    return (n & 0x01);
}
GLYF.prototype.xShort = function(n){
    return (n & 0x02);
}
GLYF.prototype.yShort = function(n){
    return (n & 0x04);
}
GLYF.prototype.repeat = function(n){
    return (n & 0x08);
}
GLYF.prototype.xIsSame = function(n){
    return (n & 0x10);
}
GLYF.prototype.yIsSame = function(n){
    return (n & 0x20);
}

exports.GLYF = GLYF;