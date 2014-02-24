var readUInt24BE  = function (buf, offset, noAssert) {
  return buf.readUInt8(offset, noAssert) << 16 | buf.readUInt16BE(offset + 1, noAssert);
}
exports.readUInt24BE = readUInt24BE;
