
var CMap = function(buffer){
    this.buffer = buffer;
    this.debug = false;
    this._encodingRecords = [];
    
    return this;
}

CMap.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j,
        i;

    me.version  = me.buffer.readUInt16BE(offset); offset+=2;
    me.numTables  = me.buffer.readUInt16BE(offset); offset+=2;
    
    for(j=0;j<me.numTables;j+=1){
        var item = {},
            suboffset = 0;
        item.platformID = me.buffer.readUInt16BE(offset); offset+=2;
        item.encodingID = me.buffer.readUInt16BE(offset); offset+=2;
        item.offset = me.buffer.readUInt32BE(offset); offset+=4;
        
        suboffset = startOffset + item.offset;
        item.format = me.buffer.readUInt16BE(suboffset); suboffset+=2;
        item.length = me.buffer.readUInt16BE(suboffset); suboffset+=2;
        item.language = me.buffer.readUInt16BE(suboffset); suboffset+=2;
        switch(item.format){
            case 0: // Byte encoding table
                item.glyphIdArray = [];
                for(i=0; i < 256; i+=1){
                    item.glyphIdArray.push(me.buffer.readUInt8(suboffset)); suboffset+=1;
                }
                break;
            case 4: // Segment mapping to delta values
                item.segCountX2 = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.searchRange = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.entrySelector = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.rangeShift = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.endCount = [];
                for(i=0; i < item.segCountX2/2; i+=1){
                    item.endCount.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                item.reservedPad = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                console.log('reservedPad',item.reservedPad)
                item.startCount = [];
                for(i=0; i < item.segCountX2/2; i+=1){
                    item.startCount.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                  
                item.idDelta = [];
                for(i=0; i < item.segCountX2/2; i+=1){
                    item.idDelta.push(me.buffer.readUInt8(suboffset)); suboffset+=1;
                }
                item.idRangeOffset = [];
                for(i=0; i < item.segCountX2/2; i+=1){
                    item.idRangeOffset.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                
                 
                item.glyphIdArray = [];
                for(i=0; i < item.segCountX2/2; i+=1){
                    item.glyphIdArray.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                break;
            case 6: // Trimmed table mapping
                item.firstCode = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.entryCount = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.glyphIdArray = [];
                
                for(i=0; i < item.entryCount; i+=1){
                    item.glyphIdArray.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                
                break;
            /*
            case 1:
                item.glyphIndexArray  = [];
                item.subHeaderKeys = [];
                for(i=0; i < 256; i+=1){
                    item.subHeaderKeys.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                for(i=0; i < item.length; i+=1){
                    item.glyphIndexArray.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                break;
            */
            default: 
                console.log('CMAP','format','Format '+item.format+' is not supported.');
                break;
                
        }
        console.log(item);
        
    }

    
}

exports.CMap = CMap;