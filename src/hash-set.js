import LinkedList from "./linked-list.js";

export default class HashSet {
  constructor() {
    this.bucketCount = 16;
    this.elementCount = 0;
    this.loadFactor = 0.75;
    this.buckets = Array.from(
      { length: this.bucketCount },
      () => new LinkedList()
    );
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.bucketCount;
  }

  add(key) {
    this.elementCount++;
    if (this.elementCount > this.bucketCount * this.loadFactor) {
      this.resize();
    }

    const currentBucket = this.selectBucket(key);

    const keyExistIndex = this.keyExistInBucket(currentBucket, key);

    if (!keyExistIndex) {
      currentBucket.addToEnd(key);
    }
  }

  resize() {
    this.bucketCount *= 2;
    const newBuckets = Array(this.bucketCount).fill(new LinkedList(), 0);

    for (const bucket of this.buckets) {
      for (let nodeIndex = 0; nodeIndex < bucket.getLength(); nodeIndex++) {
        const key = bucket.getValueAt(nodeIndex);
        const index = this.hash(key);
        newBuckets[index].addToEnd(key);
      }
    }
    this.buckets = newBuckets;
  }

  has(key) {
    const currentBucket = this.selectBucket(key);

    const keyExistIndex = this.keyExistInBucket(currentBucket, key);

    return keyExistIndex ? true : false;
  }

  remove(key) {
    const currentBucket = this.selectBucket(key);
    const keyExistIndex = this.keyExistInBucket(currentBucket, key);

    if (keyExistIndex) {
      currentBucket.removeAt(keyExistIndex);
      return true;
    } else {
      return false;
    }
  }

  size() {
    return this.elementCount;
  }

  clear() {
    this.bucketCount = 16;
    this.elementCount = 0;
    this.buckets = Array(this.bucketCount).fill(new LinkedList(), 0);
  }

  //extras
  keyExistInBucket(bucket, key) {
    return bucket.searchAdvanced((value) => value === key);
  }

  selectBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return this.buckets[index];
  }
}
