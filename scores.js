var scoreList = document.querySelector("#score-results");
var clearScore = document.querySelector("#clear-score")

// Loads scores when the page loads
document.addEventListener("DOMContentLoaded", function () {
    var scoreRecord = JSON.parse(localStorage.getItem("gameScore"));

    for (var index = 0; index < scoreRecord.length; index++) {
        var initial = scoreRecord[index].enterInitial
        var score = scoreRecord[index].score
        var div = document.createElement("div")
        div.innerText = initial + " - " + score;
        div.setAttribute("style", "background-color: rgb(203, 131, 203);");
        scoreList.append(div);
    }

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
