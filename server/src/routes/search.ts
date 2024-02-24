import { Router } from "express";
import TrieStore from "../store/TrieStore";

const routes = Router();

let store: TrieStore;

routes.get("/", (req, res) => {
  const searchKeyword = req.query.q;
  console.log(searchKeyword);
  const list = store.autocompleteList(searchKeyword as string);

  res.json(list);
});

routes.post("/", (req, res) => {
  const body = req.body;

  store = new TrieStore();
  for (let item of body) {
    store.insert(item);
  }

  res.json({ status: 200, message: "Successfully inserted..." });
});

export default routes;
