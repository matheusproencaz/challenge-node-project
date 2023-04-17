import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiclesComponent } from '../../vehicles.component';
import { Vehicle, VehicleType } from 'src/app/model/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

export interface VehicleForm {
  id?: string;
  brand: string;
  color: string;
  plate: string;
  type: number;
}

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  @ViewChild("vehicleForm") settingFormDirective: any;

  vehicleFb: FormGroup;

  vehicle: Vehicle;

  constructor(public dialogRef: MatDialogRef<VehiclesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    private fb: FormBuilder,
    private service: VehicleService) {

  }

  ngOnInit(): void {
    this.vehicle = this.data;

    if(this.vehicle) {
      this.createFormForUpdateVehicle();
    } else {
      this.createFormForCreateVehicle();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const vehicle = {
      ...this.vehicleFb.value
    }

    if(this.vehicle) {
      if(this.vehicle.plate === vehicle.plate) {
        vehicle.plate = null;
      }
      this.service.updateVehicle(this.vehicle.id, vehicle)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    } else {
      this.service.createVehicle(vehicle)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    }
  }

  createFormForCreateVehicle(): void {
    this.vehicleFb = this.fb.group({
      brand: ['', [Validators.required]],
      color: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });

    this.vehicleFb.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  createFormForUpdateVehicle(): void {
    this.vehicleFb = this.fb.group({
      brand: [this.vehicle.brand, []],
      color: [this.vehicle.color, []],
      plate: [this.vehicle.plate, []],
      type: [this.vehicle.type, []],
    });

    this.vehicleFb.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }


  formErrors: VehicleForm = {
    brand: '',
    color: '',
    plate: '',
    type: 0
  }

  validationMessages: any = {
    'brand': {
      'required':'Preenchimento Obrigatório',
    },
    'color':{
      'required':'Preenchimento Obrigatório',
    },
    'plate':{
      'required':'Preenchimento Obrigatório',
    },
    'type':{
      'required':'Preenchimento Obrigatório',
    }
  };

  onValueChanged(data?: any){
    if(!this.vehicleFb) return;
    const form = this.vehicleFb;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)) {
        // Clear Previous error message (if any)
        this.formErrors[field] = '';

        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];

          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
