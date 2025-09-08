export const breakpoints = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

/**
 * Returns true if the current screen is at least the given breakpoint.
 */
export const isAtLeast = (bp: BreakpointKey): boolean =>
  typeof window !== 'undefined' && window.innerWidth >= breakpoints[bp];
