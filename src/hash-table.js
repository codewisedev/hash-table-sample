/**
 * HashTable implementation with dynamic resizing and collision handling
 * @class HashTable
 */
class HashTable {
  /**
   * Creates a new HashTable instance
   * @param {number} initialSize - Initial size of the hash table (default: 53)
   */
  constructor(initialSize = 53) {
    this.keyMap = new Array(initialSize); // Internal array to store key-value pairs
    this.size = 0; // Track number of elements
    this.loadFactor = 0.75; // Threshold for resizing
  }

  /**
   * Generates a hash value for a given key
   * @private
   * @param {string} key - The key to hash
   * @returns {number} The calculated hash value
   */
  _hash(key) {
    const PRIME = 31; // Prime number for better distribution
    let total = 0;

    // Limit key length to 100 chars for performance
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      // Convert char to number (a=1, b=2, etc.)
      const value = char.charCodeAt(0) - 96;
      // Calculate hash using polynomial rolling hash function
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return Math.abs(total);
  }

  /**
   * Resizes the hash table when load factor threshold is reached
   * @private
   */
  _resize() {
    const newSize = this.keyMap.length * 2; // Double the size
    const oldKeyMap = this.keyMap; // Store old array
    this.keyMap = new Array(newSize); // Create new array
    this.size = 0; // Reset size

    // Rehash all existing entries
    oldKeyMap.forEach((bucket) => {
      if (bucket) {
        bucket.forEach(([key, value]) => {
          this.set(key, value);
        });
      }
    });
  }

  /**
   * Sets a key-value pair in the hash table
   * @param {string} key - The key
   * @param {*} value - The value to store
   * @returns {HashTable} The hash table instance
   * @throws {Error} If key is null or undefined
   */
  set(key, value) {
    if (!key) throw new Error("Key cannot be null or undefined");

    // Check if resize is needed
    if (this.size / this.keyMap.length >= this.loadFactor) {
      this._resize();
    }

    const index = this._hash(key);
    // Initialize bucket if doesn't exist
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    const bucket = this.keyMap[index];
    // Check for existing key
    const existingEntry = bucket.find((entry) => entry[0] === key);

    if (existingEntry) {
      existingEntry[1] = value; // Update existing value
    } else {
      bucket.push([key, value]); // Add new entry
      this.size++;
    }

    return this;
  }

  /**
   * Retrieves value associated with given key
   * @param {string} key - The key to look up
   * @returns {*} The value associated with the key, or undefined if not found
   * @throws {Error} If key is null or undefined
   */
  get(key) {
    if (!key) throw new Error("Key cannot be null or undefined");

    const index = this._hash(key);
    if (!this.keyMap[index]) return undefined;

    const entry = this.keyMap[index].find((entry) => entry[0] === key);
    return entry ? entry[1] : undefined;
  }

  /**
   * Removes a key-value pair from the hash table
   * @param {string} key - The key to delete
   * @returns {boolean} True if deletion was successful, false otherwise
   * @throws {Error} If key is null or undefined
   */
  delete(key) {
    if (!key) throw new Error("Key cannot be null or undefined");

    const index = this._hash(key);
    if (!this.keyMap[index]) return false;

    const bucket = this.keyMap[index];
    const entryIndex = bucket.findIndex((entry) => entry[0] === key);

    if (entryIndex === -1) return false;

    bucket.splice(entryIndex, 1);
    this.size--;

    // Clean up empty buckets
    if (bucket.length === 0) {
      this.keyMap[index] = undefined;
    }

    return true;
  }

  /**
   * Returns all key-value pairs in the hash table
   * @returns {Array} Array of all entries
   */
  getAll() {
    return this.keyMap
      .filter((bucket) => bucket)
      .reduce((acc, bucket) => acc.concat(bucket), []);
  }

  /**
   * Removes all entries from the hash table
   */
  clear() {
    this.keyMap = new Array(this.keyMap.length);
    this.size = 0;
  }

  /**
   * Gets the current number of entries in the hash table
   * @returns {number} Number of entries
   */
  get length() {
    return this.size;
  }
}

module.exports = HashTable;
