/* Test cases from FIPS 180-2 - http://csrc.nist.gov/publications/fips/fips180-2/fips180-2.pdf */
describe("HMAC-SHA1", function() {
    var mac;

    beforeEach(function() {
        mac = new Digest.HMAC_SHA1();
    });
    
    it("key = 0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b, hmac/sha1('Hi There') = b617318655057264e28bc0b6fb378c8ef146be00", function() {
        mac.setKey(hex2bin("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
        var result = mac.mac("Hi There");
        expect(bin2hex(result)).toEqual("b617318655057264e28bc0b6fb378c8ef146be00");
    });

    it("key = 'Jefe', hmac/sha1('what do ya want for nothing?') = effcdf6ae5eb2fa2d27416d5f184df9c259a7c79", function() {
        mac.setKey("Jefe");
        var result = mac.mac("what do ya want for nothing?");
        expect(bin2hex(result)).toEqual("effcdf6ae5eb2fa2d27416d5f184df9c259a7c79");
    });

    it("key = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', hmac/sha1(50 x 0xdd) = 125d7342b9ac11cd91a39af48aa17b4f63f175d3", function() {
        mac.setKey(hex2bin("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
        for (var i = 0; i < 50; i++) {
            mac.update(0xdd);
        }
        var result = mac.finalize();
        expect(bin2hex(result)).toEqual("125d7342b9ac11cd91a39af48aa17b4f63f175d3");
    });

    it("key = '80 x 0xaa', hmac/sha1('Test Using Larger Than Block-Size Key - Hash Key First') = aa4ae5e15272d00e95705637ce8a3b55ed402112", function() {
        var key = new Uint8Array(new ArrayBuffer(80));
        for (var i = 0; i < 80; i++) {
            key[i] = 0xaa;
        }
        mac.setKey(key.buffer);
        var result = mac.mac("Test Using Larger Than Block-Size Key - Hash Key First");
        expect(bin2hex(result)).toEqual("aa4ae5e15272d00e95705637ce8a3b55ed402112");
    });

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
