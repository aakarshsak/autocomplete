import TrieNode from "../models/TrieNode";

type TrieNodeUn = TrieNode | undefined | null;

export default class TrieStore {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert = (word: string) => {
    let node: TrieNodeUn = this.root;
    for (let char of word) {
      if (!node?.getMap().has(char)) {
        node?.getMap().set(char, new TrieNode());
      }
      node = node?.getMap().get(char);
    }
    node?.setWord(true);
  };

  traverse = (prefix: string): TrieNodeUn => {
    let node: TrieNodeUn = this.root;
    for (let char of prefix) {
      let map: any = node?.getMap();
      if (!map.has(char)) return null;
      node = map.get(char);
    }

    return node;
  };

  search = (prefix: string): boolean => {
    const node = this.traverse(prefix);
    return node ? node.isWord() : false;
  };

  allCombination = (
    startingNode: TrieNodeUn,
    currWord: string,
    wordList: string[]
  ): string[] => {
    if (startingNode?.isWord()) wordList.push(currWord);

    let map = startingNode?.getMap() || new Map();

    for (let entry of map.entries()) {
      this.allCombination(entry[1], currWord + entry[0], wordList);
    }

    return wordList;
  };

  autocompleteList = (prefix: string) => {
    let node = this.traverse(prefix);
    return this.allCombination(node, prefix, []);
  };
}
