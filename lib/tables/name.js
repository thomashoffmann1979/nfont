
var NameReader = function(buffer){
    this.buffer = buffer;
    return this;
}
NameReader.prototype.read = function(offset){
    var string_offset,
        count,
        format_selector,
        j;
    console.log(offset);
    format_selector = this.buffer.readUInt16BE(offset);
    count = this.buffer.readUInt16BE(offset+2);
    string_offset = this.buffer.readUInt16BE(offset+4);
    console.log('format_selector',format_selector);
    console.log('count',count);
    console.log('string_offset',string_offset);
    
    if ( format_selector == 1 ){
        throw new Error('format_selector 1 is not implemented yet');
    }
    
    for ( j=0; j< count; j+=1) {
        platformID = this.buffer.readUInt16BE( offset+6+j*12+0 );
        encodingID = this.buffer.readUInt16BE( offset+6+j*12+2 );
        languageID = this.buffer.readUInt16BE( offset+6+j*12+4 );
        nameID = this.buffer.readUInt16BE( offset+6+j*12+6 );
        length = this.buffer.readUInt16BE( offset+6+j*12+8 );
        noffset = this.buffer.readUInt16BE( offset+6+j*12+10 );
        
    }
    
}

exports.Name = Name;