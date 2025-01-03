class HashTable {
  constructor(initialSize = 53) {
    this.keyMap = new Array(initialSize);
    this.size = 0;
    this.loadFactor = 0.75;
  }

  _hash(key) {
    const PRIME = 31;
    let total = 0;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return Math.abs(total);
  }

  _resize() {
    const newSize = this.keyMap.length * 2;
    const oldKeyMap = this.keyMap;
    this.keyMap = new Array(newSize);
    this.size = 0;

    oldKeyMap.forEach((bucket) => {
      if (bucket) {
        bucket.forEach(([key, value]) => {
          this.set(key, value);
        });
      }
    });
  }

  set(key, value) {
    if (!key) throw new Error("Key cannot be null or undefined");

    if (this.size / this.keyMap.length >= this.loadFactor) {
      this._resize();
    }

    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    const bucket = this.keyMap[index];
    const existingEntry = bucket.find((entry) => entry[0] === key);

    if (existingEntry) {
      existingEntry[1] = value;
    } else {
      bucket.push([key, value]);
      this.size++;
    }

    return this;
  }

  get(key) {
    if (!key) throw new Error("Key cannot be null or undefined");

    const index = this._hash(key);
    if (!this.keyMap[index]) return undefined;

    const entry = this.keyMap[index].find((entry) => entry[0] === key);
    return entry ? entry[1] : undefined;
  }

  delete(key) {
    if (!key) throw new Error("Key cannot be null or undefined");

    const index = this._hash(key);
    if (!this.keyMap[index]) return false;

    const bucket = this.keyMap[index];
    const entryIndex = bucket.findIndex((entry) => entry[0] === key);

    if (entryIndex === -1) return false;

    bucket.splice(entryIndex, 1);
    this.size--;

    if (bucket.length === 0) {
      this.keyMap[index] = undefined;
    }

    return true;
  }

  getAll() {
    return this.keyMap
      .filter((bucket) => bucket)
      .reduce((acc, bucket) => acc.concat(bucket), []);
  }

  clear() {
    this.keyMap = new Array(this.keyMap.length);
    this.size = 0;
  }

  get length() {
    return this.size;
  }
}

module.exports = HashTable;
