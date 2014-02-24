var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var SVG = function(buffer,length,font){
    this.buffer = buffer;
    this._blength = length;
    this._font = font;
    this.debug = false;
    return this;
}

butil.inherits(SVG,EventEmitter,{

});

SVG.prototype.read = function(offset){
    var me = this,
        startOffset = offset,
        j;

     
    me.version = me.buffer.readUInt16BE(offset); offset+=2;

    switch (me.version){
        case 0:
            me.offsetToSVGDocIndex  = me.buffer.readUInt32BE(offset); offset+=4;
            me.reserved  = me.buffer.readUInt32BE(offset); offset+=4;
            me.numEntries  = me.buffer.readUInt16BE(offset); offset+=2;
            me.glyphs = [];
            for(j=0; j < me.numEntries; j+=1){
                var item = {};
                item.startGlyphId = me.buffer.readUInt16BE(offset); offset+=2;
                item.endGlyphId = me.buffer.readUInt16BE(offset); offset+=2;
                item.documentOffset = me.buffer.readUInt32BE(offset); offset+=4;
                item.documentLength = me.buffer.readUInt32BE(offset); offset+=4;
                item.svg = me.buffer.slice(item.documentOffset+startOffset+me.offsetToSVGDocIndex,item.documentOffset+startOffset+me.offsetToSVGDocIndex+item.documentLength).toString('utf8');
                me.glyphs.push(item);
            }
            break;
        case 1:
            me.numIndices  = me.buffer.readUInt16BE(offset); offset+=2;
            me.glyphs = [];

            for(j=0; j < me.numIndices; j+=1){
                var item = {};
                item.startGlyphId = me.buffer.readUInt16BE(offset); offset+=2;
                item.endGlyphId = me.buffer.readUInt16BE(offset); offset+=2;
                item.documentOffset = me.buffer.readUInt32BE(offset); offset+=4;
                item.documentLength = me.buffer.readUInt32BE(offset); offset+=4;
                item.svg = me.buffer.slice(item.documentOffset+startOffset,item.documentOffset+startOffset+item.documentLength).toString('utf8');
                me.glyphs.push(item);
            }
            break;
        default:
            console.log('SVG','unsupported version *'+me.version+'*');
            break;
    }
    //if (me.debug===true){
        console.log('SVG','version',me);
    //}

    me.emit('readed',me);
}

exports.SVG = SVG;