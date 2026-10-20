/** Populate only from Brett's approved résumé. Project names do not imply employers. */
export type Experience = {
  company: string;
  role: string;
  dates: string;
  highlights: readonly string[];
  confirmed: boolean;
};
/** Keep approved entries in reverse chronological order; unconfirmed entries stay hidden. */
export const experience: readonly Experience[] = [];
