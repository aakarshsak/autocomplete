import Trie from "../db/trie";

export const insert = async (word: string) => {
  for (let i = 1; i <= word.length; i++) {
    let prefix = word.substring(0, i);

    const isWord = i === word.length;
    await Trie.updateOne(
      { prefix },
      {
        $setOnInsert: {
          prefix,
          isWord,
        },
        $inc: { "metaData.frequency": 1 },
        $set: {
          "metaData.updatedOn": new Date(),
        },
      },
      { upsert: true }
    );
  }
};

// export const search = async (prefix: string): Promise<boolean> => {
//   let existedWord;
//   try {
//     existedWord = await Trie.findOne({ prefix });
//     console.log(existedWord);
//     return existedWord?.isWord;
//   } catch (e) {
//     console.log(e);
//   }

//   return false;
// };
