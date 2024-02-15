class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    // head
    // null
    this.head = null;
    this.length = 0;
  }

  addToStart(value) {
    // create empty Node
    let newNode = new Node(value);
    // save the current head node into newNode.next
    newNode.next = this.head;
    // now update this.head as newNode
    this.head = newNode;
    // update the linked list length
    this.length++;
  }

  addToEnd(value) {
    let newNode = new Node(value);

    if (this.head == null) {
      // if linked list empty
      // the head is newNode
      this.head = newNode;
    } else {
      // else, we need to travel all the list until we
      // find the last node (the one who has next = null)
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      // once found, attach newNode as next
      current.next = newNode;
    }

    // update linked list length
    this.length++;
  }

  insertAt(index, value) {
    // validate index value
    if (index < 0 || index > this.length) {
      throw new Error("index exceeds the limits of the list");
    }

    // create new Node
    let newNode = new Node(value);

    if (index === 0) {
      // if index = 0, it's an addToStart(value)
      this.addToStart(value);
    } else {
      // else, we need to locate
      // the node (index - 1)
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      // then we do our insertion
      newNode.next = current.next;
      current.next = newNode;
    }

    //update linked list length
    this.length++;
  }

  getNodeAt(index) {
    // validate index value
    if (index < 0 || index >= this.length) {
      throw new Error("index exceeds the limits of the list");
    }

    // travel the list "index" times
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    // return element at "index" position
    return current;
  }

  getValueAt(index) {
    // validate index value
    if (index < 0 || index >= this.length) {
      throw new Error("index exceeds the limits of the list");
    }

    // travel the list "index" times
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    // return element value at "index" position
    return current.value;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  print() {
    // travel element in the list
    // print value while it exists
    let current = this.head;
    while (current != null) {
      console.log(current.value);
      current = current.next;
    }
  }

  head() {
    return this.head;
  }

  tail() {
    let current = this.head;

    while (current.next != null) {
      current = current.next;
    }
    return current;
  }

  pop() {
    if (!this.head) return null;

    let previous = this.head;
    let current = previous.next;

    if (!current) {
      this.clear();
      return previous;
    }

    while (current.next !== null) {
      previous = current;
      current = current.next;
    }

    previous.next = null;
    return current;
  }

  contains(value) {
    if (!this.head) return false;

    let current = this.head;

    while (current.next !== null) {
      if (current.value === value) return true;
      current = current.next;
    }

    return false;
  }

  find(value) {
    if (!this.head) return null;

    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }

    return null;
  }

  toString() {
    if (!this.head) return null;

    let current = this.head;
    let string = this.head.value;

    current = current.next;

    while (current != null) {
      string = `${string} -> ${current.value}`;
      current = current.next;
    }

    console.log(string);
  }

  removeAt(index) {
    // validate index value
    if (index < 0 || index > this.length) {
      throw new Error("index exceeds the limits of the list");
    }

    if (index === 0) {
      // index 0, remove head and transfer next value as new head
      let newHead = this.head.next;
      this.head = newHead;
    } else {
      // else, we need to find
      // node (index - 1)
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      // the next will be the node next next
      current.next = current.next.next;
    }

    this.length--;
  }

  searchAdvanced(callback) {
    if (!this.head) return false;

    let current = this.head;
    let index = 0;

    while (current != null) {
      if (callback(current.value)) return index;
      current = current.next;
      index++;
    }

    return null;
  }
}
