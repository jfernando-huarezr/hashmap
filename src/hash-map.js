import LinkedList from "./linked-list.js";

export default class HashMap {
  constructor() {
    this.bucketCount = 16;
    this.pairCount = 0;
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

  set(key, value) {
    if (!key && !value) throw new Error("Incorrect parameters");
    this.pairCount++;
    if (this.pairCount > this.bucketCount * this.loadFactor) {
      this.resize();
    }

    const currentBucket = this.selectBucket(key);

    const keyExistIndex = this.keyExistInBucket(currentBucket, key);

    if (keyExistIndex) {
      currentBucket.getValueAt(keyExistIndex).value = value;
    } else {
      currentBucket.addToEnd({ key, value });
    }
  }

  resize() {
    this.bucketCount *= 2;
    const newBuckets = Array.from(
      { length: this.bucketCount },
      () => new LinkedList()
    );

    for (const bucket of this.buckets) {
      for (let nodeIndex = 0; nodeIndex < bucket.getLength(); nodeIndex++) {
        const pair = bucket.getValueAt(nodeIndex);
        const index = this.hash(pair.key);
        newBuckets[index].addToEnd({ key: pair.key, value: pair.value });
      }
    }
    this.buckets = newBuckets;
  }

  get(key) {
    if (!key) throw new Error("Incorrect parameters");
    const currentBucket = this.selectBucket(key);

    const keyExistIndex = this.keyExistInBucket(currentBucket, key);
    console.log(keyExistIndex);

    return keyExistIndex !== null
      ? currentBucket.getValueAt(keyExistIndex).value
      : null;
  }

  has(key) {
    if (!key) throw new Error("Incorrect parameters");
    const currentBucket = this.selectBucket(key);

    const keyExistIndex = this.keyExistInBucket(currentBucket, key);

    return keyExistIndex !== null ? true : false;
  }

  remove(key) {
    if (!key) throw new Error("Incorrect parameters");
    const currentBucket = this.selectBucket(key);
    const keyExistIndex = this.keyExistInBucket(currentBucket, key);

    if (keyExistIndex !== null) {
      currentBucket.removeAt(keyExistIndex);
      this.pairCount--;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.pairCount;
  }

  clear() {
    this.bucketCount = 16;
    this.pairCount = 0;
    this.buckets = Array(this.bucketCount).fill(new LinkedList(), 0);
  }

  keys() {
    const keysArr = [];

    for (const bucket of this.buckets) {
      for (let nodeIndex = 0; nodeIndex < bucket.getLength(); nodeIndex++) {
        const pairKey = bucket.getValueAt(nodeIndex).key;
        keysArr.push(pairKey);
      }
    }

    return keysArr;
  }

  values() {
    const valuesArr = [];

    for (const bucket of this.buckets) {
      for (let nodeIndex = 0; nodeIndex < bucket.getLength(); nodeIndex++) {
        const pairValue = bucket.getValueAt(nodeIndex).value;
        valuesArr.push(pairValue);
      }
    }

    return valuesArr;
  }

  entries() {
    const pairsArr = [];

    for (const bucket of this.buckets) {
      for (let nodeIndex = 0; nodeIndex < bucket.getLength(); nodeIndex++) {
        const pair = bucket.getValueAt(nodeIndex);
        pairsArr.push(pair);
      }
    }

    return pairsArr;
  }

  //extras
  keyExistInBucket(bucket, key) {
    return bucket.searchAdvanced((value) => value.key === key);
  }

  selectBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return this.buckets[index];
  }
}
