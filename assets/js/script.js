//page elemnts

//intro screen
var introEl = document.querySelector("#intro");

//buttons
var startBtn = document.querySelector("#start");
var asw1Btn = document.querySelector("#asw1");
var asw2Btn = document.querySelector("#asw2");
var asw3Btn = document.querySelector("#asw3");
var asw4Btn = document.querySelector("#asw4");
// Get the "חזור לראשית" button element
var goBackBtn = document.querySelector("#go-back");
// Get the " חזור שאלה" button element
var stepBackBtn = document.querySelector("#step-back");

document.getElementById("start").addEventListener("click", function () {
    var username = document.getElementById("username").value;
    var isPlaintiff = document.getElementById("plaintiff").checked; //תובע
    var isDefendant = document.getElementById("defendant").checked; //נתבע
    console.log("Username:", username);
    console.log("Plaintiff:", isPlaintiff);
    console.log("Defendant:", isDefendant);
  });

// question index counter
var quizQuestions = 0; //num of qa
var userAnswer; //בחירת המשתמש
var userAnswerArrey = [];
var firstFlagChoice = true;
var currentQuestions;
var topic; //נושא

// Get references to the label elements
const plaintiffDisplay = document.getElementById('plaintiff-display');
const usernameDisplayStatus = document.getElementById('username-display-status');
const topicDisplay = document.getElementById('topic-display');
const userChoiceDisplay = document.getElementById('user-choice-display');
const questionNumberDisplay = document.getElementById('question-number-display');
const sumOfQuestion = document.getElementById('sum-of-question');

// Call the updateStatusLabels function when the start button is clicked
document.getElementById('start').addEventListener('click', updateStatusLabels);

// Call the updateStatusLabels function when an answer button is clicked
asw1Btn.addEventListener('click', updateStatusLabels);
asw2Btn.addEventListener('click', updateStatusLabels);
asw3Btn.addEventListener('click', updateStatusLabels);
asw4Btn.addEventListener('click', updateStatusLabels);

//q&a section
var questionsEl = document.querySelector("#questions");
// <h2> that holds the question for user
var questionEl = document.querySelector("#question");
// for div providing feedback if answer is right/wrong
var correctWrong = document.querySelector("#correct-wrong");


var questions = [
    {
        question: " מה העוולה(בחר נושא) בהתאם לבחירתך יוצגו שאלות מתאימות",
        answers: ["ספאם", "לשון הרע", "הנגשת אתרים", "עברות מחשבים"],
        correctAnswer: "ספאם"
    }
];

var spamQuestions = [{},
{
    question: " ?האם מדובר באחד מהדברים הבאים: (דבר פרסומת) ",
    answers: ["מסר המופץ באופן מסחרי, במטרה לעודד רכישת מוצר, שירות, הוצאת כספים בדרך אחרת, בקשת תרומה או תעמולה",
        "מסר המופץ לציבור הרחב (בדרך כלל מסר חלקי), שיש בו הצעה לנמען להתקשר למספר מסוים כדי לקבל מידע, שירות או מסר כלשהו",
        "חיוג לנמען באמצעות מערכת חיוג אוטומטי, כאשר החיוג מופסק לפני שהנמען עונה  ובחזרה למספר הטלפון מושמע דבר פרסומת"
        , "אף אחד מהנל"],
    correctAnswer: "אף אחד מהנל"
},
{
    question: "מיהו המפרסם? האם השולח הוא",
    answers: ["משלוח מסרים מאת המדינה", " מוסדותיה או גופים אחרים ששר התקשורת אישר ", "חברה ציבורית", "חברה פרטית"],
    correctAnswer: "חברה פרטית"
},
{
    question: " ?איך ההודעה נשלחה ",
    answers: ["פקס", " SMSהודעת /הודעת דואר אלקטרוני", "מערכת חיוג אוטומטי ", "דרך הפצה אחרת"],
    correctAnswer: "דרך הפצה אחרת"
},
{
    question: " ?האם מקבל ההודעה נתן את הסכמתו מראש לכך",
    answers: ["כן נתן את הסכמתו", "לא נתן", "לא יודע", "אולי"],
    correctAnswer: "כן נתן את הסכמתו"
},
{
    question: " ?כמה הודעות ספאם התקבלו",
    answers: ["1", "2-10", "10-20", "מעל 20"],
    correctAnswer: "כן נתתי"
},
{
    question: " ?האם הפנייה הייתה דרך אחד מהגורמים הבאים ",
    answers: ["פנייה ממפרסם שבה הצעה להסכים לקבל דברי פרסומת שכוללים בקשות לקבלת תרומה או תעמולה", "פנייה ממפרסם שבה הצעה להסכים לקבל מסרים שיווקיים", "לא", "פנייה בדרך אחרת"],
    correctAnswer: "כן נתתי"
},
{
    question: "האם המקבל סירב לקבל פרסום",
    answers: ["כן סירב", "לא סירב", "לא יודע", "אולי"],
    correctAnswer: "כן סירב"
},
{
    question: "מטרת הפרסום",
    answers: ["הפרסום הוא בנושא עמותות", "הפרסום הוא בנושא תרומות", " הפרסום הוא בנושא בחירות או פרסומים של המדינה", "עידוד הוצאות כספים"],
    correctAnswer: "כן נתתי"
}
];

var lashonHaraQuestions = [{},
{
    question: "איפה הפגיעה קרתה? בחר את מקום הפרסום",
    answers: ["אינטרנט", "פנים מול פנים", "מקום ציבורי", "מקום פרטי"],
    correctAnswer: "כן סירב"
},
{
    question: "מה מהות הפרסום? בחר את האירוע שקרה",
    answers: ["לבזות אדם בנושא התנהגותו ", "פגיעה במשלוח יד", "השפלת אדם בעיני הבריאות", "אף אחד ממהויות אלו"],
    correctAnswer: "אף אחד ממהויות אלו"
},
{
    question: " ?האם הדבר פורסם",
    answers: ["כן פורסם", "לא פורסם", "לא יודע", "אולי"],
    correctAnswer: "כן פורסם"
},
{
    question: " ?האם בדבר הפרסום יש משום לשון הרעה",
    answers: ["כן ישנו", "לא יש", "לא יודע", "אולי"],
    correctAnswer: "כן ישנו"
},
{
    question: " ?האם זה נעשה בתום לב",
    answers: ["נעשה בתום לב ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: " ?האם דובר דבר אמת",
    answers: ["דובר דבר אמת ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: " ?האם יש בפרסום עניין ציבורי",
    answers: ["כן יש עניין", "לא אין", "לא יודע", "אולי"],
    correctAnswer: "כן יש עניין"
},
{
    question: "האם מדובר ב",
    answers: [" פרסומים של הכנסת וחבריה הממשלה ושריה", "מבקר המדינה", " צדדים בהליך משפטי", "אף אחד מהנל"],
    correctAnswer: "אף אחד מהנל"
},
{
    question: "במידה ואף אחד לא מתאים אולי ישנה עילה, בחר אם אתה מסכים עם אחד מהנאמר",
    answers: ["היה חזרה על שנאמר/המפרסם היה משכנע באמיתות דבריו", " המפרסם התנצל/המפרסם לא התכוון לנפגע",  "תיקן או הכחיש הדבר","לא מסכים עם אף הגנה"],
    correctAnswer: ""
},
{
    question: " ?מה מספר האנשים שבפניהם הובאה הידיעה",
    answers: ["אף אחד ", "אדם 1 ", "1 ויותר ", "10+"],
    correctAnswer: "כן פורסם"
}
];

var webQuestions = [{},
{
    question: " ?האם  קיים באתר תקנון אתר ומדיניות פרטיות",
    answers: ["כן ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: " ?האם האתר מספק כלים או אפשרויות לקבלת תוכן בהתאם לצרכי הנגישות, כגון גודל גופן מותאם, אפשרות לשינויי צבעים או אפשרות לשינוי באופן הניווט באתר",
    answers: ["כן ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: " ?האם קיימות בעיות בנגישות שמונעות מהנפגע לגשת לתכנים באתר בצורה נוחה",
    answers: ["כן ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: " ?האם האתר כולל מידע על הנגישות שלו או על תקניות הנגישות שהוטמעו בו",
    answers: ["כן ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: "האם הנתבע הוא",
    answers: ["גוף פרטי הפועל למטרות רווח", "רשויות ציבוריות, כגון משרד ממשלתי או רשות מקומית ", "גוף הפועל שלא למטרות רווח, כגון עמותה המספקת שירות לציבור", "אף אחד מהנל"],
    correctAnswer: "אף אחד מהנל הנתבע "
},
{
    question: " האם התובע הוא",
    answers: ["ארגון העוסק בקידום זכויותיהם של בעלי מוגבלויות ", "הנציבות ", "אדם עם מוגבלות ", "אף אחד מהנל"],
    correctAnswer: "אף אחד מהנל התובע"
}
];

var camputerQuestions = [{},
{
    question: " ?האם בוצעה אחת מהעוולות האלו",
    answers: ["הפרעה לשימוש במחשב או בחומר מחשב/נגיף מחשב", "עבירות מרמה באמצעות מחשב", "כדי לעבור על עבירה אחרת/חדירה לחומר מחשב שלא כדין", "לא בוצע אף אחד מהנל"],
    correctAnswer: "אף אחד מהנל התובע"
},
{
    question: "האם דאגת להגן/לאבטח מראש את המחשב? -מומלץ מאוד לאבטח את המחשב",
    answers: ["כן ", "לא הגנתי/אבטחתי ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: "?האם ישנו חשש כי נעשו עבירות מחשב בחשבון",
    answers: ["כן ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
// {
//     question: "?האם יש לנפגע ראיות, מידע או התראות שמצביעות על פעילות חשודה במחשב שלו",
//     answers: ["כן ", "לא ", "לא יודע", "אולי"],
//     correctAnswer: "לא "
// },
// {
//     question: "?האם יש סימנים שבעינייך מצביעים על פעילות לא רגילה במחשב הנפגע",
//     answers: ["כן ", "לא ", "לא יודע", "אולי"],
//     correctAnswer: "לא "
// },
{
    question: "?האם קיימים נהלי אבטחת מידע במשרד/מחשב הנפגע הפרטי",
    answers: ["כן ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: "?האם הנפגע מסר את מחשבו לטכנאי, מבלי שהגן עליו",
    answers: ["כן,מסר את מחשבו ", "לא ", "לא יודע", "אולי"],
    correctAnswer: "לא "
},
{
    question: "?האם המידע זלג כתוצאה מכך שהוא נצפה על ידי אחרים בזמן שהנפגע עבד",
    answers: ["כן נצפה", "לא ", "לא יודע", "אולי"],
    correctAnswer: "כן נצפה"
},
{
    question: "?היכן הנפגע נוהג לשמור את סיסמת המחשב ",
    answers: ["מחליף כל רבעון ", "מוצפן", " מונח מתחת למקלדת", "במקום גלוי"],
    correctAnswer: "לא "
},
{
    question: ":האם מדובר ב",
    answers: [" גניבת פרטים אישיים (תמונות וכו)/ פרטי תשלום (גניבת כרטיס אשראי)  ",
        " פגיעה כך שהמחשב מתפקד בצורה לא תקינה(שיבוש פעולת מחשב או הפרעה למערכת מחשב", " התחזות לבן אדם אחר על ידי מחשב/קבלת דבר במרמה", "אף אחד מהמדובר"],
    correctAnswer: "אף אחד מהמדובר "
},
];


/////////////////starts the quiz/////////////////////////////
function startQuiz() {
    introEl.style.display = "none"; //removes intro screen and start button
    questionsEl.style.display = "block" // reveals the questions html

    displayQuestions(quizQuestions) //displays questions after timer begins
}

///////////////////////Function to update the status labels///////////////////////
function updateStatusLabels() {
    userAnswer = event.target.textContent; // Update userAnswer
    //let size = userAnswerArrey.length;
    const username = document.getElementById('username').value;
    // Check if the user is a plaintiff or defendant
    const isPlaintiff = document.getElementById('plaintiff').checked;
    const isDefendant = document.getElementById('defendant').checked;
    usernameDisplayStatus.textContent = `שלום ${username}`;
    if (isPlaintiff) {
        var PlaintiffDisplay = 'בתור תובע';
    } else if (isDefendant) {
        var PlaintiffDisplay ='בתור נתבע'
        plaintiffDisplay.textContent = 'בתור נתבע';
    } 
    plaintiffDisplay.textContent = PlaintiffDisplay;

    if (topic != null) {
        topicDisplay.textContent = `בנושא ${topic}`;
    }
    if (userAnswer != null && userAnswer !="!התחל"){

        userChoiceDisplay.textContent = `בהמשך לבחירתך האחרונה: ${userAnswer}`;
    }

    if(userAnswer != "!התחל"){
        if(userAnswer == "חזור"){
            questionNumberDisplay.textContent = `הנך במספר שאלה: ${quizQuestions }`;
        }
        else{
            questionNumberDisplay.textContent = `הנך במספר שאלה: ${quizQuestions + 1}`;
        }

        sumOfQuestion.textContent =` מתוך: ${currentQuestions.length}`;
    }
    /////////display the user history choice/////
    var menuList = document.getElementById("menuContent");
    // Clear any existing content in the menu
    menuList.innerHTML = "";
    // Populate the menu with the content of userAnswerArray
    var index = 1;
    var li;
    userAnswerArrey.forEach(function (item) {
        li = document.createElement("li");
        li.textContent = index + "." + item;
        menuList.appendChild(li);
        index++
    });
    li = document.createElement("li");
    li.textContent = index + "." + userAnswer;
    menuList.appendChild(li);
}


///////////////////////function for displaying the questions to tha page////////////
function displayQuestions() {
    console.log(userAnswerArrey);
    // Determine which set of questions to display based on user's choice
    if (userAnswer === "לשון הרע") {
        currentQuestions = lashonHaraQuestions;
        topic = userAnswer;
    } else if (userAnswer === "ספאם") {
        currentQuestions = spamQuestions;
        topic = userAnswer;
    } else if (userAnswer === "הנגשת אתרים") {
        currentQuestions = webQuestions;
        topic = userAnswer;
    } else if (userAnswer === "עברות מחשבים") {
        currentQuestions = camputerQuestions;
        topic = userAnswer;
    } else if (firstFlagChoice) {
        currentQuestions = questions;
        firstFlagChoice = false;
    }

    // Check if there are no more questions in the current set
    if (quizQuestions >= currentQuestions.length) {
        resetPage();
        showAlert("לא נקבעה החלטה",username.value + " אנו מתנצלים הבוט אינו מצא תשובה החלטית. אנא גש לייעוץ מקצועי, הינך מוחזר לעמוד הראשי בכדי להנות משירותי הבוט מחדש. יום טוב ","שחרור");
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

function showAlert(title, message, buttonText){
    createAlertBox(title, message, buttonText)
}

function createAlertBox(title, message, buttonText) {
    // Create the alert box container
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.style.backgroundColor = "#000000";

    // Create the title
    const alertTitle = document.createElement("h2");
    alertTitle.textContent = title;
    alertTitle.style.fontWeight = "bold";
    alertTitle.style.fontSize = "26px";

    // Create the message
    const alertMessage = document.createElement("p");
    alertMessage.textContent = message;
    alertMessage.style.fontSize = "22px";
    alertMessage.style.lineHeight = "1.5";

    // Create the button
    const alertButton = document.createElement("button");
    alertButton.textContent = buttonText;
    alertButton.style.fontSize = "20px";
    alertButton.style.padding = "10px 20px";

    // Create "חזור לראשית" button
    const goBackButton = document.createElement("button");
    goBackButton.textContent = "חזור לראשית";
    goBackButton.style.fontSize = "20px";
    goBackButton.style.padding = "10px 20px";
    // Create "הדפס" button
    const printButton = document.createElement("button");
    printButton.textContent = "הדפס"; 
    printButton.style.fontSize = "20px";
    printButton.style.padding = "10px 20px";

    alertBox.appendChild(alertTitle);
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(goBackButton); 
    alertBox.appendChild(alertButton);
    alertBox.appendChild(printButton);

    goBackButton.addEventListener("click", goBack);
    alertButton.addEventListener("click", () => {
        // Remove the alert box when the "Dismiss" button is clicked
        alertBox.remove();
    });
    printButton.addEventListener("click", () => {
        printButton.style.display = "none";
        window.print();
        // Show the print button after a short delay to avoid layout shifting
        //setTimeout(() => {
        printButton.style.display = "block";
        //}, 100);
    });
    document.body.appendChild(alertBox);
}



function resetPage() {
    // Hide the question section and display the intro screen
    questionsEl.style.display = "none";
    introEl.style.display = "block";
    quizQuestions = 0; // Reset quizQuestions to 0

    // Delay the page reset by 10 seconds
    setTimeout(() => {
        location.reload(); // Reload the page after 10 seconds
    }, 20000); // 10000 milliseconds = 10 seconds
}

////check if answer is correct
function checkAnswer(event) {
    if(userAnswer!="ספאם" && userAnswer!="עברות מחשבים" && userAnswer!="הנגשת אתרים" && userAnswer!="לשון הרע"){
        userAnswerArrey.push(userAnswer);
    }
    event.preventDefault();

    correctWrong.style.display = "block";  //displayed user notif div and appands a <p> to it
    var p = document.createElement("p");
    correctWrong.appendChild(p);


    if (quizQuestions < currentQuestions.length + 1 && userAnswer != "חזור") {
        quizQuestions++;
    }
    else {
        resetPage();  
        showAlert("לא נקבעה החלטה",username.value + " אנו מתנצלים הבוט אינו מצא תשובה החלטית\nגש לייעוץ מקצועי, הינך מוחזר לעמוד הראשי להנות משירותי הבוט מחדש במידת הצורך\nיום טוב ", "שחרור");
    }
    setTimeout(displayQuestions, 1000); //adds 1s between questions so user can see right or wrong

    var yesAnswers = ["כן סירב", "עידוד הוצאות כספים", "מעל 20", "10-20", "2-10",
         "10+",
        "גוף פרטי הפועל למטרות רווח", "רשויות ציבוריות, כגון משרד ממשלתי או רשות מקומית ", "גוף הפועל שלא למטרות רווח, כגון עמותה המספקת שירות לציבור",
        "ארגון העוסק בקידום זכויותיהם של בעלי מוגבלויות ", "הנציבות ", "אדם עם מוגבלות ",
        " גניבת פרטים אישיים (תמונות וכו)/ פרטי תשלום (גניבת כרטיס אשראי)  ",
        " פגיעה כך שהמחשב מתפקד בצורה לא תקינה(שיבוש פעולת מחשב או הפרעה למערכת מחשב", " התחזות לבן אדם אחר על ידי מחשב/קבלת דבר במרמה",
        "הפרעה לשימוש במחשב או בחומר מחשב/נגיף מחשב", "עבירות מרמה באמצעות מחשב", "חדירה לחומר מחשב שלא כדין", "חדירה לחומר מחשב כדי לעבור על עבירה אחרת"
    ];
    var noAnswers = ["משלוח מסרים מאת המדינה", " מוסדותיה או גופים אחרים ששר התקשורת אישר ", "דרך הפצה אחרת", "אף אחד ממהויות אלו",
        "כן נתן את הסכמתו", "הפרסום הוא בנושא עמותות", "הפרסום הוא בנושא תרומות",
        " הפרסום הוא בנושא בחירות או פרסומים של המדינה", "כן יש עניין",
        " פרסומים של הכנסת וחבריה  הממשלה ושריה", "מבקר המדינה", " צדדים בהליך משפטי",
        "היה חזרה על שנאמר/המפרסם היה משכנע באמיתות דבריו", " המפרסם התנצל/המפרסם לא התכוון לנפגע",
        "אף אחד ", "אדם 1 ", "אף אחד מהנל התובע", "אף אחד מהנל הנתבע ",
        "פנייה ממפרסם שבה הצעה להסכים לקבל דברי פרסומת שכוללים בקשות לקבלת תרומה או תעמולה", "פנייה ממפרסם שבה הצעה להסכים לקבל מסרים שיווקיים",
        "לא פורסם", "נעשה בתום לב ", "דובר דבר אמת "
    ];

    if (yesAnswers.includes(userAnswer)) {
        resetPage();
        showAlert("נמצאה עילה לתביעה", username.value + " עבור בחירתך: " + userAnswer + " יש עילה לתביעה! הינך מוחזר לעמוד הראשי להנות משירותי הבוט", "שחרור");
    } else if (noAnswers.includes(userAnswer)) {
        resetPage();
        showAlert("לא נמצאה עילה", username.value + " עבור בחירתך: " + userAnswer + " נראה כי אין עילה לתביעה, הינך מוחזר לעמוד הראשי להנות משירותי הבוט ", "שחרור");
    }
    else if (userAnswer === "כן,מסר את מחשבו ") {
        resetPage();
        showAlert("אבטחת מידע", " דע לך, עבירת על ידי העברת מחשב לטכנאי אשר המחשב ללא הגנה - קיים חשש לדליפת מידע", "שחרור");
        showAlert("לא נמצאה עילה", username.value + " נראה כי אין עילה לתביעה, הינך מוחזר לעמוד הראשי להנות משירותי הבוט ", "שחרור");
    }
    else if (userAnswer === "כן נצפה") {
        resetPage();
        showAlert("צפיית מידע", "על הנפגע להקפיד בעבודה עם המחשב, לוודא שהמידע שבו לא מוצג כך שאנשים נוספים יוכלו לצפות בתכנים מעבר לכתף שלו", "שחרור");
        showAlert("לא נמצאה עילה", username.value + " נראה כי אין עילה לתביעה, הינך מוחזר לעמוד הראשי להנות משירותי הבוט ", "שחרור");
    }
    else if (userAnswer === "מחליף כל רבעון " || userAnswer === "מוצפן") {
        resetPage();
        showAlert("מניעת חדירה ", "תעמוד לזכותך התנהלות שביצעת מאמצים למנוע את החדירה", "שחרור");
    }
    else if (userAnswer === " מונח מתחת למקלדת" || userAnswer === "במקום גלוי") {
        resetPage();
        showAlert("אבטחת מידע", "יש לך אשם תורם שביצעת את החובה שחלה עליך ואפשרת את חשיפת המידע שלך", "שחרור");
        showAlert("לא נמצאה עילה", username.value + " נראה כי אין עילה לתביעה, הינך מוחזר לעמוד הראשי להנות משירותי הבוט ", "שחרור");
    }
    else if (userAnswer === "לא הגנתי/אבטחתי ") {
        showAlert("אבטחת מידע", "מומלץ מאוד לאבטח את המחשב", "שחרור");
    }

}

function goBack() {
    // Reset the quiz to the initial state
    questionsEl.style.display = "none";
    introEl.style.display = "block";
    location.reload();
    quizQuestions = 0;
    firstFlagChoice = true;
    userAnswer = "";
}

function stepBack() {
    if (quizQuestions > 0) {
        quizQuestions--;
        displayQuestions();
        userAnswerArrey.pop();
        updateStatusLabels();
    } else {
        showAlert("אין חזור","הינך בשאלה הראשונה אם ברצונך לבחור נושא מחדש חזור לראשית","שחרר");
    }
}

//////////////////////////event listeners//////////////////////
startBtn.addEventListener("click", startQuiz)
goBackBtn.addEventListener("click", goBack);
stepBackBtn.addEventListener("click", stepBack);

// JavaScript to handle menu button click
document.getElementById("menuButton").addEventListener("click", function () {
    var sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.left === "0px") {
        sideMenu.style.left = "-250px";
    } else {
        sideMenu.style.left = "0px";
    }
});

// JavaScript to handle close button click
document.getElementById("closeButton").addEventListener("click", function () {
    var sideMenu = document.getElementById("sideMenu");
    sideMenu.style.left = "-250px";
});

