const totalStages = 16;
const anomalyStageCount = 8; // Stage 2~16 중 anomaly 개수

const storyLines = [
  "좋아. PPT 최종 점검을 해볼까.",
  "내용도 괜찮고 이미지도 문제 없고 구성도 완벽해.",
  "이 정도면 내일 발표는 무난하게 끝나겠지.",
  "가볍게 한 잔만 하고 자야겠다.",
  "......",
  "뭐야. 벌써 발표 5분 전이잖아?",
  "마지막으로 PPT나 다시 확인해볼까.",
  "...어?",
  "잠깐만...\n뭐냐 이거? 어제랑 다른데?",
  "설마 내가 술 취해서 건드린 건가...?",
  "x됐다.\n이상한 부분부터 빨리 찾아야 해!"
];

const gameOverLines = [
  {
    speaker: "교수님",
    speakerClass: "professor",
    text: "이게 최종 발표 자료 맞나요?"
  },
  {
    speaker: "팀원",
    speakerClass: "teammate",
    text: "......"
  },
  {
    speaker: "나",
    speakerClass: "me",
    text: "...꿈인가?"
  }
];

const clearLines = [
  {
    speaker: "교수님",
    speakerClass: "professor",
    text: "발표 잘 들었습니다. 준비를 많이 하셨네요."
  },
  {
    speaker: "팀원",
    speakerClass: "teammate",
    text: "와, 해냈다! 진짜 살았다!"
  },
  {
    speaker: "나",
    speakerClass: "me",
    text: "후... 진짜 겨우 살았다."
  }
];

const normalSlides = [
  {
    type: "cover",
    title: "AI 기반 일정 관리 서비스",
    team: "Team abc",
    date: "2025.06.10",
    titleColor: "#111827",
    teamColor: "#374151",
    dateColor: "#6b7280",
    teamSize: "24px",
    teamOffsetY: "0px",
    dateSize: "18px"
  },
  {
    type: "content",
    title: "문제 정의",
    titleColor: "#111827",
    bullets: [
      "일정 관리 앱 사용률 감소",
      "협업 기능 부족",
      "복잡한 UI"
    ],
    bulletColors: ["#111827", "#111827", "#111827"],
    bulletWeights: ["400", "400", "400"],
    image: "assets/graph.png",
    imageRotate: "0deg",
    imageScale: "1"
  },
  {
    type: "content",
    title: "해결 방안",
    titleColor: "#111827",
    bullets: [
      "AI 일정 추천",
      "팀 일정 공유",
      "간단한 UI"
    ],
    bulletColors: ["#111827", "#111827", "#111827"],
    bulletWeights: ["400", "400", "400"],
    image: "assets/service.png",
    imageRotate: "0deg",
    imageScale: "1"
  }
];

const anomalyTypes = {
  team_goat(slides) {
    slides[0].team = "Team GOAT";
  },
  cover_title_red(slides) {
    slides[0].titleColor = "#dc2626";
  },
  cover_team_blue(slides) {
    slides[0].teamColor = "#2563eb";
  },
  cover_date_green(slides) {
    slides[0].dateColor = "#16a34a";
  },
  cover_team_big(slides) {
    slides[0].teamSize = "40px";
  },
  cover_date_weird(slides) {
    slides[0].date = "3025.06.10";
  },
  problem_title_red(slides) {
    slides[1].titleColor = "#dc2626";
  },
  problem_bullet_red(slides) {
    slides[1].bulletColors = ["#111827", "#dc2626", "#111827"];
  },
  problem_bullet_bold(slides) {
    slides[1].bulletWeights = ["400", "700", "400"];
  },
  problem_bullet_typo(slides) {
    slides[1].bullets[2] = "복잡한 U1";
  },
  graph_cat(slides) {
    slides[1].image = "assets/cat.png";
  },
  graph_dog(slides) {
    slides[1].image = "assets/dog.png";
  },
  solution_title_red(slides) {
    slides[2].titleColor = "#dc2626";
  },
  solution_bullet_blue(slides) {
    slides[2].bulletColors = ["#2563eb", "#111827", "#111827"];
  },
  service_dog(slides) {
    slides[2].image = "assets/dog.png";
  }
};

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function createStages() {
  const anomalyIds = shuffle(Object.keys(anomalyTypes)).slice(0, anomalyStageCount);
  const stagePool = [];

  for (const anomalyId of anomalyIds) {
    stagePool.push({
      hasAnomaly: true,
      anomalyId
    });
  }

  const normalCount = (totalStages - 1) - anomalyStageCount;
  for (let i = 0; i < normalCount; i += 1) {
    stagePool.push({
      hasAnomaly: false,
      anomalyId: null
    });
  }

  const shuffledPool = shuffle(stagePool);

  return [
    { hasAnomaly: false, anomalyId: null }, // Stage 1 고정 정상
    ...shuffledPool
  ];
}

let stages = createStages();

let storyIndex = 0;
let memorySlideIndex = 0;
let currentStageIndex = 0;
let currentSlideIndex = 0;
let currentSlides = [];
let isGameEnded = false;
let gameOverIndex = 0;
let clearIndex = 0;

const storyScreen = document.getElementById("story-screen");
const memoryScreen = document.getElementById("memory-screen");
const gameScreen = document.getElementById("game-screen");
const gameoverScreen = document.getElementById("gameover-screen");
const clearScreen = document.getElementById("clear-screen");

const storyText = document.getElementById("story-text");
const storyNextBtn = document.getElementById("story-next-btn");

const stageLabel = document.getElementById("stage-label");
const slideLabel = document.getElementById("slide-label");

const memorySlideBox = document.getElementById("memory-slide");
const memoryPrevBtn = document.getElementById("memory-prev");
const memoryNextBtn = document.getElementById("memory-next");
const memoryConfirmBtn = document.getElementById("memory-confirm");

const gameSlideBox = document.getElementById("game-slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const detectBtn = document.getElementById("detect");
const safeBtn = document.getElementById("safe");

const gameoverSpeaker = document.getElementById("gameover-speaker");
const gameoverText = document.getElementById("gameover-text");
const gameoverNextBtn = document.getElementById("gameover-next-btn");

const clearSpeaker = document.getElementById("clear-speaker");
const clearText = document.getElementById("clear-text");
const clearNextBtn = document.getElementById("clear-next-btn");

function deepCopySlides(slides) {
  return JSON.parse(JSON.stringify(slides));
}

function updateStatusStory() {
  stageLabel.textContent = "프롤로그";
  slideLabel.textContent = "";
}

function updateStatusMemory() {
  stageLabel.textContent = "정상 PPT 확인";
  slideLabel.textContent = `Slide ${memorySlideIndex + 1} / ${normalSlides.length}`;
}

function updateStatusGame() {
  stageLabel.textContent = `Stage ${currentStageIndex + 1} / ${totalStages}`;
  slideLabel.textContent = `Slide ${currentSlideIndex + 1} / ${currentSlides.length}`;
}

function updateStoryBackground() {
  if (storyIndex <= 3) {
    storyScreen.style.backgroundImage = "url('assets/house.jpg')";
    storyScreen.style.backgroundSize = "contain";
    storyScreen.style.backgroundPosition = "center";
    storyScreen.style.backgroundRepeat = "no-repeat";
    storyScreen.style.backgroundColor = "#000";
    return;
  }

  if (storyIndex >= 5) {
    storyScreen.style.backgroundImage = "url('assets/lecture.jpg')";
    storyScreen.style.backgroundSize = "contain";
    storyScreen.style.backgroundPosition = "center";
    storyScreen.style.backgroundRepeat = "no-repeat";
    storyScreen.style.backgroundColor = "#000";
  }
}

function showStory() {
  updateStatusStory();

  if (storyIndex === 4) {
    storyText.classList.add("fade-out");
    storyScreen.style.background = "#000";

    setTimeout(() => {
      storyScreen.style.backgroundImage = "url('assets/lecture.jpg')";
      storyScreen.style.backgroundSize = "contain";
      storyScreen.style.backgroundPosition = "center";
      storyScreen.style.backgroundRepeat = "no-repeat";
      storyScreen.style.backgroundColor = "#000";

      storyText.textContent = storyLines[storyIndex];
      storyText.classList.remove("fade-out");
    }, 800);

    storyNextBtn.textContent =
      storyIndex === storyLines.length - 1 ? "게임 시작" : "다음";
    return;
  }

  storyText.classList.remove("fade-out");
  storyText.textContent = storyLines[storyIndex];
  updateStoryBackground();

  storyNextBtn.textContent =
    storyIndex === storyLines.length - 1 ? "게임 시작" : "다음";
}

function renderGameOverLine() {
  const line = gameOverLines[gameOverIndex];
  gameoverSpeaker.textContent = line.speaker;
  gameoverSpeaker.className = "speaker-name";
  gameoverSpeaker.classList.add(line.speakerClass);
  gameoverText.textContent = line.text;
  gameoverNextBtn.textContent =
    gameOverIndex === gameOverLines.length - 1 ? "처음으로" : "다음";
}

function showGameOverScene() {
  gameScreen.classList.remove("active");
  storyScreen.classList.remove("active");
  memoryScreen.classList.remove("active");
  clearScreen.classList.remove("active");

  gameoverScreen.classList.add("active");
  gameoverScreen.style.backgroundImage = "url('assets/gameover.png')";
  gameoverScreen.style.backgroundSize = "contain";
  gameoverScreen.style.backgroundPosition = "center";
  gameoverScreen.style.backgroundRepeat = "no-repeat";
  gameoverScreen.style.backgroundColor = "#000";

  stageLabel.textContent = "Game Over";
  slideLabel.textContent = "";

  gameOverIndex = 0;
  renderGameOverLine();
}

function renderClearLine() {
  const line = clearLines[clearIndex];
  clearSpeaker.textContent = line.speaker;
  clearSpeaker.className = "speaker-name";
  clearSpeaker.classList.add(line.speakerClass);
  clearText.textContent = line.text;
  clearNextBtn.textContent =
    clearIndex === clearLines.length - 1 ? "처음으로" : "다음";
}

function showClearScene() {
  gameScreen.classList.remove("active");
  storyScreen.classList.remove("active");
  memoryScreen.classList.remove("active");
  gameoverScreen.classList.remove("active");

  clearScreen.classList.add("active");
  clearScreen.style.backgroundImage = "url('assets/clear.png')";
  clearScreen.style.backgroundSize = "contain";
  clearScreen.style.backgroundPosition = "center";
  clearScreen.style.backgroundRepeat = "no-repeat";
  clearScreen.style.backgroundColor = "#000";

  stageLabel.textContent = "클리어!";
  slideLabel.textContent = "";

  clearIndex = 0;
  renderClearLine();
}

function renderSlide(target, slide) {
  if (slide.type === "cover") {
    target.innerHTML = `
      <div class="cover">
        <div class="cover-title" style="color:${slide.titleColor};">
          ${slide.title}
        </div>
        <div
          class="cover-team"
          style="color:${slide.teamColor}; font-size:${slide.teamSize}; transform:translateY(${slide.teamOffsetY});"
        >
          ${slide.team}
        </div>
        <div class="cover-date" style="color:${slide.dateColor}; font-size:${slide.dateSize};">
          ${slide.date}
        </div>
      </div>
    `;
    return;
  }

  target.innerHTML = `
    <div class="slide-title" style="color:${slide.titleColor};">
      ${slide.title}
    </div>
    <div class="slide-body">
      <ul class="bullet-list">
        ${slide.bullets.map((bullet, index) => `
          <li style="color:${slide.bulletColors[index]}; font-weight:${slide.bulletWeights[index]};">
            ${bullet}
          </li>
        `).join("")}
      </ul>
      <div class="image-box">
        <img
          src="${slide.image}"
          alt="${slide.title} 이미지"
          style="transform: rotate(${slide.imageRotate}) scale(${slide.imageScale});"
        >
      </div>
    </div>
  `;
}

function renderMemorySlide() {
  updateStatusMemory();
  memoryPrevBtn.disabled = memorySlideIndex === 0;
  memoryNextBtn.disabled = memorySlideIndex === normalSlides.length - 1;
  renderSlide(memorySlideBox, normalSlides[memorySlideIndex]);
}

function buildStageSlides() {
  const slides = deepCopySlides(normalSlides);
  const stage = stages[currentStageIndex];

  if (stage.hasAnomaly && stage.anomalyId) {
    anomalyTypes[stage.anomalyId](slides);
  }

  return slides;
}

function renderGameSlide() {
  updateStatusGame();
  prevBtn.disabled = currentSlideIndex === 0;
  nextBtn.disabled = currentSlideIndex === currentSlides.length - 1;
  renderSlide(gameSlideBox, currentSlides[currentSlideIndex]);
}

function startStage() {
  currentSlideIndex = 0;
  currentSlides = buildStageSlides();
  renderGameSlide();
}

function startGame() {
  storyScreen.classList.remove("active");
  memoryScreen.classList.remove("active");
  gameScreen.classList.add("active");
  startStage();
}

function restartGame() {
  storyIndex = 0;
  memorySlideIndex = 0;
  currentStageIndex = 0;
  currentSlideIndex = 0;
  currentSlides = [];
  gameOverIndex = 0;
  clearIndex = 0;
  isGameEnded = false;
  stages = createStages();

  gameScreen.classList.remove("active");
  memoryScreen.classList.remove("active");
  gameoverScreen.classList.remove("active");
  clearScreen.classList.remove("active");
  storyScreen.classList.add("active");

  showStory();
}

function judge(choice) {
  if (isGameEnded) return;

  const stage = stages[currentStageIndex];
  const correct =
    (stage.hasAnomaly && choice === "detect") ||
    (!stage.hasAnomaly && choice === "safe");

  if (!correct) {
    isGameEnded = true;
    showGameOverScene();
    return;
  }

  if (currentStageIndex === totalStages - 1) {
    isGameEnded = true;
    showClearScene();
    return;
  }

  currentStageIndex += 1;
  startStage();
}

storyNextBtn.addEventListener("click", () => {
  if (storyIndex === 0) {
    storyScreen.classList.remove("active");
    memoryScreen.classList.add("active");
    memorySlideIndex = 0;
    renderMemorySlide();
    return;
  }

  if (storyIndex < storyLines.length - 1) {
    storyIndex += 1;
    showStory();
  } else {
    startGame();
  }
});

memoryPrevBtn.addEventListener("click", () => {
  if (memorySlideIndex > 0) {
    memorySlideIndex -= 1;
    renderMemorySlide();
  }
});

memoryNextBtn.addEventListener("click", () => {
  if (memorySlideIndex < normalSlides.length - 1) {
    memorySlideIndex += 1;
    renderMemorySlide();
  }
});

memoryConfirmBtn.addEventListener("click", () => {
  memoryScreen.classList.remove("active");
  storyScreen.classList.add("active");
  storyIndex = 1;
  showStory();
});

prevBtn.addEventListener("click", () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex -= 1;
    renderGameSlide();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentSlideIndex < currentSlides.length - 1) {
    currentSlideIndex += 1;
    renderGameSlide();
  }
});

detectBtn.addEventListener("click", () => judge("detect"));
safeBtn.addEventListener("click", () => judge("safe"));

gameoverNextBtn.addEventListener("click", () => {
  if (gameOverIndex < gameOverLines.length - 1) {
    gameOverIndex += 1;
    renderGameOverLine();
    return;
  }
  restartGame();
});

clearNextBtn.addEventListener("click", () => {
  if (clearIndex < clearLines.length - 1) {
    clearIndex += 1;
    renderClearLine();
    return;
  }
  restartGame();
});

showStory();