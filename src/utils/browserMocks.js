//browserMocks.js
var localStorageMock = (function() {
  var store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    doItem: "foo",
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, "document", {
  cookie: {
    writable: true,
    value: "myCookie=omnomnom"
  }
});

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});
