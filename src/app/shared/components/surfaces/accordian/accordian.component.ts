import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss']
})
export class AccordianComponent implements OnInit {
  @Input() collectionName: string = '';
  //@Output('uniqueValues') uniqueValues: EventEmitter<any> = new EventEmitter();
  @Input() isCollapsed: boolean = false;
  //params$: Subscription;
  //params$: Observable<Params>;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    //if (this.activatedRoute.parent) {
    //  this.params$ = this.activatedRoute.parent.url.subscribe(path => {
    //    console.log(path[0]);
    //    return path[0];
    //  });
    //  //paramMap.subscribe(params => {
    //  //  const parentParams = params
    //  /*    });*/
    //} else {
    //  this.params$ = this.activatedRoute.url.subscribe(x => console.log(x));
    //}
    //this.activatedRoute.paramMap.subscribe((params) => {
    //  const collectionParams = params.get('collectionName');
    //  if (collectionParams === this.collectionName) {
    //    this.isCollapsed = false;
    //  }
    //});
    //this.params$ = this.router.events.pipe(
    //  filter(event => event instanceof NavigationEnd),
    //  switchMap(() => {
    //    const params = this.route.firstChild?.params;
    //    // return params or an empty observable
    //    return params || of();
    //  })
    //)
    //this.params$.subscribe((params) => {

    //})
    //activatedRoute.paramMap.subscribe((next: response {

    //}))
  }

  ngOnInit() {
    
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
