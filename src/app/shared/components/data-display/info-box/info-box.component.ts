import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artwork } from '../../../models/artwork';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [RouterLink, NgClass, TitleCasePipe],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss'
})
export class InfoBoxComponent {
  @Input() artwork!: Artwork;
  @Input() showInfoFooter: boolean = true;


  public dateProduced(date: Date) {
    return new Date(date).getFullYear();
  }
}
