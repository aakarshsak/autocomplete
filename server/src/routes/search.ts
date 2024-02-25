import { Router } from "express";
import { autoComplete, insert } from "../services/TrieService";
import TrieStore from "../store/TrieStore";

const routes = Router();

let store: TrieStore;

routes.get("/", async (req, res) => {
  const searchKeyword = req.query.q;

  const key = searchKeyword ? (searchKeyword as string) : "";
  const list = await autoComplete(key);

  res.json(list);
});

routes.post("/", async (req, res) => {
  const body = req.body;

  store = new TrieStore();
  for (let item of body) {
    // store.insert(item);
    // await insert(item);
    await insert(item);
  }

  res.json({ status: 200, message: "Successfully inserted..." });
});

routes.get("/frequency", (req, res) => {
  const searchKeyword = req.query.q;
  console.log(searchKeyword);

  const list = store.autocompleteListWithFrequency(searchKeyword as string);

  res.json(list);
});

export default routes;
