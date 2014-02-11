

var OS2Reader = function(buffer){
    this.buffer = buffer;
    this.properties = {};
    return this;
}

OS2Reader.prototype.read = function(offset){
    var string_offset,
        count,
        format_selector,
        j,
        me = this;
    

    me.version = this.buffer.readUInt16BE(offset);offset+=2;
    me.xAvgCharWidth = this.buffer.readInt16BE(offset);offset+=2;
    me.usWeightClass = this.buffer.readUInt16BE(offset);offset+=2;
    me.usWidthClass = this.buffer.readUInt16BE(offset);offset+=2;
    me.fsType = this.buffer.readUInt16BE(offset);offset+=2;
    me.ySubscriptXSize = this.buffer.readInt16BE(offset);offset+=2;
    me.ySubscriptYSize = this.buffer.readInt16BE(offset);offset+=2;
    me.ySubscriptXOffset = this.buffer.readInt16BE(offset);offset+=2;
    me.ySubscriptYOffset = this.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptXSize = this.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptYSize = this.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptXOffset = this.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptYOffset = this.buffer.readInt16BE(offset);offset+=2;
    me.yStrikeoutSize = this.buffer.readInt16BE(offset);offset+=2;
    me.yStrikeoutPosition = this.buffer.readInt16BE(offset);offset+=2;
    me.sFamilyClass = this.buffer.readInt16BE(offset);offset+=2;

    
    if (me.version>1){
        console.log('OS/2 version',version,'is not supported');
    }
    
    
}

exports.OS2Reader = OS2Reader;