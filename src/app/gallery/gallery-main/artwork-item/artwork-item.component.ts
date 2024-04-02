import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../account/account.service';
import { BasketService } from '../../../basket/basket.service';
import { Artwork } from '../../../shared/models/artwork';

export type Layout = "list" | "cards";

@Component({
  selector: 'app-artwork-item',
  templateUrl: './artwork-item.component.html',
  styleUrls: ['./artwork-item.component.scss']
})


export class ArtworkItemComponent implements OnInit {
  @Input() artwork?: Artwork;
  @Input() layout: Layout = "list";
  dateProduced: Number = 2023;
  galleryRoutes: { galleryName: string; id: number; } | undefined;

  constructor(
    private basketService: BasketService,
    public accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.galleryRoutes = {
      galleryName: this.route.snapshot.params['galleryName'],
      id: this.route.snapshot.params['id'],
    };
    console.log('galleryName', this.galleryRoutes.galleryName);
    this.dateProduced = new Date(this.artwork!.dateProduced).getFullYear();
  }

  addItemToBasket() {
    this.artwork && this.basketService.addItemToBasket(this.artwork);
  }
}
