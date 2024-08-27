import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export interface IQuestion {
  questionName: string;
  questionHeading: string;
  questionSubHeading: string;
  questionOptions: any[];
}

interface QuestionProps {
  question: IQuestion;
  submitAction: (answer: any) => void;
}

export const Question = ({ question, submitAction }: QuestionProps) => {
  const {
    questionHeading: heading,
    questionSubHeading: subHeading,
    questionOptions,
  } = question;
  const submit = (answer: any) => {
    submitAction(answer);
  };
  return (
    <>
      <h1>{heading}</h1>
      {subHeading && <p>{subHeading}</p>}
      {questionOptions && questionOptions.length > 0 && (
        <ButtonGroup vertical className="gap-2">
          {questionOptions.map((option) => (
            <Button
              key={option}
              style={{ width: 500 }}
              onClick={() => submit(option)}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </>
  );
};
