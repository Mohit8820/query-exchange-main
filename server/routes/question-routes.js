const express = require("express");

const router = express.Router();

const questionController = require("../controllers/questions-controllers.js");

router.get("/", questionController.getAllQuestion);

router.get("/:qid", questionController.getQuestionByQId);

router.get("/user/:uid", questionController.getQuestionsByUserId);

router.post("/", questionController.createQuestion);

router.patch("/:qid", questionController.updateQuestion);

router.delete("/:qid", questionController.createQuestion);

module.exports = router;
