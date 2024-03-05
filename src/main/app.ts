import {Industry} from "./questionnaire/domain";
import {load_answers, load_questionnaire, print_question} from "./questionnaire/infrastructure";


const load_questionnaire_promise = load_questionnaire(Industry.Manufacturing);
const load_answers_promise = load_answers("tenant", "facility")

Promise.all([load_answers_promise, load_questionnaire_promise])
       .then(results => {
         console.log("########## ANSWERS ##########")
         console.log(results[0])
         console.log("########## QUESTIONS ########## ")
         console.log(results[1].map(q=>print_question(q)))
         console.log("##########")
       }).catch(reason => {console.log(reason)})


