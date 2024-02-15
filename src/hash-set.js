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

  hash(element) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < element.length; i++) {
      hashCode = primeNumber * hashCode + element.charCodeAt(i);
    }

    return hashCode % this.bucketCount;
  }

  add(element) {
    if (!element) throw new Error("Incorrect parameters");
    this.elementCount++;
    if (this.elementCount > this.bucketCount * this.loadFactor) {
      this.resize();
    }

    const currentBucket = this.selectBucket(element);

    const elementExistIndex = this.elementExistInBucket(currentBucket, element);

    if (elementExistIndex === null) {
      currentBucket.addToEnd(element);
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
        const element = bucket.getValueAt(nodeIndex);
        const index = this.hash(element);
        newBuckets[index].addToEnd(element);
      }
    }
    this.buckets = newBuckets;
  }

  has(element) {
    if (!element) throw new Error("Incorrect parameters");
    const currentBucket = this.selectBucket(element);

    const elementExistIndex = this.elementExistInBucket(currentBucket, element);

    return elementExistIndex !== null ? true : false;
  }

  remove(element) {
    if (!element) throw new Error("Incorrect parameters");
    const currentBucket = this.selectBucket(element);
    const elementExistIndex = this.elementExistInBucket(currentBucket, element);

    if (elementExistIndex !== null) {
      currentBucket.removeAt(elementExistIndex);
      this.elementCount--;
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
  elementExistInBucket(bucket, element) {
    return bucket.searchAdvanced((value) => value === element);
  }

  selectBucket(element) {
    const index = this.hash(element);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return this.buckets[index];
  }
}
