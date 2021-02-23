/*
|-------------------------------------------------------------------------------
| Set
|-------------------------------------------------------------------------------
|
*/
const Set = window.Set && window.Set.prototype.forEach ? window.Set : (function () {
  function Set(arr) {
    this.values = [];
    this.size = 0;

    if (Array.isArray(arr)) {
      this.values = arr.slice();
      this.size = arr.length;
    } else if (arr instanceof Set) {
      this.values = arr.values.slice();
      this.size = arr.size;
    }
  }
  Set.prototype = {
    add(value) {
      if (this.values.indexOf(value) === -1) {
        this.values.push(value);
        this.size++;
      }
      return this;
    },

    has(value) {
      return this.values.indexOf(value) !== -1;
    },

    forEach(fn) {
      for (let i = 0; i < this.size; i++) {
        fn(this.values[i], this.values[i], this);
      }
    },

    'delete'(value) {
      let i;
      if ((i = this.values.indexOf(value)) !== -1) {
        this.values.splice(i, 1);
        this.size--;
        return true;
      }
      return false;
    }
  };
  return Set;
})();

export default Set;