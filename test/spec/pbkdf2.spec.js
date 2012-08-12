/* Test cases from RFC6070 (PKCS#5) - http://tools.ietf.org/rfc/rfc6070.txt */
describe("PBKDF2", function() {

    it("PBKDF2/HMAC_SHA1('password', 'salt', 1, 20) = 0c60c80f961f0e71f3a9b524af6012062fe037a6", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1(1);
        var result = pbkdf.deriveKey("password", "salt", 20);
        expect(bin2hex(result)).toEqual("0c60c80f961f0e71f3a9b524af6012062fe037a6");
    });

    it("PBKDF2/HMAC_SHA1('password', 'salt', 2, 20) = ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1(2);
        var result = pbkdf.deriveKey("password", "salt", 20);
        expect(bin2hex(result)).toEqual("ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957");
    });

    it("PBKDF2/HMAC_SHA1('password', 'salt', 4096, 20) = 4b007901b765489abead49d926f721d065a429c1", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1(4096);
        var result = pbkdf.deriveKey("password", "salt", 20);
        expect(bin2hex(result)).toEqual("4b007901b765489abead49d926f721d065a429c1");
    });

    /* This test takes too long to pass
    it("pbkdf2('password', 'salt', 16777216, 20) = eefe3d61cd4da4e4e9945b3d6ba2158c2634e984", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1("salt", 16777216);
        var result = pbkdf.deriveKey("password", 20);
        expect(bin2hex(result)).toEqual("eefe3d61cd4da4e4e9945b3d6ba2158c2634e984");
    });*/

    it("PBKDF2/HMAC_SHA1('passwordPASSWORDpassword', 'saltSALTsaltSALTsaltSALTsaltSALTsalt', 4096, 25) = 3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1(4096);
        var result = pbkdf.deriveKey("passwordPASSWORDpassword", "saltSALTsaltSALTsaltSALTsaltSALTsalt", 25);
        expect(bin2hex(result)).toEqual("3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038");
    });

    it("PBKDF2/HMAC_SHA1('pass\\0word', 'sa\\0lt', 4096, 16) = 56fa6aa75548099dcc37d7f03425e0c3", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1(4096);
        var result = pbkdf.deriveKey("pass\0word", "sa\0lt", 16);
        expect(bin2hex(result)).toEqual("56fa6aa75548099dcc37d7f03425e0c3");
    });

    it("PBKDF2/HMAC_SHA1('password', 'salt', 10, 20) = ae3fe5f5707e07f3e7c117fb885cd052a6fcd77a", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA1(10);
        var result = pbkdf.deriveKey("password", "salt", 20);
        expect(bin2hex(result)).toEqual("ae3fe5f5707e07f3e7c117fb885cd052a6fcd77a");
    });

    it("PBKDF2/HMAC_SHA256('password', '0x78578e5a5d63cb06', 2048, 24) = 97b5a91d35af542324881315c4f849e327c4707d1bc9d322", function() {
        var pbkdf = new Digest.PBKDF2_HMAC_SHA256(2048);
        var result = pbkdf.deriveKey("password", hex2bin("78578e5a5d63cb06"), 24);
        expect(bin2hex(result)).toEqual("97b5a91d35af542324881315c4f849e327c4707d1bc9d322");
    });
});

