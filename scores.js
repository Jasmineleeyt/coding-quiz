var scoreList = document.querySelector("#score-results");
var clearScore = document.querySelector("#clear-score")

// Loads scores when the page loads
document.addEventListener("DOMContentLoaded", function () {
    var scoreRecord = JSON.parse(localStorage.getItem("gameScore"));
    scoreList.innerText = scoreRecord.enterInitial + " - " + scoreRecord.score;
    scoreList.setAttribute("style", "background-color: rgb(203, 131, 203);");
    if (scoreRecord === null){
        scoreRecord = [];
    }
    console.log(scoreRecord);
});

// Remove items saved in local storage and clear the scores display on the page
clearScore.addEventListener("click", function () {
    localStorage.clear();
    scoreList.textContent = "";
});
