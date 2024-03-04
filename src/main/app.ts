import {Industry} from "./questionnaire/domain";
import {load_questionnaire, print_question} from "./questionnaire/infrastructure";

load_questionnaire(Industry.Manufacturing)
  .then((get_data) => {

    console.log(get_data.map((q) => print_question(q)))
  })

