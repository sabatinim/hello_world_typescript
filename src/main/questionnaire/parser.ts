import {
  Answer,
  BaseQuestion,
  create_list_question,
  create_money_question, create_numeric_answers,
  create_text_answers,
  create_text_question,
  Question
} from "./domain";

export function parse_base_question(question_json: any): BaseQuestion {
  let id = question_json.question_id;
  let texts = question_json.text;
  let kind = question_json.kind;

  switch (kind) {
    case 'text_question':
      return create_text_question(id, texts);
    case 'money_question':
      return create_money_question(id, texts);
    //parse different question types
    default:
      throw new Error(`Unhandled kind ${kind}`);
  }
}


export function parse_question(question_json: any): Question {
  let id = question_json.question_id;
  let texts = question_json.text;
  let kind = question_json.kind;

  switch (kind) {
    case 'list_question':
      let sub_questions = question_json.sub_questions;
      return create_list_question(id, texts, sub_questions.map((json: any) => parse_base_question(json)))
    default:
      return parse_base_question(question_json)
  }
}


export function parse_questions(questions_json: any): Question[] {
  return questions_json.map((json: any) => parse_question(json))
}


export function parse_answer(answer_json: any): Answer {
  let kind = answer_json.kind
  let question_id = answer_json.question_id
  let value = answer_json.value
  let user = answer_json.user
  let timestamp = answer_json.timestamp

  switch (kind) {
    case 'text_answer':
      return create_text_answers(question_id, value, user, timestamp)
    case 'numeric_answer':
      return create_numeric_answers(question_id, value, user, timestamp)
    default:
      throw new Error(`Unhandled kind ${kind}`);
  }
}

export function parse_answers(answers_json: any): Answer[] {
  return answers_json.map((json: any) => parse_answer(json))
}