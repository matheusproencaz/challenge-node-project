import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CompanyComponent } from '../../company.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/model/company.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';

export interface CompanyForm {
  id?: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  bikeParkingAmount: number,
  carParkingAmount: number
}

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  @ViewChild("companyForm") settingFormDirective: any;

  companyFb: FormGroup;

  company: Company;

  constructor(public dialogRef: MatDialogRef<CompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    private fb: FormBuilder,
    private service: CompanyService) {

  }

  ngOnInit(): void {
    this.company = this.data;

    if(this.company) {
      this.createFormForUpdateCompany();
    } else {
      this.createFormForCreateCompany();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const company = {
      ...this.companyFb.value
    }

    if(this.company) {
      if(this.company.cnpj === company.cnpj) {
        company.cnpj = null;
      }
      this.service.updateCompany(this.company.id, company)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    } else {
      this.service.createCompany(company)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    }
  }

  createFormForCreateCompany(): void {
    this.companyFb = this.fb.group({
      name: ["", [Validators.required]],
      cnpj: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      bikeParkingAmount: ["", [Validators.required]],
      carParkingAmount: ["", [Validators.required]]
    });

    this.companyFb.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  createFormForUpdateCompany(): void {
    this.companyFb = this.fb.group({
      name: [this.company.name, []],
      cnpj: [this.company.cnpj, []],
      address: [this.company.address, []],
      phone: [this.company.phone, []],
      bikeParkingAmount:[this.company.bikeParkingAmount, []],
      carParkingAmount: [this.company.carParkingAmount, []]
    });

    this.companyFb.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  formErrors: CompanyForm = {
    name: '',
    cnpj: '',
    address: '',
    phone: '',
    bikeParkingAmount: 0,
    carParkingAmount: 0
  }

  validationMessages: any = {
    'name': {
      'required':'Preenchimento Obrigatório',
    },
    'cnpj':{
      'required':'Preenchimento Obrigatório',
    },
    'address':{
      'required':'Preenchimento Obrigatório',
    },
    'phone':{
      'required':'Preenchimento Obrigatório',
    },
    'bikeParkingAmount':{
      'required':'Preenchimento Obrigatório',
    },
    'carParkingAmount':{
      'required':'Preenchimento Obrigatório',
    }
  };

  onValueChanged(data?: any){
    if(!this.companyFb) return;
    const form = this.companyFb;
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
