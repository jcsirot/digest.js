/* Test cases from PBKDF1 (PKCS#5) */
describe("PBKDF1", function() {

    it("should not accept key length larger than the digest length", function() {
        var pbkdf = new Digest.PBKDF1_SHA1(hex2bin("78578e5a5d63cb06"), 1000);
        expect(function() { pbkdf.deriveKey("password", 24); }).toThrow("Key length larger than digest length")
    });

    it("pbkdf('password', 78578e5a5d63cb06, 1000, 16) = dc19847e05c64d2faf10eebfb4a3d2a20", function() {
        var pbkdf = new Digest.PBKDF1_SHA1(hex2bin("78578e5a5d63cb06"), 1000);
        var result = pbkdf.deriveKey("password", 16);
        expect(bin2hex(result)).toEqual("dc19847e05c64d2faf10ebfb4a3d2a20");
    });
});
