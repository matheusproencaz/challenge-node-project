import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { CompanyAddVehicleComponent } from './pages/company/components/company-add-vehicle/company-add-vehicle.component';

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyComponent
  },
  {
    path: 'vehicles',
    component: VehiclesComponent
  },
  {
    path: 'companies/:id',
    component: CompanyAddVehicleComponent
  },
  {
    path: "",
    redirectTo: '/companies',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
