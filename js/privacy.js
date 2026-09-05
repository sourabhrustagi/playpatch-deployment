/**
 * PlayPatch - Privacy Policy & Data Safety Hub Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initPrivacyPage();
});

function initPrivacyPage() {
    setupGameSelector();
    handleUrlParams();
    setupCopyLinkBtn();
    setupTableOfContents();
}

// Populate game select dropdown with General Policy + All games
function setupGameSelector() {
    const selector = document.getElementById('policy-game-select');
    if (!selector) return;

    selector.innerHTML = `
        <option value="general">🌐 General Studio Policy (All Games)</option>
        <optgroup label="Specific Games">
            ${GAMES_DATA.map(game => `
                <option value="${game.id}">🎮 ${game.title} (${game.packageId})</option>
            `).join('')}
        </optgroup>
    `;

    selector.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        const selectedGame = getGameById(selectedId);
        if (selectedGame && selectedGame.privacyUrl) {
            window.location.href = selectedGame.privacyUrl;
            return;
        }
        updateUrlParam(selectedId);
        loadPolicyForGame(selectedId);
    });
}

// Handle URL query param: ?game=neon-snake-run or ?pkg=com.playpatch.neonsnake
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameParam = urlParams.get('game') || urlParams.get('pkg') || urlParams.get('id');

    const selector = document.getElementById('policy-game-select');

    if (gameParam) {
        const found = getGameById(gameParam);
        if (found) {
            if (found.privacyUrl) {
                window.location.replace(found.privacyUrl);
                return;
            }
            if (selector) selector.value = found.id;
            loadPolicyForGame(found.id);
            return;
        }
    }

    // Default to General Policy
    if (selector) selector.value = 'general';
    loadPolicyForGame('general');
}

function updateUrlParam(gameId) {
    const url = new URL(window.location);
    if (gameId === 'general') {
        url.searchParams.delete('game');
    } else {
        url.searchParams.set('game', gameId);
    }
    window.history.replaceState({}, '', url);
}

// Render dynamic policy content based on chosen game
function loadPolicyForGame(gameId) {
    const isGeneral = gameId === 'general';
    const game = isGeneral ? null : getGameById(gameId);

    // Update Banner info
    const bannerContainer = document.getElementById('policy-banner-container');
    if (bannerContainer) {
        if (!isGeneral && game) {
            bannerContainer.innerHTML = `
                <div class="policy-game-banner">
                    <div class="policy-game-info">
                        <div class="policy-game-icon" style="background: ${game.iconGradient}">
                            ${getGameCategoryIcon(game.category)}
                        </div>
                        <div>
                            <div class="policy-game-name">${game.title}</div>
                            <div class="policy-game-pkg">${game.packageId} • Version ${game.version} • Target Audience: ${game.contentRating}</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <a href="${game.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn-play-store" style="padding: 6px 14px; font-size: 0.8rem;">
                            View on Google Play
                        </a>
                    </div>
                </div>
            `;
            bannerContainer.style.display = 'block';
        } else {
            bannerContainer.style.display = 'none';
        }
    }

    // Update dynamic text tokens
    const appNameNodes = document.querySelectorAll('.dynamic-app-name');
    appNameNodes.forEach(node => {
        node.textContent = isGeneral ? "all PlayPatch mobile applications & games" : `"${game.title}" (${game.packageId})`;
    });

    const targetAudienceNodes = document.querySelectorAll('.dynamic-target-audience');
    targetAudienceNodes.forEach(node => {
        node.textContent = isGeneral ? "General Audience (3+)" : (game.privacyDisclosures.targetAgeGroup || game.contentRating);
    });

    // Render Data Safety Table
    renderDataSafetyTable(game);

    // Render Third-Party SDK Disclosures
    renderSDKDisclosures(game);
}

// Render Google Play Console matching Data Safety Matrix
function renderDataSafetyTable(game) {
    const tbody = document.getElementById('data-safety-table-body');
    if (!tbody) return;

    let rows = [];

    if (!game) {
        // General Studio-wide data disclosures
        rows = [
            {
                type: "Device or other IDs (GAID, AAID)",
                collected: true,
                shared: true,
                purpose: "Advertising, Fraud Prevention & Analytics",
                encrypted: true
            },
            {
                type: "Crash Logs & Performance Diagnostics",
                collected: true,
                shared: false,
                purpose: "App Functionality & Bug Fixing (via Firebase Crashlytics)",
                encrypted: true
            },
            {
                type: "Personal Info (Name, Email, Address, Phone)",
                collected: false,
                shared: false,
                purpose: "Never collected or sold",
                encrypted: true
            },
            {
                type: "Location Data (Precise GPS)",
                collected: false,
                shared: false,
                purpose: "Never collected or accessed",
                encrypted: true
            },
            {
                type: "Financial & In-App Purchase Records",
                collected: false,
                shared: false,
                purpose: "Processed securely directly by Google Play Billing; no credit card info is touched by PlayPatch",
                encrypted: true
            }
        ];
    } else {
        // Game-specific data disclosures
        const customCollected = game.privacyDisclosures.dataCollected || [];
        rows = customCollected.map(item => ({
            type: item.type,
            collected: true,
            shared: item.purpose.toLowerCase().includes('advertising'),
            purpose: `${item.purpose} - ${item.details}`,
            encrypted: true
        }));

        // Append non-collected guarantees
        rows.push({
            type: "Personal Identifiers (Real Name, Contact Info)",
            collected: false,
            shared: false,
            purpose: "Not collected in this application",
            encrypted: true
        });
        rows.push({
            type: "Precise GPS Location Data",
            collected: false,
            shared: false,
            purpose: "Not requested or required by this game",
            encrypted: true
        });
    }

    tbody.innerHTML = rows.map(r => `
        <tr>
            <td style="font-weight: 600; color: #fff;">${r.type}</td>
            <td>
                <span class="badge-tag ${r.collected ? 'yes' : 'no'}">
                    ${r.collected ? 'Yes, Collected' : 'No'}
                </span>
            </td>
            <td>
                <span class="badge-tag ${r.shared ? 'yes' : 'no'}">
                    ${r.shared ? 'Yes (Ad Partners)' : 'No (Private)'}
                </span>
            </td>
            <td>${r.purpose}</td>
            <td><span class="badge-tag yes">Encrypted in Transit</span></td>
        </tr>
    `).join('');
}

// Render SDKs section
function renderSDKDisclosures(game) {
    const container = document.getElementById('third-party-sdk-container');
    if (!container) return;

    let sdks = [
        { name: "Google Play Services", purpose: "Core Google Play operating system infrastructure and platform stability", link: "https://policies.google.com/privacy" },
        { name: "Google AdMob", purpose: "Serving standard non-intrusive banner and interstitial advertisements", link: "https://support.google.com/admob/answer/6128543" },
        { name: "Firebase Crashlytics", purpose: "Anonymous stability reporting and crash diagnostics to fix software bugs", link: "https://firebase.google.com/support/privacy" }
    ];

    if (game && game.privacyDisclosures && game.privacyDisclosures.thirdPartySDKs) {
        sdks = game.privacyDisclosures.thirdPartySDKs.map(sdk => ({
            name: sdk.name,
            purpose: sdk.purpose,
            link: sdk.name.includes("AdMob") ? "https://support.google.com/admob/answer/6128543" : "https://policies.google.com/privacy"
        }));
    }

    container.innerHTML = `
        <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
            ${sdks.map(sdk => `
                <li style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 14px 18px; border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <strong style="color: #fff; font-size: 1rem;">${sdk.name}</strong>
                        <a href="${sdk.link}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); font-size: 0.82rem; display: inline-flex; align-items: center; gap: 4px;">
                            Privacy Policy ↗
                        </a>
                    </div>
                    <p style="margin: 0; font-size: 0.88rem; color: var(--text-secondary);">${sdk.purpose}</p>
                </li>
            `).join('')}
        </ul>
    `;
}

// Copy URL for Google Play Console submission
function setupCopyLinkBtn() {
    const btn = document.getElementById('btn-copy-policy-url');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = `<span style="color: var(--accent-emerald)">✓ Copied Link for Console!</span>`;
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
}

// Scrollspy for Table of Contents
function setupTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    const sections = document.querySelectorAll('.policy-section');

    if (tocLinks.length === 0 || sections.length === 0) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

function getGameCategoryIcon(category) {
    if (category === 'Board') {
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>`;
}
