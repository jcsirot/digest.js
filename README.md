digest.js
=========

Overview
--------
**digest.js** is a javascript library implementing cryptographic digest and HMAC algorithms.

**digest.js** is designed for modern web browsers and requires the [W3C Typed Arrays](http://www.khronos.org/registry/typedarray/specs/latest/) support. digest.js has been successfully tested with these web browsers:

+ Chrome 11
+ Firefox 4 (WARNING: since Firefox does not support the `Dataview` API, you should use the [David Flanagan's emulation](https://github.com/davidflanagan/DataView.js))
+ Safari 5.1

### Supported algorithms:

+ digest
  + MD5
  + SHA-1
  + SHA-256
+ Message Authentication Code (MAC)
  + HMAC/MD5
  + HMAC/SHA-1
  + HMAC/SHA-256

API Usage
---------

### Digest

1. Initialize a digest object

    ```
    var dg = new Digest.SHA1();
    ```

2. Update some data

    ```
    var data = new ArrayBuffer(3);
    var buf = new Uint8Array(data);
    buf[0] = 0x61; /* a */
    buf[1] = 0x62; /* b */
    buf[2] = 0x63; /* c */
    dg.update(data);
    ```

3. Finalize

    ```
    var result = dg.finalize();
    ```

It is also possible to digest some data at once:

```
var dg = new Digest.SHA1();
var result = dg.digest("abc");
```

### MAC

1. Initialize a MAC object

    ```
    var mac = new Digest.HMAC_SHA1();
    ```

2. Set the key

    ```
    mac.setKey("KeyInPlainText");
    ```

3. Update some data

    ```
    var data = new ArrayBuffer(50);
    var buf = new Uint8Array(data);
    for (var i = 0; i < 50; i++) {
        buf[i] = 0xdd;
    }
    mac.update(data);
    ```

4. Finalize

    ```
    var result = mac.finalize();
    ```

### Misc

After the `finalize`, `digest` or `mac` methods have been called, the digest or mac object is automatically reset and can be reused.

The `update`, `digest` and `mac` methods accept these data types:

+ `ArrayBuffer`
+ `String` (US-ASCII encoding)
+ `byte` (i.e. a number in the range 0-255)

The MAC `setKey`method accepts these data types:

+ `ArrayBuffer`
+ `String` (US-ASCII encoding)

License
-------
**digest.js** is released under the terms of the [GNU GENERAL PUBLIC LICENSE Version 3](http://www.gnu.org/licenses/gpl.html)
