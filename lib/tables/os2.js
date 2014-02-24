var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;


var OS2 = function(buffer){
    this.debug = false;
    this.buffer = buffer;
    return this;
}

butil.inherits(OS2,EventEmitter,{

});

OS2.prototype.read = function(offset){
    var string_offset,
        count,
        format_selector,
        j,
        me = this;
    
    

    me.version = me.buffer.readUInt16BE(offset);offset+=2;
    me.xAvgCharWidth = me.buffer.readInt16BE(offset);offset+=2;
    me.usWeightClass = me.buffer.readUInt16BE(offset);offset+=2;
    me.usWidthClass = me.buffer.readUInt16BE(offset);offset+=2;
    me.fsType = me.buffer.readUInt16BE(offset);offset+=2;
    me.ySubscriptXSize = me.buffer.readInt16BE(offset);offset+=2;
    me.ySubscriptYSize = me.buffer.readInt16BE(offset);offset+=2;
    me.ySubscriptXOffset = me.buffer.readInt16BE(offset);offset+=2;
    me.ySubscriptYOffset = me.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptXSize = me.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptYSize = me.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptXOffset = me.buffer.readInt16BE(offset);offset+=2;
    me.ySuperscriptYOffset = me.buffer.readInt16BE(offset);offset+=2;
    me.yStrikeoutSize = me.buffer.readInt16BE(offset);offset+=2;
    me.yStrikeoutPosition = me.buffer.readInt16BE(offset);offset+=2;
    me.sFamilyClass = me.buffer.readInt16BE(offset);offset+=2;

    
    me.bFamilyType = me.buffer.readUInt8(offset);offset+=1;
    me.bSerifStyle = me.buffer.readUInt8(offset);offset+=1;
    me.bWeight = me.buffer.readUInt8(offset);offset+=1;
    me.bProportion = me.buffer.readUInt8(offset);offset+=1;
    me.bContrast = me.buffer.readUInt8(offset);offset+=1;
    me.bStrokeVariation = me.buffer.readUInt8(offset);offset+=1;
    me.bArmStyle = me.buffer.readUInt8(offset);offset+=1;
    me.bLetterform = me.buffer.readUInt8(offset);offset+=1;
    me.bMidline = me.buffer.readUInt8(offset);offset+=1;
    me.bXHeight = me.buffer.readUInt8(offset);offset+=1;

    me.ulUnicodeRange1 = me.buffer.readUInt32BE(offset);offset+=4;
    me.ulUnicodeRange2 = me.buffer.readUInt32BE(offset);offset+=4;
    me.ulUnicodeRange3 = me.buffer.readUInt32BE(offset);offset+=4;
    me.ulUnicodeRange4 = me.buffer.readUInt32BE(offset);offset+=4;
    
    me.achVendID = '';
    me.achVendID += String.fromCharCode(me.buffer.readUInt8(offset));offset+=1;
    me.achVendID += String.fromCharCode(me.buffer.readUInt8(offset));offset+=1;
    me.achVendID += String.fromCharCode(me.buffer.readUInt8(offset));offset+=1;
    me.achVendID += String.fromCharCode(me.buffer.readUInt8(offset));offset+=1;
    
    me.fsSelection = me.buffer.readInt16BE(offset);offset+=2;

    me.usFirstCharIndex = me.buffer.readUInt16BE(offset);offset+=2;
    me.usLastCharIndex = me.buffer.readUInt16BE(offset);offset+=2;
    me.sTypoAscender = me.buffer.readInt16BE(offset);offset+=2;
    me.sTypoDescender = me.buffer.readInt16BE(offset);offset+=2;
    me.sTypoLineGap = me.buffer.readInt16BE(offset);offset+=2;
    me.usWinAscent = me.buffer.readUInt16BE(offset);offset+=2;
    me.usWinDescent = me.buffer.readUInt16BE(offset);offset+=2;
    if (me.version>0){
        me.ulCodePageRange1 = me.buffer.readUInt32BE(offset);offset+=4;
        me.ulCodePageRange2 = me.buffer.readUInt32BE(offset);offset+=4;
        if (me.version>1){
            me.sxHeight = me.buffer.readInt16BE(offset);offset+=2;
            me.sCapHeight = me.buffer.readInt16BE(offset);offset+=2;
            me.usDefaultChar = me.buffer.readUInt16BE(offset);offset+=2;
            me.usBreakChar = me.buffer.readUInt16BE(offset);offset+=2;
            me.usMaxContext = me.buffer.readUInt16BE(offset);offset+=2;
        }
    }
    //console.log(me);
    if (me.version>3){
        console.log(me.version,'is not supported');
    }    
    
    me.emit('readed');
}

exports.OS2 = OS2;