/* Test cases from FIPS 180-2 - http://csrc.nist.gov/publications/fips/fips180-2/fips180-2.pdf */
describe("Digest", function() {
    var dg;

    beforeEach(function() {
        dg = new Digest.SHA1();
    });

    it("should accept array buffer input", function() {
        var buffer = new ArrayBuffer(3);
        var b = new Uint8Array(buffer);
        b[0] = 0x61;
        b[1] = 0x62;
        b[2] = 0x63;
        var result = dg.digest(buffer);
        expect(bin2hex(result)).toEqual("a9993e364706816aba3e25717850c26c9cd0d89d");
    });

    it("should accept string input", function() {
        var result = dg.digest("abc");
        expect(bin2hex(result)).toEqual("a9993e364706816aba3e25717850c26c9cd0d89d");
    });

    it("should accept byte input", function() {
        dg.update(0x61);
        dg.update(0x62);
        dg.update(0x63);
        result = dg.finalize();
        expect(bin2hex(result)).toEqual("a9993e364706816aba3e25717850c26c9cd0d89d");
    });

    it("should not accept other input type", function() {
        var callback = function() {
            return dg.digest({});
        };
        expect(callback).toThrow(jasmine.undefined);

        dg.reset();

        var callback2 = function() {
            return dg.update(0x100);
        };
        expect(callback2).toThrow(jasmine.undefined);
    });
});

describe("SHA-1", function() {
    var dg;

    beforeEach(function() {
        dg = new Digest.SHA1();
    });

    it("sha1('abc') = a9993e364706816aba3e25717850c26c9cd0d89d", function() {
        var result = dg.digest("abc");
        expect(bin2hex(result)).toEqual("a9993e364706816aba3e25717850c26c9cd0d89d");
    });

    it("sha1('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq') = 84983e441c3bd26ebaae4aa1f95129e5e54670f1", function() {
        var result = dg.digest("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq");
        expect(bin2hex(result)).toEqual("84983e441c3bd26ebaae4aa1f95129e5e54670f1");
    });

    it("sha1('') = da39a3ee5e6b4b0d3255bfef95601890afd80709", function() {
        var result = dg.digest("");
        expect(bin2hex(result)).toEqual("da39a3ee5e6b4b0d3255bfef95601890afd80709");
    });

    it("sha1(1000000 x 'a') = 34aa973cd4c4daa4f61eeb2bdbad27316534016f", function() {
        var buffer = new ArrayBuffer(1000000);
        var array = new Uint8Array(buffer);
        for (var i = 0; i < 1000000; i++) {
            array[i] = 0x61;
        }
        var result = dg.digest(buffer);
        expect(bin2hex(result)).toEqual("34aa973cd4c4daa4f61eeb2bdbad27316534016f");
    });
});

/* Test cases from RFC 1321 - http://www.ietf.org/rfc/rfc1321.txt */
describe("MD5", function() {
    var dg;

    beforeEach(function() {
        dg = new Digest.MD5();
    });

    it("md5('') = d41d8cd98f00b204e9800998ecf8427e", function() {
        var result = dg.digest("");
        expect(bin2hex(result)).toEqual("d41d8cd98f00b204e9800998ecf8427e");
    });

    it("md5('a') = 0cc175b9c0f1b6a831c399e269772661", function() {
        var result = dg.digest("a");
        expect(bin2hex(result)).toEqual("0cc175b9c0f1b6a831c399e269772661");
    });

    it("md5('abc') = 900150983cd24fb0d6963f7d28e17f72", function() {
        var result = dg.digest("abc");
        expect(bin2hex(result)).toEqual("900150983cd24fb0d6963f7d28e17f72");
    });

    it("md5('message digest') = f96b697d7cb7938d525a2f31aaf161d0", function() {
        var result = dg.digest("message digest");
        expect(bin2hex(result)).toEqual("f96b697d7cb7938d525a2f31aaf161d0");
    });

    it("md5('abcdefghijklmnopqrstuvwxyz' = c3fcd3d76192e4007dfb496cca67e13b", function() {
        var result = dg.digest("abcdefghijklmnopqrstuvwxyz");
        expect(bin2hex(result)).toEqual("c3fcd3d76192e4007dfb496cca67e13b");
    });

    it("md5('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') = d174ab98d277d9f5a5611c2c9f419d9f", function() {
        var result = dg.digest("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
        expect(bin2hex(result)).toEqual("d174ab98d277d9f5a5611c2c9f419d9f");
    });

    it("md5('12345678901234567890123456789012345678901234567890123456789012345678901234567890') = 57edf4a22be3c955ac49da2e2107b67a", function() {
        var result = dg.digest("12345678901234567890123456789012345678901234567890123456789012345678901234567890");
        expect(bin2hex(result)).toEqual("57edf4a22be3c955ac49da2e2107b67a");
    });
});

/* SHA256 To be added */
/*
describe("SHA256", function() {
    var dg;

    beforeEach(function() {
        dg = new new Digest.SHA256();
    });

    it("sha256() = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", function() {
        var result = dg.digest("");
        expect(bin2hex(result)).toEqual("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    });

    it("sha1(1000000 x 'a') = cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0", function() {
        var buffer = new ArrayBuffer(1000000);
        var array = new Uint8Array(buffer);
        for (var i = 0; i < 1000000; i++) {
            array[i] = 0x61;
        }
        var result = dg.digest(buffer);
        expect(bin2hex(result)).toEqual("cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0");
    });
});
*/