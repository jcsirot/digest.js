/* Test cases from FIPS 180-2 - http://csrc.nist.gov/publications/fips/fips180-2/fips180-2.pdf */
describe("SHA-256", function() {
    var dg;

    beforeEach(function() {
        dg = new Digest.SHA256();
    });

    it("should have a length of 32 bytes", function() {
        expect(dg.digestLength()).toEqual(32);
    });

    it("sha256('abc') = ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad", function() {
        var result = dg.digest("abc");
        expect(bin2hex(result)).toEqual("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    });

    it("sha256('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq') = 248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1", function() {
        var result = dg.digest("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq");
        expect(bin2hex(result)).toEqual("248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1");
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

/* Test cases from RFC 4231 - http://tools.ietf.org/html/rfc4231 */
describe("HMAC-SHA256", function() {
    var mac;

    beforeEach(function() {
        mac = new Digest.HMAC_SHA256();
    });

    /* Test case #1 */
    it("key = 0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b, hmac/sha1('Hi There') = b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7", function() {
        mac.setKey(hex2bin("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
        var result = mac.mac("Hi There");
        expect(bin2hex(result)).toEqual("b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7");
    });

    /* Test case #2 */
    it("key = 'Jefe', hmac/sha1('what do ya want for nothing?') = 5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843", function() {
        mac.setKey("Jefe");
        var result = mac.mac("what do ya want for nothing?");
        expect(bin2hex(result)).toEqual("5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843");
    });

    /* Test case #3 */
    it("key = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', hmac/sha1(50 x 0xdd) = 773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe", function() {
        mac.setKey(hex2bin("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xdd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe");
    });

    /* Test case #4 */
    it("key = '0102030405060708090a0b0c0d0e0f10111213141516171819', hmac/sha1('50 x 0xcd') = 82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b", function() {
        mac.setKey(hex2bin("0102030405060708090a0b0c0d0e0f10111213141516171819"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xcd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b");
    });

    /* Test case #6 */
    it("key = '131 x 0xaa', hmac/sha1('Test Using Larger Than Block-Size Key - Hash Key First') = 60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54", function() {
        var key = new Uint8Array(new ArrayBuffer(131));
        for (var i = 0; i < 131; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        var result = mac.mac("Test Using Larger Than Block-Size Key - Hash Key First");
        expect(bin2hex(result)).toEqual("60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54");
    });

    /* Test case #7 */
    it("key = '131 x 0xaa', hmac/sha1('This is a test using a larger than block-size key and a larger than block-size data. The key needs to be hashed before being used by the HMAC algorithm.') = 9b09ffa71b942fcb27635fbcd5b0e944bfdc63644f0713938a7f51535c3a35e2", function() {
        var key = new Uint8Array(new ArrayBuffer(131));
        for (var i = 0; i < 131; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        mac.update("This is a test using a larger than block-size ");
        mac.update("key and a larger than block-size data. ");
        mac.update("The key needs to be hashed before being used ");
        mac.update("by the HMAC algorithm.");
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("9b09ffa71b942fcb27635fbcd5b0e944bfdc63644f0713938a7f51535c3a35e2");
    });
});