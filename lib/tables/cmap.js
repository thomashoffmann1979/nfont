var butil = require('../butil');

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
        i,
        w;

    me.version  = me.buffer.readUInt16BE(offset); offset+=2;
    me.numTables  = me.buffer.readUInt16BE(offset); offset+=2;
    me.items = [];
    for(j=0;j<me.numTables;j+=1){
        var item = {},
            suboffset = 0;
        item.platformID = me.buffer.readUInt16BE(offset); offset+=2;
        item.encodingID = me.buffer.readUInt16BE(offset); offset+=2;
        item.offset = me.buffer.readUInt32BE(offset); offset+=4;
        
        suboffset = startOffset + item.offset;
        item.format = me.buffer.readUInt16BE(suboffset); suboffset+=2;
        switch(item.format){
            case 0: // Byte encoding table
                item.length = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.language = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.glyphIdArray = [];
                for(i=0; i < 256; i+=1){
                    item.glyphIdArray.push(me.buffer.readUInt8(suboffset)); suboffset+=1;
                }
                break;
            case 4: // Segment mapping to delta values
                item.length = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.language = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.segCountX2 = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.searchRange = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.entrySelector = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.rangeShift = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.endCount = [];
                for(i=0; i < item.segCountX2/2; i+=1){
                    item.endCount.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                item.reservedPad = me.buffer.readUInt16BE(suboffset); suboffset+=2;
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
                item.length = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.language = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.firstCode = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.entryCount = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.glyphIdArray = [];
                
                for(i=0; i < item.entryCount; i+=1){
                    item.glyphIdArray.push(me.buffer.readUInt16BE(suboffset)); suboffset+=2;
                }
                
                break;
            case 12: // Segmented coverage
                item.reserved = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.length = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                item.language = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                item.nGroups = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                
                item.Groups = [];
                for(i=0; i < item.nGroups; i+=1){
                    var group = {};
                    group.startCharCode = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    group.endCharCode = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    group.startGlyphID = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    item.Groups.push(group); 
                }
                break;
            case 13: // Last Resort Font
                item.reserved = me.buffer.readUInt16BE(suboffset); suboffset+=2;
                item.length = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                item.language = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                item.nGroups = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                
                
                item.Groups = [];
                for(i=0; i < item.nGroups; i+=1){
                    var group = {};
                    group.startCharCode = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    group.endCharCode = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    group.glyphID = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    item.Groups.push(group); 
                }
                break;
            case 14: // Unicode Variation Sequences
                item.length = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                item.numVarSelectorRecords = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                item.Records = [];
                for(i=0; i < item.numVarSelectorRecords; i+=1){
                    var record = {};
                    record.varSelector = butil.readUInt24BE(me.buffer,suboffset); suboffset+=3;
                    record.defaultUVSOffset = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    record.nonDefaultUVSOffset = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                    if ( record.defaultUVSOffset !== 0 ){
                        record.defaultUVS = [];
                        record.numUnicodeValueRanges = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                        for(w=0;w<record.numUnicodeValueRanges;w+=1){
                            record.defaultUVS.push({
                                startUnicodeValue: butil.readUInt24BE(me.buffer,suboffset), 
                                additionalCount: me.buffer.readUInt8(suboffset+3)
                            });
                            suboffset+=4;
                        }
                    }else if ( record.nonDefaultUVSOffset !== 0 ){
                        record.nonDefaultUVS = [];
                        record.numUVSMappings  = me.buffer.readUInt32BE(suboffset); suboffset+=4;
                        for(w=0;w<record.numUVSMappings ;w+=1){
                            record.defaultUVS.push({
                                unicodeValue: butil.readUInt24BE(me.buffer,suboffset), 
                                glyphID: me.buffer.readUInt16BE(suboffset+3)
                            });
                            suboffset+=5;
                        }
                    }
                    item.Records.push(record); 
                }
                break;
            /* Don't understand this table format at this time
            case 2:
                item.length = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                item.language = me.buffer.readUInt32BE(suboffset); suboffset+=4; 
                
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
        //console.log(item);
        me.items.push(item);
    }

    
}

exports.CMap = CMap;