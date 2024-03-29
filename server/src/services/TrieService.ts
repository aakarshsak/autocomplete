import dotenv from "dotenv";
import Trie from "../db/trie";
dotenv.config();

const AUTOCOMPLETE_LIMIT = process.env.SUGGESTION_LIMIT || "8";

export const createRootNode = async () => {
  let root = await Trie.findOne({ isRoot: true });
  if (!root) {
    root = new Trie({ prefix: "", isRoot: true });
    await root.save();
  }

  return root;
};

export const insert = async (word: string, root: any) => {
  let currentNode = root;

  for (let char of word.trim().toLowerCase()) {
    let childNode;

    for (let child of currentNode?.children) {
      childNode = await Trie.findOne({ _id: child, prefix: char });
      if (childNode) break;
    }

    if (!childNode) {
      const newNode = new Trie({ prefix: char });
      await newNode.save();

      currentNode?.children.push(newNode._id);
      await currentNode?.save();

      currentNode = newNode;
    } else {
      currentNode = childNode;
    }
  }

  if (currentNode) {
    currentNode.isWord = true;
    await currentNode.save();
  }
};

export const traverse = async (prefix: string) => {
  let root = await Trie.findOne({ isRoot: true });
  if (!root) {
    return null;
  }

  let currentNode = root;

  for (let char of prefix) {
    let childNode;

    console.log(currentNode.children, char, "CHILDRENT");
    for (let child of currentNode?.children) {
      childNode = await Trie.findOne({ _id: child, prefix: char });
      if (childNode) break;
    }

    console.log(childNode, char, "OUTER");

    if (!childNode) return null;

    currentNode = childNode;
  }

  return currentNode;
};

export const search = async (word: string) => {
  const currentNode = await traverse(word.toLowerCase());
  return currentNode?.isWord;
};

export const allCombination = async (
  startingNode: any,
  currentWord: string,
  wordList: string[]
) => {
  //   console.log(startingNode, "STARTING");

  if (wordList.length >= parseInt(AUTOCOMPLETE_LIMIT)) return wordList;
  if (startingNode.isWord) wordList.push(currentWord);

  for (let child of startingNode.children) {
    const childNode = await Trie.findById(child);
    wordList = await allCombination(
      childNode,
      currentWord + childNode?.prefix,
      wordList
    );
  }

  return wordList;
};

export const autoComplete = async (prefix: string) => {
  prefix = prefix.toLowerCase();
  let currentNode = await traverse(prefix);
  console.log(currentNode);

  return !currentNode ? [] : allCombination(currentNode, prefix, []);
};
