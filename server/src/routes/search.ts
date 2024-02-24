import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  const searchKeyword = req.query.q;
  console.log(searchKeyword);
  const list = [
    "first",
    "second",
    "third",
    "forth",
    "fifth",
    "sixth",
    "seventh",
    "eigth",
    "ninth",
    "tenth",
  ];

  res.json(list);
});

export default routes;
