/* ***** BEGIN LICENSE BLOCK *****
 *
 * Copyright 2011 Jean-Christophe Sirot <sirot@chelonix.com>
 *
 * This file is part of digest.js
 *
 * digest.js is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * digest.js is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * digest.js. If not, see http://www.gnu.org/licenses/.
 *
 * ***** END LICENSE BLOCK *****  */

var utils = {
    add: function (x, y) {
        return (x + y) & 0xFFFFFFFF;
    },

    add3: function (a, b, c) {
        return (a + b + c) & 0xFFFFFFFF;
    },

    add4: function (a, b, c, d) {
        return (a + b + c + d) & 0xFFFFFFFF;
    },

    add5: function (a, b, c, d, e) {
        return (a + b + c + d + e) & 0xFFFFFFFF;
    },

    leftrot: function (x, n) {
        return ((x << n) | (x >>> (32 - n))) & 0xFFFFFFFF;
    }
};

function md5Engine() {}

md5Engine.prototype.processBlock = function (input) {
    var LR = utils.leftrot;
    var ADD = utils.add;
    var ADD4 = utils.add4;

    var data = new DataView(input.buffer, 0, input.length);
    var A = this.current[0];
    var B = this.current[1];
    var C = this.current[2];
    var D = this.current[3];

    var W0 = data.getUint32(0, true);
    A = ADD(B, LR(ADD4(A, W0, 0xD76AA478, (B & C) | (~B & D)), 7));
    var W1 = data.getUint32(4, true);
    D = ADD(A, LR(ADD4(D, W1, 0xE8C7B756, (A & B) | (~A & C)), 12));
    var W2 = data.getUint32(8, true);
    C = ADD(D, LR(ADD4(C, W2, 0x242070DB, (D & A) | (~D & B)), 17));
    var W3 = data.getUint32(12, true);
    B = ADD(C, LR(ADD4(B, W3, 0xC1BDCEEE, (C & D) | (~C & A)), 22));
    var W4 = data.getUint32(16, true);
    A = ADD(B, LR(ADD4(A, W4, 0xF57C0FAF, (B & C) | (~B & D)), 7));
    var W5 = data.getUint32(20, true);
    D = ADD(A, LR(ADD4(D, W5, 0x4787C62A, (A & B) | (~A & C)), 12));
    var W6 = data.getUint32(24, true);
    C = ADD(D, LR(ADD4(C, W6, 0xA8304613, (D & A) | (~D & B)), 17));
    var W7 = data.getUint32(28, true);
    B = ADD(C, LR(ADD4(B, W7, 0xFD469501, (C & D) | (~C & A)), 22));
    var W8 = data.getUint32(32, true);
    A = ADD(B, LR(ADD4(A, W8, 0x698098D8, (B & C) | (~B & D)), 7));
    var W9 = data.getUint32(36, true);
    D = ADD(A, LR(ADD4(D, W9, 0x8B44F7AF, (A & B) | (~A & C)), 12));
    var Wa = data.getUint32(40, true);
    C = ADD(D, LR(ADD4(C, Wa, 0xFFFF5BB1, (D & A) | (~D & B)), 17));
    var Wb = data.getUint32(44, true);
    B = ADD(C, LR(ADD4(B, Wb, 0x895CD7BE, (C & D) | (~C & A)), 22));
    var Wc = data.getUint32(48, true);
    A = ADD(B, LR(ADD4(A, Wc, 0x6B901122, (B & C) | (~B & D)), 7));
    var Wd = data.getUint32(52, true);
    D = ADD(A, LR(ADD4(D, Wd, 0xFD987193, (A & B) | (~A & C)), 12));
    var We = data.getUint32(56, true);
    C = ADD(D, LR(ADD4(C, We, 0xA679438E, (D & A) | (~D & B)), 17));
    var Wf = data.getUint32(60, true);
    B = ADD(C, LR(ADD4(B, Wf, 0x49B40821, (C & D) | (~C & A)), 22));

    A = ADD(B, LR(ADD4(A, W1, 0xF61E2562, (D & B) | (~D & C)), 5));
    D = ADD(A, LR(ADD4(D, W6, 0xC040B340, (C & A) | (~C & B)), 9));
    C = ADD(D, LR(ADD4(C, Wb, 0x265E5A51, (B & D) | (~B & A)), 14));
    B = ADD(C, LR(ADD4(B, W0, 0xE9B6C7AA, (A & C) | (~A & D)), 20));
    A = ADD(B, LR(ADD4(A, W5, 0xD62F105D, (D & B) | (~D & C)), 5));
    D = ADD(A, LR(ADD4(D, Wa,  0x2441453, (C & A) | (~C & B)), 9));
    C = ADD(D, LR(ADD4(C, Wf, 0xD8A1E681, (B & D) | (~B & A)), 14));
    B = ADD(C, LR(ADD4(B, W4, 0xE7D3FBC8, (A & C) | (~A & D)), 20));
    A = ADD(B, LR(ADD4(A, W9, 0x21E1CDE6, (D & B) | (~D & C)), 5));
    D = ADD(A, LR(ADD4(D, We, 0xC33707D6, (C & A) | (~C & B)), 9));
    C = ADD(D, LR(ADD4(C, W3, 0xF4D50D87, (B & D) | (~B & A)), 14));
    B = ADD(C, LR(ADD4(B, W8, 0x455A14ED, (A & C) | (~A & D)), 20));
    A = ADD(B, LR(ADD4(A, Wd, 0xA9E3E905, (D & B) | (~D & C)), 5));
    D = ADD(A, LR(ADD4(D, W2, 0xFCEFA3F8, (C & A) | (~C & B)), 9));
    C = ADD(D, LR(ADD4(C, W7, 0x676F02D9, (B & D) | (~B & A)), 14));
    B = ADD(C, LR(ADD4(B, Wc, 0x8D2A4C8A, (A & C) | (~A & D)), 20));

    A = ADD(B, LR(ADD4(A, W5, 0xFFFA3942, B ^ C ^ D), 4));
    D = ADD(A, LR(ADD4(D, W8, 0x8771F681, A ^ B ^ C), 11));
    C = ADD(D, LR(ADD4(C, Wb, 0x6D9D6122, D ^ A ^ B), 16));
    B = ADD(C, LR(ADD4(B, We, 0xFDE5380C, C ^ D ^ A), 23));
    A = ADD(B, LR(ADD4(A, W1, 0xA4BEEA44, B ^ C ^ D), 4));
    D = ADD(A, LR(ADD4(D, W4, 0x4BDECFA9, A ^ B ^ C), 11));
    C = ADD(D, LR(ADD4(C, W7, 0xF6BB4B60, D ^ A ^ B), 16));
    B = ADD(C, LR(ADD4(B, Wa, 0xBEBFBC70, C ^ D ^ A), 23));
    A = ADD(B, LR(ADD4(A, Wd, 0x289B7EC6, B ^ C ^ D), 4));
    D = ADD(A, LR(ADD4(D, W0, 0xEAA127FA, A ^ B ^ C), 11));
    C = ADD(D, LR(ADD4(C, W3, 0xD4EF3085, D ^ A ^ B), 16));
    B = ADD(C, LR(ADD4(B, W6,  0x4881D05, C ^ D ^ A), 23));
    A = ADD(B, LR(ADD4(A, W9, 0xD9D4D039, B ^ C ^ D), 4));
    D = ADD(A, LR(ADD4(D, Wc, 0xE6DB99E5, A ^ B ^ C), 11));
    C = ADD(D, LR(ADD4(C, Wf, 0x1FA27CF8, D ^ A ^ B), 16));
    B = ADD(C, LR(ADD4(B, W2, 0xC4AC5665, C ^ D ^ A), 23));

    A = ADD(B, LR(ADD4(A, W0, 0xf4292244, C ^ (B | ~D)), 6));
    D = ADD(A, LR(ADD4(D, W7, 0x432aff97, B ^ (A | ~C)), 10));
    C = ADD(D, LR(ADD4(C, We, 0xab9423a7, A ^ (D | ~B)), 15));
    B = ADD(C, LR(ADD4(B, W5, 0xfc93a039, D ^ (C | ~A)), 21));
    A = ADD(B, LR(ADD4(A, Wc, 0x655b59c3, C ^ (B | ~D)), 6));
    D = ADD(A, LR(ADD4(D, W3, 0x8f0ccc92, B ^ (A | ~C)), 10));
    C = ADD(D, LR(ADD4(C, Wa, 0xffeff47d, A ^ (D | ~B)), 15));
    B = ADD(C, LR(ADD4(B, W1, 0x85845dd1, D ^ (C | ~A)), 21));
    A = ADD(B, LR(ADD4(A, W8, 0x6fa87e4f, C ^ (B | ~D)), 6));
    D = ADD(A, LR(ADD4(D, Wf, 0xfe2ce6e0, B ^ (A | ~C)), 10));
    C = ADD(D, LR(ADD4(C, W6, 0xa3014314, A ^ (D | ~B)), 15));
    B = ADD(C, LR(ADD4(B, Wd, 0x4e0811a1, D ^ (C | ~A)), 21));
    A = ADD(B, LR(ADD4(A, W4, 0xf7537e82, C ^ (B | ~D)), 6));
    D = ADD(A, LR(ADD4(D, Wb, 0xbd3af235, B ^ (A | ~C)), 10));
    C = ADD(D, LR(ADD4(C, W2, 0x2ad7d2bb, A ^ (D | ~B)), 15));
    B = ADD(C, LR(ADD4(B, W9, 0xeb86d391, D ^ (C | ~A)), 21));

    this.current[0] += A;
    this.current[1] += B;
    this.current[2] += C;
    this.current[3] += D;
    this.currentLen += 64;
};

md5Engine.prototype.doPadding = function () {
    var datalen = (this.inLen + this.currentLen) * 8;
    var msw = 0; // FIXME
    var lsw = datalen & 0xFFFFFFFF;
    var zeros = this.inLen <= 55 ? 55 - this.inLen : 119 - this.inLen;
    var pad = new Uint8Array(new ArrayBuffer(zeros + 1 + 8));
    pad[0] = 0x80;
    pad[pad.length - 8] = lsw & 0xFF;
    pad[pad.length - 7] = (lsw >>> 8) & 0xFF;
    pad[pad.length - 6] = (lsw >>> 16) & 0xFF;
    pad[pad.length - 5] = (lsw >>> 24) & 0xFF;
    pad[pad.length - 4] = msw & 0xFF;
    pad[pad.length - 3] = (msw >>> 8) & 0xFF;
    pad[pad.length - 2] = (msw >>> 16) & 0xFF;
    pad[pad.length - 1] = (msw >>> 24) & 0xFF;
    return pad;
};

md5Engine.prototype.getDigest = function () {
    var rv = new Uint8Array(new ArrayBuffer(16));
    rv[0] = this.current[0] & 0xFF;
    rv[1] = (this.current[0] >>> 8) & 0xFF;
    rv[2] = (this.current[0] >>> 16) & 0xFF;
    rv[3] = (this.current[0] >>> 24) & 0xFF;
    rv[4] = this.current[1] & 0xFF;
    rv[5] = (this.current[1] >>> 8) & 0xFF;
    rv[6] = (this.current[1] >>> 16) & 0xFF;
    rv[7] = (this.current[1] >>> 24) & 0xFF;
    rv[8] = this.current[2] & 0xFF;
    rv[9] = (this.current[2] >>> 8) & 0xFF;
    rv[10] = (this.current[2] >>> 16) & 0xFF;
    rv[11] = (this.current[2] >>> 24) & 0xFF;
    rv[12] = this.current[3] & 0xFF;
    rv[13] = (this.current[3] >>> 8) & 0xFF;
    rv[14] = (this.current[3] >>> 16) & 0xFF;
    rv[15] = (this.current[3] >>> 24) & 0xFF;
    return rv.buffer;
};

md5Engine.prototype.reset = function () {
    this.currentLen = 0;
    this.current = new Uint32Array(new ArrayBuffer(16));
    this.current[0] = 0x67452301;
    this.current[1] = 0xEFCDAB89;
    this.current[2] = 0x98BADCFE;
    this.current[3] = 0x10325476;
};

md5Engine.prototype.blockLen = 64;
md5Engine.prototype.digestLen = 16;

function sha1Engine() {}

sha1Engine.prototype.processBlock = function (input) {
    var LR = utils.leftrot;
    var ADD = utils.add5;

    var data = new DataView(input.buffer, 0, input.length);
    var A = this.current[0];
    var B = this.current[1];
    var C = this.current[2];
    var D = this.current[3];
    var E = this.current[4];

    var W0 = data.getUint32(0);
    E = ADD(LR(A, 5), W0, 0x5A827999, ((B & C) | (~B & D)), E);
    B = LR(B, 30);
    var W1 = data.getUint32(4);
    D = ADD(LR(E, 5), W1, 0x5A827999, ((A & B) | (~A & C)), D);
    A = LR(A, 30);
    var W2 = data.getUint32(8);
    C = ADD(LR(D, 5), W2, 0x5A827999, ((E & A) | (~E & B)), C);
    E = LR(E, 30);
    var W3 = data.getUint32(12);
    B = ADD(LR(C, 5), W3, 0x5A827999, ((D & E) | (~D & A)), B);
    D = LR(D, 30);
    var W4 = data.getUint32(16);
    A = ADD(LR(B, 5), W4, 0x5A827999, ((C & D) | (~C & E)), A);
    C = LR(C, 30);
    var W5 = data.getUint32(20);
    E = ADD(LR(A, 5), W5, 0x5A827999, ((B & C) | (~B & D)), E);
    B = LR(B, 30);
    var W6 = data.getUint32(24);
    D = ADD(LR(E, 5), W6, 0x5A827999, ((A & B) | (~A & C)), D);
    A = LR(A, 30);
    var W7 = data.getUint32(28);
    C = ADD(LR(D, 5), W7, 0x5A827999, ((E & A) | (~E & B)), C);
    E = LR(E, 30);
    var W8 = data.getUint32(32);
    B = ADD(LR(C, 5), W8, 0x5A827999, ((D & E) | (~D & A)), B);
    D = LR(D, 30);
    var W9 = data.getUint32(36);
    A = ADD(LR(B, 5), W9, 0x5A827999, ((C & D) | (~C & E)), A);
    C = LR(C, 30);
    var Wa = data.getUint32(40);
    E = ADD(LR(A, 5), Wa, 0x5A827999, ((B & C) | (~B & D)), E);
    B = LR(B, 30);
    var Wb = data.getUint32(44);
    D = ADD(LR(E, 5), Wb, 0x5A827999, ((A & B) | (~A & C)), D);
    A = LR(A, 30);
    var Wc = data.getUint32(48);
    C = ADD(LR(D, 5), Wc, 0x5A827999, ((E & A) | (~E & B)), C);
    E = LR(E, 30);
    var Wd = data.getUint32(52);
    B = ADD(LR(C, 5), Wd, 0x5A827999, ((D & E) | (~D & A)), B);
    D = LR(D, 30);
    var We = data.getUint32(56);
    A = ADD(LR(B, 5), We, 0x5A827999, ((C & D) | (~C & E)), A);
    C = LR(C, 30);
    var Wf = data.getUint32(60);
    E = ADD(LR(A, 5), Wf, 0x5A827999, ((B & C) | (~B & D)), E);
    B = LR(B, 30);
    W0 = LR(Wd ^ W8 ^ W2 ^ W0, 1);
    D = ADD(LR(E, 5), W0, 0x5A827999, ((A & B) | (~A & C)), D);
    A = LR(A, 30);
    W1 = LR(We ^ W9 ^ W3 ^ W1, 1);
    C = ADD(LR(D, 5), W1, 0x5A827999, ((E & A) | (~E & B)), C);
    E = LR(E, 30);
    W2 = LR(Wf ^ Wa ^ W4 ^ W2, 1);
    B = ADD(LR(C, 5), W2, 0x5A827999, ((D & E) | (~D & A)), B);
    D = LR(D, 30);
    W3 = LR(W0 ^ Wb ^ W5 ^ W3, 1);
    A = ADD(LR(B, 5), W3, 0x5A827999, ((C & D) | (~C & E)), A);
    C = LR(C, 30);

    W4 = LR(W1 ^ Wc ^ W6 ^ W4, 1);
    E = ADD(LR(A, 5), W4, 0x6ED9EBA1, (B ^ C ^ D), E);
    B = LR(B, 30);
    W5 = LR(W2 ^ Wd ^ W7 ^ W5, 1);
    D = ADD(LR(E, 5), W5, 0x6ED9EBA1, (A ^ B ^ C), D);
    A = LR(A, 30);
    W6 = LR(W3 ^ We ^ W8 ^ W6, 1);
    C = ADD(LR(D, 5), W6, 0x6ED9EBA1, (E ^ A ^ B), C);
    E = LR(E, 30);
    W7 = LR(W4 ^ Wf ^ W9 ^ W7, 1);
    B = ADD(LR(C, 5), W7, 0x6ED9EBA1, (D ^ E ^ A), B);
    D = LR(D, 30);
    W8 = LR(W5 ^ W0 ^ Wa ^ W8, 1);
    A = ADD(LR(B, 5), W8, 0x6ED9EBA1, (C ^ D ^ E), A);
    C = LR(C, 30);
    W9 = LR(W6 ^ W1 ^ Wb ^ W9, 1);
    E = ADD(LR(A, 5), W9, 0x6ED9EBA1, (B ^ C ^ D), E);
    B = LR(B, 30);
    Wa = LR(W7 ^ W2 ^ Wc ^ Wa, 1);
    D = ADD(LR(E, 5), Wa, 0x6ED9EBA1, (A ^ B ^ C), D);
    A = LR(A, 30);
    Wb = LR(W8 ^ W3 ^ Wd ^ Wb, 1);
    C = ADD(LR(D, 5), Wb, 0x6ED9EBA1, (E ^ A ^ B), C);
    E = LR(E, 30);
    Wc = LR(W9 ^ W4 ^ We ^ Wc, 1);
    B = ADD(LR(C, 5), Wc, 0x6ED9EBA1, (D ^ E ^ A), B);
    D = LR(D, 30);
    Wd = LR(Wa ^ W5 ^ Wf ^ Wd, 1);
    A = ADD(LR(B, 5), Wd, 0x6ED9EBA1, (C ^ D ^ E), A);
    C = LR(C, 30);
    We = LR(Wb ^ W6 ^ W0 ^ We, 1);
    E = ADD(LR(A, 5), We, 0x6ED9EBA1, (B ^ C ^ D), E);
    B = LR(B, 30);
    Wf = LR(Wc ^ W7 ^ W1 ^ Wf, 1);
    D = ADD(LR(E, 5), Wf, 0x6ED9EBA1, (A ^ B ^ C), D);
    A = LR(A, 30);
    W0 = LR(Wd ^ W8 ^ W2 ^ W0, 1);
    C = ADD(LR(D, 5), W0, 0x6ED9EBA1, (E ^ A ^ B), C);
    E = LR(E, 30);
    W1 = LR(We ^ W9 ^ W3 ^ W1, 1);
    B = ADD(LR(C, 5), W1, 0x6ED9EBA1, (D ^ E ^ A), B);
    D = LR(D, 30);
    W2 = LR(Wf ^ Wa ^ W4 ^ W2, 1);
    A = ADD(LR(B, 5), W2, 0x6ED9EBA1, (C ^ D ^ E), A);
    C = LR(C, 30);
    W3 = LR(W0 ^ Wb ^ W5 ^ W3, 1);
    E = ADD(LR(A, 5), W3, 0x6ED9EBA1, (B ^ C ^ D), E);
    B = LR(B, 30);
    W4 = LR(W1 ^ Wc ^ W6 ^ W4, 1);
    D = ADD(LR(E, 5), W4, 0x6ED9EBA1, (A ^ B ^ C), D);
    A = LR(A, 30);
    W5 = LR(W2 ^ Wd ^ W7 ^ W5, 1);
    C = ADD(LR(D, 5), W5, 0x6ED9EBA1, (E ^ A ^ B), C);
    E = LR(E, 30);
    W6 = LR(W3 ^ We ^ W8 ^ W6, 1);
    B = ADD(LR(C, 5), W6, 0x6ED9EBA1, (D ^ E ^ A), B);
    D = LR(D, 30);
    W7 = LR(W4 ^ Wf ^ W9 ^ W7, 1);
    A = ADD(LR(B, 5), W7, 0x6ED9EBA1, (C ^ D ^ E), A);
    C = LR(C, 30);

    W8 = LR(W5 ^ W0 ^ Wa ^ W8, 1);
    E = ADD(LR(A, 5), W8, 0x8F1BBCDC, ((B & C) | (B & D) | (C & D)), E);
    B = LR(B, 30);
    W9 = LR(W6 ^ W1 ^ Wb ^ W9, 1);
    D = ADD(LR(E, 5), W9, 0x8F1BBCDC, ((A & B) | (A & C) | (B & C)), D);
    A = LR(A, 30);
    Wa = LR(W7 ^ W2 ^ Wc ^ Wa, 1);
    C = ADD(LR(D, 5), Wa, 0x8F1BBCDC, ((E & A) | (E & B) | (A & B)), C);
    E = LR(E, 30);
    Wb = LR(W8 ^ W3 ^ Wd ^ Wb, 1);
    B = ADD(LR(C, 5), Wb, 0x8F1BBCDC, ((D & E) | (D & A) | (E & A)), B);
    D = LR(D, 30);
    Wc = LR(W9 ^ W4 ^ We ^ Wc, 1);
    A = ADD(LR(B, 5), Wc, 0x8F1BBCDC, ((C & D) | (C & E) | (D & E)), A);
    C = LR(C, 30);
    Wd = LR(Wa ^ W5 ^ Wf ^ Wd, 1);
    E = ADD(LR(A, 5), Wd, 0x8F1BBCDC, ((B & C) | (B & D) | (C & D)), E);
    B = LR(B, 30);
    We = LR(Wb ^ W6 ^ W0 ^ We, 1);
    D = ADD(LR(E, 5), We, 0x8F1BBCDC, ((A & B) | (A & C) | (B & C)), D);
    A = LR(A, 30);
    Wf = LR(Wc ^ W7 ^ W1 ^ Wf, 1);
    C = ADD(LR(D, 5), Wf, 0x8F1BBCDC, ((E & A) | (E & B) | (A & B)), C);
    E = LR(E, 30);
    W0 = LR(Wd ^ W8 ^ W2 ^ W0, 1);
    B = ADD(LR(C, 5), W0, 0x8F1BBCDC, ((D & E) | (D & A) | (E & A)), B);
    D = LR(D, 30);
    W1 = LR(We ^ W9 ^ W3 ^ W1, 1);
    A = ADD(LR(B, 5), W1, 0x8F1BBCDC, ((C & D) | (C & E) | (D & E)), A);
    C = LR(C, 30);
    W2 = LR(Wf ^ Wa ^ W4 ^ W2, 1);
    E = ADD(LR(A, 5), W2, 0x8F1BBCDC, ((B & C) | (B & D) | (C & D)), E);
    B = LR(B, 30);
    W3 = LR(W0 ^ Wb ^ W5 ^ W3, 1);
    D = ADD(LR(E, 5), W3, 0x8F1BBCDC, ((A & B) | (A & C) | (B & C)), D);
    A = LR(A, 30);
    W4 = LR(W1 ^ Wc ^ W6 ^ W4, 1);
    C = ADD(LR(D, 5), W4, 0x8F1BBCDC, ((E & A) | (E & B) | (A & B)), C);
    E = LR(E, 30);
    W5 = LR(W2 ^ Wd ^ W7 ^ W5, 1);
    B = ADD(LR(C, 5), W5, 0x8F1BBCDC, ((D & E) | (D & A) | (E & A)), B);
    D = LR(D, 30);
    W6 = LR(W3 ^ We ^ W8 ^ W6, 1);
    A = ADD(LR(B, 5), W6, 0x8F1BBCDC, ((C & D) | (C & E) | (D & E)), A);
    C = LR(C, 30);
    W7 = LR(W4 ^ Wf ^ W9 ^ W7, 1);
    E = ADD(LR(A, 5), W7, 0x8F1BBCDC, ((B & C) | (B & D) | (C & D)), E);
    B = LR(B, 30);
    W8 = LR(W5 ^ W0 ^ Wa ^ W8, 1);
    D = ADD(LR(E, 5), W8, 0x8F1BBCDC, ((A & B) | (A & C) | (B & C)), D);
    A = LR(A, 30);
    W9 = LR(W6 ^ W1 ^ Wb ^ W9, 1);
    C = ADD(LR(D, 5), W9, 0x8F1BBCDC, ((E & A) | (E & B) | (A & B)), C);
    E = LR(E, 30);
    Wa = LR(W7 ^ W2 ^ Wc ^ Wa, 1);
    B = ADD(LR(C, 5), Wa, 0x8F1BBCDC, ((D & E) | (D & A) | (E & A)), B);
    D = LR(D, 30);
    Wb = LR(W8 ^ W3 ^ Wd ^ Wb, 1);
    A = ADD(LR(B, 5), Wb, 0x8F1BBCDC, ((C & D) | (C & E) | (D & E)), A);
    C = LR(C, 30);

    Wc = LR(W9 ^ W4 ^ We ^ Wc, 1);
    E = ADD(LR(A, 5), Wc, 0xCA62C1D6, (B ^ C ^ D), E);
    B = LR(B, 30);
    Wd = LR(Wa ^ W5 ^ Wf ^ Wd, 1);
    D = ADD(LR(E, 5), Wd, 0xCA62C1D6, (A ^ B ^ C), D);
    A = LR(A, 30);
    We = LR(Wb ^ W6 ^ W0 ^ We, 1);
    C = ADD(LR(D, 5), We, 0xCA62C1D6, (E ^ A ^ B), C);
    E = LR(E, 30);
    Wf = LR(Wc ^ W7 ^ W1 ^ Wf, 1);
    B = ADD(LR(C, 5), Wf, 0xCA62C1D6, (D ^ E ^ A), B);
    D = LR(D, 30);
    W0 = LR(Wd ^ W8 ^ W2 ^ W0, 1);
    A = ADD(LR(B, 5), W0, 0xCA62C1D6, (C ^ D ^ E), A);
    C = LR(C, 30);
    W1 = LR(We ^ W9 ^ W3 ^ W1, 1);
    E = ADD(LR(A, 5), W1, 0xCA62C1D6, (B ^ C ^ D), E);
    B = LR(B, 30);
    W2 = LR(Wf ^ Wa ^ W4 ^ W2, 1);
    D = ADD(LR(E, 5), W2, 0xCA62C1D6, (A ^ B ^ C), D);
    A = LR(A, 30);
    W3 = LR(W0 ^ Wb ^ W5 ^ W3, 1);
    C = ADD(LR(D, 5), W3, 0xCA62C1D6, (E ^ A ^ B), C);
    E = LR(E, 30);
    W4 = LR(W1 ^ Wc ^ W6 ^ W4, 1);
    B = ADD(LR(C, 5), W4, 0xCA62C1D6, (D ^ E ^ A), B);
    D = LR(D, 30);
    W5 = LR(W2 ^ Wd ^ W7 ^ W5, 1);
    A = ADD(LR(B, 5), W5, 0xCA62C1D6, (C ^ D ^ E), A);
    C = LR(C, 30);
    W6 = LR(W3 ^ We ^ W8 ^ W6, 1);
    E = ADD(LR(A, 5), W6, 0xCA62C1D6, (B ^ C ^ D), E);
    B = LR(B, 30);
    W7 = LR(W4 ^ Wf ^ W9 ^ W7, 1);
    D = ADD(LR(E, 5), W7, 0xCA62C1D6, (A ^ B ^ C), D);
    A = LR(A, 30);
    W8 = LR(W5 ^ W0 ^ Wa ^ W8, 1);
    C = ADD(LR(D, 5), W8, 0xCA62C1D6, (E ^ A ^ B), C);
    E = LR(E, 30);
    W9 = LR(W6 ^ W1 ^ Wb ^ W9, 1);
    B = ADD(LR(C, 5), W9, 0xCA62C1D6, (D ^ E ^ A), B);
    D = LR(D, 30);
    Wa = LR(W7 ^ W2 ^ Wc ^ Wa, 1);
    A = ADD(LR(B, 5), Wa, 0xCA62C1D6, (C ^ D ^ E), A);
    C = LR(C, 30);
    Wb = LR(W8 ^ W3 ^ Wd ^ Wb, 1);
    E = ADD(LR(A, 5), Wb, 0xCA62C1D6, (B ^ C ^ D), E);
    B = LR(B, 30);
    Wc = LR(W9 ^ W4 ^ We ^ Wc, 1);
    D = ADD(LR(E, 5), Wc, 0xCA62C1D6, (A ^ B ^ C), D);
    A = LR(A, 30);
    Wd = LR(Wa ^ W5 ^ Wf ^ Wd, 1);
    C = ADD(LR(D, 5), Wd, 0xCA62C1D6, (E ^ A ^ B), C);
    E = LR(E, 30);
    We = LR(Wb ^ W6 ^ W0 ^ We, 1);
    B = ADD(LR(C, 5), We, 0xCA62C1D6, (D ^ E ^ A), B);
    D = LR(D, 30);
    Wf = LR(Wc ^ W7 ^ W1 ^ Wf, 1);
    A = ADD(LR(B, 5), Wf, 0xCA62C1D6, (C ^ D ^ E), A);
    C = LR(C, 30);

    this.current[0] += A;
    this.current[1] += B;
    this.current[2] += C;
    this.current[3] += D;
    this.current[4] += E;
    this.currentLen += 64;
};

sha1Engine.prototype.doPadding = function () {
    var datalen = (this.inLen + this.currentLen) * 8;
    var msw = 0; // FIXME
    var lsw = datalen & 0xFFFFFFFF;
    var zeros = this.inLen <= 55 ? 55 - this.inLen : 119 - this.inLen;
    var pad = new Uint8Array(new ArrayBuffer(zeros + 1 + 8));
    pad[0] = 0x80;
    pad[pad.length - 1] = lsw & 0xFF;
    pad[pad.length - 2] = (lsw >>> 8) & 0xFF;
    pad[pad.length - 3] = (lsw >>> 16) & 0xFF;
    pad[pad.length - 4] = (lsw >>> 24) & 0xFF;
    pad[pad.length - 5] = msw & 0xFF;
    pad[pad.length - 6] = (msw >>> 8) & 0xFF;
    pad[pad.length - 7] = (msw >>> 16) & 0xFF;
    pad[pad.length - 8] = (msw >>> 24) & 0xFF;
    return pad;
};

sha1Engine.prototype.getDigest = function () {
    var rv = new Uint8Array(new ArrayBuffer(20));
    rv[3] = this.current[0] & 0xFF;
    rv[2] = (this.current[0] >>> 8) & 0xFF;
    rv[1] = (this.current[0] >>> 16) & 0xFF;
    rv[0] = (this.current[0] >>> 24) & 0xFF;
    rv[7] = this.current[1] & 0xFF;
    rv[6] = (this.current[1] >>> 8) & 0xFF;
    rv[5] = (this.current[1] >>> 16) & 0xFF;
    rv[4] = (this.current[1] >>> 24) & 0xFF;
    rv[11] = this.current[2] & 0xFF;
    rv[10] = (this.current[2] >>> 8) & 0xFF;
    rv[9] = (this.current[2] >>> 16) & 0xFF;
    rv[8] = (this.current[2] >>> 24) & 0xFF;
    rv[15] = this.current[3] & 0xFF;
    rv[14] = (this.current[3] >>> 8) & 0xFF;
    rv[13] = (this.current[3] >>> 16) & 0xFF;
    rv[12] = (this.current[3] >>> 24) & 0xFF;
    rv[19] = this.current[4] & 0xFF;
    rv[18] = (this.current[4] >>> 8) & 0xFF;
    rv[17] = (this.current[4] >>> 16) & 0xFF;
    rv[16] = (this.current[4] >>> 24) & 0xFF;
    return rv.buffer;
};

sha1Engine.prototype.reset = function () {
    this.currentLen = 0;
    this.current = new Uint32Array(new ArrayBuffer(20));
    this.current[0] = 0x67452301;
    this.current[1] = 0xEFCDAB89;
    this.current[2] = 0x98BADCFE;
    this.current[3] = 0x10325476;
    this.current[4] = 0xC3D2E1F0;
};

sha1Engine.prototype.blockLen = 64;
sha1Engine.prototype.digestLen = 20;

var Digest = (function () {
    var fromASCII = function (s) {
        var buffer = new ArrayBuffer(s.length);
        var b = new Uint8Array(buffer);
        var i;
        for (i = 0; i < s.length; i++) {
            b[i] = s.charCodeAt(i);
        }
        return b;
    };

    var fromInteger = function (v) {
        var buffer = new ArrayBuffer(1);
        var b = new Uint8Array(buffer);
        b[0] = v;
        return b;
    };

    var dg = function (constructor) {
        var update = function (input) {
            var len = input.length;
            var offset = 0;
            while (len > 0) {
                var copyLen = this.blockLen - this.inLen;
                if (copyLen > len) {
                    copyLen = len;
                }
                var tmpInput = input.subarray(offset, offset + copyLen);
                this.inbuf.set(tmpInput, this.inLen);
                offset += copyLen;
                len -= copyLen;
                this.inLen += copyLen;
                if (this.inLen === this.blockLen) {
                    this.processBlock(this.inbuf);
                    this.inLen = 0;
                }
            }
        };

        var finalize = function () {
            var padding = this.doPadding();
            this.update(padding);
            var result = this.getDigest();
            this.reset();
            return result;
        };

        var engine = (function () {
            if (!constructor) {
                throw "Unsupported algorithm: " + constructor.toString();
            }
            constructor.prototype.update = update;
            constructor.prototype.finalize = finalize;
            var engine = new constructor();
            engine.inbuf = new Uint8Array(new ArrayBuffer(engine.blockLen));
            engine.inLen = 0;
            engine.reset();
            return engine;
        }());

        return {
            update: function (input) {
                if (input.constructor === ArrayBuffer) {
                    input = new Uint8Array(input);
                } else if (input.constructor === String) {
                    input = fromASCII(input);
                } else if (input.constructor === Number) {
                    if (input > 0xFF) {
                        throw "To update more than one byte, use an array buffer";
                    }
                    input = fromInteger(input);
                } else {
                    throw "Unsupported input type";
                }
                engine.update(input);
            },

            finalize: function () {
                return engine.finalize();
            },

            digest: function (input) {
                this.update(input);
                return engine.finalize();
            },

            reset: function () {
                engine.reset();
            }
        };
    };

    var hmac = function (digest) {
        var initialized = false;
        var key, ipad, opad;
        var init = function () {
            var i, kbuf;
            if (initialized) {
                return;
            }
            if (key === undefined) {
                throw "MAC key is not defined";
            }
            if (key.byteLength > 64) {
                kbuf = new Uint8Array(digest.digest(key));
            } else {
                kbuf = new Uint8Array(key);
            }
            ipad = new Uint8Array(new ArrayBuffer(64));
            for (i = 0; i < kbuf.length; i++) {
                ipad[i] = 0x36 ^ kbuf[i];
            }
            for (i = kbuf.length; i < 64; i++) {
                ipad[i] = 0x36;
            }
            opad = new Uint8Array(new ArrayBuffer(64));
            for (i = 0; i < kbuf.length; i++) {
                opad[i] = 0x5c ^ kbuf[i];
            }
            for (i = kbuf.length; i < 64; i++) {
                opad[i] = 0x5c;
            }
            initialized = true;
            digest.update(ipad.buffer);
        };

        var resetMac = function () {
            key = undefined;
            ipad = undefined;
            opad = undefined;
            digest.reset();
        };

        var finalizeMac = function () {
            var result = digest.finalize();
            digest.reset();
            digest.update(opad.buffer);
            digest.update(result);
            result = digest.finalize();
            resetMac();
            return result;
        };

        var setKeyMac = function (k) {
            if (k.constructor === ArrayBuffer) {
                 key = k;
            } else if (k.constructor === String) {
                key = fromASCII(k);
            } else {
                throw "Unsupported key type";
            }
        };

        return {
            setKey: function (key) {
                setKeyMac(key); // FIXME large keys
            },

            update: function (input) {
                init();
                digest.update(input);
            },

            finalize: function () {
                return finalizeMac();
            },

            mac: function (input) {
                this.update(input);
                return this.finalize();
            },

            reset: function () {
                resetMac();
            }
        };
    };

    return {
        SHA1: function () {
            return dg(sha1Engine);
        },

        MD5: function () {
            return dg(md5Engine);
        },

        HMAC_SHA1: function () {
            return hmac(dg(sha1Engine));
        }
    };
}());
