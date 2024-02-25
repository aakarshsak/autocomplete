import TrieNode from "../models/TrieNode";

type TrieNodeUn = TrieNode | undefined | null;

type Result = {
  suggestedWord: string;
  frequency: number;
};

export default class TrieStore {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert = (word: string) => {
    let node: TrieNodeUn = this.root;
    for (let char of word.toLowerCase()) {
      if (!node?.getMap().has(char)) {
        node?.getMap().set(char, new TrieNode());
      }
      node = node?.getMap().get(char);
    }
    node?.setWord(true);
    node?.setFrequency(node?.getFrequency() + 1);
  };

  traverse = (prefix: string): TrieNodeUn => {
    let node: TrieNodeUn = this.root;
    for (let char of prefix.toLowerCase()) {
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

  autocompleteList = (prefix: string): string[] => {
    let node = this.traverse(prefix);
    return this.allCombination(node, prefix, []);
  };

  allCombinationWithFrequency = (
    startingNode: TrieNodeUn,
    currWord: string,
    wordList: Result[]
  ): Result[] => {
    if (startingNode?.isWord())
      wordList.push({
        suggestedWord: currWord,
        frequency: startingNode.getFrequency(),
      });

    let map = startingNode?.getMap() || new Map();

    for (let entry of map.entries()) {
      this.allCombinationWithFrequency(entry[1], currWord + entry[0], wordList);
    }

    return wordList;
  };

  autocompleteListWithFrequency = (prefix: string): Result[] => {
    let node = this.traverse(prefix);
    return this.allCombinationWithFrequency(node, prefix, []);
  };
}
