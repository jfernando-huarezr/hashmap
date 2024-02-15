# hashmap
Odin hashmap

HashMap class with the following methods:

1. hash(key): takes a key and produces a hash code with it.
2. set(key, value): takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten. When a collision happens, it adds it to the same bucket (Linked list). Here we also check if we need to increase the number of buckets according to currentKeyPairs > bucketCount * loadFactor. If we need to, the method resize is called. 
3. resize(): increase and refactor all the key-pair elements.
4. get(key): takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
5. has(key): takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
6. remove(key): takes a key as an argument. If the given key is in the hash map, it remove the entry with that key and return true. If the key isn’t in the hash map, it return false.
7. length(): returns the number of stored keys in the hash map.
8. clear(): removes all entries in the hash map.
9. keys(): returns an array containing all the keys inside the hash map.
10. values(): returns an array containing all the values.
11. entries(): returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
