export default class TrieNode {
  private map: Map<string, TrieNode>;
  private word: boolean;
  private frequency: number;

  constructor(
    map: Map<string, TrieNode> = new Map(),
    word: boolean = false,
    frequency: number = 0
  ) {
    this.map = map;
    this.word = word;
    this.frequency = frequency;
  }

  getMap = () => this.map;

  isWord = () => this.word;

  setWord = (word: boolean) => (this.word = word);

  getFrequency = () => this.frequency;

  setFrequency = (frequency: number) => (this.frequency = frequency);
}
