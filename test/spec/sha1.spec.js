/* Test cases from FIPS 180-2 - http://csrc.nist.gov/publications/fips/fips180-2/fips180-2.pdf */
describe("SHA-1", function() {
    var dg;

    beforeEach(function() {
        dg = new Digest.SHA1();
    });

    it("should have a length of 20 bytes", function() {
        expect(dg.digestLength()).toEqual(20);
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

/* Test cases from RFC 2202 - http://tools.ietf.org/html/rfc2202 */
describe("HMAC-SHA1", function() {
    var mac;

    beforeEach(function() {
        mac = new Digest.HMAC_SHA1();
    });

    /* Test case #1 */
    it("key = 0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b, hmac/sha1('Hi There') = b617318655057264e28bc0b6fb378c8ef146be00", function() {
        mac.setKey(hex2bin("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
        var result = mac.mac("Hi There");
        expect(bin2hex(result)).toEqual("b617318655057264e28bc0b6fb378c8ef146be00");
    });

    /* Test case #2 */
    it("key = 'Jefe', hmac/sha1('what do ya want for nothing?') = effcdf6ae5eb2fa2d27416d5f184df9c259a7c79", function() {
        mac.setKey("Jefe");
        var result = mac.mac("what do ya want for nothing?");
        expect(bin2hex(result)).toEqual("effcdf6ae5eb2fa2d27416d5f184df9c259a7c79");
    });

    /* Test case #3 */
    it("key = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', hmac/sha1(50 x 0xdd) = 125d7342b9ac11cd91a39af48aa17b4f63f175d3", function() {
        mac.setKey(hex2bin("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xdd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("125d7342b9ac11cd91a39af48aa17b4f63f175d3");
    });

    /* Test case #4 */
    it("key = '0102030405060708090a0b0c0d0e0f10111213141516171819', hmac/sha1('50 x 0xcd') = 4c9007f4026250c6bc8414f9bf50c86c2d7235da", function() {
        mac.setKey(hex2bin("0102030405060708090a0b0c0d0e0f10111213141516171819"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xcd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("4c9007f4026250c6bc8414f9bf50c86c2d7235da");
    });

    /* Test case #5 */
    it("key = '0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c', hmac/sha1('Test With Truncation') = 4c1a03424b55e07fe7f27be1d58bb9324a9a5a04", function() {
        var key = hex2bin("0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c");
        mac.setKey(key);
        var result = mac.mac("Test With Truncation");
        expect(bin2hex(result)).toEqual("4c1a03424b55e07fe7f27be1d58bb9324a9a5a04");
    });

    /* Test case #6 */
    it("key = '80 x 0xaa', hmac/sha1('Test Using Larger Than Block-Size Key - Hash Key First') = aa4ae5e15272d00e95705637ce8a3b55ed402112", function() {
        var key = new Uint8Array(new ArrayBuffer(80));
        for (var i = 0; i < 80; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        var result = mac.mac("Test Using Larger Than Block-Size Key - Hash Key First");
        expect(bin2hex(result)).toEqual("aa4ae5e15272d00e95705637ce8a3b55ed402112");
    });

    /* Test case #7 */
    it("key = '80 x 0xaa', hmac/sha1('Test Using Larger Than Block-Size Key and Larger Than One Block-Size Data') = e8e99d0f45237d786d6bbaa7965c7808bbff1a91", function() {
        var key = new Uint8Array(new ArrayBuffer(80));
        for (var i = 0; i < 80; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        mac.update("Test Using Larger Than Block-Size Key and Larger");
        mac.update(" Than One Block-Size Data");
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("e8e99d0f45237d786d6bbaa7965c7808bbff1a91");
    });
});
