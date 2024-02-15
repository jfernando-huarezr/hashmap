import LinkedList from "./linked-list.js";

export default class HashMap {
  constructor() {
    this.bucketCount = 16;
    this.pairCount = 0;
    this.loadFactor = 0.75;
    this.buckets = Array(this.bucketCount).fill(new LinkedList(), 0);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.bucketCount;
  }

  set(key, value) {
    this.size++;
    if (this.size > this.bucketCount * this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const currentBucket = this.buckets[index];

    const keyExistIndex = currentBucket.searchEachNode(
      (value) => value.key === key
    );

    if (keyExistIndex) {
      currentBucket.getValueAt(keyExistIndex).value = value;
    } else {
      currentBucket.addToEnd({ key, value });
    }
  }

  resize() {}

  get(key) {}

  has(key) {}

  remove(key) {}

  length() {}

  clear() {}

  keys() {}

  values() {}

  entries() {}
}
