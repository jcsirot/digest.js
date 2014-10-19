digest.js
=========

[![Build Status](https://travis-ci.org/jcsirot/digest.js.svg?branch=dev-0.2)](https://travis-ci.org/jcsirot/digest.js)
[![Coverage Status](https://coveralls.io/repos/jcsirot/digest.js/badge.png?branch=dev-0.2)](https://coveralls.io/r/jcsirot/digest.js?branch=dev-0.2)

Overview
--------
**digest.js** is a javascript library implementing cryptographic digest and HMAC algorithms.

**digest.js** is designed for modern web browsers and requires the [W3C Typed Arrays](http://www.khronos.org/registry/typedarray/specs/latest/) support. digest.js has been successfully tested with these web browsers:

+ Chrome 11
+ Firefox 4 (WARNING: Firefox 4 does not support the `Dataview` API, you should use the [David Flanagan's emulation](https://github.com/davidflanagan/DataView.js))
+ Safari 5.1
+ IE 10

### Supported algorithms:

+ digest
  + MD5
  + SHA-1
  + SHA-256
+ Message Authentication Code (MAC)
  + HMAC/MD5
  + HMAC/SHA-1
  + HMAC/SHA-256
+ Password-Based Key Derivation Function (PBKDF)
  + PBKDF1/SHA1
  + PBKDF1/MD5
  + PBKDF2/HMAC/SHA1
  + PBKDF2/HMAC/SHA-256

Installation
------------

### Node

```shell
npm install digest-js
```
and then

```javascript
Digest = require('digest-js');
```

### Browser

```html
<script type="text/javascript" src="path/to/digest.min.js"></script>
```

Compilation
-----------

**digest.js** is using [npm](https://www.npmjs.org/) and [grunt](http://gruntjs.com/)

1. Install Grunt

    ```shell
    npm install -g grunt-cli
    ```

2. Download dependencies

    ```shell
    npm install
    ```

3. Build the library

    ```shell
    grunt
    ```

API Usage
---------

### Digest

1. Initialize a digest object

    ```javascript
    var dg = new Digest.SHA1();
    ```

2. Update some data

    ```javascript
    var data = new ArrayBuffer(3);
    var buf = new Uint8Array(data);
    buf[0] = 0x61; /* a */
    buf[1] = 0x62; /* b */
    buf[2] = 0x63; /* c */
    dg.update(data);
    ```

3. Finalize

    ```javascript
    var result = dg.finalize();
    ```

It is also possible to digest some data at once:

```javascript
var dg = new Digest.SHA1();
var result = dg.digest("abc");
```

### MAC

1. Initialize a MAC object

    ```javascript
    var mac = new Digest.HMAC_SHA1();
    ```

2. Set the key

    ```javascript
    mac.setKey("KeyInPlainText");
    ```

3. Update some data

    ```javascript
    var data = new ArrayBuffer(50);
    var buf = new Uint8Array(data);
    for (var i = 0; i < 50; i++) {
        buf[i] = 0xdd;
    }
    mac.update(data);
    ```

4. Finalize

    ```javascript
    var result = mac.finalize();
    ```

### PBKDF

1. Initialize a PBKDF object with the iteration count

    ```javascript
    var pbkdf = new Digest.PBKDF_HMAC_SHA1(2048);
    ```

2. Derive key with the password, salt and desired key length (in bytes)

    ```javascript
    var key = pbkdf.deriveKey("password", "salt", 24);
    ```


### Misc

After the `finalize`, `digest` or `mac` methods have been called, the digest or mac object is automatically reset and can be reused.

The `update`, `digest` and `mac` methods accept these data types:

+ `ArrayBuffer`
+ `String` (US-ASCII encoding)
+ `byte` (i.e. a number in the range 0-255)

The MAC `setKey` method accepts these data types:

+ `ArrayBuffer`
+ `String` (US-ASCII encoding)

The PBKDF `deriveKey` method accepts these data types for password and salt:

+ `ArrayBuffer`
+ `String` (US-ASCII encoding)


License
-------
**digest.js** is released under the terms of the [GNU GENERAL PUBLIC LICENSE Version 3](http://www.gnu.org/licenses/gpl.html)
