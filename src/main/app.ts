import {Industry} from "./questionnaire/domain";
import {load_answers, load_questionnaire} from "./questionnaire/infrastructure";


const load_manufacturing = load_questionnaire(Industry.Manufacturing);
const load_others = load_answers("tenant", "facility")

Promise.all([load_others, load_manufacturing])
       .then(results => {
         console.log(results[0])
         console.log(results[1])
       }).catch(reason => {console.log(reason)})


