import { Injectable, OnInit } from '@angular/core';
import { combineLatest, fromEvent, map, Observable, startWith } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


//export type Breakpoint = "mobile" | "tablet" | "desktop";

@Injectable({
  providedIn: 'root'
})

export class BreakpointsService {
  imagePath: string = '';
  breakpoint: any;
  baseURL = "https://res.cloudinary.com/kw9xdfo024q/image/upload/v1689441182/grs-artnet-3/yjpfvne2tk7zmtjja5wx.png";

  constructor(public breakpointObserver: BreakpointObserver) { }

  //getResponsiveImages() {
  //  this.breakpointObserver.observe([
  //    Breakpoints.XSmall,
  //    Breakpoints.Small,
  //    Breakpoints.Medium,
  //    Breakpoints.Large,
  //    Breakpoints.XLarge
  //  ]).subscribe(result => {
  //    if (result.breakpoints[Breakpoints.XSmall]) {
  //      let url = this.baseURL.split('/');
  //      let insertIndex = url.indexOf('upload');
  //      const options = 'c_thumb,g_auto,f_auto,q_auto,w_400';
  //      url.splice(insertIndex + 1, 0, options);
  //      this.imagePath = url.join('/');
  //      this.breakpoint = Breakpoints.Small;
  //    }
  //    if (result.breakpoints[Breakpoints.Small]) {
  //      let url = this.baseURL.split('/');
  //      let insertIndex = url.indexOf('upload');
  //      const options = 'c_thumb,g_auto,f_auto,q_auto,w_600';
  //      url.splice(insertIndex + 1, 0, options);
  //      this.imagePath = url.join('/');
  //      this.breakpoint = Breakpoints.Small;
  //    }
  //    if (result.breakpoints[Breakpoints.Medium]) {
  //      let url = this.baseURL.split('/');
  //      let insertIndex = url.indexOf('upload');
  //      const options = 'c_fill,ar_2:1,g_auto,f_auto,q_auto,w_960';
  //      url.splice(insertIndex + 1, 0, options);
  //      this.imagePath = url.join('/');
  //      this.breakpoint = Breakpoints.Medium;
  //    }
  //    if (result.breakpoints[Breakpoints.Large]) {
  //      let url = this.baseURL.split('/');
  //      let insertIndex = url.indexOf('upload');
  //      const options = 'c_fill,g_auto,f_auto,q_auto,w_1200';
  //      url.splice(insertIndex + 1, 0, options);
  //      this.imagePath = url.join('/');
  //      this.breakpoint = Breakpoints.Large;
  //    }
  //    if (result.breakpoints[Breakpoints.XLarge]) {
  //      let url = this.baseURL.split('/');
  //      let insertIndex = url.indexOf('upload');
  //      const options = 'c_fill,g_auto,f_auto,q_auto,w_1600';
  //      url.splice(insertIndex + 1, 0, options);
  //      this.imagePath = url.join('/');
  //      this.breakpoint = Breakpoints.XLarge;
  //    }
  //  });
  }



  //readonly breakpoints: Record<Breakpoint, number> = {
  //  mobile: 0,
  //  tablet: 600,
  //  desktop: 960,
  //};

  //getMatchingBreakpoint(): Observable<Breakpoint> {
  //  const bpNames = Object.keys(this.breakpoints) as Breakpoint[];
  //  const bpValues = Object.values(this.breakpoints);
  //  const queries = bpValues.map(bp => `(min-width: ${bp}px)`);
  //  const matches$ = queries.map(query => {
  //    const matchMedia = window.matchMedia(query);

  //    return fromEvent<MediaQueryListEvent>(matchMedia, 'change').pipe(
  //      map(event => event.matches),
  //      startWith(matchMedia.matches)
  //    );
  //  });

  //  return combineLatest(matches$).pipe(
  //    map(matches => bpNames[matches.lastIndexOf(true)])
  //  );
  //}

  //getResponsiveValue<T>(values: Record<Breakpoint, T>): Observable<T> {
  //  return this.getMatchingBreakpoint().pipe(
  //    map(breakpoint => values[breakpoint])
  //  );
  //}
