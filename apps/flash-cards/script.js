/* --- Flash Cards Logic --- */

let FLASHCARDS = [];


let currentCardIndex = -1; // Index in the FLASHCARDS array

const cardIdEl = document.getElementById('card-id');
const quoteTextEl = document.getElementById('quote-text');
const bookAuthorEl = document.getElementById('book-author');
const appListEl = document.getElementById('app-list');

const themeCheckbox = document.getElementById('checkbox');

// --- Theme Logic (Shared) ---
function initTheme() {
    const savedTheme = localStorage.getItem('kratexTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark' && themeCheckbox) {
        themeCheckbox.checked = true;
    }
}

if (themeCheckbox) {
    themeCheckbox.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('kratexTheme', newTheme);
    });
}

// --- FALLBACK DATA (For offline/file:// usage) ---
const FALLBACK_FLASHCARDS = [
    {
        "id": 1,
        "book": "Mixing Secrets for the Small Studio",
        "author": "Mike Senior",
        "quote": "The single most important monitoring decision you'll make is where to put the speakers.",
        "applications": [
            "Re-evaluate your desk placement to ensure symmetry in your room.",
            "Experiment with the distance between your speakers and the wall to control bass buildup.",
            "Create an equilateral triangle between your head and the two monitors.",
            "Use reference tracks to check if your speaker positioning translates to other systems."
        ]
    },
    {
        "id": 2,
        "book": "The War of Art",
        "author": "Steven Pressfield",
        "quote": "Resistance is experienced as fear; the degree of fear equates to the strength of love.",
        "applications": [
            "If you are afraid to release a track, it means that track is important to your artistic growth.",
            "Identify the task you are most procrastinating (e.g., finishing an arrangement) and do it first.",
            "Recognize self-doubt not as a sign to stop, but as a compass pointing to your true north.",
            "Commit to sitting in the studio for a fixed time every day, regardless of 'inspiration'."
        ]
    },
    {
        "id": 3,
        "book": "Effortless Mastery",
        "author": "Kenny Werner",
        "quote": "There are no wrong notes, only wrong resolutions.",
        "applications": [
            "When improvisation leads to a dissonant note, simply slide to the nearest chord tone instead of stopping.",
            "Use 'wrong' notes intentionally to create tension before a drop or chorus.",
            "Record MIDI loosely and fix the context rather than the notes themselves.",
            "Reframe 'mistakes' during live performances as jazz-like chromatic passing tones."
        ]
    },
    {
        "id": 4,
        "book": "Making Music: 74 Creative Strategies",
        "author": "Dennis DeSantis",
        "quote": "Restriction is a catalyst for creativity.",
        "applications": [
            "Write a song using only one synthesizer and one drum kit.",
            "Limit yourself to only 8 tracks for an entire arrangement.",
            "Force yourself to finish a mix using only stock plugins.",
            "Compose a melody using only 3 specific notes."
        ]
    },
    {
        "id": 5,
        "book": "The Mixing Engineer's Handbook",
        "author": "Bobby Owsinski",
        "quote": "If it sounds good, it is good.",
        "applications": [
            "Stop looking at the EQ curve visuals; close your eyes and listen.",
            "Ignore 'rules' about high-passing every track if the low end aids the vibe.",
            "Trust your ears over the preset name (e.g., using a 'Vocals' compressor on drums).",
            "Don't worry if your meter is clipping slightly if the audible distortion is desirable."
        ]
    },
    {
        "id": 6,
        "book": "Thinking in Sound",
        "author": "Stephen Handos",
        "quote": "Timbre is the color of the sound, and it evokes emotion just as pitch does.",
        "applications": [
            "Use a bright, harsh synth lead to convey anger or energy.",
            "Use a warm, filtered pad to convey nostalgia or safety.",
            "Layer sounds not just for volume, but to mix their 'colors' (e.g., a woodsy attack with a metallic tail).",
            "Automate filter cutoffs to change the emotional color of a track over time."
        ]
    },
    {
        "id": 7,
        "book": "Unlock Your Keys",
        "author": "Thelonious Monk (Attributed)",
        "quote": "Simple ain't easy.",
        "applications": [
            "Strip your arrangement back to just the kick, bass, and vocal to see if the groove holds up.",
            "Write a melody so simple a child could hum it, then build harmony around it.",
            "Avoid over-producing; let a single high-quality sample shine on its own.",
            "Focus on the perfect execution of a basic rhythm rather than complex polyrhythms."
        ]
    },
    {
        "id": 8,
        "book": "Arranging Songs",
        "author": "Rikky Rooksby",
        "quote": "Contrast is the engine of interest.",
        "applications": [
            "Follow a busy, loud chorus with a sparse, quiet verse.",
            "Switch from a dry, intimate vocal to a wet, reverberant one in the bridge.",
            "Change the drum pattern from half-time to double-time.",
            "Move the bassline to a higher octave for one section to change the energy."
        ]
    },
    {
        "id": 9,
        "book": "Zen and the Art of Mixing",
        "author": "Mixerman",
        "quote": "A mix is a performance.",
        "applications": [
            "Ride the vocal fader live during a bounce instead of drawing automation curves.",
            "Perform mute/solo cuts on the fly to create arrangement interest.",
            "Treat 'Print' as a final performance; don't just export offline.",
            "Play your FX sends (delay throw, reverb swell) using a MIDI controller."
        ]
    },
    {
        "id": 10,
        "book": "Steal Like an Artist",
        "author": "Austin Kleon",
        "quote": "Don't just steal the style, steal the thinking behind the style.",
        "applications": [
            "Analyze a reference track's structure, not just its sounds.",
            "If you like a synth patch, figure out *why* it works (e.g., the envelope shape) and recreate that principle.",
            "Copy the arrangement of a hit song but swap the genre entirely.",
            "Adhere to the 'remix' philosophy: take an idea, transform it, and make it your own."
        ]
    },
    {
        "id": 11,
        "book": "Mastering Audio: The Art and the Science",
        "author": "Bob Katz",
        "quote": "Dynamic range is the difference between the softest and loudest parts of the signal.",
        "applications": [
            "Don't over-compress your master; let the chorus 'pop' by being slightly louder.",
            "Use quiet sections to make the loud sections feel more impactful.",
            "Check your RMS vs Peak levels to ensure your track breathes.",
            "Avoid the 'sausage' waveform; aim for a mix that dances visually."
        ]
    },
    {
        "id": 12,
        "book": "Music Theory for Computer Musicians",
        "author": "Michael Hewitt",
        "quote": "Rhythm is the most primal element of music.",
        "applications": [
            "Start your track with the drums before touching a melody.",
            "Use syncopation (stressing the off-beat) to drive energy in a house track.",
            "Experiment with triplets in your hi-hats for a modern trap feel.",
            "Ensure your bass rhythm locks perfectly with your kick drum."
        ]
    },
    {
        "id": 13,
        "book": "The Art of Mixing",
        "author": "David Gibson",
        "quote": "Think of the mix as a 3D space: width, depth, and height.",
        "applications": [
            "Place high-frequency sounds 'higher' in the mix and low sounds 'lower'.",
            "Use Reverb and Volume to push sounds 'back' into the depth of the stage.",
            "Use Panning to spread elements wide, leaving the center clear for kick and vocal.",
            "Visualize your mix elements as shapes floating between the speakers."
        ]
    },
    {
        "id": 14,
        "book": "How Music Works",
        "author": "David Byrne",
        "quote": "Context largely determines what is written.",
        "applications": [
            "Write music specifically for the club environment (focus on sub-bass).",
            "Produce a track intended for phone speakers (focus on mid-range harmonics).",
            "Consider the playlist your song will live on; does the intro hook the listener fast?",
            "Arrange a song for a specific live venue size (stadium vs. small club)."
        ]
    },
    {
        "id": 15,
        "book": "Your Brain on Music",
        "author": "Daniel Levitin",
        "quote": "The brain loves a pattern, but it loves the violation of a pattern even more.",
        "applications": [
            "Establish a clear drum loop for 4 bars, then introduce a fill or glitch.",
            "Repeat a melody twice, then change the end note on the third repetition.",
            "Use a 'deceptive cadence' where the chord progression resolves unexpectedly.",
            "Create a predictable build-up but drop into something minimal instead of a huge crash."
        ]
    },
    {
        "id": 16,
        "book": "The Creative Act: A Way of Being",
        "author": "Rick Rubin",
        "quote": "The audience comes last.",
        "applications": [
            "Make music that gives *you* goosebumps first.",
            "Don't chase trends; usually by the time you finish, the trend has passed.",
            "Trust your weirdest ideas; they are your unique signature.",
            "Release music you are proud of, regardless of projected commercial performance."
        ]
    },
    {
        "id": 17,
        "book": "Sound Design: The Expressive Power of Music",
        "author": "David Sonnenschein",
        "quote": "Sound can manipulate the listener's physical state.",
        "applications": [
            "Use sub-bass frequencies (<50Hz) to create a physical sensation of pressure.",
            "Use sudden silence to create tension and make the listener hold their breath.",
            "Use rising pitch risers to physically mimic the sensation of ascending/anxiety.",
            "Use binaural panning to create a dizzying or disorienting effect."
        ]
    },
    {
        "id": 18,
        "book": "Modern Recording Techniques",
        "author": "David Miles Huber",
        "quote": "The quality of the source is more important than the quality of the gear.",
        "applications": [
            "Focus on getting a great vocal performance rather than buying a new mic.",
            "Tune your drums perfectly before recording them.",
            "Use a high-quality sample pack rather than trying to fix bad samples with EQ.",
            "Fix the acoustics of your recording room with blankets before buying plugins."
        ]
    },
    {
        "id": 19,
        "book": "Ableton Live Manual",
        "author": "Ableton",
        "quote": "Use the session view for improvisation and the arrangement view for structure.",
        "applications": [
            "Jam out ideas in clips without worrying about the timeline.",
            "Record your clip launching performance into the arrangement view.",
            "Use 'follow actions' to generate random arrangement ideas.",
            "Don't get stuck in the loop; move to arrangement view as soon as you have 4 good parts."
        ]
    },
    {
        "id": 20,
        "book": "Behind the Glass",
        "author": "Howard Massey",
        "quote": "Production is about problem solving.",
        "applications": [
            "If the vocal is fighting the guitar, decide which one is the star and cut the other.",
            "If the mix sounds muddy, identify the conflicting frequency range and carve it out.",
            "If the singer can't hit the high note, change the key or the melody.",
            "If you have writer's block, solve it by limiting your tools."
        ]
    },
    {
        "id": 21,
        "book": "The Producers Manual",
        "author": "Paul White",
        "quote": "Space is the final frontier in a mix.",
        "applications": [
            "Don't put reverb on everything; contrast dry and wet signals.",
            "Use a short delay instead of reverb to create space without clutter.",
            "EQ your reverb returns to remove muddy low end.",
            "Automate reverb throws to fill the empty space between vocal phrases."
        ]
    },
    {
        "id": 22,
        "book": "Hooked",
        "author": "Nir Eyal (Applied to Music)",
        "quote": "Variable rewards keep users engaged.",
        "applications": [
            "Don't repeat the loop exactly the same way every time; add subtle variations.",
            "Introduce 'ear candy'—small sounds that happen only once in the track.",
            "Change the instrument playing the main melody in the second verse.",
            "Tease the main hook in the intro but don't play the full version until the chorus."
        ]
    },
    {
        "id": 23,
        "book": "Everything You Need to Know About the Music Business",
        "author": "Donald Passman",
        "quote": "Your master recording and your publishing are two different copyrights.",
        "applications": [
            "Register your songs with a PRO (ASCAP/BMI) for publishing royalties.",
            "Understand that you own the master (the audio file) but the composition is separate.",
            "When remixing, clear the master rights from the label.",
            "Ensure you have split sheets signed with collaborators before release."
        ]
    },
    {
        "id": 24,
        "book": "Mixing with Your Mind",
        "author": "Michael Paul Stavrou",
        "quote": "Compress to control the envelope, not just the volume.",
        "applications": [
            "Use a slow attack on a snare compressor to let the 'crack' punch through.",
            "Use a fast attack on a vocal to tame the initial transient spikes.",
            "Time the release of your compressor to 'breathe' with the tempo of the track.",
            "Use parallel compression to add body without destroying the transient."
        ]
    },
    {
        "id": 25,
        "book": "Guerilla Home Recording",
        "author": "Karl Coryat",
        "quote": "Limitations encourage innovation.",
        "applications": [
            "Make a full track using only samples found in your kitchen.",
            "Record vocals on your phone voice memo for a specific lo-fi texture.",
            "Write a song without using any MIDI; play everything live on keys.",
            "Finish a track in 1 hour."
        ]
    },
    {
        "id": 26,
        "book": "Oblique Strategies",
        "author": "Brian Eno",
        "quote": "Honour thy error as a hidden intention.",
        "applications": [
            "If you accidentally played a wrong note, repeat it and make it a motif.",
            "If a plugin crashes and makes a weird noise, sample that noise.",
            "If you recorded the vocal too hot and it distorted, embrace the distortion.",
            "Don't undo immediately; listen to the mistake in context first."
        ]
    },
    {
        "id": 27,
        "book": "Deep Work",
        "author": "Cal Newport",
        "quote": "High-quality work produced = (Time Spent) x (Intensity of Focus).",
        "applications": [
            "Turn off Wi-Fi and put your phone in another room while producing.",
            "Schedule 90-minute 'deep work' blocks for mixing purely.",
            "Don't multitask; don't check emails midway through an arrangement.",
            "Focus on one skill at a time (e.g., today I only practice sound design)."
        ]
    },
    {
        "id": 28,
        "book": "Atomic Habits",
        "author": "James Clear",
        "quote": "You do not rise to the level of your goals. You fall to the level of your systems.",
        "applications": [
            "Create a default template in your DAW that saves setup time.",
            "Organize your sample library so you don't waste time searching.",
            "Set a rule: 'I will write 4 bars of music every day at 8 PM'.",
            "Create a 'favorites' folder for your most used plugins."
        ]
    },
    {
        "id": 29,
        "book": "Processing Creativity",
        "author": "Jesse Cannon",
        "quote": "The listener wants to feel something, not hear your expensive gear.",
        "applications": [
            "Prioritize the emotional delivery of a vocal over the technical pitch perfection.",
            "Don't apologize for using stock plugins if the result moves people.",
            "Focus on the 'vibe' and 'groove' rather than perfect quantization.",
            "Ask yourself 'Does this section make me feel the intended emotion?'"
        ]
    },
    {
        "id": 30,
        "book": "The Bedroom Producer",
        "author": "Unknown",
        "quote": "Layering is about filling the frequency spectrum.",
        "applications": [
            "Layer a sub-bass sine wave under a gritty mid-range bass.",
            "Layer a white noise tail on a snare to give it high-end shimmer.",
            "Layer a whisper track under a lead vocal to add intimacy.",
            "Don't just stack sounds; EQ them so they don't mask each other."
        ]
    },
    {
        "id": 31,
        "book": "Save the Cat! (Applied to Music Video/Story)",
        "author": "Blake Snyder",
        "quote": "Give the hero a 'save the cat' moment early on.",
        "applications": [
            "In your song intro, establish a likeable or relatable hook early.",
            "For your artist brand, show a moment of humanity/generosity on social media.",
            "In a music video, make the protagonist relatable before starting the action.",
            "Start your live set with a moment of connection with the crowd."
        ]
    },
    {
        "id": 32,
        "book": "Show Your Work!",
        "author": "Austin Kleon",
        "quote": "Become a documentarian of what you do.",
        "applications": [
            "Post a 'behind the scenes' of your DAW session on Instagram Stories.",
            " livestream your production process on Twitch/YouTube.",
            "Share your unfinished demos with a trusted Discord community.",
            "Write a blog post/tweet about a mixing trick you just learned."
        ]
    },
    {
        "id": 33,
        "book": "Six Figure Musician",
        "author": "David Hoopman",
        "quote": "Diversify your income streams.",
        "applications": [
            "Don't rely just on Spotify streams; sell sample packs or presets.",
            "Offer mixing or mastering services to other artists.",
            "Create content/tutorials for YouTube.",
            "Look into sync licensing for TV and film."
        ]
    },
    {
        "id": 34,
        "book": "Mixing Audio",
        "author": "Roey Izhaki",
        "quote": "Masking occurs when two sounds compete for the same frequency range.",
        "applications": [
            "Use Sidechain compression to duck the bass when the kick hits.",
            "Pan competing guitars left and right to separate them.",
            "Carve a 'pocket' in the piano EQ for the vocal to sit in.",
            "Arrange the song so the lead synth and vocal don't play busy lines at the same time."
        ]
    },
    {
        "id": 35,
        "book": "Critical Listening Skills for Audio Professionals",
        "author": "F. Alton Everest",
        "quote": "We hear what we expect to hear.",
        "applications": [
            "Use A/B testing with a reference track constantly.",
            "Take breaks to reset your ears so you don't get used to a bad mix.",
            "Listen to your mix in mono to reveal phase cancellation issues.",
            "Listen at very low volumes to see which elements stand out."
        ]
    },
    {
        "id": 36,
        "book": "The Music Lesson",
        "author": "Victor Wooten",
        "quote": "Notes are expensive. Listen first.",
        "applications": [
            "Don't play over the singer; leave space.",
            "Rest is a musical note; use silence effectively.",
            "Listen to the other band members or tracks before adding your layer.",
            "Sometimes the best production decision is to mute a track."
        ]
    },
    {
        "id": 37,
        "book": "Synthesizer Cookbook",
        "author": "Fred Welsh",
        "quote": "Every sound can be broken down into pitch, volume, and timbre over time.",
        "applications": [
            "Analyze a preset by looking at its Amp Envelope (Volume over time).",
            "Recreate a sound by matching the oscillator waveform (Timbre).",
            "Use LFOs to change pitch/filter over time for movement.",
            "Create a pluck sound by simply shortening the decay/sustain."
        ]
    },
    {
        "id": 38,
        "book": "Flow",
        "author": "Mihaly Csikszentmihalyi",
        "quote": "Flow happens when challenge meets skill level.",
        "applications": [
            "If you are bored, increase the challenge (try a new genre).",
            "If you are anxious, lower the challenge (simplify the arrangement).",
            "Set clear goals for a session to induce a flow state.",
            "Eliminate distractions to stay in the zone."
        ]
    },
    {
        "id": 39,
        "book": "Songwriting Without Boundaries",
        "author": "Pat Pattison",
        "quote": "Show, don't tell.",
        "applications": [
            "Instead of lyrics saying 'I am sad', describe a rainy window.",
            "Use minor chords to 'show' sadness without words.",
            "Use a distorted, chaotic beat to 'show' anger.",
            "Use sound effects (sirens, rain, birds) to paint a scene."
        ]
    },
    {
        "id": 40,
        "book": "The Mastering Engineer's Handbook",
        "author": "Bobby Owsinski",
        "quote": "Mastering is the art of compromise.",
        "applications": [
            "Accept that making it louder might sacrifice some dynamic punch.",
            "Accept that boosting high-end 'air' might reveal sibilance.",
            "Find the balance between a wide stereo image and mono compatibility.",
            "Compromise between the artist's vision and commercial standards."
        ]
    },
    {
        "id": 41,
        "book": "Start with Why",
        "author": "Simon Sinek (Applied to Artist Brand)",
        "quote": "People don't buy what you do; they buy why you do it.",
        "applications": [
            "Clearly define your artist manifesto or mission.",
            "Share the story behind the song, not just the song links.",
            "Build a community around shared values (e.g., mental health, partying, rebellion).",
            "Let your 'Why' dictate your visual aesthetic."
        ]
    },
    {
        "id": 42,
        "book": "Essentialism",
        "author": "Greg McKeown",
        "quote": "Less but better.",
        "applications": [
            "Delete tracks that don't absolutely contribute to the song.",
            "Release fewer singles, but make them higher quality.",
            "Focus on promoting one platform really well instead of 5 poorly.",
            "Clear your workspace of clutter to clear your mind."
        ]
    },
    {
        "id": 43,
        "book": "Techno Production Guide",
        "author": "Unknown",
        "quote": "The rumble is in the reverb.",
        "applications": [
            "Create a techno rumble kick by putting reverb on a kick, filtering out the highs, and sidechaining it.",
            "Use short reverb decay on basslines to add width without mud.",
            "distort the reverb return for industrial textures.",
            "Resample the reverb tail and reverse it."
        ]
    },
    {
        "id": 44,
        "book": "Modern MIDI",
        "author": "Sam McGuire",
        "quote": "Quantization kills the groove.",
        "applications": [
            "Use 'iterative quantize' (50% strength) instead of 100% hard grid.",
            "Manually nudge snare hits slightly late for a laid-back feel.",
            "Keep hi-hats slightly loose to simulate a human drummer.",
            "Add 'groove' templates from your DAW to stiff MIDI clips."
        ]
    },
    {
        "id": 45,
        "book": "Shortcuts to Songwriting",
        "author": "Robin Frederick",
        "quote": "The title should be the centerpiece of the lyric.",
        "applications": [
            "Place the song title in the strongest position (start or end of chorus).",
            "Make sure the concept of the song revolves around the title.",
            "Use the title as a rhythmic hook.",
            "Don't bury the title in a verse; make it obvious."
        ]
    },
    {
        "id": 46,
        "book": "Unlocking Creativity",
        "author": "Michael Beinhorn",
        "quote": "Perfectionism is usually procrastination masquerading as quality control.",
        "applications": [
            "Set a deadline: 'This mix is finished at 5 PM no matter what'.",
            "Accept that your first draft will suck.",
            "Don't tweak the kick drum EQ for 3 hours before writing the song.",
            "Ship the release. You can make the next one better."
        ]
    },
    {
        "id": 47,
        "book": "Audio Effects, Mixing and Mastering",
        "author": "Metin Bektas",
        "quote": "Equalization is volume control for specific frequencies.",
        "applications": [
            "Instead of turning up the guitar fader, try turning up just the 2kHz range.",
            "Instead of turning down the bass, filter out the sub-40Hz rumble.",
            "Think of EQ as sculpting the space for other instruments.",
            "Use EQ cuts (subtractive) before EQ boosts (additive)."
        ]
    },
    {
        "id": 48,
        "book": "The Talent Code",
        "author": "Daniel Coyle",
        "quote": "Deep practice is built on a paradox: struggling in certain targeted ways makes you smarter.",
        "applications": [
            "Practice the piano scales you are *bad* at, not the ones you know.",
            "Force yourself to design a sound you don't know how to make.",
            "Analyze a complex jazz chord progression to stretch your ears.",
            "Don't just jam; practice with intent to improve a weakness."
        ]
    },
    {
        "id": 49,
        "book": "Music Production: For Producers...",
        "author": "Tommy Swindali",
        "quote": "Reference tracks are your map in the dark.",
        "applications": [
            "Import a pro track into your session and volume match it.",
            "Compare your kick low-end to the reference.",
            "Compare the vocal brightness.",
            "Check how wide their stereo image is compared to yours."
        ]
    },
    {
        "id": 50,
        "book": "Production-Philosophy",
        "author": "Kratex",
        "quote": "Your heritage is your sonic signature.",
        "applications": [
            "Sample instruments from your own culture.",
            "Record street ambience from your city and use it as texture.",
            "Blend traditional rhythms with modern electronic genres (like M-House).",
            "Tell stories that are unique to your upbringing."
        ]
    }
];

// --- App Logic ---


// --- Helper: Get Random Index ---
function getRandomIndex() {
    return Math.floor(Math.random() * FLASHCARDS.length);
}

// --- Helper: Seeded Randomness ---
function getSeededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// --- Core Render ---
function renderCard(card) {
    try {
        if (!card) return;

        // Content
        if (cardIdEl) cardIdEl.textContent = card.id;
        if (quoteTextEl) quoteTextEl.textContent = `"${card.quote}"`;
        if (bookAuthorEl) bookAuthorEl.textContent = `${card.author}, "${card.book}"`;

        // Applications
        if (appListEl) {
            appListEl.innerHTML = '';
            card.applications.forEach((app, index) => {
                const li = document.createElement('li');
                li.className = 'app-item';
                li.innerHTML = `
                    <div class="app-number">${index + 1}</div>
                    <div>${app}</div>
                `;
                appListEl.appendChild(li);
            });
        }
    } catch (e) {
        console.error("Error rendering card:", e);
    }
}

function loadCardAtIndex(index) {
    if (index < 0) index = FLASHCARDS.length - 1;
    if (index >= FLASHCARDS.length) index = 0;

    currentCardIndex = index;
    renderCard(FLASHCARDS[currentCardIndex]);
}

function renderDailyCard() {
    if (FLASHCARDS.length === 0) return;

    // Generate seed (YYYYMMDD)
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Pick based on seed
    const targetIndex = Math.floor(getSeededRandom(seed) * FLASHCARDS.length);

    // Update label to "Daily Wisdom"
    document.querySelector('.card-label').innerHTML = `Daily Wisdom #<span id="card-id">${FLASHCARDS[targetIndex].id}</span>`;

    currentCardIndex = targetIndex;
    renderCard(FLASHCARDS[currentCardIndex]);
}

// --- Navigation Handlers ---
document.getElementById('prev-card-btn').addEventListener('click', () => {
    // Sequential navigation
    loadCardAtIndex(currentCardIndex - 1);
    updateLabel("Card");
});

document.getElementById('next-card-btn').addEventListener('click', () => {
    loadCardAtIndex(currentCardIndex + 1);
    updateLabel("Card");
});

document.getElementById('shuffle-btn').addEventListener('click', () => {
    // Pure random
    let newIndex = getRandomIndex();
    // Avoid immediate repeat
    if (newIndex === currentCardIndex) newIndex = getRandomIndex();

    loadCardAtIndex(newIndex);
    updateLabel("Random Insight");
});

function updateLabel(textPrefix) {
    const id = FLASHCARDS[currentCardIndex].id;
    document.querySelector('.card-label').innerHTML = `${textPrefix} #<span id="card-id">${id}</span>`;
}

// --- Data Fetching ---
async function loadCards() {
    try {
        const response = await fetch('flashcards.json');
        if (!response.ok) throw new Error("Failed to load cards");
        FLASHCARDS = await response.json();
    } catch (e) {
        console.warn("Could not fetch remote JSON (likely offline or file:// protocol). Using Fallback Data.");
        FLASHCARDS = FALLBACK_FLASHCARDS;
    }

    // Initial render: Daily Card
    renderDailyCard();
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadCards();
});
