
var LOCA = function(buffer,length,font){
    this.buffer = buffer;
    this._font = font;
    this._blength = length;
    this.debug = false;
    this._data = [];
    return this;
}

LOCA.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;
    if (false){
        for(j=0; j < me._blength; j+=1){
            if (me._font.head.indexToLocFormat === 0){
                me._data.push( me.buffer.readUInt16BE(offset) ); offset+=2;
            }else{
                me._data.push( me.buffer.readUInt32BE(offset) ); offset+=4;
            }
        }
    }
}

exports.LOCA = LOCA;