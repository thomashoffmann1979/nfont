
var FPGM = function(buffer,length){
    this.buffer = buffer;
    this._blength = length;
    this.debug = false;
    this._data = [];
    
    return this;
}

FPGM.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;
    
    for(j=0; j < me._blength; j+=1){
        me._data.push( me.buffer.readUInt8(offset) ); offset+=1;
    }
    
}

exports.FPGM = FPGM;