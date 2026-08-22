/**
 * PlayPatch - Centralized Games Registry & Privacy Configuration
 */

const STUDIO_CONFIG = {
    name: "PlayPatch",
    tagline: "Crafting Engaging & Fun Mobile Games",
    developerName: "PlayPatch Games",
    contactEmail: "simplelivewallpaper@gmail.com",
    privacyEmail: "simplelivewallpaper@gmail.com",
    playConsoleDeveloperId: "PlayPatch",
    lastUpdated: "August 2026",
    websiteUrl: "https://playpatch.com",
    socials: {
        playStore: "https://play.google.com/store/apps/dev?id=playpatch",
        twitter: "https://twitter.com/playpatchgames",
        youtube: "https://youtube.com/@playpatch",
        github: "https://github.com/playpatch"
    }
};

const GAMES_DATA = [
    {
        id: "retro-ludo",
        title: "Retro Ludo",
        tagline: "Classic Retro Board & Dice Strategy Game",
        packageId: "com.playpatch.retroludo",
        category: "Board",
        version: "1.0.0",
        contentRating: "Everyone (3+)",
        releaseDate: "2026-08-01",
        lastUpdated: "2026-08-22",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.playpatch.retroludo",
        isFeatured: true,
        badge: "Featured",
        themeColor: "#ff3860",
        iconGradient: "linear-gradient(135deg, #ff3860 0%, #ff8c00 35%, #48c774 70%, #3273dc 100%)",
        shortDescription: "Roll the dice, race your tokens, and enjoy nostalgic board game fun in Retro Ludo with smart AI and local pass & play.",
        description: "Retro Ludo brings back the timeless joy of classic board gaming. Featuring retro board themes, smooth dice rolling mechanics, offline bot challenges, and local 2 to 4 player pass-and-play. Supported strictly by standard non-intrusive Google AdMob advertisements with zero in-app purchases.",
        features: [
            "Classic 2 to 4 player traditional Ludo board rules",
            "Local Pass & Play multiplayer for family and friends",
            "Single-player offline mode with intelligent AI opponents",
            "Crisp dice physics and retro board aesthetics",
            "Quick game auto-save to resume progress anytime",
            "100% offline ready with zero account login required"
        ],
        tags: ["Board", "Retro Ludo", "Ludo", "Dice", "Casual", "Multiplayer", "Offline"],
        privacyDisclosures: {
            adsEnabled: true,
            adNetworks: ["Google AdMob"],
            analyticsEnabled: false,
            inAppPurchases: false,
            dataCollected: [
                {
                    type: "Device Identifiers (Google Advertising ID)",
                    purpose: "Advertising & Fraud Prevention",
                    optional: false,
                    details: "Google Advertising ID (GAID) used solely by Google AdMob to deliver standard non-intrusive banner and interstitial ads"
                },
                {
                    type: "App Diagnostics & Crash Reports",
                    purpose: "App Stability & Bug Fixing",
                    optional: false,
                    details: "Anonymous crash diagnostics provided by Google Play Console / Firebase Crashlytics"
                },
                {
                    type: "Local Game Preferences",
                    purpose: "Gameplay Settings",
                    optional: false,
                    details: "Board themes, sound toggles, and saved offline game states stored strictly on your device"
                }
            ],
            thirdPartySDKs: [
                { name: "Google Play Services", purpose: "Core Android operating system & platform stability services" },
                { name: "Google AdMob", purpose: "Serving standard banner and interstitial ads" },
                { name: "Firebase Crashlytics", purpose: "Anonymous stability reporting and crash diagnostics" }
            ],
            targetAgeGroup: "General Audience (3+)",
            dataShared: "No personal data (name, email, precise location, phone) is collected, stored, or sold. Third-party data sharing is strictly limited to Google AdMob for ad serving."
        }
    }
];

// Helper functions for data access
function getAllGames() {
    return GAMES_DATA;
}

function getGameById(id) {
    return GAMES_DATA.find(game => game.id === id || game.packageId === id);
}

function getFeaturedGames() {
    return GAMES_DATA.filter(game => game.isFeatured);
}

function getCategories() {
    const cats = new Set(GAMES_DATA.map(g => g.category));
    return ["All", ...Array.from(cats)];
}
