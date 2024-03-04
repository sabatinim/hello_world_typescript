export type BaseQuestion = TextQuestion | MoneyQuestion

export type Question = BaseQuestion | ListQuestion

type BaseQuestionFields = {
  id: string
  text: string
}

type TextQuestion = {
  base: BaseQuestionFields
  kind: "TextQuestion"
}

type MoneyQuestion = {
  base: BaseQuestionFields
  kind: "MoneyQuestion"
}

type ListQuestion = {
  base: BaseQuestionFields
  kind: "ListQuestion"
  sub_questions: BaseQuestion[]
}

//Add additional question types

export function create_text_question(id: string, text: string): TextQuestion {
  return {base: {id: id, text: text}, kind: "TextQuestion"}
}

export function create_money_question(id: string, text: string): MoneyQuestion {
  return {base: {id: id, text: text}, kind: "MoneyQuestion"}
}

export function create_list_question(id: string, text: string, sub_questions: BaseQuestion[]): ListQuestion {
  return {base: {id: id, text: text}, kind: "ListQuestion", sub_questions: sub_questions}
}

export enum Industry {
  Manufacturing = "MANUFACTURING",
  Other = "OTHER",
}


export type Answer = NumericAnswer | TextAnswer

type BaseAnswerFields = {
  question_id: string
  user: string
  timestamp: number
}

type NumericAnswer = {
  base: BaseAnswerFields
  value: number
  kind: "NumericAnswer"
}

type TextAnswer = {
  base: BaseAnswerFields
  value: string
  kind: "TextAnswer"
}


export function create_numeric_answers(question_id: string, value: number, user: string, timestamp: number): NumericAnswer {
  return {base: {question_id: question_id, user: user, timestamp: timestamp}, value: value, kind: "NumericAnswer"}
}

export function create_text_answers(question_id: string, value: string, user: string, timestamp: number): TextAnswer {
  return {base: {question_id: question_id, user: user, timestamp: timestamp}, value: value, kind: "TextAnswer"}
}
