/**
 * Inline SVG icon set (stroke-based, 24×24, `currentColor`).
 * Inlined instead of an icon font/package: zero extra network requests, no
 * layout shift, and every icon is tree-shaken into the bundle.
 */

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

function Svg({ size = 20, children, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {children}
    </svg>
  );
}

export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

/** Official WhatsApp glyph (filled). */
export const WhatsAppIcon = ({ size = 20, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

/** Official four-colour Google "G" for review attribution. */
export const GoogleIcon = ({ size = 18, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A11.99 11.99 0 0 0 12 24z"
    />
    <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.28a12 12 0 0 0 0 10.76l3.99-3.09z" />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.01 1.19 15.29 0 12 0 7.31 0 3.24 2.69 1.28 6.62l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

export const StarIcon = ({ size = 15, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M12 2.4l2.86 5.8 6.4.93-4.63 4.51 1.1 6.37L12 17.02l-5.73 3.0 1.1-6.37L2.74 9.13l6.4-.93L12 2.4z" />
  </svg>
);

export const StarOutlineIcon = ({ size = 15, ...rest }) => (
  <Svg size={size} {...rest}>
    <path d="M12 2.4l2.86 5.8 6.4.93-4.63 4.51 1.1 6.37L12 17.02l-5.73 3.0 1.1-6.37L2.74 9.13l6.4-.93L12 2.4z" />
  </Svg>
);

export const ArrowRightIcon = (p) => (
  <Svg size={18} {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
);

export const ChevronLeftIcon = (p) => (
  <Svg size={18} {...p}>
    <path d="m15 18-6-6 6-6" />
  </Svg>
);

export const ChevronRightIcon = (p) => (
  <Svg size={18} {...p}>
    <path d="m9 18 6-6-6-6" />
  </Svg>
);

export const CloseIcon = (p) => (
  <Svg size={20} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

export const CheckIcon = (p) => (
  <Svg size={16} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const MapPinIcon = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v5.3l3.4 2" />
  </Svg>
);

export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 8.2 5.3a1.5 1.5 0 0 0 1.6 0L21 7" />
  </Svg>
);

export const MicIcon = (p) => (
  <Svg {...p}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v4" />
    <path d="M8.5 22h7" />
  </Svg>
);

export const HeadphonesIcon = (p) => (
  <Svg {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h2.2a1.8 1.8 0 0 1 1.8 1.8v3.4A1.8 1.8 0 0 1 6.2 21H5.8A1.8 1.8 0 0 1 4 19.2z" />
    <path d="M20 14h-2.2a1.8 1.8 0 0 0-1.8 1.8v3.4A1.8 1.8 0 0 0 17.8 21h.4a1.8 1.8 0 0 0 1.8-1.8z" />
  </Svg>
);

export const MusicIcon = (p) => (
  <Svg {...p}>
    <path d="M9 18V5.5l11-2V16" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </Svg>
);

export const SlidersIcon = (p) => (
  <Svg {...p}>
    <path d="M6 21v-8M6 9V3M12 21v-5M12 12V3M18 21v-9M18 8V3" />
    <path d="M3 13h6M9 16h6M15 12h6" />
  </Svg>
);

export const DiscIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" />
  </Svg>
);

export const SparklesIcon = (p) => (
  <Svg {...p}>
    <path d="m12 3-1.9 5.6a2 2 0 0 1-1.3 1.3L3.2 12l5.6 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L20.8 12l-5.6-1.9a2 2 0 0 1-1.3-1.4z" />
    <path d="M5 3v3.5M3.2 4.7h3.6M19 16.5V21M16.7 18.7h4.6" />
  </Svg>
);

export const ImageIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
    <circle cx="9" cy="9.5" r="1.8" />
    <path d="m3.5 17 4.6-4.3a2 2 0 0 1 2.8 0l3.4 3.2a2 2 0 0 0 2.8 0l3.4-3.1" />
  </Svg>
);

export const ZoomIcon = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7.5" />
    <path d="m20.5 20.5-4.2-4.2M11 8.4v5.2M8.4 11h5.2" />
  </Svg>
);

export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M20 12.5c0 5-3.5 7.4-7.6 8.9a1.2 1.2 0 0 1-.8 0C7.5 19.9 4 17.5 4 12.5V6.2a1.2 1.2 0 0 1 1.2-1.2c2 0 4.4-1.1 6.1-2.6a1.2 1.2 0 0 1 1.4 0C14.4 3.9 16.8 5 18.8 5A1.2 1.2 0 0 1 20 6.2z" />
  </Svg>
);

export const InfoIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 11v5.5M12 7.8h.01" />
  </Svg>
);

export const UsersIcon = (p) => (
  <Svg {...p}>
    <path d="M16 21v-1.8a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V21" />
    <circle cx="9.2" cy="7.5" r="3.8" />
    <path d="M21.5 21v-1.8a4 4 0 0 0-3-3.9M16.5 3.7a4 4 0 0 1 0 7.6" />
  </Svg>
);

export const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);

export const SendIcon = (p) => (
  <Svg {...p}>
    <path d="M21.5 2.5 2.8 9.6a.6.6 0 0 0 .03 1.13l6.6 2.4 2.4 6.6a.6.6 0 0 0 1.13.03z" />
    <path d="M21.5 2.5 9.4 13.1" />
  </Svg>
);

export const ExternalLinkIcon = (p) => (
  <Svg {...p}>
    <path d="M15 3h6v6" />
    <path d="M10.5 13.5 21 3" />
    <path d="M18.5 13.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h5.5" />
  </Svg>
);

export const InstagramIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.6h.01" />
  </Svg>
);

export const YoutubeIcon = (p) => (
  <Svg {...p}>
    <path d="M2.6 17.1a23.6 23.6 0 0 1 0-10.2A2.3 2.3 0 0 1 4.2 5.4a50.6 50.6 0 0 1 15.6 0 2.3 2.3 0 0 1 1.6 1.5 23.6 23.6 0 0 1 0 10.2 2.3 2.3 0 0 1-1.6 1.5 50.6 50.6 0 0 1-15.6 0 2.3 2.3 0 0 1-1.6-1.5z" />
    <path d="m10 15.2 5-3.2-5-3.2z" />
  </Svg>
);

export const FacebookIcon = (p) => (
  <Svg {...p}>
    <path d="M18 2.5h-2.8a5 5 0 0 0-5 5v3H7.3v4h2.9v7h4v-7h3l1-4h-4V7.6a1 1 0 0 1 1-1H18z" />
  </Svg>
);

export const AwardIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.5 13.8 7 22l5-2.6L17 22l-1.5-8.2" />
  </Svg>
);

