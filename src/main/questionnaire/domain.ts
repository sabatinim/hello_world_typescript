export type BaseQuestion = TextQuestion | MoneyQuestion

export type Question = BaseQuestion | ListQuestion

type BaseFields = {
  id: string
  text: string
}

type TextQuestion = {
  base: BaseFields
  kind: "TextQuestion"
}

type MoneyQuestion = {
  base: BaseFields
  kind: "MoneyQuestion"
}

type ListQuestion = {
  base: BaseFields
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


