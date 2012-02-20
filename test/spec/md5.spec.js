/* Test cases from RFC 1321 - http://www.ietf.org/rfc/rfc1321.txt */
describe("MD5", function() {
    var dg;

    beforeEach(function() {
        dg = new Digest.MD5();
    });

    it("should have a length of 16 bytes", function() {
        expect(dg.digestLength()).toEqual(16);
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

/* Test cases from RFC 2202 - http://tools.ietf.org/html/rfc2202 */
describe("HMAC-MD5", function() {
    var mac;

    beforeEach(function() {
        mac = new Digest.HMAC_MD5();
    });

    /* Test case #1 */
    it("key = 0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b, hmac/md5('Hi There') = 9294727a3638bb1c13f48ef8158bfc9d", function() {
        mac.setKey(hex2bin("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
        var result = mac.mac("Hi There");
        expect(bin2hex(result)).toEqual("9294727a3638bb1c13f48ef8158bfc9d");
    });

    /* Test case #2 */
    it("key = 'Jefe', hmac/md5('what do ya want for nothing?') = 750c783e6ab0b503eaa86e310a5db738", function() {
        mac.setKey("Jefe");
        var result = mac.mac("what do ya want for nothing?");
        expect(bin2hex(result)).toEqual("750c783e6ab0b503eaa86e310a5db738");
    });

    /* Test case #3 */
    it("key = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', hmac/md5(50 x 0xdd) = 56be34521d144c88dbb8c733f0e8b3f6", function() {
        mac.setKey(hex2bin("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xdd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("56be34521d144c88dbb8c733f0e8b3f6");
    });

    /* Test case #4 */
    it("key = '0102030405060708090a0b0c0d0e0f10111213141516171819', hmac/md5(50 x 0xcd) = 697eaf0aca3a3aea3a75164746ffaa79", function() {
        mac.setKey(hex2bin("0102030405060708090a0b0c0d0e0f10111213141516171819"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xcd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("697eaf0aca3a3aea3a75164746ffaa79");
    });

    /* Test case #5 */
    it("key = '0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c', hmac/md5('Test With Truncation') = 56461ef2342edc00f9bab995690efd4c", function() {
        var key = hex2bin("0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c");
        mac.setKey(key);
        var result = mac.mac("Test With Truncation");
        expect(bin2hex(result)).toEqual("56461ef2342edc00f9bab995690efd4c");
    });

    /* Test case #6 */
    it("key = '80 x 0xaa', hmac/md5('Test Using Larger Than Block-Size Key - Hash Key First') = 6b1ab7fe4bd7bf8f0b62e6ce61b9d0cd", function() {
        var key = new Uint8Array(new ArrayBuffer(80));
        for (var i = 0; i < 80; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        var result = mac.mac("Test Using Larger Than Block-Size Key - Hash Key First");
        expect(bin2hex(result)).toEqual("6b1ab7fe4bd7bf8f0b62e6ce61b9d0cd");
    });

    /* Test case #7 */
    it("key = '80 x 0xaa', hmac/md5('Test Using Larger Than Block-Size Key and Larger Than One Block-Size Data') = 6f630fad67cda0ee1fb1f562db3aa53e", function() {
        var key = new Uint8Array(new ArrayBuffer(80));
        for (var i = 0; i < 80; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        mac.update("Test Using Larger Than Block-Size Key and Larger");
        mac.update(" Than One Block-Size Data");
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("6f630fad67cda0ee1fb1f562db3aa53e");
    });
});
