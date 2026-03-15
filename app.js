const totalStages = 16;
const anomalyStageCount = 8;

const storyLines = [
  "후. 드디어 다 했네. 마지막으로 PPT 최종 점검을 해볼까.",
  "내용도 괜찮고 이미지도 문제 없고 구성도 완벽해.",
  "이 정도면 내일 발표는 무난하게 끝나겠지.",
  "가볍게 한 잔만 하고 자야겠다.",
  "......",
  "뭐야. 벌써 발표 5분 전이잖아?",
  "마지막으로 PPT나 다시 확인해볼까.",
  "...어? 잠깐만.\n뭐냐 이거? 어제랑 다른데?",
  "설마 내가 술 취해서 건드린 건가...?",
  "x됐다.\n이상한 부분부터 빨리 찾아야 해!"
];

const restartStoryLines = [
  "어? 뭐지? 방금 무슨 꿈을 꾼 것 같은데...\n뭐... 어쨌든 마지막으로 PPT 최종 점검을 해볼까.",
  "내용도 괜찮고 이미지도 문제 없고 구성도 완벽해.",
  "이 정도면 내일 발표는 무난하게 끝나겠지.",
  "가볍게 한 잔만 하고 자야겠다.",
  "......",
  "뭐야. 벌써 발표 5분 전이잖아?",
  "마지막으로 PPT나 다시 확인해볼까.",
  "...어? 잠깐만.\n뭐냐 이거? 어제랑 다른데?",
  "설마 내가 술 취해서 건드린 건가...?",
  "x됐다.\n이상한 부분부터 빨리 찾아야 해!"
];

const stageClearLines = [
  "휴우 이건 됐고.\n다른 부분도 확인해보자."
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
    text: "...휴학할까?"
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
    text: "발표 잘하더라? 덕분에 우리 A+ 받을듯."
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
    titleClass: "",
    titleRotate: "0deg",
    teamColor: "#374151",
    dateColor: "#6b7280",
    teamSize: "24px",
    teamOffsetY: "0px",
    teamAnimatedClass: "",
    titleAnimatedClass: "",
    dateSize: "18px",
    dateOffsetX: "0px",
    dateAnimatedClass: "",
    footerNote: ""
  },
  {
    type: "content",
    title: "문제 정의",
    titleColor: "#111827",
    titleClass: "",
    titleRotate: "0deg",
    titleAnimatedClass: "",
    subtitleText: "",
    subtitleClass: "",
    subtitleRotate: "0deg",
    bullets: [
      "일정 관리 앱 사용률 감소",
      "협업 기능 부족",
      "복잡한 UI"
    ],
    bulletColors: ["#111827", "#111827", "#111827"],
    bulletWeights: ["400", "400", "400"],
    bulletOffsetsY: ["0px", "0px", "0px"],
    bulletAnimatedClasses: ["", "", ""],
    image: "assets/graph.png",
    imageRotate: "0deg",
    imageScale: "1",
    footerNote: ""
  },
  {
    type: "content",
    title: "해결 방안",
    titleColor: "#111827",
    titleClass: "",
    titleRotate: "0deg",
    titleAnimatedClass: "",
    subtitleText: "",
    subtitleClass: "",
    subtitleRotate: "0deg",
    bullets: [
      "AI 일정 추천",
      "팀 일정 공유",
      "간단한 UI"
    ],
    bulletColors: ["#111827", "#111827", "#111827"],
    bulletWeights: ["400", "400", "400"],
    bulletOffsetsY: ["0px", "0px", "0px"],
    bulletAnimatedClasses: ["", "", ""],
    image: "assets/service.png",
    imageRotate: "0deg",
    imageScale: "1",
    footerNote: ""
  }
];

const anomalyTypes = {
  team_goat(slides) { slides[0].team = "Team I AM THE GOAT"; },
  cover_title_red(slides) { slides[0].titleColor = "#dc2626"; },
  cover_team_blue(slides) { slides[0].teamColor = "#2563eb"; },
  cover_date_green(slides) { slides[0].dateColor = "#16a34a"; },
  cover_team_big(slides) { slides[0].teamSize = "40px"; },
  cover_date_weird(slides) { slides[0].date = "3025.06.10"; },
  cover_team_down(slides) { slides[0].teamOffsetY = "24px"; },
  cover_date_right(slides) { slides[0].dateOffsetX = "18px"; },
  cover_team_drifting(slides) { slides[0].teamAnimatedClass = "drift-down"; },

  problem_title_red(slides) { slides[1].titleColor = "#dc2626"; },
  problem_title_float(slides) { slides[1].titleAnimatedClass = "title-float"; },
  problem_bullet_red(slides) { slides[1].bulletColors = ["#111827", "#dc2626", "#111827"]; },
  problem_bullet_bold(slides) { slides[1].bulletWeights = ["400", "700", "400"]; },
  problem_bullet_typo(slides) { slides[1].bullets[2] = "복잡한 U1"; },
  problem_bullet_shift(slides) { slides[1].bulletOffsetsY = ["0px", "16px", "0px"]; },
  problem_bullet_wiggle(slides) { slides[1].bulletAnimatedClasses = ["", "wiggle-text", ""]; },
  graph_drunk(slides) { slides[1].image = "assets/drunk.jpg"; },
  graph_drunk2(slides) { slides[1].image = "assets/drunk2.jpg"; },

  solution_title_red(slides) { slides[2].titleColor = "#dc2626"; },
  solution_title_float(slides) { slides[2].titleAnimatedClass = "title-float"; },
  solution_bullet_blue(slides) { slides[2].bulletColors = ["#2563eb", "#111827", "#111827"]; },
  service_drunk3(slides) { slides[2].image = "assets/drunk3.jpg"; },

  cover_title_final_file(slides) {
    slides[0].title = "AI 기반 일정 관리 서비스_최종진짜.pptx";
  },

  cover_title_rainbow(slides) {
    slides[0].titleClass = "rainbow-text";
  },

  cover_title_rotate(slides) {
    slides[0].titleRotate = "-6deg";
  },

  drunk_footer_note(slides) {
    slides[0].footerNote = "* 이 PPT는 취중 제작되었습니다";
  },

  problem_title_team_project(slides) {
    slides[1].title = "문제는 우리 팀플이었다";
  },

  problem_contact_truth(slides) {
    slides[1].bullets[1] = "사실 팀원이 연락을 안 봄";
  },

  problem_title_rainbow(slides) {
    slides[1].titleClass = "rainbow-text";
  },

  problem_title_rotate(slides) {
    slides[1].titleRotate = "5deg";
  },

  solution_subtitle_pray(slides) {
    slides[2].subtitleText = "기도";
  },

  solution_subtitle_pray_float(slides) {
    slides[2].subtitleText = "기도";
    slides[2].subtitleClass = "title-float";
  },

  solution_title_rainbow(slides) {
    slides[2].titleClass = "rainbow-text";
  },

  solution_title_rotate(slides) {
    slides[2].titleRotate = "-5deg";
  },

  thank_you_insert(slides) {
    slides.splice(2, 0, {
      type: "thanks",
      title: "감사합니다",
      titleColor: "#111827",
      titleClass: "",
      titleRotate: "0deg",
      footerNote: "* 저만 A+ 주세요, 교수님"
    });
  }
};

const imageAnomalyIds = [
  "graph_drunk",
  "graph_drunk2",
  "service_drunk3"
];

const textAnomalyIds = [
  "team_goat",
  "cover_title_red",
  "cover_team_blue",
  "cover_date_green",
  "cover_date_weird",
  "problem_title_red",
  "problem_bullet_red",
  "problem_bullet_bold",
  "problem_bullet_typo",
  "solution_title_red",
  "solution_bullet_blue",
  "cover_title_final_file",
  "drunk_footer_note",
  "problem_title_team_project",
  "problem_contact_truth",
  "solution_subtitle_pray",
  "solution_title_rainbow",
  "thank_you_insert"
];

const layoutAnomalyIds = [
  "cover_team_big",
  "cover_team_down",
  "cover_date_right",
  "cover_team_drifting",
  "problem_title_float",
  "problem_bullet_shift",
  "problem_bullet_wiggle",
  "solution_title_float",
  "cover_title_rainbow",
  "cover_title_rotate",
  "problem_title_rainbow",
  "problem_title_rotate",
  "solution_subtitle_pray_float",
  "solution_title_rotate"
];

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function pickUniqueFromPool(pool, count, excluded = []) {
  const excludedSet = new Set(excluded);
  const filtered = pool.filter((id) => !excludedSet.has(id));
  return shuffle(filtered).slice(0, count);
}

function createStages() {
  const requiredImageCount = 2;
  const requiredTextCount = 3;
  const requiredLayoutCount = 3;

  const requiredTotal =
    requiredImageCount + requiredTextCount + requiredLayoutCount;

  if (requiredTotal > anomalyStageCount) {
    throw new Error(
      `카테고리 최소 합(${requiredTotal})이 anomalyStageCount(${anomalyStageCount})보다 큽니다.`
    );
  }

  const pickedImage = pickUniqueFromPool(imageAnomalyIds, requiredImageCount);
  const pickedText = pickUniqueFromPool(textAnomalyIds, requiredTextCount, pickedImage);
  const pickedLayout = pickUniqueFromPool(
    layoutAnomalyIds,
    requiredLayoutCount,
    [...pickedImage, ...pickedText]
  );

  const pickedRequired = [
    ...pickedImage,
    ...pickedText,
    ...pickedLayout
  ];

  const allAnomalyIds = Object.keys(anomalyTypes);
  const remainingNeedCount = anomalyStageCount - pickedRequired.length;
  const remainingCandidates = allAnomalyIds.filter(
    (id) => !pickedRequired.includes(id)
  );
  const extraPicked = shuffle(remainingCandidates).slice(0, remainingNeedCount);

  const anomalyIds = shuffle([...pickedRequired, ...extraPicked]);

  const stagePool = anomalyIds.map((anomalyId) => ({
    hasAnomaly: true,
    anomalyId
  }));

  const normalCount = (totalStages - 1) - anomalyIds.length;
  for (let i = 0; i < normalCount; i += 1) {
    stagePool.push({ hasAnomaly: false, anomalyId: null });
  }

  return [
    { hasAnomaly: false, anomalyId: null },
    ...shuffle(stagePool)
  ];
}

let stages = createStages();
let currentStoryLines = storyLines;

let storyIndex = 0;
let memorySlideIndex = 0;
let currentStageIndex = 0;
let currentSlideIndex = 0;
let currentSlides = [];
let isGameEnded = false;
let gameOverIndex = 0;
let clearIndex = 0;
let stageClearIndex = 0;
let pendingNextStage = false;

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

const gamePlayArea = document.getElementById("game-play-area");
const gameSlideBox = document.getElementById("game-slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const detectBtn = document.getElementById("detect");
const safeBtn = document.getElementById("safe");

const stageclearDialog = document.getElementById("stageclear-dialog");
const stageclearText = document.getElementById("stageclear-text");
const stageclearNextBtn = document.getElementById("stageclear-next-btn");

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

      storyText.textContent = currentStoryLines[storyIndex];
      storyText.classList.remove("fade-out");
    }, 800);

    storyNextBtn.textContent =
      storyIndex === currentStoryLines.length - 1 ? "게임 시작" : "다음";
    return;
  }

  storyText.classList.remove("fade-out");
  storyText.textContent = currentStoryLines[storyIndex];
  updateStoryBackground();

  storyNextBtn.textContent =
    storyIndex === currentStoryLines.length - 1 ? "게임 시작" : "다음";
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
  clearScreen.style.backgroundImage = "url('assets/clear.jpg')";
  clearScreen.style.backgroundSize = "contain";
  clearScreen.style.backgroundPosition = "center";
  clearScreen.style.backgroundRepeat = "no-repeat";
  clearScreen.style.backgroundColor = "#000";

  stageLabel.textContent = "클리어!";
  slideLabel.textContent = "";

  clearIndex = 0;
  renderClearLine();
}

function renderStageClearDialog() {
  stageclearText.textContent = stageClearLines[stageClearIndex];
  stageclearNextBtn.textContent =
    stageClearIndex === stageClearLines.length - 1 ? "다음 스테이지" : "다음";
}

function showStageClearDialog() {
  pendingNextStage = true;
  stageClearIndex = 0;
  renderStageClearDialog();

  gamePlayArea.classList.add("stage-clear-mode");
  stageclearDialog.classList.remove("hidden");
}

function hideStageClearDialog() {
  pendingNextStage = false;
  stageclearDialog.classList.add("hidden");
  gamePlayArea.classList.remove("stage-clear-mode");
}

function renderSlide(target, slide) {
  if (slide.type === "cover") {
    target.innerHTML = `
      <div class="cover">
        <div
          class="cover-title ${slide.titleAnimatedClass || ""} ${slide.titleClass || ""}"
          style="color:${slide.titleColor}; transform:rotate(${slide.titleRotate || "0deg"});"
        >
          ${slide.title}
        </div>
        <div
          class="cover-team ${slide.teamAnimatedClass || ""}"
          style="color:${slide.teamColor}; font-size:${slide.teamSize}; transform:translateY(${slide.teamOffsetY});"
        >
          ${slide.team}
        </div>
        <div
          class="cover-date ${slide.dateAnimatedClass || ""}"
          style="color:${slide.dateColor}; font-size:${slide.dateSize}; transform:translateX(${slide.dateOffsetX});"
        >
          ${slide.date}
        </div>
        ${slide.footerNote ? `<div class="slide-footer-note">${slide.footerNote}</div>` : ""}
      </div>
    `;
    return;
  }

  if (slide.type === "thanks") {
    target.innerHTML = `
      <div class="cover thanks-slide">
        <div
          class="cover-title ${slide.titleClass || ""}"
          style="color:${slide.titleColor}; transform:rotate(${slide.titleRotate || "0deg"});"
        >
          ${slide.title}
        </div>
        ${slide.footerNote ? `<div class="slide-footer-note">${slide.footerNote}</div>` : ""}
      </div>
    `;
    return;
  }

  target.innerHTML = `
    <div
      class="slide-title ${slide.titleAnimatedClass || ""} ${slide.titleClass || ""}"
      style="color:${slide.titleColor}; transform:rotate(${slide.titleRotate || "0deg"});"
    >
      ${slide.title}
    </div>

    ${slide.subtitleText ? `
      <div
        class="slide-subtitle ${slide.subtitleClass || ""}"
        style="transform:rotate(${slide.subtitleRotate || "0deg"});"
      >
        ${slide.subtitleText}
      </div>
    ` : ""}

    <div class="slide-body">
      <ul class="bullet-list">
        ${slide.bullets.map((bullet, index) => `
          <li
            class="${slide.bulletAnimatedClasses[index] || ""}"
            style="
              color:${slide.bulletColors[index]};
              font-weight:${slide.bulletWeights[index]};
              transform: translateY(${slide.bulletOffsetsY[index]});
            "
          >
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

    ${slide.footerNote ? `<div class="slide-footer-note">${slide.footerNote}</div>` : ""}
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
  detectBtn.disabled = false;
  safeBtn.disabled = false;
  renderSlide(gameSlideBox, currentSlides[currentSlideIndex]);
}

function startStage() {
  currentSlideIndex = 0;
  currentSlides = buildStageSlides();
  hideStageClearDialog();
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
  stageClearIndex = 0;
  isGameEnded = false;
  pendingNextStage = false;
  stages = createStages();

  currentStoryLines = restartStoryLines;

  hideStageClearDialog();

  gameScreen.classList.remove("active");
  memoryScreen.classList.remove("active");
  gameoverScreen.classList.remove("active");
  clearScreen.classList.remove("active");
  storyScreen.classList.add("active");

  showStory();
}

function judge(choice) {
  if (isGameEnded || pendingNextStage) return;

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

  showStageClearDialog();
}

storyNextBtn.addEventListener("click", () => {
  if (storyIndex < currentStoryLines.length - 1) {
    storyIndex += 1;

    if (storyIndex === 1) {
      storyScreen.classList.remove("active");
      memoryScreen.classList.add("active");
      memorySlideIndex = 0;
      renderMemorySlide();
      return;
    }

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
  if (currentSlideIndex > 0 && !pendingNextStage) {
    currentSlideIndex -= 1;
    renderGameSlide();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentSlideIndex < currentSlides.length - 1 && !pendingNextStage) {
    currentSlideIndex += 1;
    renderGameSlide();
  }
});

detectBtn.addEventListener("click", () => judge("detect"));
safeBtn.addEventListener("click", () => judge("safe"));

stageclearNextBtn.addEventListener("click", () => {
  if (stageClearIndex < stageClearLines.length - 1) {
    stageClearIndex += 1;
    renderStageClearDialog();
    return;
  }

  currentStageIndex += 1;
  startStage();
});

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