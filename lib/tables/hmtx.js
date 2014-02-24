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

HMTX.prototype._read = function(){
    var me = this,
        startOffset = me._startOffset,
        offset = startOffset,
        j;

    me.hMetrics = [];
    me.leftSideBearing = [];
    
    for(j=0; j < me._font.tables.hhea.numOfHMetrics; j++){
        var item = {};
        item.advanceWidth  = me.buffer.readUInt16BE(offset); offset+=2;
        item.lsb  = me.buffer.readInt16BE(offset); offset+=2;
        me.hMetrics.push(item);
    }
    
    for(j=0; j < me._font.tables.maxp.numGlyphs; j++){
         me.leftSideBearing.push(me.buffer.readInt16BE(offset)); offset+=2; 
    }
    
    if (me.debug===true){
        console.log('HMTX','hMetrics',me.hMetrics);
    }
    //console.log('HMTX','hMetrics',me.hMetrics);
    me.emit('readed',me);
}
HMTX.prototype._hhea_read = function(){
    var me = this;
    me._hhea=true;
    me._check_read();
}
HMTX.prototype._maxp_read = function(){
    var me = this;
    me._maxp=true;
    me._check_read();
}

HMTX.prototype._check_read = function(){
    var me = this;
    if ( (me._hhea===true) && (me._maxp===true) ){
        me._read();
    }
}

HMTX.prototype.read = function(offset){
    var me = this;
    me._startOffset = offset;
    me._maxp =  false;
    me._hhea =  false;

    if (typeof me._font.tables.hhea!='undefined'){
        me._hhea =  true;
    }
    if (typeof me._font.tables.maxp!='undefined'){
        me._maxp =  true;
    }
    me._font.once('hheaReaded',me._hhea_read.bind(me)); 
    me._font.once('maxpReaded',me._maxp_read.bind(me)); 
    me._check_read();
}

exports.HMTX = HMTX;