import React from "react";
import Questions from "./Questions";
const QuestionList = ({ questionsList, filterval }) => {
  if (filterval == "all") {
    return (
      <>
        <p className="left-align">{questionsList.length} questions</p>
        <div className="display-questions">
          {questionsList
            .slice(0)
            .reverse()
            .map((question) => (
              <Questions question={question} key={question._id} />
            ))}
        </div>
      </>
    );
  } else {
    var output = questionsList.filter(
      (question) => question.questionTags == filterval
    );
    console.log(output);
    return (
      <>
        <p className="left-align">{output.length} questions</p>
        <div className="display-questions">
          {output
            .slice(0)
            .reverse()
            .map((out) => (
              <Questions question={out} key={out._id} />
            ))}
        </div>
      </>
    );
  }
};

export default QuestionList;
