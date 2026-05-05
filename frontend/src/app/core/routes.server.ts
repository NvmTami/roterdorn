import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'buch', renderMode: RenderMode.Prerender },
  { path: 'film', renderMode: RenderMode.Prerender },
  { path: 'musik', renderMode: RenderMode.Prerender },
  { path: 'spiel', renderMode: RenderMode.Prerender },
  { path: 'podcast', renderMode: RenderMode.Prerender },
  { path: 'redaktion', renderMode: RenderMode.Prerender },
  { path: 'add', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
