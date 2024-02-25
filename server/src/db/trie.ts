import { Schema, model } from "mongoose";

const schema = new Schema({
  prefix: String,
  isWord: Boolean,
  metaData: {
    frequency: { type: Number, default: 1 },
    updatedOn: Date,
  },
});

const Trie = model("Trie", schema);

export default Trie;
