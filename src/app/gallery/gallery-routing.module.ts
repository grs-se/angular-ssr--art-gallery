import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkDetailsComponent } from './gallery-main/artwork-details/artwork-details.component';
import { GalleryMainComponent } from './gallery-main/gallery-main.component';
import { GalleryOverviewComponent } from './gallery-overview/gallery-overview.component';
import { GalleryComponent } from './gallery.component';
import { SelectedWorkComponent } from './selected-work/selected-work.component';

const routes: Routes = [
  //////////////////// V3
  {
    path: '',
    data: { reuseRoute: false, reuseComponent: true },
    component: GalleryComponent,
    children: [
      //path: '', component: GalleryComponent, data: { reuseComponent: false },children: [
      //path: '', component: GalleryComponent, data: { reuseComponent: true }, children: [
      // Show GalleryOverviewComponent within GalleryComponent
      {
        path: '',
        data: { reuseRoute: false, reuseComponent: true },
        component: GalleryOverviewComponent,
      },
      // Order of Routes is important here, can't place dynamic routes before 'search'
      {
        path: 'search',
        component: GalleryMainComponent,
      },
      //*** DYNAMIC ROUTES
      {
        path: ':classificationId',
        component: GalleryOverviewComponent,
      },
      {
        path: ':classificationId',
        children: [
          { path: ':galleryId', component: GalleryMainComponent },
          {
            path: ':galleryId',
            children: [
              {
                path: ':id',
                component: ArtworkDetailsComponent,
                data: { breadcrumb: { alias: 'artworkDetails' } },
              },
            ],
          },
        ],
      },

      //*** End of DYNAMIC ROUTES
      //*** STATIC ROUTES
      //{
      //  path: 'categories', children: [
      //    //{ path: ':galleryId', data: { reuseRoute: true, reuseComponent: true }, component: GalleryMainComponent },
      //    //{ path: ':galleryId', data: { reuseComponent: true },component: GalleryMainComponent },
      //    { path: ':galleryId', data: { reuseRoute: false, reuseComponent: true },component: GalleryMainComponent },
      //    {
      //      path: ':galleryId', data: { reuseRoute: false, reuseComponent: true }, children: [
      //        { path: ':id', component: ArtworkDetailsComponent, data: { breadcrumb: { alias: 'artworkDetails' } } }
      //      ]
      //    },
      //  ]
      //},
      //{
      //  path: 'collections', children: [
      //    { path: ':galleryId', component: GalleryMainComponent },
      //    {
      //      path: ':galleryId', children: [
      //        { path: ':id', component: ArtworkDetailsComponent, data: { breadcrumb: { alias: 'artworkDetails' } } }
      //      ]
      //    },
      //  ]
      //},
      {
        path: 'selected-work',
        component: GalleryMainComponent,
        children: [
          {
            path: ':id',
            component: ArtworkDetailsComponent,
            data: { breadcrumb: { alias: 'artworkDetails' } },
          },
        ],
      },
      {
        path: 'archive',
        component: GalleryMainComponent,
        children: [
          {
            path: ':id',
            component: ArtworkDetailsComponent,
            data: { breadcrumb: { alias: 'artworkDetails' } },
          },
        ],
      },
      {
        path: 'selected-work',
        component: SelectedWorkComponent,
      },
      //*** STATIC ROUTES
    ],
  },

  //////////////////// V2
  //{
  //  path: '', component: GalleryComponent, children: [
  //    // Show GalleryOverviewComponent within GalleryComponent
  //    { path: '', component: GalleryOverviewComponent },
  //    //{ path: ':collectionName', component: GalleryMainComponent },
  //    {
  //      path: ':collectionName', children: [
  //        { path: ':galleryName', component: GalleryMainComponent },
  //        {
  //          path: ':galleryName', children: [
  //            { path: ':id', component: ArtworkDetailsComponent, data: { breadcrumb: { alias: 'artworkDetails' } } }
  //          ]
  //        },
  //      ]
  //    },
  //  ]
  //},

  //////////////////// V1
  //{ path: '', component: GalleryOverviewComponent },
  //{ path: ':collectionName', component: CollectionOverviewComponent},
  //{
  //  path: ':collectionName', children: [
  //    { path: ':galleryName', component: GalleryComponent },
  //    { path: ':galleryName', children: [
  //        { path: ':id', component: ArtworkDetailsComponent, data: { breadcrumb: { alias: 'artworkDetails' } } }
  //    ]},
  //  ]
  //},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
