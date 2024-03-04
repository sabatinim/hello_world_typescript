import {BaseQuestion, create_list_question, create_money_question, create_text_question, Question} from "./domain";

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