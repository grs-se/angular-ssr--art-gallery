import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isAdmin$: Observable<boolean> = of(false);

  constructor(public accountService: AccountService) { }

  // disable for artworks if quantityInStock only = 1
  ngOnInit() {
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear()
  }
}
