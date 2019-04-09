import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './components/directory/directory.component';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "../../components/homepage/homepage.component";

const routes: Routes = [
    {
        path: '', component: HomepageComponent,
        data: { animation: 'home'}
    },
    {
    path: 'directory', component: DirectoryComponent,
    data: { animation: 'directory'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DirectoryRoutingModule { }
