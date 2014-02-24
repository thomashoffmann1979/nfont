
var PREP = function(buffer,length,font){
    this.buffer = buffer;
    this._blength = length;
    this._font = font;
    this.debug = false;
    this._data = [];
    
    return this;
}

PREP.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;
    
    for(j=0; j < me._blength; j+=1){
        me._data.push( me.buffer.readUInt8(offset) ); offset+=1;
    }
}

exports.PREP = PREP;