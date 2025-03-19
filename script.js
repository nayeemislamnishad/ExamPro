// const presetAnswers = "acdacddaacdacddaacdacddaacdacddaacdacdda"; 
// const totalQuestions = 25;
// const columns = 1;
const questionsPerColumn = totalQuestions / columns;
const container = document.getElementById("answer-sheet");
const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");

let userAnswers = new Array(totalQuestions).fill(null);
let answered = new Set();
let startTime = new Date();

window.onbeforeunload = function() {
    return "আপনি কি নিশ্চিত যে আপনি পেজ রিফ্রেশ করতে চান? আপনার এক্সামের তথ্য হারিয়ে যেতে পারে।";
};

const fragment = document.createDocumentFragment(); 

for (let col = 0; col < columns; col++) {
    const table = document.createElement("table");
    table.classList.add("table");
    
    let tableHTML = `<tr><th>Q No.</th><th>Answer</th></tr>`;
    
    for (let i = 0; i < questionsPerColumn; i++) {
        let qNum = i + startQuestionNumber + col * questionsPerColumn;
        
        
        tableHTML += `
            <tr>
                <td style="color:red;font-weight:550;">${qNum}</td>
                <td>
                    <span class="circle" data-q="${qNum}" data-ans="a">A</span>
                    <span class="circle" data-q="${qNum}" data-ans="b">B</span>
                    <span class="circle" data-q="${qNum}" data-ans="c">C</span>
                    <span class="circle" data-q="${qNum}" data-ans="d">D</span>
                </td>
            </tr>
        `;
    }

    table.innerHTML = tableHTML;
    fragment.appendChild(table);
}

tableContainer.appendChild(fragment);
container.appendChild(tableContainer);

document.querySelectorAll(".circle").forEach(circle => {
    circle.addEventListener("click", function() {
        const qNum = this.getAttribute("data-q") - 1;
        if (answered.has(qNum)) return;

        const ans = this.getAttribute("data-ans");
        userAnswers[qNum] = ans;
        answered.add(qNum);

        this.parentElement.querySelectorAll(".circle").forEach(c => c.classList.remove("selected"));
        this.classList.add("selected");
        this.style.background = "black";
        this.style.color = "white";
    });
});

document.getElementById("submit-btn").addEventListener("click", function(event) {
    if (timeLeft > 0) {  // Only ask for confirmation if time is not up
        let confirmSubmit = confirm("আপনি কি নিশ্চিত যে আপনি পরীক্ষাটি জমা দিতে চান?");
        if (!confirmSubmit) {
            event.preventDefault();
            return;
        }
    }
    let confirmSubmit = confirm("আপনি কি নিশ্চিত যে আপনি পরীক্ষাটি জমা দিতে চান?");
    if (!confirmSubmit) {
        event.preventDefault();
        return;
    }
    
    let score = 0, wrong = 0;
    let endTime = new Date();
    let negativeMarking = 0;
    
    document.querySelectorAll(".circle").forEach(circle => {
        circle.style.pointerEvents = "none";
    });


    /*
for (let i = 0; i < totalQuestions; i++) {
    let selectedCircle = document.querySelector(`.circle[data-q="${i+startQuestionNumber}"].selected`);
    let correctAns = presetAnswers[i]; // আগে এটি ছিল ভুল
    let correctCircle = document.querySelector(`.circle[data-q="${i+startQuestionNumber}"][data-ans="${correctAns}"]`);

    if (selectedCircle) {
        let chosenAns = userAnswers[i];
        if (chosenAns === correctAns) {
            selectedCircle.style.background = "green";
            selectedCircle.style.border = "1px solid green";
            score++;
        } else {
            selectedCircle.style.background = "red";
            selectedCircle.style.border = "1px solid red";
            if (correctCircle) correctCircle.style.background = "rgba(104, 255, 99, 0.33)";
            if (correctCircle) correctCircle.style.border = "1px solid green";
            if (correctCircle) correctCircle.style.color = "black";
            wrong++;
        }
    } else {
        if (correctCircle) correctCircle.style.border = "1px solid darkblue";
        if (correctCircle) correctCircle.style.backgroundColor = "rgba(206, 206, 206, 0.88)";
        if (correctCircle) correctCircle.style.color = "darkblue";
    }
}
    

negativeMarking = wrong * 0.25;
    let finalScore = score - negativeMarking;
    let youTotalAnswered = score + wrong;
    
    document.getElementById("result").innerHTML = ` 
        <h2 id="examHeader" style="color:darkgreen;">Exam Summary</h2>
        <div style="text-align:left;border:1px solid green;padding:2%;border-radius:7px;background:rgb(75 255 4 / 5%);">
        <p>You Obtained:<strong style="color:red;"> ${finalScore} / ${totalQuestions}</strong></p>
        <p>You Total answered:<strong style="color:red;font-size:16px;"> ${youTotalAnswered} / ${totalQuestions}</strong></p>
        <p>Total Wrong: <strong style="color:red;font-size:16px;"> ${wrong}</strong></p>
        <p>Total Negative Marking:<strong style="color:red;font-size:16px;"> ${negativeMarking.toFixed(2)}</strong></p>
        <p>Exam Starting Time:<strong style="color:red;font-size:16px;"> ${startTime.toLocaleTimeString()}</strong></p>
        <p>Exam Finish Time:<strong style="color:red;font-size:16px;"> ${endTime.toLocaleTimeString()}</strong></p>
        </div>
    `;

    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("timer").style.display = "none"; 
    document.getElementById("examHeader").style.display = "none";
});
*/

    let score = 0, wrong = 0, negativeMarking = 0;
let totalAnswered = 0;

for (let i = 0; i < totalQuestions; i++) {
    let selectedCircle = document.querySelector(`.circle[data-q="${i + startQuestionNumber}"].selected`);
    let correctAns = presetAnswers[i]; 
    let correctCircle = document.querySelector(`.circle[data-q="${i + startQuestionNumber}"][data-ans="${correctAns}"]`);

    if (selectedCircle) {
        let chosenAns = userAnswers[i];
        totalAnswered++; // ব্যবহারকারী উত্তর দিয়েছে

        if (chosenAns === correctAns) {
            score++;  // সঠিক উত্তর হলে স্কোর বাড়বে
            selectedCircle.style.background = "green";
            selectedCircle.style.border = "1px solid green";
        } else {
            wrong++;  // ভুল উত্তর হলে wrong বাড়বে
            selectedCircle.style.background = "red";
            selectedCircle.style.border = "1px solid red";

            if (correctCircle) {
                correctCircle.style.background = "rgba(104, 255, 99, 0.33)";
                correctCircle.style.border = "1px solid green";
                correctCircle.style.color = "black";
            }
        }
    } else {
        if (correctCircle) {
            correctCircle.style.border = "1px solid darkblue";
            correctCircle.style.backgroundColor = "rgba(206, 206, 206, 0.88)";
            correctCircle.style.color = "darkblue";
        }
    }
}

// ❌ ভুল: negativeMarking = wrong * 0.25;
// ✅ ঠিক: 
negativeMarking = parseFloat((wrong * 0.25).toFixed(2)); 

let finalScore = parseFloat((score - negativeMarking).toFixed(2)); 

document.getElementById("result").innerHTML = ` 
    <h2 id="examHeader" style="color:darkgreen;">Exam Summary</h2>
    <div style="text-align:left;border:1px solid green;padding:2%;border-radius:7px;background:rgb(75 255 4 / 5%);">
        <p>You Obtained:<strong style="color:red;"> ${finalScore} / ${totalQuestions}</strong></p>
        <p>You Total answered:<strong style="color:red;font-size:16px;"> ${totalAnswered} / ${totalQuestions}</strong></p>
        <p>Total Wrong: <strong style="color:red;font-size:16px;"> ${wrong}</strong></p>
        <p>Total Negative Marking:<strong style="color:red;font-size:16px;"> ${negativeMarking}</strong></p>
        <p>Exam Starting Time:<strong style="color:red;font-size:16px;"> ${startTime.toLocaleTimeString()}</strong></p>
        <p>Exam Finish Time:<strong style="color:red;font-size:16px;"> ${endTime.toLocaleTimeString()}</strong></p>
    </div>
`;

document.getElementById("submit-btn").style.display = "none";
document.getElementById("timer").style.display = "none"; 
document.getElementById("examHeader").style.display = "none";
    


// let timeLeft = 1200;
const timerElement = document.getElementById("time");

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
    window.onbeforeunload = null;  // Disable refresh warning during auto-submit
    document.getElementById("submit-btn").click();
        clearInterval(timer);
    }
}

const timer = setInterval(updateTimer, 1000);


