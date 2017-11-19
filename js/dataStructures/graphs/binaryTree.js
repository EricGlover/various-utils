// [8, 10, 3, 1, 6, 14, 4, 7, 13]

// Don't recall if this works

class Node {
  constructor(data, left = null, right = null, depth = 0) {
    this.left = left;
    this.right = right;
    this.data = data;
    this.depth = depth;
  }
}

class BinaryTree {
  constructor(array) {
    this.root = new Node(array[0], null, null, 1);
    this.maxDepth = 0;
    this.makeTree(array.slice(1));
  }

  makeTree(array) {
    array.forEach(num => {
      this.insertNode(new Node(num), this.root);
    });
  }

  insertNode(node, parent) {
    if (parent.data > node.data) {
      if (parent.left) {
        this.insertNode(node, parent.left);
      } else {
        parent.left = node;
        node.depth = parent.depth + 1; ///set depth
        if (this.maxDepth < node.depth) this.maxDepth = node.depth;
      }
    } else if (parent.data < node.data) {
      if (parent.right) {
        this.insertNode(node, parent.right);
      } else {
        parent.right = node;
        node.depth = parent.depth + 1; ///set depth
        if (this.maxDepth < node.depth) this.maxDepth = node.depth;
      }
    }
    //they're equal and do nothing
  }

  printTree(queue) {
    const allNull = queue.every(node => node === null);
    if (allNull) return;

    const numChildren = (this.depth - 1) ** 2;
    const depth = Math.log2(queue.length) + 1;
    // const tab = this.maxDepth / (numChildren * 2);
    // const tab = 2 ** this.maxDepth / 2 ** depth;
    // const tab = 2 ** (this.maxDepth - depth);
    let tab = this.maxDepth - depth + 1;
    // load the data first

    let length = queue.length;
    // console.log("tab = ", tab, "depth = ", depth, " max = ", this.maxDepth);
    for (let i = 0; i < length; i++) {
      if (i === 0) tab--;
      if (i === 1) tab++;
      if (queue[i] === null) {
        process.stdout.write(`${"\t".repeat(tab)} null `);
        queue.push(null, null);
        continue;
      }
      queue.push(queue[i].left);
      queue.push(queue[i].right);
      process.stdout.write(`${"\t".repeat(tab)}${queue[i].data} `);
    }
    process.stdout.write("\n");

    queue = queue.slice(length);
    this.printTree(queue);
  }

  print() {
    this.printTree([this.root]);
  }
}

const test = new BinaryTree([8, 10, 3, 1, 6, 14, 4, 7, 13]);
test.print();

/////
