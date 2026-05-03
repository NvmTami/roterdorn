import { Component, Input } from '@angular/core';
import {
  BRAND_TRIANGLE_PATH,
  BRAND_TRIANGLE_VIEWBOX,
  BRAND_TRIANGLE_ASPECT_RATIO,
  BrandLogoVariant,
} from './brand.constants';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  template: `
    @switch (variant) {
      @case ('lockup') {
        <span class="lockup" [style.font-size.px]="height">
          <span>roter</span>
          <svg
            [attr.viewBox]="viewBox"
            [attr.width]="triangleWidth"
            [attr.height]="triangleHeight"
            aria-hidden="true">
            <path [attr.d]="path" fill="var(--brand-accent)" />
          </svg>
          <span>dorn</span>
        </span>
      }
      @case ('icon') {
        <svg
          [attr.viewBox]="viewBox"
          [attr.width]="iconWidth"
          [attr.height]="height"
          role="img"
          aria-label="roterdorn">
          <path [attr.d]="path" fill="var(--brand-accent)" />
        </svg>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
      }
      .lockup {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        font-weight: 500;
        letter-spacing: -0.04em;
        line-height: 1;
      }
    `,
  ],
})
export class BrandLogoComponent {
  @Input() variant: BrandLogoVariant = 'lockup';
  @Input() height = 24;

  protected readonly path = BRAND_TRIANGLE_PATH;
  protected readonly viewBox = BRAND_TRIANGLE_VIEWBOX;

  protected get triangleHeight(): number {
    return Math.round(this.height * 0.55);
  }

  protected get triangleWidth(): number {
    return Math.round(this.triangleHeight * BRAND_TRIANGLE_ASPECT_RATIO);
  }

  protected get iconWidth(): number {
    return Math.round(this.height * BRAND_TRIANGLE_ASPECT_RATIO);
  }
}