/**
 * ---------------------------------------------------------------------------
 * GOOGLE REVIEWS — VERBATIM
 * ---------------------------------------------------------------------------
 * These are the real reviews published on the VM Music Factory Google Business
 * Profile. Text, reviewer names, reviewer badges, relative dates and star
 * ratings have been reproduced exactly as they appear on Google.
 *
 * ⚠️  NOTHING IS INVENTED HERE.
 *   • Do not add reviews that were not left by a real customer.
 *   • Do not change a star rating — `rating` is the actual number of stars
 *     shown on the review, and it is also what the star row renders.
 *   • Two reviews are cut off by Google itself; they keep the "…" marker and
 *     are never completed with words the reviewer never wrote.
 *
 * `rating`        → actual number of stars given by the reviewer
 * `relativeDate`  → the "x years ago" label Google shows
 * `badge`         → the Google reviewer badge line ("Local Guide · 104 reviews")
 * `ownerResponse` → the public reply from the studio owner, when present
 * `truncated`     → true when Google truncates the review behind "More"
 */

export const reviewsMeta = {
  source: 'Google',
  /** Average of the ratings listed below. */
  averageRating: 5.0,
  totalShown: 20,
  /** TODO: replace with the live review count from your Google listing. */
  totalOnGoogle: 22,
  /** TODO: replace with the live rating from your Google listing. */
  ratingOnGoogle: 5.0,
  profileUrl:
    'https://www.google.com/maps/search/?api=1&query=VM%20Music%20Factory%20recording%20studio%20Bengaluru',
};

/** Ordered newest → oldest, matching the Google listing. */
export const reviews = [
  {
    id: 'harish-rn',
    author: 'Harish RN',
    badge: 'Local Guide · 104 reviews · 499 photos',
    rating: 5,
    relativeDate: '2 years ago',
    text: "Our team had the privilege of recording the music of a upcoming movie Ondu Sanne Ondu Maatu (OSOM) at VM Music Factory, and I couldn't be happier with the experience. From start to finish, the team at VM Music Factory demonstrated their…",
    truncated: true,
    likes: 2,
  },
  {
    id: 'praveen-ganiga',
    author: 'Praveen Ganiga',
    badge: '2 reviews · 1 photo',
    rating: 5,
    relativeDate: 'a year ago',
    text: 'Good acoustic room for dubbing and audio production ... Composer and Sound engineer is friendly and professional...Happy to work with VM music factory',
    truncated: false,
  },
  {
    id: 'anusha-gopinath',
    author: 'Anusha Gopinath',
    badge: 'Local Guide · 195 reviews · 559 photos',
    rating: 5,
    relativeDate: 'Edited 5 years ago',
    text: "I am proud to say that this is my little brother's studio. He is into the music industry for sometime now and is involved as a music director for some wonderful projects in the kannada industry.",
    truncated: false,
    likes: 1,
  },
  {
    id: 'darshan-radhakrishnan',
    author: 'Darshan Radhakrishnan',
    badge: '4 reviews',
    rating: 5,
    relativeDate: 'Edited 2 years ago',
    text: 'A fantastic studio and a fantastic sound engineer Mr.Vivek is a really cooperative person and the studio gives you the peace of mind to work comfortably',
    truncated: false,
  },
  {
    id: 'ajay-kencha',
    author: 'Ajay Kencha',
    badge: '8 reviews',
    rating: 5,
    relativeDate: '4 years ago',
    text: 'Amazing great full place to do movie, songs 🎵 dubbing and also editing God bless u vivek anna 😊 …',
    truncated: true,
    likes: 1,
  },
  {
    id: 'shubham-sangam',
    author: 'Shubham Sangam',
    badge: 'Local Guide · 27 reviews · 20 photos',
    rating: 5,
    relativeDate: '6 years ago',
    text: 'Awesome place for your songs. Program your song or any background score on here with one of the best music director in the industry.',
    truncated: false,
  },
  {
    id: 'dinu-aniyan',
    author: 'Dinu Aniyan',
    badge: 'Local Guide · 189 reviews · 115 photos',
    rating: 5,
    relativeDate: '6 years ago',
    text: 'That was the first time I went to a recording studio. It was a pleasant experience',
    truncated: false,
  },
  {
    id: 'hemanth-manjunath',
    author: 'HEMANTH MANJUNATH',
    badge: 'Local Guide · 10 reviews · 13 photos',
    rating: 5,
    relativeDate: '5 years ago',
    text: 'Best studio around RR nagar in banglore',
    truncated: false,
  },
  {
    id: 'mk-creations',
    author: 'MK Creations (Mahadesh kumar)',
    badge: 'Local Guide · 6 reviews · 18 photos',
    rating: 5,
    relativeDate: '7 years ago',
    text: 'The place which u get peace of mind❤and great works',
    truncated: false,
  },
  {
    id: 'abhijith-revathi',
    author: 'Abhijith Revathi',
    badge: 'Local Guide · 48 reviews · 25 photos',
    rating: 5,
    relativeDate: 'Edited 6 years ago',
    text: 'Great space for music recordings and Dubbing.',
    truncated: false,
  },
  {
    id: 'deepak-vc',
    author: 'Deepak Vc',
    badge: 'Local Guide · 117 reviews · 88 photos',
    rating: 5,
    relativeDate: '6 years ago',
    text: 'Best place for film makers',
    truncated: false,
    ownerResponse: {
      text: 'Thanks Deepak',
      relativeDate: '6 years ago',
    },
  },
  {
    id: 'praveen-kiccha',
    author: 'praveen kiccha',
    badge: 'Local Guide · 63 reviews · 65 photos',
    rating: 5,
    relativeDate: 'Edited 4 years ago',
    text: 'Number one Upcoming Music Director studio',
    truncated: false,
  },
  {
    id: 'manjunath-niki',
    author: 'Manjunath Niki',
    badge: '6 reviews',
    rating: 5,
    relativeDate: '7 years ago',
    text: 'Super studio....... Super quality',
    truncated: false,
  },
  {
    id: 'sanju-yadav',
    author: 'Sanju Yadav',
    badge: '11 reviews',
    rating: 5,
    relativeDate: '3 years ago',
    text: 'Good 😍 …',
    truncated: true,
  },
  {
    id: 'prasanna-kumar',
    author: 'prasanna kumar',
    badge: 'Local Guide · 13 reviews · 2 photos',
    rating: 5,
    relativeDate: '5 years ago',
    text: 'Very fantastic place',
    truncated: false,
  },
  {
    id: 'sameer-bablu',
    author: 'Sameer Bablu',
    badge: '5 reviews · 1 photo',
    rating: 5,
    relativeDate: 'Edited 6 years ago',
    text: 'Best',
    truncated: false,
  },
  {
    id: 'yadhu-raj',
    author: 'Yadhu Raj',
    badge: 'Local Guide · 21 reviews · 2 photos',
    rating: 5,
    relativeDate: '5 years ago',
    text: 'Nice interior',
    truncated: false,
  },
  {
    id: 'nikil-kumar',
    author: 'Nikil Kumar',
    badge: '12 reviews · 11 photos',
    rating: 5,
    relativeDate: '4 years ago',
    text: 'Super',
    truncated: false,
  },
  {
    id: 'prasad-db',
    author: 'prasad d.b',
    badge: '6 reviews',
    rating: 5,
    relativeDate: '3 years ago',
    text: 'Good',
    truncated: false,
  },
  {
    id: 'chirag-p-patil',
    author: 'Chirag P Patil',
    badge: 'Local Guide · 29 reviews · 3 photos',
    rating: 5,
    relativeDate: '4 years ago',
    text: 'Good',
    truncated: false,
  },
];

export default reviews;
