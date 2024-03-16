//page elemnts

//intro screen
var introEl = document.querySelector("#intro");

//buttons
var startBtn = document.querySelector("#start");
var asw1Btn = document.querySelector("#asw1");
var asw2Btn = document.querySelector("#asw2");
var asw3Btn = document.querySelector("#asw3");
var asw4Btn = document.querySelector("#asw4");

//q&a section
var questionsEl = document.querySelector("#questions");
// <h2> that holds the question for user
var questionEl = document.querySelector("#question");
// for div providing feedback if answer is right/wrong
var correctWrong = document.querySelector("#correct-wrong");
// question index counter
var quizQuestions = 0
var userAnswer
var firstFlagChoice=true;


//var timerInterval; //declared here so i can stop it later in stopTimer()
var currentQuestions;

var questions = [ 
    {
        question: "מה העוולה(נושא)",
        answers: ["ספאם", "לשון הרע", "הנגשת אתרים", "עברות מחשבים"],
        correctAnswer: "ספאם" 
        }
];

var spamQuestions = [ {},
    {
        question: "האם מדובר באחד מהדברים הבאים: (דבר פרסומת) ",
        answers: ["מסר המופץ באופן מסחרי, במטרה לעודד רכישת מוצר, שירות, הוצאת כספים בדרך אחרת, בקשת תרומה או תעמולה.",
        "מסר המופץ לציבור הרחב (בדרך כלל מסר חלקי), שיש בו הצעה לנמען להתקשר למספר מסוים כדי לקבל מידע, שירות או מסר כלשהו.",
        "חיוג לנמען באמצעות מערכת חיוג אוטומטי, כאשר החיוג מופסק לפני שהנמען עונה  ובחזרה למספר הטלפון מושמע דבר פרסומת."
        ,"אף אחד מהנל"],
        correctAnswer: "אף אחד מהנל"        
    },
    {
        question: "מיהו המפרסם? האם השולח הוא",
        answers: ["משלוח מסרים מאת המדינה"," מוסדותיה או גופים אחרים ששר התקשורת אישר ","חברה ציבורית","חברה פרטית"],
        correctAnswer:"חברה פרטית"
    },  
    {
        question: "איך ההודעה נשלחה ",
        answers: [ "פקס","הודעת SMS/הודעת דואר אלקטרוני","מערכת חיוג אוטומטי ","דרך הפצה אחרת"],
        correctAnswer: "דרך הפצה אחרת"
    },
    {
        question:" האם נתת את הסכמתך מראש לכך" ,
        answers: ["כן נתתי","לא נתתי","לא יודע","אולי"],
        correctAnswer: "כן נתתי"
    },
    {
        question:"כמה הודעות ספאם קיבלת" ,
        answers: ["1","2-10","10-20","מעל 20"],
        correctAnswer: "כן נתתי"
    },
    {
        question:"האם הפנייה הייתה דרך אחד מהגורמים הבאים ",
        answers: ["פנייה ממפרסם שבה הצעה להסכים לקבל דברי פרסומת שכוללים בקשות לקבלת תרומה או תעמולה","פנייה ממפרסם שבה הצעה להסכים לקבל מסרים שיווקיים","לא","פנייה בדרך אחרת"],
        correctAnswer: "כן נתתי"
    },
    {
        question:"האם סירבת לקבל פרסום" ,
        answers: ["כן סירבתי","לא סירבתי","לא יודע","אולי"],
        correctAnswer: "כן סירבתי"
    },
    {
        question:"מטרת הפרסום" ,
        answers: ["הפרסום הוא בנושא עמותות","הפרסום הוא בנושא תרומות"," הפרסום הוא בנושא בחירות או פרסומים של המדינה","עידוד הוצאות כספים"],
        correctAnswer: "כן נתתי"
    }
 ];

var lashonHaraQuestions = [ {},
    {
        question:"אמצעי הפרסום, כיצד הפגיעה קרתה " ,
        answers: ["אינטרנט","פנים מול פנים","מקום ציבורי","מקום פרטי"],
        correctAnswer: "כן סירבתי"
    },
    {
        question:"מהות הפרסום? תיאור אירוע שקרה" ,
        answers: ["לבזות אדם בנושא התנהגותו ", "פגיעה במשלוח יד","השפלת אדם בעיני הבריאות","אף אחד ממהויות אלו"],
        correctAnswer: "אף אחד ממהויות אלו"
    },
    {
        question: "האם הדבר פורסם",
        answers: ["כן פורסם", "לא פורסם","לא יודע","אולי"],
        correctAnswer: "כן פורסם"
    },
    {
        question:"האם בדבר הפרסום יש משום לשון הרעה",
        answers: ["כן ישנו", "לא יש","לא יודע","אולי"],
        correctAnswer: "כן ישנו"
    },
    {
        question:" האם זה נעשה בתום לב",
        answers: ["נעשה בתום לב ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },
    {
        question:" האם דובר דבר אמת",
        answers: ["דובר דבר אמת ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },
    {
        question:" האם יש בפרסום עניין ציבורי",
        answers: ["כן יש עניין", "לא אין","לא יודע","אולי"],
        correctAnswer: "כן יש עניין"
    },
    {
        question:"האם מדובר ב",
        answers: [" פרסומים של הכנסת וחבריה הממשלה ושריה", "מבקר המדינה"," צדדים בהליך משפטי","אף אחד מהנל"],
        correctAnswer: "אף אחד מהנל"
    },
    {
        question: "במידה ואף אחד לא מתאים אולי ישנה עילה,בחר אם אתה מסכים עם אחד מהנאמר",
        answers: ["המפרסם היה משכנע באמיתות דבריו", " המפרסם התנצל/המפרסם לא התכוון לנפגע","האם לדעתך היה חזרה על מה שנאמר ","תיקן או הכחיש הדבר"],
        correctAnswer: ""
    },
    {
        question:"מספר האנשים שבפניהם הובאה הידיעה",
        answers: ["אף אחד ", "אדם 1 ","1 ויותר ","10+"],
        correctAnswer: "כן פורסם"
    }
 ];

 var webQuestions = [{},
    {
    question:" האם  קיים באתר תקנון אתר ומדיניות פרטיות",
    answers: ["כן ", "לא ","לא יודע","אולי"],
    correctAnswer: "לא "
    },        
    {
        question:" האם האתר מספק כלים או אפשרויות לקבלת תוכן בהתאם לצרכי הנגישות, כגון גודל גופן מותאם, אפשרות לשינויי צבעים או אפשרות לשינוי באופן הניווט באתר",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },
    {
        question:" האם קיימים בעיות בנגישות שמונעות ממך לגשת לתכנים באתר בצורה נוחה",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },
    {
        question:" האם האתר כולל מידע על הנגישות שלו או על תקניות הנגישות שהוטמעו בו",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },        
    {
        question:"האם הנתבע הוא",
        answers: ["גוף פרטי הפועל למטרות רווח", "רשויות ציבוריות, כגון משרד ממשלתי או רשות מקומית ","גוף הפועל שלא למטרות רווח, כגון עמותה המספקת שירות לציבור","אף אחד מהנל"],
        correctAnswer: "אף אחד מהנל הנתבע "
    },        
    {
        question:" האם התובע הוא",
        answers: ["ארגון העוסק בקידום זכויותיהם של בעלי מוגבלויות ", "הנציבות ","אדם עם מוגבלות ","אף אחד מהנל"],
        correctAnswer: "אף אחד מהנל התובע"
    }
    ];

 var camputerQuestions = [{},
    {
        question:" האם בוצעה אחת מהעוולות האלו",
        answers: ["הפרעה לשימוש במחשב או בחומר מחשב/נגיף מחשב","עבירות מרמה באמצעות מחשב","כדי לעבור על עבירה אחרת/חדירה לחומר מחשב שלא כדין","לא בוצע אף אחד מהנל"],
        correctAnswer: "אף אחד מהנל התובע"
    },        
    {
        question:"האם דאגת להגן/לאבטח את המחשב שלך -מומלץ מאוד לאבטח את המחשב",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },          
    {
        question:"האם יש לך חשש כי נעשו עבירות מחשב בחשבון שלך",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },       
    {
        question:"האם יש לך ראיות, מידע או התראות שמצביעות על פעילות חשודה במחשבך",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },       
    {
        question:"האם יש סימנים שבעינייך מצביעים על פעילות לא רגילה במחשבך",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },     
    {
        question:"האם קיימים נהלי אבטחת מידע במשרדך/ מחשבך הפרטי",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },        
    {
        question:"האם השארת את מחשבך העברת לטכנאי אשר ביצע פריצה",
        answers: ["כן ", "לא ","לא יודע","אולי"],
        correctAnswer: "לא "
    },        
    {
        question:" האם המידע זלג כתוצאה מכך שהוא ניצפה עי אחרים בזמן שעבדת",
        answers: ["כן נצפה", "לא ","לא יודע","אולי"],
        correctAnswer: "כן נצפה"
    },        
    {
        question:"היכן אתה נוהג לשמור את סיסמאת המחשב ",
        answers: ["מחליף כל רבעון ", "מוצפן"," מונח מתחת למקלדת","במקום גלוי"],
        correctAnswer: "לא "
    },        
    {
        question:"האם מדובר ב",
        answers: [" גניבת פרטים אישיים (תמונות וכו)/ פרטי תשלום (גניבת כרטיס אשראי)  ",
        " פגיעה כך שהמחשב מתפקד בצורה לא תקינה(שיבוש פעולת מחשב או הפרעה למערכת מחשב"," התחזות לבן אדם אחר על ידי מחשב/קבלת דבר במרמה","אף אחד מהמדובר"],
        correctAnswer: "אף אחד מהמדובר "
    },
 ];


/////////////////starts the quiz/////////////////////////////
function startQuiz() {
    introEl.style.display = "none"; //removes intro screen and start button
    questionsEl.style.display = "block" // reveals the questions html

    displayQuestions(quizQuestions) //displays questions after timer begins
}

///////////////////////function for displaying the questions to tha page////////////
function displayQuestions() {
    // Determine which set of questions to display based on user's choice
    if (userAnswer === "לשון הרע") {
        currentQuestions = lashonHaraQuestions;
    } else if (userAnswer === "ספאם") {
        currentQuestions = spamQuestions;
    } else if (userAnswer === "הנגשת אתרים") {
        currentQuestions = webQuestions;
    } else if (userAnswer === "עברות מחשבים") {
        currentQuestions = camputerQuestions;
    } else if (firstFlagChoice) {
        currentQuestions = questions;
        firstFlagChoice = false;
    }

    // Check if there are no more questions in the current set
    if (quizQuestions >= currentQuestions.length) {
        console.log(currentQuestions[quizQuestions]);
        resetPage();
        alert(username.value + " אנו מתנצלים הבוט אינו מצא תשובה החלטית גש לייעוץ מקצועי, הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך יום טוב ");
    } else {
        questionEl.textContent = currentQuestions[quizQuestions].question;
        asw1Btn.textContent = currentQuestions[quizQuestions].answers[0];
        asw2Btn.textContent = currentQuestions[quizQuestions].answers[1];
        asw3Btn.textContent = currentQuestions[quizQuestions].answers[2];
        asw4Btn.textContent = currentQuestions[quizQuestions].answers[3];

        asw1Btn.onclick = function (event) {
            userAnswer = event.target.textContent; // Update userAnswer
            checkAnswer(event);
        };
        asw2Btn.onclick = function (event) {
            userAnswer = event.target.textContent; // Update userAnswer
            checkAnswer(event);
        };
        asw3Btn.onclick = function (event) {
            userAnswer = event.target.textContent; // Update userAnswer
            checkAnswer(event);
        };
        asw4Btn.onclick = function (event) {
            userAnswer = event.target.textContent; // Update userAnswer
            checkAnswer(event);
        };
    }
}


function resetPage() {
    // Hide the question section and display the intro screen
    questionsEl.style.display = "none";
    introEl.style.display = "block";
    location.reload();
}

////check if answer is correct
function checkAnswer(event) {
    
   userAnswer = event.target.textContent
   console.log(userAnswer);
   event.preventDefault();

   correctWrong.style.display = "block";  //displayed user notif div and appands a <p> to it
   var p = document.createElement("p");
   correctWrong.appendChild(p);

    
    if (quizQuestions < currentQuestions.length+1) {
        quizQuestions++;
    }
    else{
        resetPage();
        alert(username.value + " אנו מתנצלים הבוט אינו מצא תשובה החלטית גש לייעוץ מקצועי, הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך יום טוב ");
    }
    setTimeout(displayQuestions, 1000); //adds 1s between questions so user can see right or wrong
    
   var yesAnswers = ["כן סירבתי", "עידוד הוצאות כספים", "מעל 20", "10-20", "2-10",
    "1 ויותר ", "10+",
   "גוף פרטי הפועל למטרות רווח", "רשויות ציבוריות, כגון משרד ממשלתי או רשות מקומית ", "גוף הפועל שלא למטרות רווח, כגון עמותה המספקת שירות לציבור",
   "ארגון העוסק בקידום זכויותיהם של בעלי מוגבלויות ", "הנציבות ", "אדם עם מוגבלות ",
   "מחליף כל רבעון ", "מוצפן", " גניבת פרטים אישיים (תמונות וכו)/ פרטי תשלום (גניבת כרטיס אשראי)  ",
   " פגיעה כך שהמחשב מתפקד בצורה לא תקינה(שיבוש פעולת מחשב או הפרעה למערכת מחשב", " התחזות לבן אדם אחר על ידי מחשב/קבלת דבר במרמה",
   "הפרעה לשימוש במחשב או בחומר מחשב/נגיף מחשב","עבירות מרמה באמצעות מחשב","חדירה לחומר מחשב שלא כדין","חדירה לחומר מחשב כדי לעבור על עבירה אחרת"
    ];
    var noAnswers = ["משלוח מסרים מאת המדינה", " מוסדותיה או גופים אחרים ששר התקשורת אישר ", "דרך הפצה אחרת","אף אחד ממהויות אלו",
    "כן נתתי", "הפרסום הוא בנושא עמותות", "הפרסום הוא בנושא תרומות",
    " הפרסום הוא בנושא בחירות או פרסומים של המדינה", "כן יש עניין",
    " פרסומים של הכנסת וחבריה  הממשלה ושריה", "מבקר המדינה", " צדדים בהליך משפטי",
    "המפרסם היה משכנע באמיתות דבריו", " המפרסם התנצל/המפרסם לא התכוון לנפגע", "האם לדעתך היה חזרה על מה שנאמר ", "תיקן או הכחיש הדבר",
    "אף אחד ", "אדם 1 ", "אף אחד מהנל התובע", "אף אחד מהנל הנתבע ", "כן נצפה",
    " מונח מתחת למקלדת", "במקום גלוי", "אף אחד מהמדובר","פנייה ממפרסם שבה הצעה להסכים לקבל דברי פרסומת שכוללים בקשות לקבלת תרומה או תעמולה","פנייה ממפרסם שבה הצעה להסכים לקבל מסרים שיווקיים",
    "לא פורסם","נעשה בתום לב ","דובר דבר אמת "
    ];
    

    // Check if the selected answer triggers an alert
    if (yesAnswers.includes(userAnswer)) {
        resetPage();
        showAlert("Custom Alert Message 1");
        alert(username.value + " יש עילה לתביעה! הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך יום טוב ");
        showAlert(username.value + " יש עילה לתביעה! הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך יום טוב ");
    } else if (noAnswers.includes(userAnswer)) {
        resetPage();
        alert(username.value + " נראה כי אין עילה לתביעה, הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך יום טוב ");
        showAlert(username.value + " נראה כי אין עילה לתביעה, הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך יום טוב ");
    }
    
}

//////////////////////////event listeners//////////////////////
startBtn.addEventListener("click", startQuiz)