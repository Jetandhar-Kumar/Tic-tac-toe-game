let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgs = document.querySelector(".msgs");
let msg = document.querySelector("#msg");
let turno = true;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turno = true;
    enableboxes();
    msgs.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
            turno = false;
        } else {
            box.innerText = "X";
            turno = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showMessage = (message) => {
    msg.innerText = message;
    msgs.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("Winner:", pos1val);
            showMessage(`Well done ${pos1val}`);
            return;
        }
    }
    checkDraw();
};

const checkDraw = () => {
    let isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        console.log("Game Drawn");
        showMessage("Game has been drawn!");
    }
};

newgame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
