import {parse_answer, parse_answers} from "../main/questionnaire/parser";
import {Answer} from "../main/questionnaire/domain";
import {load_answers} from "../main/questionnaire/infrastructure";


describe('Answer tests', function () {
  it('Parse Text Answer', () => {

    const answer_json =
      {"question_id": "aaa", "kind": "text_answer", "text": "bbb", "value": "aaa", "user": "bbb", "timestamp": 123};

    const expected: Answer = parse_answer(answer_json)

    expect(expected).toEqual({
                               "base": {"question_id": "aaa", "timestamp": 123, "user": "bbb"},
                               "kind": "TextAnswer",
                               "value": "aaa"
                             })
  });

  it('Parse Numeric Answer', () => {

    const answer_json =
      {"question_id": "aaa", "kind": "numeric_answer", "text": "bbb", "value": 456, "user": "bbb", "timestamp": 123};

    const expected: Answer = parse_answer(answer_json)

    expect(expected).toEqual({
                               "base": {"question_id": "aaa", "timestamp": 123, "user": "bbb"},
                               "kind": "NumericAnswer",
                               "value": 456
                             })
  });


  it("Parse Answers", () => {

    const answers_json =
      [
        {"question_id": "aaa", "kind": "text_answer", "text": "bbb", "value": "aaa", "user": "bbb", "timestamp": 123},
        {"question_id": "aaa", "kind": "numeric_answer", "text": "bbb", "value": 456, "user": "bbb", "timestamp": 123}
      ]

    let actual: Answer[] = parse_answers(answers_json)

    expect(actual).toEqual([
                             {
                               "base": {"question_id": "aaa", "timestamp": 123, "user": "bbb"},
                               "kind": "TextAnswer",
                               "value": "aaa"
                             },
                             {
                               "base": {"question_id": "aaa", "timestamp": 123, "user": "bbb"},
                               "kind": "NumericAnswer",
                               "value": 456
                             }
                           ])
  });

  it('Parse Answer goes in error', () => {
    expect(() => {
      parse_answer({"kind": "unknown"})
    }).toThrow(Error("Unhandled kind unknown"))
  });

  it('Load Answers', async () => {
    let result = await load_answers("tenant", "facility")

    let expected = [
      "(ListQuestion, id=waste_penalties, text=Bla Bla, sub_questions=[(TextQuestion, id=penalty_name, text=Bla),(MoneyQuestion, id=cost_per_hour, text=Bla )])"
    ]
    expect(result).toEqual(
      [
        {
          "base": {"question_id": "aaa", "timestamp": 123, "user": "bbb"},
          "kind": "TextAnswer",
          "value": "aaa"
        },
        {
          "base": {"question_id": "aaa", "timestamp": 123, "user": "bbb"},
          "kind": "NumericAnswer",
          "value": 456
        }])
  });


})
