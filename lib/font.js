var OS2 = require('./tables/os2').OS2,
    Name = require('./tables/name').Name,
    Head = require('./tables/head').Head,
    CMap = require('./tables/cmap').CMap,
    FPGM = require('./tables/fpgm').FPGM,
    LOCA = require('./tables/loca').LOCA,
    CVT  = require('./tables/cvt').CVT,
    GLYF  = require('./tables/glyf').GLYF,
    PREP  = require('./tables/prep').PREP,
    HHea  = require('./tables/hhea').HHea,
    fs = require('fs');

var Font = function(){
    this.debug = false;
    this.tables = {};
    return this;
}

Font.prototype.READER = {};

Font.prototype.registerReader = function(tag,reader){
    this.READER[tag] = reader;
}


Font.prototype.read = function(fileName,cb){
    var me = this;
    fs.readFile(fileName,function(err,buffer){
        if (err) {
            console.log(err);
            return err;
        }
        var numberOfTables = 0,
            i,
            tag,
            offset;

        me.buffer = buffer;
        if (me.debug===true){
            console.log('filesize',Math.round(buffer.length/1024),'kB');
        }
        offset = 0;
        me.tags = [];
        me.version = '' + me.buffer.readInt16BE(offset); offset+=2;
        me.version += '.' + me.buffer.readInt16BE(offset); offset+=2;
        me.numberOfTables = buffer.readUInt16BE(offset);offset+=2;
        me.searchRange = buffer.readUInt16BE(offset);offset+=2;
        me.entrySelector = buffer.readUInt16BE(offset);offset+=2;
        me.rangeShift = buffer.readUInt16BE(offset);offset+=2;

        if (me.debug===true){
            console.log('FONT','version',me.version);
            console.log('FONT','numberOfTables',me.numberOfTables);
            console.log('FONT','searchRange',me.searchRange);
            console.log('FONT','entrySelector',me.entrySelector);
            console.log('FONT','rangeShift',me.rangeShift);
        }

        for (i=0; i < me.numberOfTables; i+=1 ){
            var item = {};
            item.tag = String.fromCharCode( me.buffer.readUInt8(offset) ); offset+=1;
            item.tag += String.fromCharCode( me.buffer.readUInt8(offset) ); offset+=1;
            item.tag += String.fromCharCode( me.buffer.readUInt8(offset) ); offset+=1;
            item.tag += String.fromCharCode( me.buffer.readUInt8(offset) ); offset+=1;
            item.checkSum = me.buffer.readUInt32BE(offset); offset+=4;
            item.offset = me.buffer.readUInt32BE(offset); offset+=4;
            item.length = me.buffer.readUInt32BE(offset); offset+=4;
            me.tags.push(item);

            if (typeof me.READER[item.tag]=='undefined'){
                console.log('*not implemented table found',item.tag,i, item.length);
            }else{
                //console.log(tag);
                var fr = new me.READER[item.tag](buffer,item.length,me);
                fr.read( item.offset );
                me.tables[item.tag]=fr;
            }

        }
        if (me.debug===true){
            console.log(me.tags);
        }

        if (typeof cb=='function'){
            cb();
        }
    });
}

Font.prototype.calcTableCheckSum = function(table,length){
    var sum = 0,
        end = table + ( ( (length + 3) & ~3 ) / (32^2) );
    while (table < end){
        sum += table++;
    }
    return sum;
/*
ULONG
CalcTableChecksum(ULONG *Table, ULONG Length)
{
ULONG Sum = 0L;
ULONG *Endptr = Table+((Length+3) & ~3) / sizeof(ULONG);
while (Table < EndPtr)
	Sum += *Table++;
return Sum;
}
*/
}
Font.prototype.READER['OS/2'] = OS2;
Font.prototype.READER['name'] = Name;
Font.prototype.READER['head'] = Head;
Font.prototype.READER['cmap'] = CMap;
Font.prototype.READER['fpgm'] = FPGM;
Font.prototype.READER['loca'] = LOCA;
Font.prototype.READER['cvt '] = CVT;
Font.prototype.READER['glyf'] = GLYF;
Font.prototype.READER['prep'] = PREP;
Font.prototype.READER['hhea'] = HHea;


exports.Font = Font;