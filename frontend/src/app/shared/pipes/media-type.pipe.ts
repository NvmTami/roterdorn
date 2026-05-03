import { Pipe, PipeTransform } from '@angular/core';

const LABELS: Record<string, string> = {
  buch:  'Buch',
  film:  'Film',
  musik: 'Musik',
  spiel: 'Spiel',
};

@Pipe({ name: 'mediaType', standalone: true })
export class MediaTypePipe implements PipeTransform {
  transform(value: string): string {
    return LABELS[value?.trim().toLowerCase()] ?? 'Rezension';
  }
}
