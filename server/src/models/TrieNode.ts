export default class TrieNode {
  private map: Map<string, TrieNode>;
  private word: boolean;

  constructor(map: Map<string, TrieNode> = new Map(), word: boolean = false) {
    this.map = map;
    this.word = word;
  }

  getMap = () => this.map;

  isWord = () => this.word;

  setWord = (word: boolean) => (this.word = word);
}
