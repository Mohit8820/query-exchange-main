import React from "react";
import QuestionItem from "./QuestionItem";
const QuestionList = ({ questionsList, filterval, sortVal }) => {
  const questions = questionsList;

  /* function compareLikes(a, b) {
    if (a.likes.length > b.likes.length) {
      return -1;
    }
    if (a.likes.length < b.likes.length) {
      return 1;
    }
    return 0;
  }
  function compareAns(a, b) {
    if (a.answers.length > b.answers.length) {
      return -1;
    }
    if (a.answers.length < b.answers.length) {
      return 1;
    }
    return 0;
  }

  const sortQuestons = (sortVal) => {
    if (sortVal === "latest") {
      console.log("abc");
      setQuestions(
        questions.sort(function (a, b) {
          return new Date(b.askedOn) - new Date(a.askedOn);
        })
      );
      console.log("pqr");
    }
    if (sortVal === "oldest") {
      console.log("abc");
      setQuestions(
        questions.sort(function (a, b) {
          return new Date(a.askedOn) - new Date(b.askedOn);
        })
      );
      console.log("pqr");
    }
    if (sortVal === "upvotes") {
      setQuestions(questions.sort(compareLikes));
    }
    if (sortVal === "downvotes") {
      setQuestions(questions.sort(compareAns));
    }
  };

  useEffect(() => {
    console.log("change");
  }, [questionsList]);

  useEffect(() => {
    console.log(sortVal);
    sortQuestons(sortVal);
  }, [sortVal]);*/
  console.log(sortVal);
  if (filterval === "all") {
    return (
      <>
        <p className="left-align">{questions.length} questions</p>
        <div className="display-questions">
          {questions.map((question) => (
            <QuestionItem question={question} key={question._id} />
          ))}
        </div>
      </>
    );
  } else {
    var output = questions.filter(
      (question) => question.questionTags === filterval
    );
    console.log(output);
    return (
      <>
        <p className="left-align">{output.length} questions</p>
        <div className="display-questions">
          {output.map((out) => (
            <QuestionItem question={out} key={out._id} />
          ))}
        </div>
      </>
    );
  }
};

export default QuestionList;
