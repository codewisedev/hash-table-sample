# 🔥 Hash Table Implementation

## 📋 Table of Contents

- [Features](#features)
- [Core Implementation](#core-implementation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Implementation Details](#implementation-details)

## ✨ Features

### 🎯 Hash Table

- 📈 Dynamic resizing based on load factor
- 🔄 Efficient collision handling
- ⚡ O(1) average time complexity
- 📊 Built-in size tracking
- ✅ Input validation

### 👥 Core Features

- 💾 CRUD operations
- ✉️ Prime number based hashing
- ⏰ Automatic resizing
- 🛡️ Error handling
- 🔒 Data integrity

## 🚀 Core Implementation

### 🔨 Basic Structure

```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
    this.size = 0;
  }
}
```

🎯 Hash Function

```javascript
_hash(key) {
    const WEIRD_PRIME = 31;
    let total = 0;
    for(let char of key) {
        total = (total * WEIRD_PRIME + char.charCodeAt(0)) % this.keyMap.length;
    }
    return total;
}
```

### 💻 Usage

🌟 Basic Operations

```javascript
const hashTable = new HashTable();

// Adding elements
hashTable.set("name", "John");
hashTable.set("age", 30);

// Getting elements
console.log(hashTable.get("name")); // "John"
```

🔄 Advanced Usage

```javascript
// Handling collisions
hashTable.set("cat", "Meow");
hashTable.set("act", "Performance"); // Same hash value
```

### 📚 API Reference

#### Method Description Time Complexity

```
set()	    Add/Update entry	O(1)
get()	    Retrieve value	    O(1)
delete()	Remove entry	    O(1)
clear()	    Remove all entries	O(1)
```

🛠️ Implementation Details
📊 Performance Characteristics

```
Operation	Average Case	Worst Case
Insert	    O(1)	        O(n)
Lookup	    O(1)	        O(n)
Delete	    O(1)	        O(n)
Space	    O(n)	        O(n)
```

Made with ❤️ by CodeWise
