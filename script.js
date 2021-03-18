let activePlayer = "X";

const toggleTurn = (reset) => {
  const playerX = document.getElementsByClassName("player-X")[0];
  const playerO = document.getElementsByClassName("player-O")[0];
  if (playerO.classList.contains("turn") || reset) {
    playerO.classList.remove("turn");
    playerX.classList.add("turn");
    activePlayer = "X";
  } else {
    playerX.classList.remove("turn");
    playerO.classList.add("turn");
    activePlayer = "O";
  }
};

const resetCanvas = () => {
  const col1 = document.getElementsByClassName("col-1");
  const col2 = document.getElementsByClassName("col-2");
  const col3 = document.getElementsByClassName("col-3");
  for (let i = 0; i < 3; i++) {
    col1[i].classList.remove("active");
    col2[i].classList.remove("active");
    col3[i].classList.remove("active");
    col1[i].innerHTML = "T";
    col2[i].innerHTML = "T";
    col3[i].innerHTML = "T";
  }
};

const setScore = (player, score) => {
  document.getElementsByClassName(
    `player-${player}`
  )[0].lastElementChild.innerHTML = `Score: ${score}`;
};

const setWinner = (player) => {
  const status = document.getElementsByClassName("status");
  if (player == "X") {
    w = 0;
    l = 1;
  } else {
    w = 1;
    l = 0;
  }
  status[l].classList.remove("winning");
  status[l].classList.add("losing");
  status[w].classList.remove("losing");
  status[w].classList.add("winning");
  status[l].innerHTML = "L";
  status[w].innerHTML = "W";
};

const toggleTie = () => {
  const status = document.getElementsByClassName("status");
  status[0].classList.remove("winning");
  status[1].classList.remove("losing");
  status[0].classList.remove("winning");
  status[1].classList.remove("losing");
  status[0].innerHTML = "T";
  status[1].innerHTML = "T";
};

const resetGame = () => {
  resetCanvas();
  toggleTurn(true);
  setScore("O", 0);
  setScore("X", 0);
  toggleTie();
};

const judge = () => {
  const col1 = document.getElementsByClassName("col-1");
  const col2 = document.getElementsByClassName("col-2");
  const col3 = document.getElementsByClassName("col-3");
  if (
    col1[0].innerHTML === col2[0].innerHTML &&
    col1[0].innerHTML === col3[0].innerHTML
  )
    return col1[0].innerHTML;
  else if (
    col1[1].innerHTML === col2[1].innerHTML &&
    col1[1].innerHTML === col3[1].innerHTML
  )
    return col1[1].innerHTML;
  else if (
    col1[2].innerHTML === col2[2].innerHTML &&
    col1[2].innerHTML === col3[2].innerHTML
  )
    return col1[2].innerHTML;
  else if (
    col1[0].innerHTML === col1[1].innerHTML &&
    col1[0].innerHTML === col1[2].innerHTML
  )
    return col1[0].innerHTML;
  else if (
    col2[0].innerHTML === col2[1].innerHTML &&
    col2[0].innerHTML === col2[2].innerHTML
  )
    return col2[0].innerHTML;
  else if (
    col3[0].innerHTML === col3[1].innerHTML &&
    col3[0].innerHTML === col3[2].innerHTML
  )
    return col3[0].innerHTML;
  else if (
    col1[0].innerHTML === col2[1].innerHTML &&
    col1[0].innerHTML === col3[2].innerHTML
  )
    return col1[0].innerHTML;
  else if (
    col3[0].innerHTML === col2[1].innerHTML &&
    col3[0].innerHTML === col1[2].innerHTML
  )
    return col3[0].innerHTML;
  else {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (col1[i].innerHTML !== "T") {
        count += 1;
      }
      if (col2[i].innerHTML !== "T") {
        count += 1;
      }
      if (col3[i].innerHTML !== "T") {
        count += 1;
      }
    }
    if (count === 9) {
      resetCanvas();
    }
    return "T";
  }
};

const setActive = (event) => {
  const element = event.srcElement;
  if (element.innerHTML === "T") {
    element.innerHTML = activePlayer;
    element.classList.add("active");
    toggleTurn(false);
    let winner = judge();
    if (winner !== "T") {
      let scoreX = Number(
        document
          .getElementsByClassName(`player-X`)[0]
          .lastElementChild.innerHTML.split(" ")[1]
      );
      let scoreO = Number(
        document
          .getElementsByClassName(`player-O`)[0]
          .lastElementChild.innerHTML.split(" ")[1]
      );
      if (winner === "X") {
        scoreX += 1;
        setScore(winner, scoreX);
      } else {
        scoreO += 1;
        setScore(winner, scoreO);
      }
      if (scoreX > scoreO) setWinner("X");
      else if (scoreX < scoreO) setWinner("O");
      else toggleTie();
      resetCanvas();
    }
  }
};
