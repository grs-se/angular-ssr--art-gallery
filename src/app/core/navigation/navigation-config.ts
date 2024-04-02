export interface INavLink {
  text: string;
  url: string;
}

export const navLinks: INavLink[] = [
  {
    text: ' Home',
    url: '/',
  },
  {
    text: 'Gallery',
    url: '/gallery/categories/drawing',
  },
  //{
  //  text: 'Writing',
  //  url: '/writing',
  //},
  // {
  //   text: 'Archive',
  //   url: '/archive'
  // },
  {
    text: 'About',
    url: '/about',
  },
  {
    text: 'Contact',
    url: '/contact',
  },
  //{
  //  text: 'Shop',
  //  url: '/shop',
  //},
  //{
  //  text: 'News',
  //  url: '/news',
  //},
];

export const galleryRoutePaths: string[] = [
  'categories',
  'collections',
  'selected-work',
  'archive',
];

// import { InjectionToken, TemplateRef } from '@angular/core';

// export class ToastData {
//   type?: ToastType;
//   text?: string;
//   template?: TemplateRef<any>;
//   templateContext?: {};
// }

// export type ToastType = 'warning' | 'info' | 'success';

// export interface ToastConfig {
//   position?: {
//     top: number;
//     right: number;
//   };
//   animation?: {
//     fadeOut: number;
//     fadeIn: number;
//   };
// }

// export const defaultToastConfig: ToastConfig = {
//   position: {
//     top: 20,
//     right: 20,
//   },
//   animation: {
//     fadeOut: 2500,
//     fadeIn: 300,
//   },
// };

// export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
