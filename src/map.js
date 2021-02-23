/*
|-------------------------------------------------------------------------------
| Map
|-------------------------------------------------------------------------------
|
*/
const Map = window.Map && window.Map.prototype.forEach ? window.Map : (function () {
  function Map() {
    this.keys = [];
    this.values = [];
    this.size = 0;
  }
  Map.prototype = {
    set(key, value) {
      let i;

      if ((i = this.keys.indexOf(key)) === -1) {
        this.keys.push(key);
        this.size = this.keys.length;
        return this.values.push(value);
      }
      this.values[i] = value;
    },

    get(key) {
      return this.values[this.keys.indexOf(key)];
    },

    has(key) {
      return this.keys.indexOf(key) !== -1;
    },

    forEach(fn) {
      for (let i = 0; i < this.size; i++) {
        fn(this.values[i], this.keys[i], this);
      }
    },

    'delete'(key) {
      let i;
      if ((i = this.keys.indexOf(key)) !== -1) {
        this.keys.splice(i, 1);
        this.values.splice(i, 1);
        this.size = this.keys.length;
        return true;
      }
      return false;
    }
  };
  return Map;
})();

export default Map;