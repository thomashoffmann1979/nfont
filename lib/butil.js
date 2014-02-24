var readUInt24BE  = function (buf, offset, noAssert) {
  return buf.readUInt8(offset, noAssert) << 16 | buf.readUInt16BE(offset + 1, noAssert);
}
exports.readUInt24BE = readUInt24BE;

exports.inherits=function(ctor, superCtor, proto) {

    var props = {
        constructor: { value: ctor, writable: true, configurable: true }
    };
    Object.getOwnPropertyNames(proto).forEach(function(name) {
        props[name] = Object.getOwnPropertyDescriptor(proto, name);
    });
    ctor.prototype = Object.create(superCtor.prototype, props);
    ctor.super_ = superCtor;
}