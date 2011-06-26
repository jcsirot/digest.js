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
