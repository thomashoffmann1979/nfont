
var HHea = function(buffer,length,font){
    this.buffer = buffer;
    this._blength = length;
    this._font = font;
    this.debug = false;
    return this;
}

HHea.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;

    me.version = '' + me.buffer.readInt16BE(offset); offset+=2;
    me.version += '.' + me.buffer.readInt16BE(offset); offset+=2;
    
    me.ascender = me.buffer.readInt16BE(offset); offset+=2;
    me.descender = me.buffer.readInt16BE(offset); offset+=2;
    me.lineGap = me.buffer.readInt16BE(offset); offset+=2;
    
    me.advanceWidthMax = me.buffer.readUInt16BE(offset); offset+=2;
    me.minLeftSideBearing = me.buffer.readInt16BE(offset); offset+=2;
    me.minRightSideBearing = me.buffer.readInt16BE(offset); offset+=2;
    me.xMaxExtent = me.buffer.readInt16BE(offset); offset+=2;
    
    me.caretSlopeRise = me.buffer.readInt16BE(offset); offset+=2;
    me.caretSlopeRun = me.buffer.readInt16BE(offset); offset+=2;
    me.caretOffset = me.buffer.readInt16BE(offset); offset+=2;
    me.reserved_1 = me.buffer.readInt16BE(offset); offset+=2;
    me.reserved_2 = me.buffer.readInt16BE(offset); offset+=2;
    me.reserved_3 = me.buffer.readInt16BE(offset); offset+=2;
    me.reserved_4 = me.buffer.readInt16BE(offset); offset+=2;
    me.metricDataFormat = me.buffer.readInt16BE(offset); offset+=2;
    me.numberOfHMetrics = me.buffer.readUInt16BE(offset); offset+=2;
    
    if (me.debug===true){
        console.log('HHea','version',me.version);
    }

}

exports.HHea = HHea;