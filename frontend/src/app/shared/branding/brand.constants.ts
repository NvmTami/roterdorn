/**
 * Brand geometry for roterdorn. Single source of truth.
 * The triangle reads as both a play button and a thorn tip.
 * Aspect ratio: 71:50, ~1.42:1.
 */
export const BRAND_TRIANGLE_PATH = 'M 0 0 L 71 25 L 0 50 Z';
export const BRAND_TRIANGLE_VIEWBOX = '0 0 71 50';
export const BRAND_TRIANGLE_ASPECT_RATIO = 71 / 50;

export type BrandLogoVariant = 'lockup' | 'icon';