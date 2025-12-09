/* Social Media Mentor – 21‑Day Sprint */

// DOM Elements
const startForm = document.getElementById('start-sprint-form');
const sprintDashboard = document.getElementById('sprint-dashboard');
const dayPlanList = document.getElementById('day-plan');
const notStartedPanel = document.getElementById('not-started-panel');
const themeCheckbox = document.getElementById('checkbox');
const copyBtn = document.getElementById('copy-plan-btn');

let contentIdeas = {};
let currentPlan = [];

// Fallback data (simplified structure for safe mode)
const FALLBACK_IDEAS = {
    any: [
        { task: "Share a studio photo", difficulty: "light", psychology: "Social proof.", whyItWorks: "Shows you are active.", source: "Influence by Cialdini" },
        { task: "Post a question", difficulty: "medium", psychology: "Engagement bait.", whyItWorks: "Algorithms love comments.", source: "Contagious by Berger" },
        { task: "Live stream", difficulty: "hard", psychology: "Vulnerability.", whyItWorks: "Deep connection.", source: "Primal Branding" }
    ]
};

// --- Logic ---

window.selectStrategy = function (value, cardElement) {
    document.getElementById('strategy-select').value = value;
    document.querySelectorAll('.strategy-card').forEach(c => c.classList.remove('selected'));
    cardElement.classList.add('selected');
};

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generatePlan(genre, strategy) {
    // Combine genre specific + any to ensure we have enough content
    const genrePool = contentIdeas[genre] || [];
    const anyPool = contentIdeas['any'] || [];

    // Create a combined pool with unique items (based on task text)
    const combined = [...genrePool, ...anyPool];
    const uniquePool = Array.from(new Map(combined.map(item => [item.task, item])).values());

    let pool = uniquePool.length > 0 ? uniquePool : FALLBACK_IDEAS.any;

    // Strategy Logic:
    // Light: 80% Light, 20% Medium
    // Medium: 40% Light, 40% Medium, 20% Hard
    // Hard: 20% Light, 40% Medium, 40% Hard

    // 1. Bucket tasks by difficulty
    const lights = pool.filter(i => i.difficulty === 'light');
    const mediums = pool.filter(i => i.difficulty === 'medium');
    const hards = pool.filter(i => i.difficulty === 'hard');

    let planPool = [];

    // Helper to get N random items from array (with recycling if needed)
    const pick = (arr, count) => {
        if (arr.length === 0) return [];
        let result = [];
        let available = shuffleArray(arr);

        while (result.length < count) {
            // usage of available items
            if (available.length === 0) {
                // Refill if empty
                available = shuffleArray(arr);
            }
            result.push(available.pop());
        }
        return result.slice(0, count);
    };

    if (strategy === 'light') {
        planPool = [...pick(lights, 16), ...pick(mediums, 5)];
    } else if (strategy === 'hard') {
        planPool = [...pick(lights, 4), ...pick(mediums, 8), ...pick(hards, 9)];
    } else {
        // Medium (Default)
        planPool = [...pick(lights, 8), ...pick(mediums, 9), ...pick(hards, 4)];
    }

    // Ensure strictly 21 items (in case buckets were empty and pick returned empty)
    // If specific difficulties were missing, allow filling from general pool
    if (planPool.length < 21) {
        const remaining = 21 - planPool.length;
        planPool = [...planPool, ...pick(pool, remaining)];
    }

    // Final Shuffle so difficulties are mixed randomly across the 21 days
    const finalSelection = shuffleArray(planPool).slice(0, 21);

    return finalSelection.map((item, index) => ({
        day: index + 1,
        completed: false,
        ...item
    }));
}

const WEEKLY_FOCUS = [
    "Foundation & Consistency",
    "Engagement & Community",
    "Growth & Virality"
];

function renderPlan(plan) {
    // Clear previous grids
    document.getElementById('week-1-grid').innerHTML = '';
    document.getElementById('week-2-grid').innerHTML = '';
    document.getElementById('week-3-grid').innerHTML = '';

    // Update focus titles
    const focusLabels = document.querySelectorAll('.week-focus');
    focusLabels.forEach((label, i) => {
        if (WEEKLY_FOCUS[i]) label.textContent = `Focus: ${WEEKLY_FOCUS[i]}`;
    });

    plan.forEach((item, index) => {
        // Determine which week (1-7 = week 1, etc.)
        const weekIndex = Math.floor(index / 7) + 1;
        const gridId = `week-${weekIndex}-grid`;
        const container = document.getElementById(gridId);
        if (!container) return;

        const card = document.createElement('div');
        card.className = `day-card ${item.completed ? 'completed' : ''}`;
        card.id = `day-card-${item.day}`;
        card.onclick = () => showDayDetails(item);

        // Difficulty Color Dot
        const diffColor = item.difficulty === 'hard' ? '#ff6b6b' : (item.difficulty === 'medium' ? '#feca57' : '#1dd1a1');

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <span class="day-number">Day ${item.day}</span>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${diffColor}; display: block;"></span>
            </div>
            <div class="day-preview">
                ${item.task}
            </div>
            ${item.completed ? '<div style="margin-top: auto; align-self: flex-end;"><i class="fas fa-check-circle" style="color: white;"></i></div>' : ''}
        `;

        container.appendChild(card);
    });
}

function showDayDetails(item) {
    // 1. Highlight active card
    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`day-card-${item.day}`);
    if (activeCard) activeCard.classList.add('active');

    // 2. toggle views
    document.getElementById('empty-state').style.display = 'none';
    const content = document.getElementById('active-day-content');
    content.style.display = 'block';

    // 3. Populate Data
    document.getElementById('detail-day-number').textContent = `DAY ${item.day}`;
    document.getElementById('detail-difficulty').textContent = item.difficulty;
    document.getElementById('detail-difficulty').style.color =
        item.difficulty === 'hard' ? '#ff6b6b' : (item.difficulty === 'medium' ? '#FFB547' : '#05CD99');

    document.getElementById('detail-task').textContent = item.task;
    document.getElementById('detail-psychology').textContent = item.psychology;
    document.getElementById('detail-why').textContent = item.whyItWorks;

    // Source
    const sourceEl = document.getElementById('detail-source');
    if (sourceEl) {
        sourceEl.textContent = item.source ? `Source: ${item.source}` : '';
        sourceEl.style.display = item.source ? 'block' : 'none';
    }

    // 4. Completion Button State
    const btn = document.getElementById('mark-complete-btn');
    updateCompleteButton(btn, item);

    // remove old listener to prevent duplicates (simple cloning trick)
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
        item.completed = !item.completed;

        // Update UI
        renderPlan(currentPlan); // Re-render grid to show checkmarks

        // Re-highlight active card since re-render removed class
        const reActiveCard = document.getElementById(`day-card-${item.day}`);
        if (reActiveCard) reActiveCard.classList.add('active');

        updateCompleteButton(newBtn, item);
    });
}

function updateCompleteButton(btn, item) {
    if (item.completed) {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        btn.style.background = 'var(--color-success)';
        btn.style.color = 'white';
        btn.style.borderColor = 'transparent';
    } else {
        btn.innerHTML = '<i class="far fa-circle"></i> Mark as Complete';
        btn.classList.add('btn-secondary');
        btn.classList.remove('btn-primary');
        btn.style.background = 'transparent';
        btn.style.color = 'var(--color-primary)';
        btn.style.borderColor = 'var(--color-primary)';
    }
}

// --- Clipboard Functionality ---
copyBtn.addEventListener('click', () => {
    if (!currentPlan || currentPlan.length === 0) return;

    let text = `My 21-Day Social Media Sprint (${document.getElementById('strategy-select').value} mode)\n\n`;
    currentPlan.forEach(p => {
        text += `Day ${p.day}: ${p.task}\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});

// --- Initialization & API ---
async function loadContentIdeas() {
    try {
        const response = await fetch('content-ideas.json');
        if (!response.ok) throw new Error('Failed to load content ideas');
        contentIdeas = await response.json();
    } catch (error) {
        console.warn('Could not fetch JSON. Using fallback data.', error);
        contentIdeas = FALLBACK_IDEAS;
    }
}

if (startForm) {
    startForm.addEventListener('submit', e => {
        e.preventDefault();

        KratexApp.requireAuth(() => {
            const producerName = document.getElementById('producer-name').value.trim() || 'Producer';
            const genre = document.getElementById('genre-select').value;
            const strategy = document.getElementById('strategy-select').value;

            currentPlan = generatePlan(genre, strategy);
            renderPlan(currentPlan, producerName);

            notStartedPanel.style.display = 'none';
            sprintDashboard.style.display = 'block';
        });
    });
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    loadContentIdeas();
    // Theme is now handled by global.js
});

