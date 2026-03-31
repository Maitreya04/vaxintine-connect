import { motion } from 'framer-motion';

interface HeartsLockupProps {
  /** Number of hearts to render — scales with recipients.length */
  count?: number;
  /** Text displayed in Pinyon Script on the band strip */
  label?: string;
  className?: string;
}

/**
 * Fuller, rounder heart path — matches the brand-asset reference.
 * Rounder lobes, deeper V-notch, smooth curve to a sharp bottom point.
 * Coordinate space: 100 × 100 units.
 */
const HEART = [
  'M 50,28',
  'C 50,18  38,7   25,7',
  'C  8,7    1,21   1,38',
  'C  1,60  25,78  50,96',
  'C 75,78  99,60  99,38',
  'C 99,21  92,7   75,7',
  'C 62,7   50,18  50,28',
  'Z',
].join(' ');

const DOT_PATTERN_ID = 'heart-dots';
const HEART_W = 100;
const HEART_H = 96;    // matches path extent (y goes 7 → 96)
const OVERLAP  = 28;   // pixels of overlap between adjacent hearts
const BAND_H   = 28;   // band strip height in units
const BAND_Y_OFFSET = 0.38; // band top as fraction of HEART_H

const HeartsLockup = ({ count = 1, label = 'Sent!', className = '' }: HeartsLockupProps) => {
  const n = Math.max(1, count);

  const totalW = HEART_W + (n - 1) * (HEART_W - OVERLAP);
  const bandY  = HEART_H * BAND_Y_OFFSET;

  // Viewbox with a small uniform padding so spring animations don't clip
  const PAD = 4;
  const vbX = -PAD;
  const vbW = totalW + PAD * 2;
  const vbH = HEART_H + PAD * 2;

  const heartOffsets = Array.from({ length: n }, (_, i) => i * (HEART_W - OVERLAP));

  // ── Framer-Motion variants ──────────────────────────────────────────────────
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const heartVariants = {
    hidden:  { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 220, damping: 14 },
    },
  };

  const bandVariants = {
    hidden:  { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { delay: n * 0.08 + 0.1, duration: 0.4, ease: 'easeOut' as const },
    },
  };

  const labelVariants = {
    hidden:  { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: n * 0.08 + 0.35, duration: 0.5 },
    },
  };

  return (
    <motion.svg
      viewBox={`${vbX} ${-PAD} ${vbW} ${vbH}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <defs>
        {/* Subtle dot texture — small white dots on deep red */}
        <pattern
          id={DOT_PATTERN_ID}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
        >
          <rect width="8" height="8" fill="#E11E28" />
          <circle cx="4" cy="4" r="1" fill="rgba(255,255,255,0.22)" />
        </pattern>

        {/* Band strip clip = union of all hearts */}
        <clipPath id="bandClip">
          {heartOffsets.map((ox, i) => (
            <path key={i} d={HEART} transform={`translate(${ox}, 0)`} />
          ))}
        </clipPath>
      </defs>

      {/* Hearts — spring in one by one */}
      {heartOffsets.map((ox, i) => (
        <motion.g
          key={i}
          variants={heartVariants}
          style={{ transformOrigin: `${ox + HEART_W / 2}px ${HEART_H / 2}px` }}
        >
          <path
            d={HEART}
            transform={`translate(${ox}, 0)`}
            fill={`url(#${DOT_PATTERN_ID})`}
            stroke="#C01A22"
            strokeWidth="1.5"
          />
        </motion.g>
      ))}

      {/* Band strip — full-bleed, clipped to hearts silhouette */}
      <motion.rect
        x={vbX}
        y={bandY}
        width={vbW}
        height={BAND_H}
        fill="hsl(350 60% 92%)"
        clipPath="url(#bandClip)"
        variants={bandVariants}
        style={{ transformOrigin: `${totalW / 2}px ${bandY + BAND_H / 2}px` }}
      />

      {/* Handwriting label — Pinyon Script centred on the band */}
      <motion.text
        x={totalW / 2}
        y={bandY + BAND_H * 0.72}
        textAnchor="middle"
        fontFamily="'Pinyon Script', cursive"
        fontSize={BAND_H * 0.85}
        fill="hsl(350 65% 30%)"
        variants={labelVariants}
      >
        {label}
      </motion.text>
    </motion.svg>
  );
};

export default HeartsLockup;
