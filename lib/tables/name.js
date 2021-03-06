var butil = require('../butil'),
    EventEmitter = require('events').EventEmitter;

var LCID = [];
LCID[1078] = "Afrikaans";
LCID[1052] = "Albanian";
LCID[1156] = "Alsatian";
LCID[1118] = "Amharic";
LCID[5121] = "Arabic";
LCID[15361] = "Arabic";
LCID[3073] = "Arabic";
LCID[2049] = "Arabic";
LCID[11265] = "Arabic";
LCID[13313] = "Arabic";
LCID[12289] = "Arabic";
LCID[4097] = "Arabic";
LCID[6145] = "Arabic";
LCID[8193] = "Arabic";
LCID[16385] = "Arabic";
LCID[1025] = "Arabic";
LCID[10241] = "Arabic";
LCID[7169] = "Arabic";
LCID[14337] = "Arabic";
LCID[9217] = "Arabic";
LCID[1067] = "Armenian";
LCID[1101] = "Assamese";
LCID[2092] = "Azeri (Cyrillic)";
LCID[1068] = "Azeri (Latin)";
LCID[1133] = "Bashkir";
LCID[1069] = "Basque";
LCID[1059] = "Belarusian";
LCID[2117] = "Bengali";
LCID[1093] = "Bengali";
LCID[8218] = "Bosnian (Cyrillic)";
LCID[5146] = "Bosnian (Latin)";
LCID[1150] = "Breton";
LCID[1026] = "Bulgarian";
LCID[1027] = "Catalan";
LCID[3076] = "Chinese";
LCID[5124] = "Chinese";
LCID[2052] = "Chinese";
LCID[4100] = "Chinese";
LCID[1028] = "Chinese";
LCID[1155] = "Corsican";
LCID[1050] = "Croatian";
LCID[4122] = "Croatian (Latin)";
LCID[1029] = "Czech";
LCID[1030] = "Danish";
LCID[1164] = "Dari";
LCID[1125] = "Divehi";
LCID[2067] = "Dutch";
LCID[1043] = "Dutch";
LCID[3081] = "English";
LCID[10249] = "English";
LCID[4105] = "English";
LCID[9225] = "English";
LCID[16393] = "English";
LCID[6153] = "English";
LCID[8201] = "English";
LCID[17417] = "English";
LCID[5129] = "English";
LCID[13321] = "English";
LCID[18441] = "English";
LCID[7177] = "English";
LCID[11273] = "English";
LCID[2057] = "English";
LCID[1033] = "English";
LCID[12297] = "English";
LCID[1061] = "Estonian";
LCID[1080] = "Faroese";
LCID[1124] = "Filipino";
LCID[1035] = "Finnish";
LCID[2060] = "French";
LCID[3084] = "French";
LCID[1036] = "French";
LCID[5132] = "French";
LCID[6156] = "French";
LCID[4108] = "French";
LCID[1122] = "Frisian";
LCID[1110] = "Galician";
LCID[1079] = "Georgian";
LCID[3079] = "German";
LCID[1031] = "German";
LCID[5127] = "German";
LCID[4103] = "German";
LCID[2055] = "German";
LCID[1032] = "Greek";
LCID[1135] = "Greenlandic";
LCID[1095] = "Gujarati";
LCID[1128] = "Hausa (Latin)";
LCID[1037] = "Hebrew";
LCID[1081] = "Hindi";
LCID[1038] = "Hungarian";
LCID[1039] = "Icelandic";
LCID[1136] = "Igbo";
LCID[1057] = "Indonesian";
LCID[1117] = "Inuktitut";
LCID[2141] = "Inuktitut (Latin)";
LCID[2108] = "Irish";
LCID[1076] = "isiXhosa";
LCID[1077] = "isiZulu";
LCID[1040] = "Italian";
LCID[2064] = "Italian";
LCID[1041] = "Japanese";
LCID[1099] = "Kannada";
LCID[1087] = "Kazakh";
LCID[1107] = "Khmer";
LCID[1158] = "K'iche";
LCID[1159] = "Kinyarwanda";
LCID[1089] = "Kiswahili";
LCID[1111] = "Konkani";
LCID[1042] = "Korean";
LCID[1088] = "Kyrgyz";
LCID[1108] = "Lao";
LCID[1062] = "Latvian";
LCID[1063] = "Lithuanian";
LCID[2094] = "Lower Sorbian";
LCID[1134] = "Luxembourgish";
LCID[1071] = "Macedonian (FYROM)";
LCID[2110] = "Malay";
LCID[1086] = "Malay";
LCID[1100] = "Malayalam";
LCID[1082] = "Maltese";
LCID[1153] = "Maori";
LCID[1146] = "Mapudungun";
LCID[1102] = "Marathi";
LCID[1148] = "Mohawk";
LCID[1104] = "Mongolian (Cyrillic)";
LCID[2128] = "Mongolian (Traditional)";
LCID[1121] = "Nepali";
LCID[1044] = "Norwegian (Bokmal)";
LCID[2068] = "Norwegian (Nynorsk)";
LCID[1154] = "Occitan";
LCID[1096] = "Oriya";
LCID[1123] = "Pashto";
LCID[1045] = "Polish";
LCID[1046] = "Portuguese";
LCID[2070] = "Portuguese";
LCID[1094] = "Punjabi";
LCID[1131] = "Quechua";
LCID[2155] = "Quechua";
LCID[3179] = "Quechua";
LCID[1048] = "Romanian";
LCID[1047] = "Romansh";
LCID[1049] = "Russian";
LCID[9275] = "Sami (Inari)";
LCID[4155] = "Sami (Lule)";
LCID[5179] = "Sami (Lule)";
LCID[3131] = "Sami (Northern)";
LCID[1083] = "Sami (Northern)";
LCID[2107] = "Sami (Northern)";
LCID[8251] = "Sami (Skolt)";
LCID[6203] = "Sami (Southern)";
LCID[7227] = "Sami (Southern)";
LCID[1103] = "Sanskrit";
LCID[7194] = "Serbian (Cyrillic)";
LCID[3098] = "Serbian (Cyrillic)";
LCID[6170] = "Serbian (Latin)";
LCID[2074] = "Serbian (Latin)";
LCID[1132] = "Sesotho sa Leboa";
LCID[1074] = "Setswana";
LCID[1115] = "Sinhala";
LCID[1051] = "Slovak";
LCID[1060] = "Slovenian";
LCID[11274] = "Spanish";
LCID[16394] = "Spanish";
LCID[13322] = "Spanish";
LCID[9226] = "Spanish";
LCID[5130] = "Spanish";
LCID[7178] = "Spanish";
LCID[12298] = "Spanish";
LCID[17418] = "Spanish";
LCID[4106] = "Spanish";
LCID[18442] = "Spanish";
LCID[2058] = "Spanish";
LCID[19466] = "Spanish";
LCID[6154] = "Spanish";
LCID[15370] = "Spanish";
LCID[10250] = "Spanish";
LCID[20490] = "Spanish";
LCID[3082] = "Spanish (Modern Sort)";
LCID[1034] = "Spanish (Traditional Sort)";
LCID[21514] = "Spanish";
LCID[14346] = "Spanish";
LCID[8202] = "Spanish";
LCID[2077] = "Sweden";
LCID[1053] = "Swedish";
LCID[1114] = "Syriac";
LCID[1064] = "Tajik (Cyrillic)";
LCID[2143] = "Tamazight (Latin)";
LCID[1097] = "Tamil";
LCID[1092] = "Tatar";
LCID[1098] = "Telugu";
LCID[1054] = "Thai";
LCID[1105] = "Tibetan";
LCID[1055] = "Turkish";
LCID[1090] = "Turkmen";
LCID[1152] = "Uighur";
LCID[1058] = "Ukrainian";
LCID[1070] = "Upper Sorbian";
LCID[1056] = "Urdu";
LCID[2115] = "Uzbek (Cyrillic)";
LCID[1091] = "Uzbek (Latin)";
LCID[1066] = "Vietnamese";
LCID[1106] = "Welsh";
LCID[1096] = "Wolof";
LCID[1157] = "Yakut";
LCID[1144] = "Yi";
LCID[1130] = "Yoruba";

var Name = function(buffer){
    this.debug = false;
    this.buffer = buffer;
    this._nameRecords = {};
    this._langTagRecords = [];
    this._currentPlattformID = 0;
    this._currentLanguageID = 0;
    this._formatSelector = 0;
    return this;
}

butil.inherits(Name,EventEmitter,{
    
    get plattformID () { return this._currentPlattformID; },
    set plattformID (v) { this._currentPlattformID = v; return this; },
    
    get languageID () { return this._currentLanguageID; },
    set languageID (v) { this._currentLanguageID = v; return this; },
    
    get formatSelector () { return this._formatSelector; },
    set formatSelector (v) { this._formatSelector = v; return this; },
    
    get nameRecords () { return this._nameRecords['platform'+this._currentPlattformID]; },
    set nameRecords (v) { this._nameRecords['platform'+this._currentPlattformID] = v; return this; },

    get copyRightNotice () { return this.readText(0); },
    get fontFamily () { return this.readText(1); },
    get subFontFamily () { return this.readText(2); },
    get uniqueFontID () { return this.readText(3); },
    get fullFontName () { return this.readText(4); },
    get version () { return this.readText(5); },
    get postscriptName () { return this.readText(6); },
    get trademark () { return this.readText(7); },
    get manufacturerName () { return this.readText(8); },
    get designer () { return this.readText(9); },
    get description () { return this.readText(10); },
    get vendorURL () { return this.readText(11); },
    get designerURL () { return this.readText(12); },
    get licenseDescription  () { return this.readText(13); },
    get licenseInfoURL  () { return this.readText(14); },
    // 15 is reserved
    get prefferedFont  () { return this.readText(16); },
    get prefferedSubfamily  () { return this.readText(17); },
    get compatibleFull  () { return this.readText(18); },
    get sampleText  () { return this.readText(19); },
    get postscriptCID  () { return this.readText(20); },
    get wwsFamilyName  () { return this.readText(21); },
    get wwsSubfamilyName  () { return this.readText(22); }

});

Name.prototype.readText = function(id){
    var item = this._nameRecords['platform'+this._currentPlattformID]['name'+id+'-'+this._currentLanguageID];
    if (item){
        return item.text;
    }
    return '';
}

Name.prototype.read = function(offset){
    var startOffset = offset,
        me = this,
        j,
        i;
    
    me._formatSelector = this.buffer.readUInt16BE(offset); offset += 2;
    me._count = this.buffer.readUInt16BE(offset); offset += 2;
    me._stringOffset = this.buffer.readUInt16BE(offset) + startOffset; offset += 2;
    

    
    // reading name records
    for ( j=0; j< me._count; j+=1) {
        
        
        var nRecord = {};
        nRecord.platformID = me.buffer.readUInt16BE( offset ); offset += 2;
        
        nRecord.encodingID = me.buffer.readUInt16BE( offset ); offset += 2;
        nRecord.languageID = me.buffer.readUInt16BE( offset ); offset += 2;
        
        //console.log('lang',LCID[nRecord.languageID]);
        nRecord.nameID = me.buffer.readUInt16BE( offset ); offset += 2;
        nRecord.length = me.buffer.readUInt16BE( offset ); offset += 2;
        nRecord.offset = me.buffer.readUInt16BE( offset ); offset += 2;
        
        nRecord.text = '';
        for(i=0;i<nRecord.length;i+=1){
           nRecord.text += String.fromCharCode( this.buffer.readUInt8(me._stringOffset + nRecord.offset + i) );
        }
        
        if (typeof me._nameRecords['platform'+nRecord.platformID]=='undefined'){
            me._nameRecords['platform'+nRecord.platformID]={};
        }
        me._nameRecords['platform'+nRecord.platformID]['name'+nRecord.nameID+'-'+nRecord.languageID]=(nRecord);
    }
    
    if ( me._formatSelector == 1 ){
        me._langTagCount = me.buffer.readUInt16BE( offset ); offset += 2;
        for ( j=0; j< me._langTagCount; j+=1) {
            var ltRecord = {};
            ltRecord.length = me.buffer.readUInt16BE( offset ); offset += 2;
            ltRecord.offset = me.buffer.readUInt16BE( offset ); offset += 2;
            me._langTagRecords.push(ltRecord);
        }
    }
    if (me.debug===true){
        console.log('NAME', me._nameRecords['platform1']);
    }
    
    me.emit('readed',me);
}



exports.Name = Name;