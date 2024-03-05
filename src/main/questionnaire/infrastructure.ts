import {parse_answers, parse_questions} from "./parser";
import {Answer, Industry, Question} from "./domain";


function in_memory_get_questionnaire_by(industry: Industry): Promise<any> {
  const json_from_back_end = [{
    "question_id": "waste_penalties", "kind": "list_question", "text": "Bla Bla", "sub_questions": [{
      "question_id": "penalty_name", "kind": "text_question", "text": "Bla"
    }, {"question_id": "cost_per_hour", "kind": "money_question", "text": "Bla "}]
  }];

  let in_memory_storage = new Map<string, any>()
  in_memory_storage.set(Industry.Manufacturing, json_from_back_end)
  const result = in_memory_storage.get(industry);

  return new Promise((resolve, reject) => {
    result ? resolve(result) : reject(`${industry} doesn't have questionnaire configured`)
  });
}

type LoadQuestionnaire = (industry: Industry) => Promise<Question[]>
type GetQuestionnaireBy = (industry: Industry) => Promise<any>;

const configure_load_questionnaire = (get_questionnaire_by: GetQuestionnaireBy): LoadQuestionnaire => (industry: Industry) => new Promise((resolve, reject) => {
  get_questionnaire_by(industry)
    .then(json => {resolve(parse_questions(json))})
    .catch(client_error => reject(`Load questionnaire error: ${client_error}`))
})

export const load_questionnaire = configure_load_questionnaire(in_memory_get_questionnaire_by)

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


function in_memory_get_answers_by(tenant_id: string, facility_id: string): Promise<any> {
  const json_from_back_end: any = [{
    "question_id": "aaa", "kind": "text_answer", "text": "bbb", "value": "aaa", "user": "bbb", "timestamp": 123
  }, {"question_id": "aaa", "kind": "numeric_answer", "text": "bbb", "value": 456, "user": "bbb", "timestamp": 123}];

  let in_memory_storage = new Map<string, any>()
  in_memory_storage.set("tenant_facility", json_from_back_end)

  const result = in_memory_storage.get(`${tenant_id}_${facility_id}`);

  return new Promise((resolve, reject) => {
    result ? resolve(result) : reject(`${tenant_id}, ${facility_id} get answers error!`)
  });

  return new Promise((resolve, _) => {resolve(json_from_back_end)});
}

type LoadAnswers = (tenant_id: string, facility_id: string) => Promise<Answer[]>
type GetAnswersBy = (tenant_id: string, facility_id: string) => Promise<any>;

const configure_load_answers = (get_answers_by: GetAnswersBy): LoadAnswers => (tenant_id: string, facility_id: string) => new Promise((resolve, reject) => {
  get_answers_by(tenant_id, facility_id)
    .then(json => {resolve(parse_answers(json))})
    .catch(client_error => reject(`Load questionnaire error: ${client_error}`))
})

export const load_answers = configure_load_answers(in_memory_get_answers_by)