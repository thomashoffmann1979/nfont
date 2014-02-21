
var Head = function(buffer){
    this.buffer = buffer;
    return this;
}

Head.prototype.read = function(offset){
    var me = this,
        count,
        j;

    me.version = '' + me.buffer.readInt16BE(offset); offset+=2;
    me.version += '.' + me.buffer.readInt16BE(offset); offset+=2;
    
    me.fontRevision = '' + me.buffer.readInt16BE(offset); offset+=2;
    me.fontRevision += '.' + me.buffer.readInt16BE(offset); offset+=2;
    
    me.checkSumAdjustment = me.buffer.readUInt32BE(offset); offset+=4;
    me.magicNumber = me.buffer.readUInt32BE(offset); offset+=4;
    
    me.flags = me.buffer.readUInt16BE(offset); offset+=2;
    me.unitsPerEm  = me.buffer.readUInt16BE(offset); offset+=2;
    
    me.created = me.buffer.readInt32BE(offset); offset+=8;
    me.modified = me.buffer.readInt32BE(offset); offset+=8;
    
    me.xMin = me.buffer.readInt16BE(offset); offset+=2;
    me.yMin = me.buffer.readInt16BE(offset); offset+=2;
    
    me.xMax = me.buffer.readInt16BE(offset); offset+=2;
    me.yMax = me.buffer.readInt16BE(offset); offset+=2;
    
    me.macStyle = me.buffer.readUInt16BE(offset); offset+=2;
    
    me.lowestRecPPEM = me.buffer.readUInt16BE(offset); offset+=2;
    
    me.fontDirectionHint = me.buffer.readInt16BE(offset); offset+=2;
    
    me.indexToLocFormat = me.buffer.readInt16BE(offset); offset+=2;
    me.glyphDataFormat = me.buffer.readInt16BE(offset); offset+=2;
    
    console.log('HEAD','version',me.version);
    console.log('HEAD','revision',me.fontRevision); 
    console.log('HEAD','magicNumber',me.magicNumber);
    console.log('HEAD','unitsPerEm',me.unitsPerEm);
    console.log('HEAD','created',me.created);
    console.log('HEAD','modified',me.modified);
    console.log('HEAD','xMin',me.xMin);
    console.log('HEAD','yMin',me.yMin);
    console.log('HEAD','xMax',me.xMax);
    
    console.log('HEAD','macStyle',me.macStyle);
    console.log('HEAD','lowestRecPPEM',me.lowestRecPPEM);
    console.log('HEAD','fontDirectionHint',me.fontDirectionHint);
    console.log('HEAD','indexToLocFormat',me.indexToLocFormat);
    console.log('HEAD','glyphDataFormat',me.glyphDataFormat);
    
}

exports.Head = Head;