var assert = require("chai").assert;
var a = require("../src/csp.test-helpers");

var csp = require("../src/csp");
var chan = csp.chan;
var go = csp.go;
var put = csp.put;
var take = csp.take;
var alts = csp.alts;
var buffers = csp.buffers;

describe("put", function() {
  a.it("should return whether channel was open", function*() {
    var ch = chan(1);
    assert.equal((yield put(ch, 42)), true, "put returns true for open channel");
    ch.close();
    assert.equal((yield put(ch, 43)), false, "put returns false for closed channel");
  });
});

describe("alts", function() {
  a.it("should work with identity channel", function*() {
    var ch = a.identity_chan(42);
    var r = yield alts([ch]);
    assert.equal(r.value, 42);
    assert.equal(r.channel, ch);
  });
});