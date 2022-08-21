// =============================================== Selector Elements For Js

let count = document.querySelector(".count");

let question = document.querySelector(".questions");

let answers = document.querySelector(".answers");

let btn = document.querySelector(".submit");

let spans = document.querySelector(".bull");

let header = document.querySelector(".head");

let questionNumber = document.querySelector(".queNum");

let incress = 0;

let objectIndex = 0;

let sameSelect = 0;

let questNum = 0;

let quesIs = 0;
// =============================================== Create function To Get Data From Json Fill

function jsonData() {

    let myJson = new XMLHttpRequest();

    myJson.onreadystatechange = function () {

        if (myJson.readyState === 4 && myJson.status === 200) {
            let data = JSON.parse(myJson.responseText);

            let arr = [];

            // Create Loop to get random questions

            for (let i = 0; i < 30; i++) arr.push(data[Math.trunc(Math.random() * data.length)]);

            let arrLength = arr.length;

            count.innerHTML = arrLength;

            // Create Function To add answer and questions

            addDataToPage(arr[objectIndex], arrLength);

            // Create Funtion to Set bulltes

            setSpans(arrLength);

            handelScore(arrLength);

            // Create click event to btn

            btn.addEventListener("click", _ => {

                questNum++;

                quesIs++;


                checkAnswr(arr[objectIndex], arrLength);

                objectIndex++;

                addDataToPage(arr[objectIndex], arrLength);

                addActice(objectIndex, arrLength);

                handelScore(arrLength);

                // Remove Question and btn and answer From Page
                if (objectIndex == arrLength) {
                    btn.remove();

                    question.remove();
                    
                    answers.remove();

                    result(incress, arrLength);

                };

                // Check If User Chose the First value one more time

                if (sameSelect == 10 && questNum == 10) checkSelect(), playAgain();;
                for (let i = 9; i < 12; i++) if (sameSelect == i && questNum == 12) checkSelect(), playAgain();
                for (let i = 10; i < 13; i++) if (sameSelect == i && questNum == 13) checkSelect(), playAgain();
                for (let i = 11; i < 14; i++) if (sameSelect == i && questNum == 14) checkSelect(), playAgain();
                for (let i = 12; i < 15; i++) if (sameSelect == i && questNum == 15) checkSelect(), playAgain();
            });

        }

    };

    if(window.location.pathname.includes("HTML.html")) myJson.open("Get", "./HTML.json");
    if(window.location.pathname.includes("CSS-questions.html")) myJson.open("Get", "./CSS.json");
    if(window.location.pathname.includes("JavaScript")) myJson.open("Get", "./JS.json");
    console.log(window.location.pathname)

    myJson.send();

};

jsonData();

// stup score
let scoreNow = document.querySelector(".now");

let scoreFrom = document.querySelector(".from");

// create Function to Handel Score

function handelScore(count) {

    scoreNow.innerHTML = incress;

    scoreFrom.innerHTML = count;

}

// Create Function To add answer and questions

function addDataToPage(data, count) {

    if (objectIndex < count) {

        question.innerHTML = "";

        questionNumber.innerHTML = quesIs;

        answers.innerHTML = "";

        let h2 = document.createElement("h3");

        h2.textContent = data.title;

        h2.classList.add("question");

        // append h2 to main div

        question.append(h2);

        for (let i = 0; i < 4; i++) {

            // create div to add input and label 

            let div = document.createElement("div");

            let input = document.createElement("input");

            input.name = "input";

            input.classList.add("answ");

            input.type = "radio"

            input.id = `answer_${i + 1}`;

            input.textContent = `answer_${i + 1}`;

            input.dataset.answer = data[`answer_${i + 1}`];

            // Create Lable to add answer at it 

            let label = document.createElement("label");

            label.htmlFor = `answer_${i + 1}`;

            label.textContent = data[`answer_${i + 1}`];

            // add checked attr to first input by default

            if (i == 0) input.checked = true;

            // append input and label to main div

            div.append(input);
            div.append(label);

            // append div to answers div

            answers.append(div);

        };

    };

};

// Create Function To add span to main page

function setSpans(count) {

    for (let i = 0; i < count; i++) {
        let span = document.createElement("span");

        span.classList.add("span");

        // append span to div

        spans.append(span);
    };

}

// Create Function To add active class when incress counter

function addActice(incress, count) {

    let spans = document.querySelectorAll(".span");

    if (objectIndex < count + 1) for (let i = 0; i < incress; i++) spans[i].classList.add("active");

};

// Create Function To Check right answer

function checkAnswr(obj, count) {

    if (objectIndex < count) {

        let answers = document.querySelectorAll(".answ");
        let ansCheck;

        for (let i = 0; i < answers.length; i++) if (answers[i].checked) ansCheck = answers[i].dataset.answer;

        let correctAnswer = obj["right_answer"];

        // Check if answer right or not

        if (ansCheck === correctAnswer) incress++;

        for (let i = 0; i < answers.length; i++) if (answers[i].checked) if (answers[i].dataset.answer === obj.answer_1) sameSelect++;


    };
};

// Create Function To add Result 

function result(score, count) {

    let div = document.createElement("div");

    div.classList = "Result";

    if (score <= 5) div.innerHTML = `Your Score Is Very <span style="color:red;">Bad</span> Bro ${score}`;
    if (score >= 6 && score <= 10) div.innerHTML = `Your Score Is ${score} Score is <span style="color: red;">Weak</span>`, playAgain();
    if (score >= 11 && score <= 15) div.innerHTML = `Your Score Is ${score} You Should To Foucs more than it`, playAgain();
    if (score >= 16 && score < 20) div.innerHTML = `Your Score Is ${score} <span style="Green: red;">Good</span> Bro`, playAgain();
    if (score >= 21 && score < 25) div.innerHTML = `Your Score Is ${score} <span style="color: blue;">Fantastic</span> Bro`, playAgain();
    if (score == count) div.innerHTML = `Your Score  ${score} Perfect Bro You Don't Have any Wrong answer <br> <span class="cong">congratulations</span>`, playAgain(), animait();

    // append div to body

    header.after(div);

};

// Create Funtion To Know If User Select a First Option one more time at succession

function checkSelect() {

    let div = document.createElement("div");

    div.classList.add("same-select");

    div.innerHTML = `Hey Man Sorry You Can't Select the same option all time`;

    let close = document.createElement("span");

    close.classList.add("close");

    close.innerHTML = "X";

    div.append(close);

    div.classList.add("show");

    close.classList.add("show");

    document.body.append(div);

    btn.remove();

    // Create Event to Close when user click on span

    close.addEventListener("click", _ => window.location.reload());

};

// Create Function To Play Again

function playAgain() {

    const button = document.createElement("button");

    button.classList.add("again");

    button.innerHTML = "Again";

    document.querySelector(".app").append(button);

    // Create Event Click to relaod page

    button.addEventListener("click", _ => window.location.reload());

};

// Start Canvas accses

let c = document.querySelector("canvas");

let ctx = c.getContext("2d");

let width = this.innerWidth;
let height = this.innerHeight;
// Set Canvas Width

c.width = width;
c.height = height;

// Set Size When Window Resize

this.addEventListener("resize", _ => {

    const width = this.innerWidth;
    const height = this.innerHeight;
    // Set Canvas Width

    c.width = width;
    c.height = height;

});

// Set Sitteing 

let counter = 0;
let arr = [];

// ========================= Create Class To Get Data From It 

class Particle {

    constructor(x, y, size, speedX, speedY, color) {

        this.x = c.width / 1.8;

        this.y = c.height / 2;

        this.size = Math.random() * 25;

        this.speedX = Math.random() * 3 - 1.5;

        this.speedY = Math.random() * 3 - 1.5;

        this.color = 'hsl(' + counter + ', 100% , 50%)';

    };

    update() {

        this.x += this.speedX;

        this.y += this.speedY;

        if (this.size > 0.3) this.size -= 0.1;
    }
    darw() {

        ctx.beginPath();

        ctx.save();

        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();

    }

};

//======================================================================== Create Funtion To push shapes in array

let pushShapsSmallMedia = function () {

    for (let i = 0; i < 1000; i++) arr.push(new Particle);

};
pushShapsSmallMedia();

//======================================================================== Create Function To update And darw Shaps

let updateDarw = function () {

    for (let i = 0; i < arr.length; i++) {

        arr[i].update();

        arr[i].darw();

        //======================================================================== Hidden Shaps If it less than 0.2

        if (arr[i].size < 0.3) {

            arr.splice(i, 1);

            i--;

        }
    };
};

let animait = function () {

    ctx.fillStyle = 'rgba(0 , 0 , 0 , 0.3)';

    ctx.fillRect(0, 0, c.width, c.height);

    counter += 2;

    requestAnimationFrame(animait);

    updateDarw();

};

