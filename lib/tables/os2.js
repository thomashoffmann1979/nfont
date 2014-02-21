

var OS2Reader = function(buffer){
    this.buffer = buffer;
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

    
    me.bFamilyType = this.buffer.readUInt8(offset);offset+=1;
    me.bSerifStyle = this.buffer.readUInt8(offset);offset+=1;
    me.bWeight = this.buffer.readUInt8(offset);offset+=1;
    me.bProportion = this.buffer.readUInt8(offset);offset+=1;
    me.bContrast = this.buffer.readUInt8(offset);offset+=1;
    me.bStrokeVariation = this.buffer.readUInt8(offset);offset+=1;
    me.bArmStyle = this.buffer.readUInt8(offset);offset+=1;
    me.bLetterform = this.buffer.readUInt8(offset);offset+=1;
    me.bMidline = this.buffer.readUInt8(offset);offset+=1;
    me.bXHeight = this.buffer.readUInt8(offset);offset+=1;

    me.ulUnicodeRange1 = this.buffer.readUInt32BE(offset);offset+=4;
    me.ulUnicodeRange2 = this.buffer.readUInt32BE(offset);offset+=4;
    me.ulUnicodeRange3 = this.buffer.readUInt32BE(offset);offset+=4;
    me.ulUnicodeRange4 = this.buffer.readUInt32BE(offset);offset+=4;
    
    me.achVendID = '';
    me.achVendID += String.fromCharCode(this.buffer.readUInt8(offset));offset+=1;
    me.achVendID += String.fromCharCode(this.buffer.readUInt8(offset));offset+=1;
    me.achVendID += String.fromCharCode(this.buffer.readUInt8(offset));offset+=1;
    me.achVendID += String.fromCharCode(this.buffer.readUInt8(offset));offset+=1;
    
    me.fsSelection = this.buffer.readInt16BE(offset);offset+=2;

    me.usFirstCharIndex = this.buffer.readUInt16BE(offset);offset+=2;
    me.usLastCharIndex = this.buffer.readUInt16BE(offset);offset+=2;
    me.sTypoAscender = this.buffer.readInt16BE(offset);offset+=2;
    me.sTypoDescender = this.buffer.readInt16BE(offset);offset+=2;
    me.sTypoLineGap = this.buffer.readInt16BE(offset);offset+=2;
    me.usWinAscent = this.buffer.readUInt16BE(offset);offset+=2;
    me.usWinDescent = this.buffer.readUInt16BE(offset);offset+=2;
    if (me.version>0){
        me.ulCodePageRange1 = this.buffer.readUInt32BE(offset);offset+=4;
        me.ulCodePageRange2 = this.buffer.readUInt32BE(offset);offset+=4;
        if (me.version>1){
            me.sxHeight = this.buffer.readInt16BE(offset);offset+=2;
            me.sCapHeight = this.buffer.readInt16BE(offset);offset+=2;
            me.usDefaultChar = this.buffer.readUInt16BE(offset);offset+=2;
            me.usBreakChar = this.buffer.readUInt16BE(offset);offset+=2;
            me.usMaxContext = this.buffer.readUInt16BE(offset);offset+=2;
        }
    }
    console.log(me);
    if (me.version>3){
        console.log(me.version,'is not supported');
    }    
}

exports.OS2Reader = OS2Reader;