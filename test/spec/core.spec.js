describe("Core", function() {
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

    it("should not accept object input type", function() {
        var callback = function() {
            return dg.digest({});
        };
        expect(callback).toThrow();
    });

    it("should not accept negative integer", function() {
        var callback = function() {
            return dg.update(-45);
        };
        expect(callback).toThrow();
    });

    it("should not accept integer > 255", function() {
        var callback = function() {
            return dg.update(432);
        };
        expect(callback).toThrow();
    });
});
