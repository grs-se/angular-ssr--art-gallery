import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtworkCategory } from '../../shared/models/category';
import { MetadataFormValues } from '../../shared/models/metadataFormValues';
import { ArtworkTag } from '../../shared/models/tag';
import { ArtworkType } from '../../shared/models/type';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-metadata-form',
  templateUrl: './edit-metadata-form.component.html',
  styleUrls: ['./edit-metadata-form.component.scss']
})
export class EditMetadataFormComponent implements OnInit {
  @Input() metadata?: MetadataFormValues;
  @Input() categories?: ArtworkCategory[];
  @Input() category?: ArtworkCategory;
  @Input() types?: ArtworkType[];
  @Input() tags?: ArtworkTag[];
  categoriesCount = 0;

  addCategoryMode = false;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    //this.getArtworks();
    this.getCategories();
    //this.getTags();
    //this.getTypes();
  }

  onSubmit(category: ArtworkCategory) {
    this.adminService.addCategory(category).subscribe((response: any) => {
      this.toggleAddCategoryMode(false);
      this.router.navigate(['/admin']);
    });
    //this.addCategory(newCategory).subscribe((response: any) => {
    //  this.router.navigate(['/admin']);
    //});
  }

  toggleAddCategoryMode(mode: boolean) {
    this.addCategoryMode = mode;
  }

  getCategories() {
    this.adminService.getCategories().subscribe({
      next: response => { this.categories = [{ id: 0, name: 'All' }, ...response]; console.log(response); },
      error: error => console.log(error)
    });
  }

  //addCategory(category: Category) {
  //  this.addCategoryMode = true;
  //  this.adminService.addCategory(category);
  //  // reset to default i.e. toggle false, when user clicks on window or after time limit
  //}

  deleteCategory(id: number) {
    this.adminService.deleteCategory(id).subscribe((response: any) => {
      this.categories?.splice(this.categories.findIndex(p => p.id === id), 1);
      //this.categoriesCount--;
    });
  }
}
