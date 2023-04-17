import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { Company } from 'src/app/model/company.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-company-add-vehicle',
  templateUrl: './company-add-vehicle.component.html',
  styleUrls: ['./company-add-vehicle.component.css']
})
export class CompanyAddVehicleComponent implements OnInit {

  company: Company = {
    id: '',
    name: '',
    cnpj: '',
    phone: '',
    address: '',
    bikeParkingAmount: 0,
    carParkingAmount: 0,
    vehicles: []
  }

  vehicles: Vehicle[] = [];
  selectedVehicleId: string;

  notFound: boolean;

  constructor(private service: CompanyService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
      
    this.initCompany();
    this.initVehicles();
  }

  initCompany(): void{
    this.route.params
    .pipe(switchMap((params: Params) => {
      return this.service.getCompanyById(params['id'])
    }))
      .subscribe((company) => {
        this.company = company
        this.companyHasParkingSlots();
      }, () => this.notFound = true);
  }

  initVehicles(): void {
    this.vehicleService.getAllVehicles()
      .subscribe(res => {
        this.vehicles = res
      });
  }

  addVehicle(): void {
    this.service.addVehicleToCompany(this.company.id, this.selectedVehicleId)
      .subscribe(res => {
        this.company = res;
      });
  }

  companyHasParkingSlots(): boolean {
    const parkingSlots = this.company.bikeParkingAmount + this.company.carParkingAmount;
    return this.company.vehicles.length < parkingSlots; 
  }

}
