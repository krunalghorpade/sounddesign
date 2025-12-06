/* --- 🧠 JavaScript Logic --- */
const TOTAL_DAYS = 100;
const TIME_LIMIT_MS = 24 * 60 * 60 * 1000;

// --- FALLBACK DATA (For offline/file:// usage) ---
const FALLBACK_CHALLENGES = [
    { "id": 1, "title": "Pure Sine Sub Bass", "plugin": "Operator", "trackReference": "James Blake - Limit to Your Love", "description": "Use Operator's single sine wave to create a clean sub-bass, focusing only on the volume envelope for a tight punch." },
    { "id": 2, "title": "Basic Square Lead", "plugin": "Analog, EQ Eight", "trackReference": "Daft Punk - Around the World", "description": "Synthesize a raw square wave lead in Analog. Use EQ Eight to slightly roll off high-end harshness." },
    { "id": 3, "title": "Simple Plucked Pad", "plugin": "Operator, Reverb", "trackReference": "Boards of Canada - Dayvan Cowboy", "description": "Use two sine waves in Operator (one slightly detuned) with a fast decay envelope and add a large Reverb tail." },
    { "id": 4, "title": "White Noise Hi-Hat", "plugin": "Analog/Operator, Noise, Gate", "trackReference": "Any Classic House Track", "description": "Generate a closed hi-hat sound using white noise and a fast decay envelope. Use Gate for cleanliness." },
    { "id": 5, "title": "Basic Filter Sweep FX", "plugin": "Auto Filter", "trackReference": "The Chemical Brothers - Galvanize", "description": "Apply Auto Filter to a sustained chord and automate the cutoff frequency from low to high over 4 bars." },
    { "id": 6, "title": "Kick Drum Pitch Envelope", "plugin": "Operator", "trackReference": "Juno Reactor - Pistolero", "description": "Synthesize a kick drum by setting a very fast pitch envelope that quickly drops from high frequency to a low rumble." },
    { "id": 7, "title": "Mono Arp Sequence", "plugin": "Analog, Arpeggiator", "trackReference": "Jean-Michel Jarre - Oxygène (Part IV)", "description": "Create a simple sawtooth patch in Analog and use the Arpeggiator to sequence a simple, rhythmic mono pattern." },
    { "id": 8, "title": "Delay Time Rhythms", "plugin": "Simple Delay", "trackReference": "Madlib - Shades of Blue", "description": "Create a short percussive loop and use Simple Delay (with high feedback and dry/wet) to create complex polyrhythms." },
    { "id": 9, "title": "Lo-Cut/Hi-Cut EQ", "plugin": "EQ Eight", "trackReference": "Tame Impala - Feels Like We Only Go Backwards", "description": "Take a full loop (drums/synth) and use EQ Eight to create two extreme versions: one with heavy low-cut, one with heavy high-cut." },
    { "id": 10, "title": "Phase Cancellation Effect", "plugin": "Utility, Simple Delay", "trackReference": "Radiohead - Kid A", "description": "Duplicate a track, invert the phase on the duplicate using Utility, then slightly offset the timing with Simple Delay to create unique filtering." },
    { "id": 11, "title": "Chorus Width Effect", "plugin": "Chorus-Ensemble", "trackReference": "Tears for Fears - Everybody Wants to Rule the World", "description": "Apply Chorus-Ensemble to a mono synth line to drastically increase its stereo width and shimmer." },
    { "id": 12, "title": "Ping Pong Delay", "plugin": "Ping Pong Delay", "trackReference": "U2 - Where the Streets Have No Name", "description": "Set up Ping Pong Delay on a plucked melody to have the repetitions bounce cleanly between the left and right speakers." },
    { "id": 13, "title": "Warm Analog Pad", "plugin": "Analog", "trackReference": "Vangelis - Blade Runner Theme", "description": "Use two detuned sawtooth waves in Analog with a slow attack and release to create a lush, warm pad texture." },
    { "id": 14, "title": "Ring Modulator Bell", "plugin": "Operator, Ring Mod", "trackReference": "Nine Inch Nails - The Fragile", "description": "Use two high-frequency carriers in Operator and engage the Ring Mod function to create a metallic, inharmonic bell sound." },
    { "id": 15, "title": "Basic Compressions", "plugin": "Compressor", "trackReference": "Any Pop Vocal", "description": "Use Compressor on a dry drum loop to achieve a basic 3:1 ratio with medium attack, increasing overall punch." },
    { "id": 16, "title": "Pitch Bend FX", "plugin": "Transpose (Clip or Device)", "trackReference": "Liquid Drum & Bass genre", "description": "Take a short synth stab and automate the Transpose parameter to create a rapid, deep pitch bend." },
    { "id": 17, "title": "Grainy Reverb Ambience", "plugin": "Reverb", "trackReference": "Fever Ray - If I Had A Heart", "description": "Use a massive, diffused Reverb with a long decay time and very low cut-off frequency to create dark, grainy ambience." },
    { "id": 18, "title": "Overdrive Distortion", "plugin": "Overdrive", "trackReference": "Justice - D.A.N.C.E.", "description": "Apply Overdrive to a synth bass to make it clip and distort, but roll off the extreme high frequencies with EQ." },
    { "id": 19, "title": "Phaser Swirl", "plugin": "Phaser", "trackReference": "Pink Floyd - Shine On You Crazy Diamond", "description": "Use Phaser with a high feedback setting on a sustained synth chord to create a deep, swirling effect." },
    { "id": 20, "title": "Gate Snare", "plugin": "Gate", "trackReference": "Eurythmics - Sweet Dreams (Are Made of This)", "description": "Apply Gate to a sustained noise or clap sample, using the hold and release parameters to shorten it aggressively." },
    { "id": 21, "title": "Resonant Filter Whistle", "plugin": "Auto Filter", "trackReference": "Acid House genre (e.g., 808 State)", "description": "Use Auto Filter with high resonance on a noise source and sweep the cutoff rapidly to create a 'whistle' or 'scream' effect." },
    { "id": 22, "title": "Simple Sidechain Pump", "plugin": "Compressor (Sidechain)", "trackReference": "Four Tet - Love Cry", "description": "Set up a sidechain compressor on a pad sound keyed by the kick drum to achieve a basic, rhythmic 'pumping' effect." },
    { "id": 23, "title": "Drum Bus Tone Shaper", "plugin": "Drum Bus", "trackReference": "Any modern Hip Hop Beat", "description": "Apply Drum Bus to a full drum loop and use the 'Boom' and 'Crunch' parameters to enhance the low-end and high-end saturation." },
    { "id": 24, "title": "Vinyl Crackle FX", "plugin": "Vinyl Distortion", "trackReference": "Nujabes - Feather", "description": "Use Vinyl Distortion to generate crackle and change the 'Poles' and 'Rec.' settings to simulate an old, damaged record." },
    { "id": 25, "title": "Basic Wavetable Lead", "plugin": "Wavetable", "trackReference": "Flume - Skin Album", "description": "Load a basic saw wave into Wavetable and only use the 'Position' control to manually sweep through the wave, creating timbral movement." },
    { "id": 26, "title": "LFO Controlled Filter Wobble", "plugin": "Auto Filter, LFO", "trackReference": "Skream - Midnight Request Line", "description": "Assign an LFO to modulate the cutoff frequency of the Auto Filter on a synth bass to create a rhythmic wobble." },
    { "id": 27, "title": "Dynamic Stereo Delay", "plugin": "Echo", "trackReference": "The xx - Intro", "description": "Use the Echo device and link the delay times for a rhythmic repeat, then use the 'Ducking' feature to push the original signal out." },
    { "id": 28, "title": "FM Pad with Detune", "plugin": "Operator", "trackReference": "Aphex Twin - Selected Ambient Works 85–92", "description": "Create a multi-operator FM pad (A modulating B) and apply heavy detuning to the carriers for a rich, unstable sound." },
    { "id": 29, "title": "Wavetable Unison Stacks", "plugin": "Wavetable", "trackReference": "Madeon - Shelter", "description": "Use Wavetable's unison modes (e.g., Shimmer or Noise) to create an extremely wide and thick supersaw-style lead." },
    { "id": 30, "title": "Gated Reverb Snare", "plugin": "Reverb, Gate", "trackReference": "Phil Collins - In the Air Tonight", "description": "Create a huge Reverb tail on a snare and use the Gate device triggered by the snare hit to cut the tail abruptly." },
    { "id": 31, "title": "Flanger Risers/Fallers", "plugin": "Flanger, Utility", "trackReference": "Gesaffelstein - Pursuit", "description": "Use a heavy, wet Flanger on a noise sweep (created with Analog) to enhance the sense of movement and tension." },
    { "id": 32, "title": "Frequency Shifter Aliens", "plugin": "Frequency Shifter", "trackReference": "Amon Tobin - Foley Room", "description": "Apply Frequency Shifter to a vocal or percussion sample to create unnatural, metallic or 'alien' speech effects." },
    { "id": 33, "title": "Haas Effect Widening", "plugin": "Simple Delay/Utility", "trackReference": "Any Modern EDM Lead", "description": "Duplicate a mono sound. Pan one left, one right. Offset one track by 10-30ms using Simple Delay for stereo widening (Haas Effect)." },
    { "id": 34, "title": "Vocoder Robot Voice", "plugin": "Vocoder", "trackReference": "Kraftwerk - The Robots", "description": "Use Vocoder with a clean synth carrier (saw wave) and an acapella or spoken word sample as the modulator to create a robot voice." },
    { "id": 35, "title": "Subtle Vinyl Warping", "plugin": "Vinyl Distortion", "trackReference": "Portishead - Dummy Album", "description": "Use Vinyl Distortion but focus on the 'Warp' parameter to create slow, subtle pitch fluctuations typical of old vinyl." },
    { "id": 36, "title": "Complex Reverb Pre-Delay", "plugin": "Reverb", "trackReference": "Brian Eno - Music for Airports", "description": "Set a long Pre-Delay time on the Reverb so the tail starts significantly after the dry signal, creating clarity in a large space." },
    { "id": 37, "title": "Cabinet Speaker Simulation", "plugin": "Cabinet", "trackReference": "Indie Rock Guitar Tone", "description": "Apply Cabinet to a synth or bassline to emulate the tone and room reflections of a miked guitar/bass amp." },
    { "id": 38, "title": "LFO Controlled Pan", "plugin": "Auto Pan", "trackReference": "Stereo Psychedelic Rock", "description": "Use Auto Pan with a sine wave LFO set to a rhythmic rate (e.g., 1/4) to make a sound rhythmically move across the stereo field." },
    { "id": 39, "title": "Wavetable Sub-Oscillator Design", "plugin": "Wavetable", "trackReference": "Deep Minimal Techno", "description": "Use Wavetable to design a bass patch where one oscillator is a clean sub (sine) and a second oscillator provides harmonic content." },
    { "id": 40, "title": "Creative Multiband EQ", "plugin": "EQ Eight", "trackReference": "Any Dubstep Production", "description": "Use EQ Eight to heavily filter one frequency band (e.g., 500 Hz) to create a notch, then automate that notch for a sweeping 'wah' effect." },
    { "id": 41, "title": "Delay Feedback Texture", "plugin": "Simple Delay, Auto Filter", "trackReference": "Dub Music genre (e.g., King Tubby)", "description": "Increase Simple Delay feedback past 100% (carefully!) and use Auto Filter inside the feedback loop to shape the infinite echo." },
    { "id": 42, "title": "Ping Pong with Uneven Times", "plugin": "Ping Pong Delay", "description": "Set the left and right delay times to related but uneven values (e.g., 1/4 and 1/6) to create a confusing, off-kilter rhythm." },
    { "id": 43, "title": "Amp Simulation Crunch", "plugin": "Amp", "trackReference": "The White Stripes - Seven Nation Army", "description": "Apply the 'Blues' setting on the Amp device to a bassline to introduce low-end warmth and harmonic saturation." },
    { "id": 44, "title": "FM Percussion Sound", "plugin": "Operator", "trackReference": "IDM/Glitch Music", "description": "Use Operator's C>B>A algorithm with short envelopes to synthesize a complex, metallic, micro-percussive sound." },
    { "id": 45, "title": "Random Arp Swing", "plugin": "Arpeggiator, Random", "trackReference": "Modular Synthesis Ambient", "description": "Use the Arpeggiator and map the 'Random' effect device to slightly modulate the Rate or Gate of the Arpeggiator for subtle timing variations." },
    { "id": 46, "title": "Simple Glue Compression", "plugin": "Glue Compressor", "trackReference": "Any 80s Drum Machine", "description": "Apply Glue Compressor to a drum loop with a fast attack and release and moderate ratio (4:1) to 'glue' the pieces together." },
    { "id": 47, "title": "Corpus Resonator FX", "plugin": "Corpus", "trackReference": "Sound effects in Sci-Fi Films", "description": "Load Corpus onto a simple noise burst and experiment with the 'Marimba' or 'Membrane' models to create synthetic impacts." },
    { "id": 48, "title": "LFO Controlled Unison Detune", "plugin": "Wavetable", "description": "Use Wavetable, enable Unison, and assign an LFO to slightly modulate the 'Detune' parameter for subtle, organic pitch variation." },
    { "id": 49, "title": "Vinyl Noise Floor", "plugin": "Vinyl Distortion, Utility", "description": "Use Vinyl Distortion to generate crackle and change the 'Poles' and 'Rec.' settings to simulate an old, damaged record." },
    { "id": 50, "title": "Reverb Freeze Texture", "plugin": "Reverb", "trackReference": "Ambient/Drone Music", "description": "Use a Reverb with a high Decay time and use the 'Freeze' button (or high feedback automation) to sustain an endless chord/texture." },
    { "id": 51, "title": "Multiband Dynamics Bass", "plugin": "Multiband Dynamics", "trackReference": "Modern Trap Music", "description": "Apply Multiband Dynamics to a bassline. Heavily compress the high band to tame fret noise, and lightly compress the low band for consistency." },
    { "id": 52, "title": "Granular Pad Texture", "plugin": "Granulator II (M4L), Reverb", "trackReference": "Tycho - Dive", "description": "Load a short vocal sample into Granulator II and manipulate the 'Grain Size' and 'Spray' to create a shifting, ethereal pad." },
    { "id": 53, "title": "Bit Crusher Drum Damage", "plugin": "Redux", "trackReference": "Chiptune/8-bit Music", "description": "Use Redux on a drum loop and reduce the 'Downsample' rate heavily to create an intentionally damaged, digital sound." },
    { "id": 54, "title": "Complex Wavetable Modulations", "plugin": "Wavetable, LFO/MIDI", "trackReference": "Neurofunk Drum & Bass", "description": "Use Wavetable, assign two different LFOs to modulate the 'Position' and 'Filter Cutoff' simultaneously for extreme timbral movement." },
    { "id": 55, "title": "Return Track FX Chain", "plugin": "Return Tracks, Delay, Reverb", "trackReference": "Dub Techno genre", "description": "Set up a track to send only the high-frequency content to a return track containing heavy Delay and Reverb." },
    { "id": 56, "title": "Frequency Shifter Sweeps", "plugin": "Frequency Shifter, LFO", "trackReference": "Shpongle - Are You Shpongled?", "description": "Use Frequency Shifter on a dry synth and modulate the 'Frequency' knob with a slow LFO for a continuously shifting metallic sweep." },
    { "id": 57, "title": "Saturator Mid-Range Focus", "plugin": "Saturator", "trackReference": "Hard Techno Kick Drums", "description": "Apply Saturator to a kick drum, focusing the drive only on the mid-range (around 100-250 Hz) for punch and loudness." },
    { "id": 58, "title": "Random Sampler Drum Hits", "plugin": "Simpler/Sampler", "trackReference": "Glitch Music", "description": "Load 4 different one-shot samples into Sampler and use a randomized LFO or routing to trigger the samples in an unpredictable order." },
    { "id": 59, "title": "Extreme Resonant Feedback", "plugin": "Filter Delay", "trackReference": "Modular Noise/Drone", "description": "Use Filter Delay, set one delay line to max feedback, and sweep its high-resonance filter to generate a loud, chaotic screech." },
    { "id": 60, "title": "FM Bassline with Filter Follow", "plugin": "Operator, Auto Filter", "description": "Create an FM bass. Use the 'Envelope Follower' on Auto Filter to open the filter based on the incoming bass volume." },
    { "id": 61, "title": "Drum Synth Tom Drum", "plugin": "Drum Synth", "trackReference": "80s New Wave/Synthpop", "description": "Use the 'Tom' setting in Drum Synth and adjust the pitch and decay envelopes to synthesize a classic 80s electronic tom sound." },
    { "id": 62, "title": "Stereo Mid-Side EQ", "plugin": "EQ Eight (Mid/Side Mode)", "trackReference": "Mastering Technique", "description": "Use EQ Eight in M/S mode to boost high frequencies only on the 'Side' channel to widen the hats/reverb without touching the kick/bass." },
    { "id": 63, "title": "Wavetable Growl Bass", "plugin": "Wavetable, LFO, Saturator", "trackReference": "Dubstep/Bass Music", "description": "Use Wavetable's sub-bass oscillator and modulate the filter cutoff aggressively with a complex LFO, then drive it with Saturator." },
    { "id": 64, "title": "Tension Riser (Reverse FX)", "plugin": "Reverb, Utility", "trackReference": "Film Score Transitions", "description": "Take a loud crash cymbal, bounce it, reverse it, then apply huge Reverb. This creates a reverse reverb riser effect." },
    { "id": 65, "title": "Complex Chorus Flanger Combo", "plugin": "Chorus-Ensemble, Flanger", "description": "Stack Chorus and Flanger on a lead sound and use slow, independent modulation rates to create a thick, detuned, moving sound." },
    { "id": 66, "title": "Subtle Vinyl Hiss Layer", "plugin": "Vinyl Distortion, Utility", "description": "Create only the hiss from Vinyl Distortion and route it to a separate track. Use Utility to blend it in very quietly beneath a track for atmosphere." },
    { "id": 67, "title": "Multiband Glue Compression", "plugin": "Multiband Dynamics (Expander)", "trackReference": "Aggressive Drum Bus Processing", "description": "Use Multiband Dynamics in 'Expander' mode on the top two frequency bands of a drum loop to accentuate transients and add snap." },
    { "id": 68, "title": "Grainy Stutter Edit", "plugin": "Beat Repeat", "trackReference": "Glitch Hop / EDM Fills", "description": "Apply Beat Repeat to a synth phrase and use the 'Grid' and 'Variation' settings to generate complex, rhythmic stutter edits." },
    { "id": 69, "title": "Corpus String Pluck", "plugin": "Corpus, Analog", "description": "Synthesize a simple pluck with Analog and then route it into Corpus, using the 'String' model to give it physical resonance." },
    { "id": 70, "title": "Randomized Delay Filter", "plugin": "Simple Delay, Random", "description": "Create a delay loop and map the 'Random' effect to slightly change the high-pass filter cutoff on the delayed signal only." },
    { "id": 71, "title": "FM Bell to Noise Sweep", "plugin": "Operator", "description": "Design a bright FM bell. Automate the volume of the bell down while simultaneously automating a high-pass filtered noise source up (noise tail)." },
    { "id": 72, "title": "Creative Phase Rotation", "plugin": "Utility (Phase)", "trackReference": "Psytrance Basslines", "description": "Use Utility to flip the phase (0°/180°) on a bassline at specific points to create intentional cancellation/reinforcement." },
    { "id": 73, "title": "Return Track Filtering", "plugin": "Return Tracks, Auto Filter", "description": "Set up a return track with a filter (100% wet). Send dry signal to it and automate the filter cutoff on the return to create selective delay/reverb filtering." },
    { "id": 74, "title": "Complex MIDI Envelope Shaping", "plugin": "MIDI Envelope Follower (M4L)", "description": "Use the MIDI Envelope Follower on a drum loop to generate MIDI data that then controls the volume of a completely separate synth track." },
    { "id": 75, "title": "Deep Space Ambience", "plugin": "Reverb, Delay, Saturator", "description": "Layer multiple Reverb and Delay effects on a white noise source. Use Saturator to drive the noise and create dark, resonant drone texture." },
    { "id": 76, "title": "Full Drum Kit Synthesis", "plugin": "Drum Synth (Multiple Instances)", "trackReference": "Early Industrial Music", "description": "Synthesize a full, distinct electronic drum kit (Kick, Snare, Hi-Hat, Tom) using only Drum Synth devices on separate MIDI tracks." },
    { "id": 77, "title": "Wavetable Resampling Layering", "plugin": "Wavetable, Sampler", "description": "Create a complex Wavetable sound, resample it, and load the sample into Sampler. Use Sampler's envelopes and filters for further processing." },
    { "id": 78, "title": "Advanced Sidechain Shaping", "plugin": "Glue Compressor (Sidechain), EQ Eight", "trackReference": "Progressive House", "description": "Sidechain a pad using Glue Compressor. Then, use EQ Eight on the pad after the compressor to boost the frequencies that are being dipped by the pump." },
    { "id": 79, "title": "Multi-Band Saturation Rack", "plugin": "Audio Effect Rack, Saturator (x3)", "description": "Build an Audio Effect Rack with 3 chains: Low, Mid, and High. Place a different instance of Saturator on each chain for multi-band distortion." },
    { "id": 80, "title": "Feedback Flanger Riser/Drop", "plugin": "Flanger, Utility", "trackReference": "EDM Build-ups", "description": "Set Flanger feedback to maximum (or use Utility gain before Flanger). Automate the 'Delay Time' drastically to create a loud pitch shift effect." },
    { "id": 81, "title": "Mastering Chain: Basic Limiting", "plugin": "Limiter", "trackReference": "Final Mix Preparation", "description": "Place Limiter on the Master Bus. Set the 'Ceiling' to -0.3 dB and increase the 'Gain' until the volume reaches commercial loudness without heavy pumping." },
    { "id": 82, "title": "Frequency-Dependent Delay", "plugin": "Filter Delay, Utility", "description": "Use Filter Delay to only process high-frequency content (e.g., 5kHz+) of a full chord, leaving the bass and mid-range dry." },
    { "id": 83, "title": "Operator Cross-Modulation FX", "plugin": "Operator (Algorithm 3 or 4)", "description": "Use Operator's complex algorithms to cross-modulate carriers and modulators (e.g., A modulating B and B modulating A) for chaotic soundscapes." },
    { "id": 84, "title": "Wavetable Follower Modulation", "plugin": "Wavetable, Envelope Follower (M4L)", "description": "Use Envelope Follower on a drum loop to extract the volume envelope, then use that envelope to modulate Wavetable's wavetable position." },
    { "id": 85, "title": "Transient Shaping with Drum Bus", "plugin": "Drum Bus, Utility", "description": "Apply Drum Bus to a dull percussion hit. Focus on the 'Transient' parameter to increase the initial snap without increasing the sustain." },
    { "id": 86, "title": "Creative Bit/Sample Reduction", "plugin": "Redux", "trackReference": "Gritty Lo-fi Sound", "description": "Use Redux and automate both the 'Bit Reduction' and 'Downsample' parameters simultaneously on a sustained synth pad." },
    { "id": 87, "title": "Multi-Tempo Delay FX", "plugin": "Echo", "description": "Set Echo to a rhythmic time (e.g., dotted 1/8th) and use a subtle LFO to gently modulate the rate for a 'wobbly' tempo feel." },
    { "id": 88, "title": "Dynamic Stereo Bus Comp", "plugin": "Glue Compressor", "trackReference": "Mixing Console Technique", "description": "Apply Glue Compressor to a group of instruments (e.g., all synths) with a gentle ratio (2:1) and slow attack/fast release for subtle cohesion." },
    { "id": 89, "title": "Advanced Phaser/Flanger Stereo Trick", "plugin": "Phaser/Flanger", "description": "Set the 'Spin' or 'Stereo' parameter on Phaser/Flanger very high to create extremely wide, asymmetrical movement between the channels." },
    { "id": 90, "title": "MIDI Control Rack", "plugin": "Audio Effect Rack, Macro Controls", "description": "Build a rack containing an EQ, a Saturator, and a Delay. Map one Macro to simultaneously control the EQ Hi-Cut and the Saturator Drive." },
    { "id": 91, "title": "Complex Reverb/Delay Feedback Loop", "plugin": "Reverb, Delay, Utility", "description": "Route a Delay's output back into a Reverb's input, and then route the Reverb's output back to the Delay's input (on a return track)." },
    { "id": 92, "title": "Mute/Solo Drum Rack Mapping", "plugin": "Drum Rack, Chain Selector", "description": "Create a Drum Rack with multiple drum kits on separate chains. Map one Macro knob to select (Mute/Solo) between the different kits." },
    { "id": 93, "title": "FM Kick/Snare Layering", "plugin": "Operator (x2)", "description": "Design a deep kick drum in one Operator instance and a transient-rich snare/clap sound in a second instance. Layer them perfectly." },
    { "id": 94, "title": "Extreme Mid-Side Dynamics", "plugin": "Multiband Dynamics (M/S Mode)", "description": "Use Multiband Dynamics in M/S mode to heavily compress the Mid channel below 150 Hz, and heavily expand the Side channel above 5 kHz." },
    { "id": 95, "title": "Chorus-Ensemble Detune FX", "plugin": "Chorus-Ensemble", "description": "Use the Chorus-Ensemble in its 'Vibrato' or 'Chorus' modes with extreme modulation depth and high frequency for a wild, detuned lead." },
    { "id": 96, "title": "Analog Wavetable Combination", "plugin": "Analog, Wavetable (x2)", "description": "Layer a warm square wave from Analog with a gritty, filtered Wavetable sound. Use Utility to balance their levels and phase." },
    { "id": 97, "title": "Mastering Chain: Stereo Widening", "plugin": "Utility, Multiband Dynamics", "description": "Use Utility to widen the overall stereo image, but use Multiband Dynamics in M/S mode to ensure low frequencies remain mono." },
    { "id": 98, "title": "Drum Synth Layered Snare", "plugin": "Drum Synth (Clap + Snare)", "description": "Use two instances of Drum Synth—one set to 'Clap' and one set to 'Snare'—and process them individually before routing them to a single bus." },
    { "id": 99, "title": "Chaos Modulation Rack", "plugin": "Audio Effect Rack, Random, LFO", "description": "Create a rack where a Random effect is mapped to control an LFO rate, and the LFO is mapped to control the filter cutoff. Introduce controlled chaos." },
    { "id": 100, "title": "Personal Synthesis Masterpiece", "plugin": "Any Stock Plugin Combination", "trackReference": "Your Future Signature Sound", "description": "Design an entirely new, complex sound (bass, lead, or FX) using concepts learned throughout the 99 previous days. This is your signature sound." }
];

let CHALLENGES = [];

// --- DOM Elements ---
const dayCounterEl = document.getElementById('current-day');
const currentDayStatEl = document.getElementById('current-day-stat');
const remainingDaysStatEl = document.getElementById('remaining-days-stat');
const streakStatEl = document.getElementById('streak-stat');
const progressBarEl = document.getElementById('progress-bar');
const streakDisplayEl = document.getElementById('streak-display');
const challengeTitleEl = document.getElementById('challenge-title');
const pluginFocusEl = document.getElementById('plugin-focus');
const trackReferenceEl = document.getElementById('track-reference');
const challengeDescriptionEl = document.getElementById('challenge-description');
const markCompleteBtn = document.getElementById('mark-complete-btn');
const timeRemainingMessageEl = document.getElementById('time-remaining-message');
const reflectionFormModal = document.getElementById('reflection-form-modal');
const reflectionForm = document.getElementById('reflection-form');
const allTasksModal = document.getElementById('all-tasks-modal');
const taskListContainer = document.getElementById('task-list-container');
const viewAllTasksBtn = document.getElementById('view-all-tasks-btn');
const viewAllTasksBtnSidebar = document.getElementById('view-all-tasks-btn-sidebar');
const beginChallengeBtn = document.getElementById('begin-challenge-btn');
const beginChallengeModal = document.getElementById('begin-challenge-modal');
const beginChallengeForm = document.getElementById('begin-challenge-form');
const startDateInput = document.getElementById('start-date-input');
const notStartedPanel = document.getElementById('not-started-panel');
const startedDashboard = document.getElementById('started-dashboard');
const analyticsDashboard = document.getElementById('analytics-dashboard'); // New
const profileNameEl = document.getElementById('profile-name');
const challengeStartDateEl = document.getElementById('challenge-start-date');
const displayUserNameEl = document.getElementById('display-user-name');
const resetChallengeBtn = document.getElementById('reset-challenge-btn');
const resetConfirmationModal = document.getElementById('reset-confirmation-modal');
const confirmResetBtn = document.getElementById('confirm-reset-btn');

// Nav Elements - New
const navDashboardBtn = document.getElementById('nav-dashboard-btn');
const navAnalyticsBtn = document.getElementById('nav-analytics-btn');

// Analytics Elements - New
const analyticsCompletionRateExp = document.getElementById('analytics-completion-rate');
const analyticsAvgDifficultyExp = document.getElementById('analytics-avg-difficulty');
const analyticsTotalLearnedExp = document.getElementById('analytics-total-learned');
const difficultyChartContainer = document.getElementById('difficulty-chart');
const recentInsightsList = document.getElementById('recent-insights-list');


// New Elements
const themeCheckbox = document.getElementById('checkbox');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
const difficultyDisplayVal = document.getElementById('difficulty-val');
const audioFileInput = document.getElementById('audio-file-input');
const fileUploadName = document.getElementById('file-upload-name');

// --- STATE MANAGEMENT ---
let state = JSON.parse(localStorage.getItem('challengeState')) || {
    challengeStarted: false,
    userName: 'GUEST',
    startDate: null,
    completedTasks: {},
    currentChallengeId: 1,
    lastCompletionTime: 0,
    currentStreak: 0,
    missesRemaining: 1,
    theme: 'light'
};

let timerInterval;

function saveState() {
    localStorage.setItem('challengeState', JSON.stringify(state));
}

function getChallengeById(id) {
    return CHALLENGES.find(c => c.id === id);
}

// --- Theme Logic ---
function initTheme() {
    const currentTheme = state.theme || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        if (themeCheckbox) themeCheckbox.checked = true;
    }
}

if (themeCheckbox) {
    themeCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            state.theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            state.theme = 'light';
        }
        saveState();
    });
}

// --- Analytics Logic ---
function updateAnalyticsView() {
    if (!analyticsDashboard) return;

    const completedIds = Object.keys(state.completedTasks);
    const totalCompleted = completedIds.length;

    // 1. Completion Rate
    const rate = ((totalCompleted / TOTAL_DAYS) * 100).toFixed(1);
    if (analyticsCompletionRateExp) analyticsCompletionRateExp.textContent = `${rate}%`;

    // 2. Avg Difficulty & Distribution
    let totalDifficulty = 0;
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // 3. Learned Techniques List
    let insights = [];

    completedIds.forEach(id => {
        const task = state.completedTasks[id];
        const diff = parseInt(task.difficulty) || 3;
        totalDifficulty += diff;
        if (distribution[diff] !== undefined) distribution[diff]++;

        if (task.newTechnique) {
            insights.push({ id: id, text: task.newTechnique, date: task.completionTime });
        }
    });

    // Calc Avg
    const avgDiff = totalCompleted > 0 ? (totalDifficulty / totalCompleted).toFixed(1) : "0.0";
    if (analyticsAvgDifficultyExp) analyticsAvgDifficultyExp.textContent = avgDiff;
    if (analyticsTotalLearnedExp) analyticsTotalLearnedExp.textContent = insights.length; // Count of entries with text

    // Render Chart
    if (difficultyChartContainer) {
        difficultyChartContainer.innerHTML = '';
        const maxCount = Math.max(...Object.values(distribution), 1); // Avoid div by zero

        for (let i = 1; i <= 5; i++) {
            const count = distribution[i];
            const heightPct = (count / maxCount) * 100;

            const col = document.createElement('div');
            col.className = 'chart-column';
            col.innerHTML = `
            <div class="chart-value">${count}</div>
            <div class="chart-bar" style="height: ${heightPct}%;"></div>
            <div class="chart-label">${i}</div>
        `;
            difficultyChartContainer.appendChild(col);
        }
    }


    // Render Insights (Last 5 reversed)
    if (recentInsightsList) {
        recentInsightsList.innerHTML = '';
        const recent = insights.sort((a, b) => b.date - a.date).slice(0, 10);

        if (recent.length === 0) {
            recentInsightsList.innerHTML = '<div style="color: var(--color-text-muted); font-size: 13px; font-style: italic;">No data yet. Complete daily tasks to fill this.</div>';
        } else {
            recent.forEach(item => {
                const div = document.createElement('div');
                div.className = 'insight-item';
                div.innerHTML = `
                <div style="font-size: 11px; color: var(--color-primary); font-weight: 700;">DAY ${item.id}</div>
                <div style="font-size: 13px; color: var(--color-text-main);">${item.text}</div>
            `;
                recentInsightsList.appendChild(div);
            });
        }
    }
}


// --- Core UI Update Functions ---
function updateProgress() {
    const completedCount = Object.keys(state.completedTasks).length;

    if (dayCounterEl) dayCounterEl.textContent = completedCount;
    if (currentDayStatEl) currentDayStatEl.textContent = completedCount;
    if (remainingDaysStatEl) remainingDaysStatEl.textContent = TOTAL_DAYS - completedCount;
    if (streakStatEl) streakStatEl.textContent = state.currentStreak;

    const progressPercentage = (completedCount / TOTAL_DAYS) * 100;
    if (progressBarEl) progressBarEl.style.width = `${progressPercentage}%`;

    const skipText = state.missesRemaining === 1 ? '1 Skip Remaining' : (state.missesRemaining === 0 ? 'No Skips Remaining' : `${state.missesRemaining} Skips Remaining`);
    if (streakDisplayEl) streakDisplayEl.innerHTML = `${state.currentStreak} Day Streak <span style="font-size:12px; display:block; color:#888; font-weight:normal;">${skipText}</span>`;

    if (profileNameEl) profileNameEl.textContent = `${state.userName}`;
    if (challengeStartDateEl) challengeStartDateEl.textContent = `Started: ${state.startDate ? new Date(state.startDate).toLocaleDateString() : '--'}`;
    if (displayUserNameEl) displayUserNameEl.textContent = state.userName;
}

function loadChallenge() {
    if (!state.challengeStarted || CHALLENGES.length === 0) return;

    const challenge = getChallengeById(state.currentChallengeId);

    if (!challenge) {
        // All 100 days are complete
        if (challengeTitleEl) challengeTitleEl.textContent = "🏆 Challenge Complete!";
        if (challengeDescriptionEl) challengeDescriptionEl.textContent = "You've finished the 100-Day Sound Design Challenge! Great work.";
        if (markCompleteBtn) markCompleteBtn.style.display = 'none';
        clearInterval(timerInterval);
        return;
    }

    // Display Logic for Current Challenge
    if (challengeTitleEl) challengeTitleEl.textContent = `Day ${challenge.id}: ${challenge.title}`;
    if (pluginFocusEl) pluginFocusEl.textContent = challenge.plugin;
    if (trackReferenceEl) trackReferenceEl.textContent = challenge.trackReference;
    if (challengeDescriptionEl) challengeDescriptionEl.textContent = challenge.description;

    // Lockout Logic Check
    const isCompleted = state.completedTasks.hasOwnProperty(challenge.id);
    const canWork = isCompleted || canStartNewTask();

    if (markCompleteBtn) {
        markCompleteBtn.disabled = !canWork || isCompleted;
        markCompleteBtn.textContent = isCompleted ? 'Day Completed' : 'Mark Day Complete';
        markCompleteBtn.style.display = 'block';
    }

    if (!canWork && !isCompleted) {
        startLockoutTimer();
    } else {
        clearInterval(timerInterval);
        if (timeRemainingMessageEl) timeRemainingMessageEl.style.display = 'none';
    }
}

function canStartNewTask() {
    if (state.currentChallengeId === 1 && Object.keys(state.completedTasks).length === 0) {
        return true; // Always allow starting Day 1
    }
    const timeElapsed = Date.now() - state.lastCompletionTime;
    return timeElapsed >= TIME_LIMIT_MS;
}

function startLockoutTimer() {
    if (timeRemainingMessageEl) timeRemainingMessageEl.style.display = 'block';
    clearInterval(timerInterval);

    const updateTimer = () => {
        const requiredTime = state.lastCompletionTime + TIME_LIMIT_MS;
        const remainingTime = requiredTime - Date.now();

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            if (timeRemainingMessageEl) timeRemainingMessageEl.style.display = 'none';
            if (markCompleteBtn) {
                markCompleteBtn.disabled = false;
                markCompleteBtn.textContent = 'Mark Day Complete';
            }
            loadChallenge();
        } else {
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            if (timeRemainingMessageEl) timeRemainingMessageEl.textContent = `Next task available in: ${hours}h ${minutes}m ${seconds}s`;
            if (markCompleteBtn) {
                markCompleteBtn.disabled = true;
                markCompleteBtn.textContent = 'Locked';
            }
        }
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateStreak() {
    const timeSinceLastCompletion = Date.now() - state.lastCompletionTime;
    const completionWindow = TIME_LIMIT_MS; // 24 hours
    const skipWindow = TIME_LIMIT_MS * 2; // 48 hours

    if (state.lastCompletionTime === 0) {
        state.currentStreak = 1;
    } else if (timeSinceLastCompletion < completionWindow) {
        state.currentStreak++;
    } else if (timeSinceLastCompletion < skipWindow) {
        if (state.missesRemaining > 0) {
            state.missesRemaining--;
            state.currentStreak++;
        } else {
            state.currentStreak = 1;
            state.missesRemaining = 1;
        }
    } else {
        state.currentStreak = 1;
        state.missesRemaining = 1;
    }

    state.lastCompletionTime = Date.now();
    updateProgress();
    saveState();
}

function renderTaskList() {
    if (!taskListContainer) return;
    taskListContainer.innerHTML = '';

    CHALLENGES.forEach(challenge => {
        const isCompleted = state.completedTasks.hasOwnProperty(challenge.id);
        const isCurrent = challenge.id === state.currentChallengeId;

        const taskDiv = document.createElement('div');
        taskDiv.style.cssText = "padding: 15px; border-bottom: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 5px; color: var(--color-text-main);";

        let statusColor = '#999';
        let statusText = 'Pending';
        if (isCompleted) {
            statusColor = 'var(--color-success)';
            statusText = 'Completed';
        }
        if (isCurrent) {
            statusColor = 'var(--color-primary)';
            statusText = 'Current';
        }

        taskDiv.style.borderLeft = `4px solid ${statusColor}`;
        taskDiv.style.backgroundColor = isCurrent ? 'rgba(74, 108, 247, 0.05)' : 'transparent';

        let reflectionHtml = '';
        if (isCompleted) {
            const data = state.completedTasks[challenge.id];
            // Format completion data
            reflectionHtml = `
                <div style="margin-top: 10px; font-size: 13px; color: var(--color-text-muted); background: var(--color-input-bg); padding: 10px; border-radius: 8px;">
                    <div style="font-weight: 600; color: ${statusColor}; margin-bottom: 5px;">✓ ${statusText}</div>
                    <div><strong>Learned:</strong> ${data.newTechnique}</div>
                    ${data.audioFile ? `<div style="margin-top:5px;">🎵 <strong>Saved:</strong> ${data.audioFile}</div>` : ''}
                </div>
            `;
        }

        const isLocked = !isCompleted && !isCurrent;
        const titleDisplay = isLocked
            ? `Day ${challenge.id}: <span style="filter: blur(4px); opacity: 0.6; user-select: none;">${challenge.title}</span>`
            : `Day ${challenge.id}: ${challenge.title}`;

        taskDiv.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items: flex-start;">
                <span style="font-weight: 700;">${titleDisplay}</span>
                <span style="font-size: 12px; color: ${statusColor}; font-weight: 600; white-space: nowrap; margin-left: 10px;">${statusText}</span>
            </div>
            <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 4px;">${challenge.plugin}</div>
            ${reflectionHtml}
        `;

        taskListContainer.appendChild(taskDiv);
    });
}

function updateDashboardView() {
    if (state.challengeStarted) {
        if (notStartedPanel) notStartedPanel.style.display = 'none';

        // Show Dashboard by default unless specifically on Analytics (handled by listeners)
        // But for initial load, let's stick to Dashboard
        toggleSection('dashboard');

        loadChallenge();
    } else {
        if (notStartedPanel) notStartedPanel.style.display = 'block';
        if (startedDashboard) startedDashboard.style.display = 'none';
        if (analyticsDashboard) analyticsDashboard.style.display = 'none';
    }
    updateProgress();
    initTheme();
}

// Mobile Nav Elements
const mobileNavDashboardBtn = document.getElementById('mobile-nav-dashboard-btn');
const mobileNavAnalyticsBtn = document.getElementById('mobile-nav-analytics-btn');
const mobileNavTasksBtn = document.getElementById('mobile-nav-tasks-btn');

function toggleSection(sectionName) {
    if (sectionName === 'dashboard') {
        if (startedDashboard) startedDashboard.style.display = 'grid';
        if (analyticsDashboard) analyticsDashboard.style.display = 'none';

        if (navDashboardBtn) navDashboardBtn.classList.add('active');
        if (navAnalyticsBtn) navAnalyticsBtn.classList.remove('active');

        // Mobile Sync
        if (mobileNavDashboardBtn) mobileNavDashboardBtn.classList.add('active');
        if (mobileNavAnalyticsBtn) mobileNavAnalyticsBtn.classList.remove('active');

    } else if (sectionName === 'analytics') {
        if (startedDashboard) startedDashboard.style.display = 'none';
        if (analyticsDashboard) analyticsDashboard.style.display = 'grid';

        if (navDashboardBtn) navDashboardBtn.classList.remove('active');
        if (navAnalyticsBtn) navAnalyticsBtn.classList.add('active');

        // Mobile Sync
        if (mobileNavDashboardBtn) mobileNavDashboardBtn.classList.remove('active');
        if (mobileNavAnalyticsBtn) mobileNavAnalyticsBtn.classList.add('active');

        updateAnalyticsView();
    }
}

if (mobileNavDashboardBtn) {
    mobileNavDashboardBtn.addEventListener('click', () => toggleSection('dashboard'));
}

if (mobileNavAnalyticsBtn) {
    mobileNavAnalyticsBtn.addEventListener('click', () => toggleSection('analytics'));
}

if (mobileNavTasksBtn) {
    mobileNavTasksBtn.addEventListener('click', viewTasksHandler);
}

// --- INITIALIZATION ---
async function initApp() {
    // 1. Initialize Theme
    initTheme();

    // 2. Try to fetch external data, fallback if it fails (likely due to CORS/file://)
    try {
        const response = await fetch('challenges.json');
        if (!response.ok) throw new Error('Failed to load challenges');

        CHALLENGES = await response.json();
        console.log("Challenges loaded via Access ID: Network");

    } catch (error) {
        console.warn("Could not fetch remote JSON (likely offline or file:// protocol). Using Fallback Data.");
        CHALLENGES = FALLBACK_CHALLENGES;
    }

    // 3. Render
    updateDashboardView();

    // 4. Onboarding
    if (typeof initOnboarding === 'function') initOnboarding();
}

// --- EVENT HANDLERS ---
if (navDashboardBtn) {
    navDashboardBtn.addEventListener('click', () => toggleSection('dashboard'));
}

if (navAnalyticsBtn) {
    navAnalyticsBtn.addEventListener('click', () => toggleSection('analytics'));
}

// --- EVENT HANDLERS ---
if (beginChallengeBtn) {
    beginChallengeBtn.addEventListener('click', () => {
        if (startDateInput) startDateInput.value = new Date().toISOString().split('T')[0];
        if (beginChallengeModal) beginChallengeModal.style.display = 'flex';
    });
}

if (beginChallengeForm) {
    beginChallengeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        state.userName = document.getElementById('user-name-input').value;
        state.startDate = startDateInput.value;
        state.challengeStarted = true;
        state.completedTasks = {};
        state.currentChallengeId = 1;
        state.lastCompletionTime = 0;
        state.currentStreak = 0;
        state.missesRemaining = 1;
        saveState();
        if (beginChallengeModal) beginChallengeModal.style.display = 'none';
        updateDashboardView();
    });
}

if (markCompleteBtn) {
    markCompleteBtn.addEventListener('click', () => {
        if (reflectionForm) reflectionForm.reset();

        // Reset file input text
        if (fileUploadName) fileUploadName.textContent = "Click to upload your creation";

        // Reset difficulty display
        if (difficultyDisplayVal) difficultyDisplayVal.textContent = '3';

        document.getElementById('modal-day-num').textContent = state.currentChallengeId;
        if (reflectionFormModal) reflectionFormModal.style.display = 'flex';
    });
}

// File Upload Listener
if (audioFileInput) {
    audioFileInput.addEventListener('change', function (e) {
        if (this.files && this.files.length > 0) {
            const file = this.files[0];
            if (fileUploadName) {
                fileUploadName.textContent = `Selected: ${file.name}`;
                fileUploadName.style.color = 'var(--color-primary)';
            }
        }
    });
}

// Difficulty Radio Listener
if (difficultyRadios) {
    difficultyRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (difficultyDisplayVal) difficultyDisplayVal.textContent = e.target.value;
        });
    });
}

if (reflectionForm) {
    reflectionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const challengeId = state.currentChallengeId;

        // Get Radio Value
        const difficulty = document.querySelector('input[name="difficulty"]:checked')?.value || "3";

        // Get File Info (Mock Save)
        let audioFileName = "";
        const fileInput = document.getElementById('audio-file-input');
        if (fileInput && fileInput.files.length > 0) {
            audioFileName = fileInput.files[0].name; // We store the name as a reference
            // Note: In a real app we would upload this to a server or indexedDB
        }

        const reflectionData = {
            difficulty: difficulty,
            newTechnique: document.getElementById('new-technique').value,
            reflectionNotes: document.getElementById('reflection-notes').value,
            audioFile: audioFileName,
            completionTime: Date.now(),
        };

        updateStreak();
        state.completedTasks[challengeId] = reflectionData;
        if (challengeId < TOTAL_DAYS) {
            state.currentChallengeId++;
        }

        saveState();
        loadChallenge();
        updateProgress();
        if (reflectionFormModal) reflectionFormModal.style.display = 'none';
        reflectionForm.reset();
    });
}

// Standard Reset & View Handlers
if (resetChallengeBtn) {
    resetChallengeBtn.addEventListener('click', () => {
        if (resetConfirmationModal) resetConfirmationModal.style.display = 'flex';
    });
}

if (confirmResetBtn) {
    confirmResetBtn.addEventListener('click', () => {
        localStorage.removeItem('challengeState');
        // Reset state but keep theme
        const currentTheme = state.theme;
        state = {
            challengeStarted: false,
            userName: 'GUEST',
            startDate: null,
            completedTasks: {},
            currentChallengeId: 1,
            lastCompletionTime: 0,
            currentStreak: 0,
            missesRemaining: 1,
            theme: currentTheme
        };
        clearInterval(timerInterval);
        if (resetConfirmationModal) resetConfirmationModal.style.display = 'none';
        updateDashboardView();
    });
}

function viewTasksHandler() {
    renderTaskList();
    if (allTasksModal) allTasksModal.style.display = 'flex';
}

if (viewAllTasksBtn) viewAllTasksBtn.addEventListener('click', viewTasksHandler);
if (viewAllTasksBtnSidebar) viewAllTasksBtnSidebar.addEventListener('click', viewTasksHandler);


// Modal Close Button Global Handler
const closeBtns = document.querySelectorAll('.close-modal-btn');
closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Find closest modal parent
        const modal = e.target.closest('.nb-modal-backdrop');
        if (modal) modal.style.display = 'none';
    });
});

// --- Onboarding Logic ---
const onboardingModal = document.getElementById('onboarding-modal');
const onboardingSteps = document.querySelectorAll('.onboarding-step');
const stepDots = document.querySelectorAll('.step-dot');
const onboardingNextBtn = document.getElementById('onboarding-next-btn');
const onboardingSkipBtn = document.getElementById('onboarding-skip-btn');
const dontShowCheckbox = document.getElementById('dont-show-onboarding');

let currentStep = 1;
const totalSteps = 3;

function initOnboarding() {
    if (localStorage.getItem('hideOnboarding') === 'true') {
        return;
    }
    // Show Modal
    if (onboardingModal) onboardingModal.style.display = 'flex';
    updateOnboardingStep();
}

function updateOnboardingStep() {
    // Show/Hide Steps
    onboardingSteps.forEach(step => {
        if (step.dataset.step == currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update Dots
    stepDots.forEach(dot => {
        if (dot.dataset.dot == currentStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Update Button Text
    if (currentStep === totalSteps) {
        onboardingNextBtn.textContent = "Let's Go!";
        onboardingNextBtn.classList.add('btn-success'); // Optional visual cue
    } else {
        onboardingNextBtn.textContent = "Next";
        onboardingNextBtn.classList.remove('btn-success');
    }
}

function closeOnboarding() {
    if (onboardingModal) onboardingModal.style.display = 'none';
    if (dontShowCheckbox && dontShowCheckbox.checked) {
        localStorage.setItem('hideOnboarding', 'true');
    }
}

if (onboardingNextBtn) {
    onboardingNextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateOnboardingStep();
        } else {
            closeOnboarding();
        }
    });
}

if (onboardingSkipBtn) {
    onboardingSkipBtn.addEventListener('click', closeOnboarding);
}

// Start
document.addEventListener('DOMContentLoaded', initApp);
