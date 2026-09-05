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
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.ludo2d.mobile",
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
    },
    {
        id: "mathpop",
        title: "MathPop",
        tagline: "Offline Math Practice & Brain-Training Quiz Game",
        packageId: "com.mathpop.game",
        category: "Educational",
        version: "1.0.0",
        contentRating: "Everyone",
        releaseDate: "2026-09-05",
        lastUpdated: "2026-09-05",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.mathpop.game",
        isFeatured: false,
        badge: "New",
        themeColor: "#6c5ce7",
        iconGradient: "linear-gradient(135deg, #6c5ce7 0%, #00b894 50%, #0984e3 100%)",
        shortDescription: "Sharpen your mental math with levelled quizzes, a Topics Hub, a Math Tricks library, and a single-player Battle Mode. Free and supported by non-personalized ads.",
        description: "MathPop is a single-player math practice game. Work through numbered Easy/Medium/Hard levels of multiple-choice problems with a par-time timer and step-by-step worked solutions, explore the Topics Hub for arithmetic, algebra, geometry, trigonometry and statistics, generate custom quizzes with Math Quest, learn speed-calculation shortcuts in the Math Tricks library, and race a locally-simulated opponent in Battle Mode. MathPop is free and supported by standard non-intrusive Google AdMob advertisements (non-personalized / child-directed), with no in-app purchases. Optional Google Play Games sign-in enables cloud saves and achievements.",
        features: [
            "Levelled quiz gameplay with par-time timer and worked solutions",
            "Topics Hub: formulas and practice for arithmetic to statistics",
            "Math Quest custom quiz generator (topic, difficulty, pacing)",
            "Math Tricks library of mental-math and Vedic shortcuts",
            "Single-player Battle Mode against a locally-simulated bot",
            "In-game Scratchpad for working out problems by hand",
            "Local stats: accuracy, average solve time, streaks, history",
            "Free with non-personalized ads and zero in-app purchases"
        ],
        tags: ["Educational", "Math", "Brain Training", "Quiz", "Puzzle", "Kids", "Family"],
        privacyDisclosures: {
            adsEnabled: true,
            adNetworks: ["Google AdMob"],
            analyticsEnabled: true,
            inAppPurchases: false,
            dataCollected: [
                {
                    type: "Device or Other Identifiers (App Set ID / Advertising ID)",
                    purpose: "Advertising & Fraud Prevention",
                    optional: false,
                    details: "Used by Google AdMob to serve non-personalized banner and interstitial ads and to prevent ad fraud. Because MathPop is child-directed, ads are flagged for child-directed treatment and behavioral profiling is disabled"
                },
                {
                    type: "App Activity & In-App Events",
                    purpose: "Analytics",
                    optional: false,
                    details: "Anonymous usage events (levels started/completed, feature usage, session length) collected via Google Firebase Analytics to understand aggregate engagement and improve the game"
                },
                {
                    type: "App Diagnostics & Crash Reports",
                    purpose: "App Stability & Bug Fixing",
                    optional: false,
                    details: "Anonymous crash stack traces and performance diagnostics provided by Google Firebase Crashlytics"
                },
                {
                    type: "Google Play Games Services Profile",
                    purpose: "Cloud Save, Achievements & Leaderboards",
                    optional: true,
                    details: "If you choose to sign in, your Google Play Games player ID and gamer tag are used to sync progress and achievements. Sign-in is optional and the game is fully playable without it"
                },
                {
                    type: "Local Game Preferences & Progress",
                    purpose: "Gameplay Settings",
                    optional: false,
                    details: "Themes, sound toggles, onboarding difficulty, per-level progress and local stats stored on your device via Android SharedPreferences"
                }
            ],
            thirdPartySDKs: [
                { name: "Google Play Services", purpose: "Core Android operating system & platform stability services" },
                { name: "Google AdMob (Google Mobile Ads SDK)", purpose: "Serving non-personalized, child-directed banner and interstitial ads" },
                { name: "Google Firebase Analytics", purpose: "Anonymous aggregate usage and engagement analytics" },
                { name: "Firebase Crashlytics", purpose: "Anonymous stability reporting and crash diagnostics" },
                { name: "Google Play Games Services", purpose: "Optional cloud save, achievements and leaderboards for signed-in players" }
            ],
            targetAgeGroup: "Child-Directed (Google Play Families Policy)",
            dataShared: "No personal data (name, email, precise location, phone) is collected or sold. Data sharing is limited to Google: AdMob for non-personalized ad serving, Firebase for analytics and crash diagnostics, and Play Games Services for optional cloud saves. Ads are served with child-directed treatment, disabling behavioral tracking and profiling."
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
