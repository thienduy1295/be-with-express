const express = require("express");
const { sendResponse, validateQuery } = require("../helpers/utility");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

const db = [{ id: "1234", name: "Duy", age: "18" }];

router.get("/", (req, res, next) => {
  res.send({ data: {}, message: "Hello world" });
});

router.get("/news", (req, res, next) => {
  const { q, title, page, city, category } = req.query;
  let message = "Successfully get all news";
  if (q) {
    message += `Successfully get all news related to query ${q}`;
  }
  if (title) {
    message += `Successfully get all news that have tittle ${title} or ${title}`;
  }
  if (page) {
    message += `Successfully get page  ${page} news`;
  }
  if (city) {
    message += city;
  }
  if (category) {
    message += `Successfully get all news that have category according to ${category}`;
  }
  return sendResponse(db, 200, message, res, next);
});

router.get("/news/:id", (req, res, next) => {
  const { id } = req.params;
  const message = `Successfully get detail of 1 single new with the id is ${id}`;
  return sendResponse({}, 200, message, res, next);
});

router.post("/news", isAuthenticated, (req, res, next) => {
  try {
    const query = req.query;
    const keysArray = Object.keys(query);
    const allowed = ["title", "category", "city", "q", "page"];
    keysArray.forEach((e) => {
      if (allowed.indexOf(e) === -1) {
        const error = new Error(`${e} not allow`);
        error.statusCode = 400;
        throw error;
      }
    });
    return sendResponse({}, 200, "post news", res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/news/:id", isAuthenticated, (req, res, next) => {
  // const body = req.body;
  const { id } = req.params;
  // const found = db.findIndex((el) => el.id === id);
  // db[found] = body;
  return sendResponse(
    {},
    200,
    "Successfully create a news about Morning HCM in HCM and related to category of daily, general and covid",
    res,
    next
  );
});

router.delete("/news/:id", (req, res, next) => {
  // const body = req.body;
  const { id } = req.params;
  // const found = db.findIndex((el) => el.id === id);
  // db[found] = body;
  return sendResponse(
    {},
    200,
    "Successfully find the news with id , and delete",
    res,
    next
  );
});

module.exports = router;
