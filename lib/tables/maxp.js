var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var MAXP = function(buffer,length,font){
    this.buffer = buffer;
    this._blength = length;
    this._font = font;
    this.debug = false;
    return this;
}

butil.inherits(MAXP,EventEmitter,{

});

MAXP.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;

    me.version = '' + me.buffer.readInt16BE(offset); offset+=2;
    me.version += '.' + me.buffer.readInt16BE(offset); offset+=2;
    

    me.numGlyphs = me.buffer.readUInt16BE(offset); offset+=2;
    if (me.version == '1.0'){
        me.maxPoints = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxContours = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxCompositePoints = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxCompositeContours = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxZones = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxTwilightPoints = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxStorage = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxFunctionDefs = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxInstructionDefs = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxStackElements = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxSizeOfInstructions = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxComponentElements = me.buffer.readUInt16BE(offset); offset+=2;
        me.maxComponentDepth = me.buffer.readUInt16BE(offset); offset+=2;
    }
    if (me.debug===true){
        console.log('MAXP','version',me.version);
    }
    me.emit('readed',me);
}

exports.MAXP = MAXP;