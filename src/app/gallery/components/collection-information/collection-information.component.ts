import { Component, Input } from '@angular/core';
import { ArtworkCategory } from '../../../shared/models/category';

@Component({
  selector: 'app-collection-information',
  templateUrl: './collection-information.component.html',
  styleUrls: ['./collection-information.component.scss']
})
export class CollectionInformationComponent {
  @Input() public category!: ArtworkCategory;
  
}
