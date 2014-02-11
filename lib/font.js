var OS2Reader = require('./tables/os2').OS2Reader,
    NameReader = require('./tables/name').NameReader;

var Font = function(){
    return this;
}

Font.prototype.READER = {};

Font.prototype.registerReader = function(tag,reader){
    this.READER[tag] = reader;
}


Font.prototype.read = function(fileName){
    var me = this;
    fs.readFile(fileName,function(err,buffer){
        if (err) {
            console.log(err);
            return err;
        }
        var numberOfTables = 0,
            i,
            tag;
        console.log('filesize',Math.round(buffer.length/1024),'kB');
        console.log('number of tables',buffer.readUInt16BE(4));
        
        
        numberOfTables = buffer.readInt16BE(4);
        for (i=0; i < numberOfTables; i+=1 ){
            tag = String.fromCharCode( buffer.readUInt8(12 + i*16) );
            tag += String.fromCharCode( buffer.readUInt8(12 + i*16 + 1) );
            tag += String.fromCharCode( buffer.readUInt8(12 + i*16 + 2) );
            tag += String.fromCharCode( buffer.readUInt8(12 + i*16 + 3) );
            
            if (typeof me.READER[tag]=='undefined'){
                console.log('*not implemented table found',tag,i);
            }else{
                
                var fr = new me.READER[tag](buffer);
                fr.read( buffer.readUInt16BE(12 + i*16 +8));
            }
        }
    });
}

Font.prototype.READER['OS/2'] = OS2Reader;
Font.prototype.READER['name'] = NameReader;

exports.Font = Font;