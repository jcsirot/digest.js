digest.js
=========

Overview
--------
**digest.js** is a javascript library implementing cryptographic digest algorithms and (in a near future) HMAC algorithms.

**digest.js** is designed for modern web browsers and requires the [W3C Typed Arrays](http://www.khronos.org/registry/typedarray/specs/latest/) support. digest.js has been successfully tested with Chrome 11 and Firefox 4 (Since Firefox 4 does not support the `Dataview` API, you should use the [David Flanagan's emulation](https://github.com/davidflanagan/DataView.js))


Usage
-----

**digest.js** supports these algorithms:

+ MD5
+ SHA-1
+ SHA-256 (soon)

API usage:

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

The `update` method also accepts US-ASCII string and byte (in the range 0-255) types.

It is also possible to digest some data at once:

```
var dg = new Digest.SHA1();
var result = dg.digest("abc");
```

License
-------
**digest.js** is released under the terms of the [GNU GENERAL PUBLIC LICENSE Version 3](http://www.gnu.org/licenses/gpl.html)
