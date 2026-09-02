/**
 * 저메추 (저녁 메뉴 추천) - Application Logic
 * Toss Style Micro-interactions & State Management
 */

// Global State
let currentRecommendedMenu = null;
let currentModalMenu = null;
let currentTournamentWinner = null;

// Tournament State
let tourneyList = [];
let tourneyRound = [];
let tourneyNextRound = [];
let tourneyMatchIndex = 0;
let tourneyTotalMatches = 0;

// Roulette State
let rouletteItems = [];
let rouletteCurrentAngle = 0;
let isRouletteSpinning = false;
const ROULETTE_COLORS = [
  '#3182F6', // Toss Blue
  '#04B056', // Toss Green
  '#FF701E', // Orange
  '#8353E2', // Purple
  '#33B5E5', // Sky Blue
  '#F04452', // Coral Red
  '#E58B00', // Amber
  '#5C6BC0'  // Indigo
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initRandomRecommendation();
  initRoulette();
  initTournament();
  updateAvgCalories();
});

/* ==========================================================================
   Clock & Header
   ========================================================================== */
function initClock() {
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const el = document.getElementById('currentTimeText');
    if (el) {
      el.textContent = `${hours}:${minutes} 야근타임 🌙`;
    }
  };
  updateTime();
  setInterval(updateTime, 60000);
}

function updateAvgCalories() {
  const total = MENU_DATA.reduce((acc, cur) => acc + cur.calories, 0);
  const avg = Math.round(total / MENU_DATA.length);
  const avgEl = document.getElementById('avgCalText');
  if (avgEl) {
    avgEl.textContent = `${avg}kcal`;
  }
}

/* ==========================================================================
   Navigation Tabs (3 Tabs)
   ========================================================================== */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));

  if (tabId === 'random') {
    document.getElementById('tabRandom').classList.add('active');
    document.getElementById('viewRandom').classList.add('active');
  } else if (tabId === 'roulette') {
    document.getElementById('tabRoulette').classList.add('active');
    document.getElementById('viewRoulette').classList.add('active');
    drawRouletteWheel();
  } else if (tabId === 'tournament') {
    document.getElementById('tabTourney').classList.add('active');
    document.getElementById('viewTourney').classList.add('active');
  }
}

/* ==========================================================================
   Roulette Wheel Implementation
   ========================================================================== */
function initRoulette() {
  changeRoulettePreset('random8');
}

function changeRoulettePreset(presetType, element) {
  if (element) {
    document.querySelectorAll('.roulette-preset-bar .filter-chip').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
  }

  if (presetType === 'random8') {
    const shuffled = [...MENU_DATA].sort(() => 0.5 - Math.random());
    rouletteItems = shuffled.slice(0, 8);
  } else if (presetType === 'korean') {
    rouletteItems = MENU_DATA.filter(m => m.category === 'korean').slice(0, 8);
  } else if (presetType === 'popular') {
    const popularIds = [1, 2, 3, 4, 9, 10, 13, 14];
    rouletteItems = MENU_DATA.filter(m => popularIds.includes(m.id));
  } else if (presetType === 'diet') {
    rouletteItems = MENU_DATA.filter(m => m.calories <= 650).slice(0, 8);
  }

  drawRouletteWheel();
  if (element) {
    showToast(`룰렛 후보가 변경되었습니다. (${rouletteItems.length}개 메뉴)`);
  }
}

function shuffleRouletteItems() {
  if (isRouletteSpinning) return;
  rouletteItems = [...MENU_DATA].sort(() => 0.5 - Math.random()).slice(0, 8);
  document.querySelectorAll('.roulette-preset-bar .filter-chip').forEach(c => c.classList.remove('active'));
  const btn = document.getElementById('preset8Random');
  if (btn) btn.classList.add('active');
  drawRouletteWheel();
  showToast('룰렛 후보 메뉴를 새롭게 섞었습니다! 🔀');
}

function drawRouletteWheel() {
  const canvas = document.getElementById('rouletteCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const center = width / 2;
  const radius = center - 6;

  ctx.clearRect(0, 0, width, height);

  if (rouletteItems.length === 0) return;

  const sliceAngle = (2 * Math.PI) / rouletteItems.length;

  for (let i = 0; i < rouletteItems.length; i++) {
    const angle = rouletteCurrentAngle + i * sliceAngle;
    const color = ROULETTE_COLORS[i % ROULETTE_COLORS.length];

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, angle, angle + sliceAngle);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 4;

    let menuName = rouletteItems[i].name;
    if (menuName.length > 7) {
      menuName = menuName.substring(0, 6) + '..';
    }

    ctx.fillText(menuName, radius - 18, 5);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
}

function spinRoulette() {
  if (isRouletteSpinning || rouletteItems.length === 0) return;
  isRouletteSpinning = true;

  const spinBtn = document.getElementById('btnSpin');
  const centerBtn = document.getElementById('btnSpinCenter');
  if (spinBtn) spinBtn.disabled = true;
  if (centerBtn) centerBtn.disabled = true;

  const fullSpins = 5 + Math.floor(Math.random() * 3);
  const extraAngle = Math.random() * 2 * Math.PI;
  const targetRotation = fullSpins * 2 * Math.PI + extraAngle;
  
  const startAngle = rouletteCurrentAngle;
  const startTime = performance.now();
  const duration = 3600;

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    rouletteCurrentAngle = startAngle + targetRotation * easeOutProgress;
    
    drawRouletteWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isRouletteSpinning = false;
      if (spinBtn) spinBtn.disabled = false;
      if (centerBtn) centerBtn.disabled = false;
      onRouletteFinish();
    }
  }

  requestAnimationFrame(animate);
}

function onRouletteFinish() {
  const sliceAngle = (2 * Math.PI) / rouletteItems.length;
  const normalized = (rouletteCurrentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  
  let winningIndex = Math.floor(((1.5 * Math.PI - normalized + 2 * Math.PI) % (2 * Math.PI)) / sliceAngle);
  winningIndex = (winningIndex + rouletteItems.length) % rouletteItems.length;

  const winner = rouletteItems[winningIndex];
  
  launchConfetti();
  showToast(`🎯 룰렛 당첨! 오늘 저녁은 [${winner.name}]!`);
  
  setTimeout(() => {
    openDetailModal(winner);
  }, 400);
}

/* ==========================================================================
   1. Smart Random Recommendation Logic
   ========================================================================== */
function initRandomRecommendation() {
  const initialIndex = Math.floor(Math.random() * MENU_DATA.length);
  setRecommendedMenu(MENU_DATA[initialIndex], false);
}

function triggerRandomRecommendation() {
  const overlay = document.getElementById('shufflingOverlay');
  const card = document.getElementById('recommendCard');
  const rerollBtn = document.getElementById('btnReroll');
  
  if (rerollBtn) rerollBtn.disabled = true;
  if (overlay) overlay.classList.add('active');
  if (card) card.classList.remove('highlight');

  const foodEmojis = ['🍱', '🍕', '🍣', '🍗', '🍲', '🍜', '🥗', '🥩', '🥘', '🥟'];
  let count = 0;
  const interval = setInterval(() => {
    count++;
    const randomEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    const randomTemp = MENU_DATA[Math.floor(Math.random() * MENU_DATA.length)];
    
    const iconEl = document.querySelector('.spinner-icon');
    const statusEl = document.getElementById('shufflingStatus');
    if (iconEl) iconEl.textContent = randomEmoji;
    if (statusEl) statusEl.textContent = `${randomTemp.name} 분석 중...`;
    
    if (count > 7) {
      clearInterval(interval);
      overlay.classList.remove('active');
      if (rerollBtn) rerollBtn.disabled = false;
      
      let nextMenu;
      do {
        nextMenu = MENU_DATA[Math.floor(Math.random() * MENU_DATA.length)];
      } while (MENU_DATA.length > 1 && currentRecommendedMenu && nextMenu.id === currentRecommendedMenu.id);
      
      setRecommendedMenu(nextMenu, true);
    }
  }, 80);
}

function setRecommendedMenu(menu, fireConfettiEffect = false) {
  currentRecommendedMenu = menu;
  
  const cardImg = document.getElementById('cardFoodImg');
  const cardCat = document.getElementById('cardCategory');
  const cardCalVal = document.getElementById('cardCalorieVal');
  const cardTitle = document.getElementById('cardMenuName');
  const cardDesc = document.getElementById('cardDesc');
  const cardPrice = document.getElementById('cardPrice');
  const cardTime = document.getElementById('cardTime');
  const card = document.getElementById('recommendCard');

  if (cardImg) cardImg.src = menu.image;
  if (cardCat) cardCat.textContent = menu.categoryName;
  if (cardCalVal) cardCalVal.textContent = menu.calories;
  if (cardTitle) cardTitle.textContent = menu.name;
  if (cardDesc) cardDesc.textContent = menu.description;
  if (cardPrice) cardPrice.textContent = menu.price;
  if (cardTime) cardTime.textContent = menu.deliveryTime;

  if (fireConfettiEffect) {
    if (card) card.classList.add('highlight');
    launchConfetti();
    showToast(`오늘 야근 저녁은 [${menu.name}] 어때요? 😋`);
  }
}

function shareCurrentMenu() {
  if (!currentRecommendedMenu) return;
  const text = `[야근 저메추 추천 🍱]\n오늘 저녁은 '${currentRecommendedMenu.name}' 어떠세요?\n• 설명: ${currentRecommendedMenu.description}\n• 칼로리: ${currentRecommendedMenu.calories} kcal\n• 가격: ${currentRecommendedMenu.price} (예상소요: ${currentRecommendedMenu.deliveryTime})`;

  copyToClipboard(text, `'${currentRecommendedMenu.name}' 메뉴 정보가 복사되었습니다! 슬랙/카톡에 공유해보세요.`);
}

/* ==========================================================================
   2. Tournament Mode (2지선다 이상형 월드컵)
   ========================================================================== */
function initTournament() {
  const shuffled = [...MENU_DATA].sort(() => 0.5 - Math.random());
  tourneyRound = shuffled.slice(0, 8);
  tourneyNextRound = [];
  tourneyMatchIndex = 0;
  tourneyTotalMatches = 4;

  const winnerBox = document.getElementById('winnerBox');
  const versusContainer = document.getElementById('versusContainer');
  if (winnerBox) winnerBox.style.display = 'none';
  if (versusContainer) versusContainer.style.display = 'flex';
  
  renderTournamentMatch();
}

function renderTournamentMatch() {
  const roundName = tourneyRound.length === 8 ? '8강전' : (tourneyRound.length === 4 ? '준결승 (4강)' : '결승전 (FINAL)');
  const matchNumber = (tourneyMatchIndex / 2) + 1;
  const totalMatchesInRound = tourneyRound.length / 2;

  const roundText = document.getElementById('tourneyRoundText');
  if (roundText) roundText.textContent = `${roundName} (${matchNumber}/${totalMatchesInRound})`;

  const itemA = tourneyRound[tourneyMatchIndex];
  const itemB = tourneyRound[tourneyMatchIndex + 1];

  const imgA = document.getElementById('tourneyImgA');
  const catA = document.getElementById('tourneyCatA');
  const titleA = document.getElementById('tourneyTitleA');
  const calA = document.getElementById('tourneyCalA');

  if (imgA) imgA.src = itemA.image;
  if (catA) catA.textContent = itemA.categoryName;
  if (titleA) titleA.textContent = itemA.name;
  if (calA) calA.textContent = `🔥 ${itemA.calories} kcal`;

  const imgB = document.getElementById('tourneyImgB');
  const catB = document.getElementById('tourneyCatB');
  const titleB = document.getElementById('tourneyTitleB');
  const calB = document.getElementById('tourneyCalB');

  if (imgB) imgB.src = itemB.image;
  if (catB) catB.textContent = itemB.categoryName;
  if (titleB) titleB.textContent = itemB.name;
  if (calB) calB.textContent = `🔥 ${itemB.calories} kcal`;
}

function selectTourneyWinner(choiceOffset) {
  const winner = tourneyRound[tourneyMatchIndex + choiceOffset];
  tourneyNextRound.push(winner);
  tourneyMatchIndex += 2;

  if (tourneyMatchIndex >= tourneyRound.length) {
    if (tourneyNextRound.length === 1) {
      showTournamentWinner(tourneyNextRound[0]);
      return;
    }
    tourneyRound = [...tourneyNextRound];
    tourneyNextRound = [];
    tourneyMatchIndex = 0;
  }

  renderTournamentMatch();
}

function showTournamentWinner(winner) {
  currentTournamentWinner = winner;
  const versusContainer = document.getElementById('versusContainer');
  const winnerBox = document.getElementById('winnerBox');
  if (versusContainer) versusContainer.style.display = 'none';
  if (winnerBox) winnerBox.style.display = 'block';

  const menuTitle = document.getElementById('winnerMenuTitle');
  const desc = document.getElementById('winnerDesc');
  const img = document.getElementById('winnerImg');
  const cal = document.getElementById('winnerCal');
  const roundText = document.getElementById('tourneyRoundText');

  if (menuTitle) menuTitle.textContent = winner.name;
  if (desc) desc.textContent = winner.description;
  if (img) img.src = winner.image;
  if (cal) cal.textContent = `🔥 ${winner.calories} kcal | ${winner.price}`;
  if (roundText) roundText.textContent = `👑 우승 메뉴 확정!`;

  launchConfetti();
  showToast(`🎉 팀원들의 선택: [${winner.name}] 우승!`);
}

function shareWinnerMenu() {
  if (!currentTournamentWinner) return;
  const text = `[🏆 토너먼트 우승 저녁 메뉴 픽!]\n팀원들과의 이상형 월드컵 결과, 오늘 저녁은 '${currentTournamentWinner.name}'(으)로 결정되었습니다!\n\n• 칼로리: ${currentTournamentWinner.calories} kcal | 가격: ${currentTournamentWinner.price}\n• 메뉴 설명: ${currentTournamentWinner.description}`;

  copyToClipboard(text, `우승 메뉴 '${currentTournamentWinner.name}' 공유 문구가 복사되었습니다.`);
}

function restartTournament() {
  initTournament();
  showToast('토너먼트를 새롭게 시작합니다!');
}

/* ==========================================================================
   3. Detail Modal & Bottom Sheet (for Roulette Winner)
   ========================================================================= */
function openDetailModal(menu) {
  currentModalMenu = menu;
  const modal = document.getElementById('detailModal');
  if (!modal) return;
  
  const foodImg = document.getElementById('modalFoodImg');
  const cat = document.getElementById('modalCategory');
  const cal = document.getElementById('modalCalorie');
  const title = document.getElementById('modalMenuName');
  const desc = document.getElementById('modalDesc');
  const time = document.getElementById('modalDeliveryTime');
  const price = document.getElementById('modalPrice');

  if (foodImg) foodImg.src = menu.image;
  if (cat) cat.textContent = menu.categoryName;
  if (cal) cal.textContent = `🔥 ${menu.calories} kcal`;
  if (title) title.textContent = menu.name;
  if (desc) desc.textContent = menu.description;
  if (time) time.textContent = menu.deliveryTime;
  if (price) price.textContent = menu.price;

  // Render Tags
  const tagsContainer = document.getElementById('modalTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    menu.tags.forEach(tag => {
      const tagBadge = document.createElement('span');
      tagBadge.style.cssText = 'background: var(--toss-blue-light); color: var(--toss-blue); font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: var(--radius-xs);';
      tagBadge.textContent = `#${tag}`;
      tagsContainer.appendChild(tagBadge);
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'detailModal') {
    closeDetailModal();
  }
}

function shareModalMenu() {
  if (!currentModalMenu) return;
  const text = `[야근 저메추 추천 🍱]\n오늘 저녁 메뉴는 '${currentModalMenu.name}'(이)가 딱입니다!\n• 설명: ${currentModalMenu.description}\n• 칼로리: ${currentModalMenu.calories} kcal | 가격: ${currentModalMenu.price}`;

  copyToClipboard(text, `'${currentModalMenu.name}' 메뉴 정보가 복사되었습니다.`);
}

/* ==========================================================================
   Utilities: Confetti & Toast & Clipboard
   ========================================================================== */
function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3182F6', '#04B056', '#FF701E', '#8353E2', '#FFDD00']
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  
  if (!toast) return;
  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(successMsg);
  } catch (err) {
    showToast('클립보드 복사에 실패했습니다.');
  }
}

/* ==========================================================================
   PWA & Service Worker Registration
   ========================================================================== */
let deferredPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then((reg) => {
      console.log('ServiceWorker registered with scope:', reg.scope);
    }).catch((err) => {
      console.log('ServiceWorker registration failed:', err);
    });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showToast('📲 홈 화면에 [저메추] 앱을 설치할 수 있습니다!');
});
