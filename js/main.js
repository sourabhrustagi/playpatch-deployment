/**
 * PlayPatch - Main Showcase Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderStudioStats();
    renderFeaturedSpotlight();
    renderCategoryFilters();
    renderGames(GAMES_DATA);
    setupSearchAndFilter();
    setupModal();
    setupMobileMenu();
    setupScrollEffects();
}

// Render dynamic studio stats (no downloads or ratings shown)
function renderStudioStats() {
    const statPlatformEl = document.getElementById('stat-total-downloads');
    const statGamesCountEl = document.getElementById('stat-games-count');
    const statSafetyEl = document.getElementById('stat-avg-rating');

    if (statPlatformEl) statPlatformEl.innerHTML = `Android`;
    if (statGamesCountEl) statGamesCountEl.innerHTML = `${GAMES_DATA.length}<span> Title</span>`;
    if (statSafetyEl) statSafetyEl.innerHTML = `Verified`;
}

// Render featured spotlight card in hero
function renderFeaturedSpotlight() {
    const featured = GAMES_DATA.find(g => g.isFeatured) || GAMES_DATA[0];
    const container = document.getElementById('hero-spotlight-container');
    if (!container || !featured) return;

    container.innerHTML = `
        <div class="featured-spotlight-card">
            <div class="spotlight-badge">★ ${featured.badge || 'Featured Game'}</div>
            <div class="spotlight-icon-wrap" style="background: ${featured.iconGradient}">
                ${getGameIconSvg(featured.category)}
            </div>
            <div class="spotlight-title">${featured.title}</div>
            <div class="spotlight-category">${featured.category} Game • ${featured.contentRating}</div>
            <p class="spotlight-desc">${featured.shortDescription}</p>
            <div class="spotlight-meta-row">
                <div class="spotlight-meta-pill">🏷️ ${featured.category}</div>
                <div class="spotlight-meta-pill">🛡️ ${featured.contentRating}</div>
                <div class="spotlight-meta-pill">⚡ v${featured.version}</div>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="${featured.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                    Google Play
                </a>
                <button class="btn-secondary btn-quick-view" data-game-id="${featured.id}" style="padding: 10px 18px; font-size: 0.9rem;">
                    Details & Policy
                </button>
            </div>
        </div>
    `;
}

// Render dynamic category filter chips
function renderCategoryFilters() {
    const chipsContainer = document.getElementById('category-chips');
    if (!chipsContainer) return;

    const categories = getCategories();
    chipsContainer.innerHTML = categories.map(cat => `
        <button class="chip-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');
}

// Render game cards grid (no ratings or download counts)
function renderGames(gamesList) {
    const grid = document.getElementById('games-grid');
    const emptyState = document.getElementById('empty-search-state');
    if (!grid) return;

    if (!gamesList || gamesList.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = gamesList.map(game => `
        <div class="game-card" data-category="${game.category}" data-id="${game.id}">
            <div class="game-card-banner" style="background: ${game.iconGradient}">
                ${game.badge ? `<span class="game-card-badge">${game.badge}</span>` : ''}
                <div class="game-icon-badge" style="background: ${game.iconGradient}">
                    ${getGameIconSvg(game.category)}
                </div>
            </div>
            <div class="game-card-body">
                <div class="game-card-title-row">
                    <div>
                        <h3 class="game-card-title">${game.title}</h3>
                        <span class="game-card-package">${game.packageId}</span>
                    </div>
                </div>
                <p class="game-card-desc">${game.shortDescription}</p>
                <div class="game-tags-list">
                    <span class="tag-pill" style="color: var(--accent-cyan)">${game.category} Game</span>
                    <span class="tag-pill">${game.contentRating}</span>
                    <span class="tag-pill">v${game.version}</span>
                </div>
                <div class="game-card-footer">
                    <button class="btn-card-details btn-quick-view" data-game-id="${game.id}">
                        Game Info
                    </button>
                    <div style="display: flex; gap: 8px;">
                        <a href="${game.privacyUrl || `privacy.html?game=${game.id}`}" class="btn-card-policy" title="Google Play Privacy Policy for ${game.title}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Privacy Policy
                        </a>
                        <a href="${game.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn-play-store" style="padding: 6px 12px; font-size: 0.78rem;" title="View on Google Play">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                            Play
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Search and category filtering
function setupSearchAndFilter() {
    const searchInput = document.getElementById('game-search-input');
    const chipsContainer = document.getElementById('category-chips');

    let currentCategory = "All";
    let searchQuery = "";

    function filterAndRender() {
        let filtered = GAMES_DATA;

        if (currentCategory !== "All") {
            filtered = filtered.filter(g => g.category === currentCategory);
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(g => 
                g.title.toLowerCase().includes(query) ||
                g.packageId.toLowerCase().includes(query) ||
                g.category.toLowerCase().includes(query) ||
                g.shortDescription.toLowerCase().includes(query) ||
                (g.tags && g.tags.some(t => t.toLowerCase().includes(query)))
            );
        }

        renderGames(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndRender();
        });
    }

    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.chip-btn');
            if (!btn) return;

            document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.getAttribute('data-category');
            filterAndRender();
        });
    }
}

// Game Modal Popup
function setupModal() {
    const overlay = document.getElementById('game-modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.btn-quick-view');
        if (trigger) {
            const gameId = trigger.getAttribute('data-game-id');
            const game = getGameById(gameId);
            if (game) {
                openGameModal(game);
            }
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeGameModal();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeGameModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
            closeGameModal();
        }
    });
}

function openGameModal(game) {
    const overlay = document.getElementById('game-modal-overlay');
    if (!overlay) return;

    const iconEl = document.getElementById('modal-game-icon');
    const titleEl = document.getElementById('modal-game-title');
    const pkgEl = document.getElementById('modal-game-package');
    const descEl = document.getElementById('modal-game-description');
    const featuresListEl = document.getElementById('modal-game-features');
    const playStoreLinkEl = document.getElementById('modal-play-link');
    const privacyLinkEl = document.getElementById('modal-privacy-link');
    
    // Meta fields
    const metaVer = document.getElementById('modal-meta-version');
    const metaCategory = document.getElementById('modal-meta-category');
    const metaAge = document.getElementById('modal-meta-age');

    if (iconEl) {
        iconEl.style.background = game.iconGradient;
        iconEl.innerHTML = getGameIconSvg(game.category);
    }
    if (titleEl) titleEl.textContent = game.title;
    if (pkgEl) pkgEl.textContent = game.packageId;
    if (descEl) descEl.textContent = game.description;

    if (featuresListEl && game.features) {
        featuresListEl.innerHTML = game.features.map(f => `
            <li>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span>${f}</span>
            </li>
        `).join('');
    }

    if (metaVer) metaVer.textContent = `v${game.version}`;
    if (metaCategory) metaCategory.textContent = `${game.category} Game`;
    if (metaAge) metaAge.textContent = game.contentRating;

    if (playStoreLinkEl) playStoreLinkEl.href = game.playStoreUrl;
    if (privacyLinkEl) privacyLinkEl.href = game.privacyUrl || `privacy.html?game=${game.id}`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGameModal() {
    const overlay = document.getElementById('game-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Mobile Menu Handler
function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }
}

// Navbar scroll styles
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Helper SVG icons based on game category
function getGameIconSvg(category) {
    switch (category) {
        case 'Board':
            // Dice / Board game icon
            return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
        case 'Arcade':
            return `<svg viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
        case 'Card':
            return `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3.5l2.5 3.5H16L12 16l-4-6h1.5L12 6.5z"/></svg>`;
        case 'Puzzle':
            return `<svg viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/></svg>`;
        default:
            return `<svg viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>`;
    }
}
