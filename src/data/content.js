/**
 * ---------------------------------------------------------------------------
 * PAGE COPY / STRUCTURED CONTENT
 * ---------------------------------------------------------------------------
 * Everything the studio itself provided is kept word-for-word (see
 * `aboutIntro` — marked as mandatory). Service descriptions describe the work
 * a recording studio actually does; no prices, gear models, awards or client
 * names have been invented anywhere.
 */

/**
 * ⚠️ MANDATORY COPY — supplied by the studio. Do not paraphrase.
 */
export const aboutIntro = [
  "Welcome to VM Music Factory, a state-of-the-art recording studio where music magic happens. As a seasoned Music Director and producer, I help artists bring their creative vision to life. From recording and editing to mixing and mastering, I offer top-notch music production services to ensure your music sounds its best. Let's create something amazing together!",
];

/** Short supporting copy (safe, non-fabricated studio facts). */
export const aboutSupporting = [
  'VM Music Factory is a recording studio in Bengaluru, Karnataka, working across film songs, dubbing, background score, karaoke and complete music production. Sessions are led hands-on by a working music director and sound engineer, so you are never left guessing what happens behind the glass.',
  'The studio sits in RR Nagar — easy to reach from across south-west Bengaluru — and it stays open 24 hours, seven days a week, because the best takes rarely respect office hours.',
];

/** What the studio does, in the order it usually appears on a project. */
export const services = [
  {
    id: 'song-recording',
    title: 'Song & Vocal Recording',
    icon: 'mic',
    description:
      'Track lead vocals, harmonies and backing vocals in a treated room with a sound engineer on the desk — then listen back on real studio monitors before you commit.',
    bullets: [
      'Lead, harmony and chorus vocal recording',
      'Live instruments and multi-track sessions',
      'Rough mix on the same day so you leave with something to hear',
    ],
  },
  {
    id: 'film-dubbing',
    title: 'Film & TV Dubbing',
    icon: 'sliders',
    description:
      'Dialogue dubbing, sync-to-picture and voice-over recording for films, series and shorts — with careful attention to lip sync, ambience matching and clean noise floors.',
    bullets: [
      'Character dubbing and re-recording',
      'Sync-to-picture with reference video',
      'Voice-over, narration and audiobook recording',
    ],
  },
  {
    id: 'karaoke',
    title: 'Karaoke Sessions',
    icon: 'music',
    description:
      'Sing your favourites with studio-quality sound. Perfect for birthdays, get-togethers, practice, or a first taste of what it feels like to record in a real studio.',
    bullets: [
      'Studio microphones and headphones for every singer',
      'Solo jamming or group sessions with friends and family',
      'Record your performance if you want to keep it',
    ],
  },
  {
    id: 'background-score',
    title: 'Background Score & Film Music',
    icon: 'disc',
    description:
      'Original background score and film music programmed and produced to picture — from theme ideas and cues to the final mixed stem.',
    bullets: [
      'Theme, cue and montage scoring',
      'Programming, arrangements and virtual instruments',
      'Score delivered to picture with clean stems',
    ],
  },
  {
    id: 'music-production',
    title: 'Music Production',
    icon: 'sparkles',
    description:
      'End-to-end production: taking an idea, a scratch melody or a full composition and building it into a finished, release-ready song — arrangement, tracking, editing and production.',
    bullets: [
      'Arrangement and production direction',
      'Session players and programming',
      'Complete song builds from scratch',
    ],
  },
  {
    id: 'mixing-mastering',
    title: 'Mixing & Mastering',
    icon: 'headphones',
    description:
      'Balance, depth and polish. Your multitrack is mixed for clarity on every playback system, then mastered for streaming, broadcast or film.',
    bullets: [
      'Stem and multitrack mixing',
      'Mastering for streaming, YouTube and broadcast',
      'Revisions handled over WhatsApp for quick turnarounds',
    ],
  },
  {
    id: 'jingle-ad-audio',
    title: 'Jingles, Ads & Brand Audio',
    icon: 'award',
    description:
      'Radio spots, ad films, corporate videos and brand audio — composed, recorded and delivered with the timing that commercial formats demand.',
    bullets: [
      'Composing and arranging brand audio',
      'Voice casting and recording',
      'Delivery in broadcast-ready formats',
    ],
  },
  {
    id: 'editing-cleanup',
    title: 'Editing, Restoration & Cleanup',
    icon: 'sliders',
    description:
      'Tightening takes, tuning, timing correction, noise reduction and dialogue cleanup — the unglamorous work that makes a recording sound professional.',
    bullets: [
      'Comping and pitch/time correction',
      'Noise reduction and hum removal',
      'Dialogue and interview cleanup',
    ],
  },
];

/** Reasons to choose the studio — all directly true from the listing + reviews. */
export const features = [
  {
    icon: 'clock',
    title: 'Open 24 hours, all 7 days',
    text: 'Record at midnight or 6 a.m. if that is when the magic happens — the studio is available around the clock.',
  },
  {
    icon: 'mic',
    title: 'Acoustically treated rooms',
    text: 'Clients specifically mention the acoustic room for dubbing and audio production — clean takes, no boxy sound.',
  },
  {
    icon: 'users',
    title: 'Hands-on music director',
    text: 'Sessions are guided by a working music director and producer who has scored for Kannada film projects.',
  },
  {
    icon: 'sliders',
    title: 'Recording to master, one roof',
    text: 'Recording, editing, mixing and mastering happen here — no coordinating between three different studios.',
  },
  {
    icon: 'map-pin',
    title: 'Easy to reach in RR Nagar',
    text: 'Located in RR Nagar, Bengaluru — convenient for south-west Bengaluru and reachable from across the city.',
  },
  {
    icon: 'headphones',
    title: 'Friendly to first-timers',
    text: 'Several reviewers recorded in a studio for the first time here. You will be guided through every step.',
  },
];

/** How a project runs, from first message to final master. */
export const process = [
  {
    title: 'Reach out',
    text: 'Call or WhatsApp +91 95133 45544 with what you need — a song, a dubbing date or a karaoke evening.',
  },
  {
    title: 'Plan the session',
    text: 'We confirm the room, the time and the deliverable. Bring your reference tracks or scratch recordings.',
  },
  {
    title: 'Record',
    text: 'Vocals, instruments or dialogue are tracked with an engineer on the desk and monitored properly throughout.',
  },
  {
    title: 'Mix, master, deliver',
    text: 'Editing, mixing and mastering follow, and your finished files are delivered ready for release.',
  },
];

/** Home-page FAQ — answers are factual and mirror the content on the page. */
export const faqs = [
  {
    question: 'Where is VM Music Factory located?',
    answer:
      'VM Music Factory is a recording studio in RR Nagar, Bengaluru, Karnataka (India). Open the Google Maps link on this page for turn-by-turn directions, or call +91 95133 45544 if you need help finding the studio.',
  },
  {
    question: 'What are the studio timings?',
    answer:
      'The studio is open 24 hours a day, Monday through Sunday. Sessions can be booked through the day or through the night, subject to availability.',
  },
  {
    question: 'How do I book a recording session?',
    answer:
      'The fastest way is WhatsApp or a phone call to +91 95133 45544. Tell us what you want to record, how long you think you need, and the language or genre — we will confirm the slot and guide you from there.',
  },
  {
    question: 'What services does the studio offer?',
    answer:
      'Song and vocal recording, film and TV dubbing, voice-over and narration, karaoke sessions, background score and film music, complete music production, mixing and mastering, jingle and brand audio, plus editing and audio cleanup.',
  },
  {
    question: 'Can I come for karaoke even if I have never recorded before?',
    answer:
      'Absolutely. Karaoke sessions are open to everyone — studio microphones, headphones and an engineer to make you sound good, whether you are practising or celebrating with a group.',
  },
  {
    question: 'Do you handle film dubbing projects?',
    answer:
      'Yes. Dubbing and re-recording work is a core part of the studio, including sync-to-picture dialogue, character dubbing and voice-over. Share your project details on WhatsApp and we will plan the session around your timeline.',
  },
  {
    question: 'Do you mix and master songs recorded elsewhere?',
    answer:
      'Yes. If your song was tracked elsewhere, the studio can take your multitrack or stems and handle editing, mixing and mastering, including revisions, so the final release sounds consistent across platforms.',
  },
  {
    question: 'How much does a session cost?',
    answer:
      'Studio charges depend on what you are recording, how many hours you need and whether mixing or mastering is included. Send your requirement to +91 95133 45544 on WhatsApp and you will get a clear quote before the session is confirmed.',
  },
];

/** Section-level copy reused across pages (keeps wording consistent). */
export const sectionCopy = {
  gallery: {
    eyebrow: 'Gallery',
    title: 'Inside VM Music Factory',
    lede: 'Twenty slots, two sections — the rooms, the sessions and the work. Photos from the studio are added here as the studio supplies them; nothing on this page is stock imagery.',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'What clients say on Google',
    lede: 'Every review below is a real review from the VM Music Factory Google Business Profile, reproduced word for word with the exact star rating the reviewer gave.',
  },
  services: {
    eyebrow: 'Services',
    title: 'Everything a song needs, under one roof',
    lede: 'Recording, dubbing, karaoke, scoring, mixing and mastering — book only the part of the process you need, or let us take the project from first idea to final master.',
  },
};

export default services;
