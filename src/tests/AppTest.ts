import {parse_question, parse_questions} from "../main/questionnaire/parser";
import {Industry, Question} from "../main/questionnaire/domain";
import {load_questionnaire, print_question} from "../main/questionnaire/infrastructure";


describe('Questionnaire tests', function () {
  it('Parse Text Question', () => {

    const question_json =
      {"question_id": "aaa", "kind": "text_question", "text": "bbb"};

    const expected: Question = parse_question(question_json)

    expect(expected).toEqual({"base": {"id": "aaa", "text": "bbb"}, "kind": "TextQuestion"})
  });

  it('Parse Money Question', () => {

    const question_json =
      {"question_id": "aaa", "text": "bbb", "kind": "money_question"};

    const expected: Question = parse_question(question_json)

    expect(expected).toEqual({"base": {"id": "aaa", "text": "bbb"}, "kind": "MoneyQuestion"})
  });


  it('Parse List Question with one money question as sub questions', () => {

    const question_json =
      {
        "question_id": "aaa",
        "kind": "list_question",
        "text": "bbb",
        "sub_questions": [{"question_id": "aaa", "kind": "money_question", "text": "bbb"}]
      };

    const expected = parse_question(question_json)

    expect(expected).toEqual(
      {
        "base": {
          "id": "aaa",
          "text": "bbb"
        },
        "kind": "ListQuestion",
        "sub_questions": [{
          "base": {
            "id": "aaa",
            "text": "bbb",
          },
          "kind": "MoneyQuestion"
        }]
      })
  });


  it("Parse Questions", () => {

    const questions =
      [
        {"question_id": "ccc", "text": "ddd", "kind": "money_question"},
        {
          "question_id": "aaa",
          "kind": "list_question",
          "text": "bbb",
          "sub_questions": [{"question_id": "aaa", "kind": "money_question", "text": "bbb"}]
        }]

    let expected = parse_questions(questions)
    expect(expected).toEqual(
      [
        {"base": {"id": "ccc", "text": "ddd"}, "kind": "MoneyQuestion"},
        {
          "base": {
            "id": "aaa",
            "text": "bbb"
          },
          "kind": "ListQuestion",
          "sub_questions": [
            {
              "base": {
                "id": "aaa",
                "text": "bbb"
              },
              "kind": "MoneyQuestion"
            }
          ]
        }
      ])
  });

  it('Parse Question goes in error', () => {
    expect(() => {
      parse_question({"kind": "unknown"})
    }).toThrow(Error("Unhandled kind unknown"))

  });


  it('Load Questionnaire', async () => {
    let result = await load_questionnaire(Industry.Manufacturing)

    let expected = [
      "(MoneyQuestion, id=ccc, text=ddd)",
      "(ListQuestion, id=aaa, text=bbb, sub_questions=[(MoneyQuestion, id=aaa, text=bbb),(TextQuestion, id=aaa, text=bbb)])"
    ]
    let to_string = result.map((q) => print_question(q))
    expect(to_string).toEqual(expected)
  });

  it('Questionnaire not exist', async () => {
    load_questionnaire(Industry.Other).catch((msg) => {
      expect(msg).toEqual("Questionnaire for OTHER not exist")
    })
  });
})
