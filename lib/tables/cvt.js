
var CVT = function(buffer,length,font){
    this.buffer = buffer;
    this._font = font;
    this._blength = length;
    this.debug = false;
    this._data = [];
    
    return this;
}

CVT.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;
    
    for(j=0; j < (me._blength / 2); j+=1){
        me._data.push( me.buffer.readInt16BE(offset) ); offset+=2;
    }
    
}

exports.CVT = CVT;