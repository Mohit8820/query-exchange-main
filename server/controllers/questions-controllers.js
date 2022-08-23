const uuid = require("uuid");
const HttpError = require("../models/http-error");

const DUMMY_Questions = [
  {
    _id: 1,
    upVotes: 8,
    downVotes: 2,
    noOfAnswers: 2,
    questionTitle:
      "What is the difference between the function malloc() and calloc()?",
    questionBody:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    questionTags: "bca",
    userPosted: "mano",
    userId: 1,
    askedOn: " 2022-07-14 11:45:26.123",
    answers: [
      {
        answerBody: "<span>a</span>",
        userAnswered: "kumar",
        //   answeredOn: "jan 2",
        userId: 2,
      },
    ],
  },
  {
    _id: 2,
    upVotes: 8,
    downVotes: 2,
    noOfAnswers: 2,
    questionTitle:
      "What are the key skills a candidate requires to excel in the field of business administration?",
    questionBody: "It meant to be",
    questionTags: "bba",
    userPosted: "mano",
    userId: 1,
    askedOn: "2022-07-14 10:45:26.123",
    answers: [
      {
        answerBody: "<span>a</span>",
        userAnswered: "kumar",
        //   answeredOn: "jan 2",
        userId: 2,
      },
      {
        answerBody: "<h2>Answer 2</h2>",
        userAnswered: "kumar 333",
        //   answeredOn: "jan 2",
        userId: 22,
      },
    ],
  },
  {
    _id: 3,
    upVotes: 8,
    downVotes: 2,
    noOfAnswers: 2,
    questionTitle: "What are embedded structure?",
    questionBody: "It meant to be",
    questionTags: "b.tech",
    userPosted: "mano",
    userId: 1,
    askedOn: "jan 20",
    answers: [
      {
        answerBody: "<span>a</span>",
        userAnswered: "kumar",
        //   answeredOn: "jan 2",
        userId: 2,
      },
      {
        answerBody: "<h2>Answer 2</h2>",
        userAnswered: "kumar 333",
        //   answeredOn: "jan 2",
        userId: 22,
      },
    ],
  },
  {
    _id: 4,
    upVotes: 8,
    downVotes: 2,
    noOfAnswers: 2,
    questionTitle:
      "Without using library function compute the length of the string.",
    questionBody:
      "I'm coding a function to find the string length without using the standard headers. I completed the code with start to end but when I'm returning the count at the end, it is not returning the correct answer.",
    questionTags: "b.tech",
    userPosted: "mano",
    userId: 1,
    askedOn: "jan 1",
    answers: [],
  },
];

const getAllQuestion = (req, res, next) => {
  const questions = DUMMY_Questions;

  if (!questions || questions.length === 0) {
    throw new HttpError("error finding any question", 404); //use "throw error" when synchronous function // next(error) when async

    // return res.status(404).json({ message: "error finding question by uid" });
  }
  res.json({ questions });
};

const getQuestionByQId = (req, res, next) => {
  const quesId = req.params.qid;
  const question = DUMMY_Questions.find((q) => {
    console.log(q._id + " " + quesId);
    return q._id.toString() === quesId;
  });

  if (!question) {
    throw new HttpError("error finding question by qid", 404);
    // return res.status(404).json({ message: "error finding question by qid" });
  }
  res.json({ question }); // => { place } => { place: place }
};

const getQuestionsByUserId = (req, res) => {
  const userId = req.params.uid;
  const questions = DUMMY_Questions.filter((q) => {
    return q.userId === userId;
  });
  if (!questions || questions.length === 0) {
    throw new HttpError("error finding questions by qid", 404); //use "throw error" when synchronous function // next(error) when async

    // return res.status(404).json({ message: "error finding question by uid" });
  }
  res.json({ questions });
};

const createQuestion = (req, res, next) => {
  console.log(req.body);
  const { questionTitle, questionBody, questionTags, askedOn, userId } =
    req.body;
  // const title = req.body.title;
  const createdQues = {
    _id: uuid(),
    questionTitle: questionTitle,
    questionBody: questionBody,
    questionTags,
    answers: [],
    upVotes: 0,
    downVotes: 0,
    askedOn,
    userId,
  };

  DUMMY_Questions.push(createdQues); //unshift(createdPlace)

  res.status(201).json({ question: createdQues });
};

const updateQuestion = (req, res, next) => {
  const answer = req.body;
  const quesId = req.params.qid;
  console.log(quesId);
  const updatedQuestion = {
    ...DUMMY_Questions.find((q) => q._id.toString() === quesId),
  };
  const quesIndex = DUMMY_Questions.findIndex(
    (q) => q._id.toString() === quesId
  );

  updatedQuestion.answers = [...updatedQuestion.answers, answer];

  DUMMY_Questions[quesIndex] = updatedQuestion;
  console.log("updatedQuestion" + updatedQuestion);
  res.status(200).json({ question: updatedQuestion });
};

exports.getAllQuestion = getAllQuestion;
exports.getQuestionByQId = getQuestionByQId;
exports.getQuestionsByUserId = getQuestionsByUserId;
exports.createQuestion = createQuestion;
exports.updateQuestion = updateQuestion;

/*
const DUMMY_Questions = [
  {
    id: "q1",
    title: "Empire State Building",
    upVotes: 4,
    downVotes: 2,
    description: "One of the most famous sky scrapers in the world!",
    answers: ["abc", "pqr"],
    creator: "u1",
  },
  {
    id: "q2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    upVotes: 4,
    downVotes: 2,
    answers: [],
    creator: "u1",
  },
];

const getQuestionByQId = (req, res, next) => {
  const quesId = req.params.qid;
  const question = DUMMY_Questions.find((q) => {
    return q.id === quesId;
  });

  if (!question) {
    throw new HttpError("error finding question by qid", 404);
    // return res.status(404).json({ message: "error finding question by qid" });
  }
  res.json({ question }); // => { place } => { place: place }
};

const getQuestionsByUserId = (req, res) => {
  const userId = req.params.uid;
  const questions = DUMMY_Questions.filter((q) => {
    return q.creator === userId;
  });
  if (!questions || questions.length === 0) {
    throw new HttpError("error finding questions by qid", 404); //use "throw error" when synchronous function // next(error) when async

    // return res.status(404).json({ message: "error finding question by uid" });
  }
  res.json({ questions });
};

const createQuestion = (req, res, next) => {
  console.log(req.body);
  const { title, description, tag, creator } = req.body;
  // const title = req.body.title;
  const createdQues = {
    id: uuid(),
    title: title,
    description: description,
    tag,
    answers: [],
    upVotes: 0,
    downVotes: 0,
    creator: creator,
  };

  DUMMY_Questions.push(createdQues); //unshift(createdPlace)

  res.status(201).json({ question: createdQues });
};

const updateQuestion = (req, res) => {
  const { answer } = req.body;
  const quesId = req.params.qid;

  const updatedQuestion = { ...DUMMY_Questions.find((q) => q.id === quesId) };
  const quesIndex = DUMMY_Questions.findIndex((q) => q.id === quesId);

  updatedQuestion.answers = [...updatedQuestion.answers, answer];

  DUMMY_Questions[quesIndex] = updatedQuestion;
  console.log(updatedQuestion);
  res.status(200).json({ question: updatedQuestion });
};

exports.getQuestionByQId = getQuestionByQId;
exports.getQuestionsByUserId = getQuestionsByUserId;
exports.createQuestion = createQuestion;
exports.updateQuestion = updateQuestion;
*/
