function bin2hex(buffer) {
  var i, f = 0, a = [], data = new Uint8Array(buffer);
  f = data.length;
  for (i = 0; i < f; i++) {
    a[i] = data[i].toString(16).replace(/^([\da-f])$/, "0$1");
  }
  return a.join('');
}

function hex2bin(str) {
  var i, data, HEX = "0123456789abcdef";
  data = new Uint8Array(new ArrayBuffer(str.length >> 1));
  str = str.toLowerCase();
  for (i = 0; i < str.length; i += 2) {
    data[i>>1] = HEX.indexOf(str.charAt(i)) << 4 | HEX.indexOf(str.charAt(i+1));
  }
  return data.buffer;
}
