import {parse_questions} from "./parser";
import {Industry, Question} from "./domain";


function get_questionnaire_by(industry: Industry){
  const json_from_back_end = [
    {
      "question_id": "waste_penalties",
      "kind": "list_question",
      "text": "Bla Bla",
      "sub_questions": [
        {"question_id": "penalty_name", "kind": "text_question", "text": "Bla"},
        {"question_id": "cost_per_hour", "kind": "money_question", "text": "Bla "}
      ]
    }];

  let in_memory_storage = new Map<string, any>()
  in_memory_storage.set(Industry.Manufacturing, json_from_back_end)
  return in_memory_storage.get(industry);
}

export function load_questionnaire(industry: Industry): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    const to_parse = get_questionnaire_by(industry); // call API

    to_parse ? resolve(parse_questions(to_parse)) : reject(`Questionnaire for ${industry} not exist`)
  })
}


export function print_question(q: Question): string {
  switch (q.kind) {
    case "MoneyQuestion" || "TextQuestion":
      return `(${q.kind}, id=${q.base.id}, text=${q.base.text})`

    case "ListQuestion":
      return `(${q.kind}, id=${q.base.id}, text=${q.base.text}, sub_questions=[${q.sub_questions.map((q) => `(${q.kind}, id=${q.base.id}, text=${q.base.text})`)}])`

    default:
      return "Unknown"
  }
}