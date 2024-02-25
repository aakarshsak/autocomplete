import { Schema, model } from "mongoose";

const schema = new Schema({
  prefix: { type: String },
  isRoot: { type: Boolean, default: false },
  isWord: { type: Boolean, default: false },
  children: [{ type: Schema.Types.ObjectId, ref: "TrieNode" }],
});

const Trie2 = model("TrieNode", schema);

export default Trie2;
