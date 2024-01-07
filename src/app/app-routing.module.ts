import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyListComponent } from './features/journey/components/journey-list/journey-list.component';

const routes: Routes = [
  {path:'journeys', component: JourneyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
