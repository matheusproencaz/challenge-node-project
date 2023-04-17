import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionHandlerService } from '../exceptionHandler/exception-handler.service';
import { Company } from 'src/app/model/company.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';
import { CompanyForm } from 'src/app/pages/company/components/company-form/company-form.component';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
    private errMsg: ExceptionHandlerService
  ) { }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.baseUrl}/companies`)
      .pipe(catchError(this.errMsg.handleError));
  }

  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${environment.baseUrl}/companies/${id}`)
      .pipe(catchError(this.errMsg.handleError));
  }

  deleteCompanyById(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/companies/${id}`)
      .pipe(catchError(this.errMsg.handleError));
  }

  createCompany(company: CompanyForm): Observable<Company> {
    return this.http.post<Company>(`${environment.baseUrl}/companies`, company)
      .pipe(catchError(this.errMsg.handleError));
  }

  updateCompany(id: string, company: CompanyForm): Observable<Company> {
    return this.http.put<Company>(`${environment.baseUrl}/companies/${id}`, company)
      .pipe(catchError(this.errMsg.handleError));
  }

  addVehicleToCompany(idCompany: string, idVehicle: string): Observable<Company> {
    return this.http.put<Company>(`${environment.baseUrl}/companies/${idCompany}/${idVehicle}`, null)
      .pipe(catchError(this.errMsg.handleError));
  }

  removeVehicleToCompany(idCompany: string, idVehicle: string): Observable<Company> {
    return this.http.put<Company>(`${environment.baseUrl}/companies/remove/${idCompany}/${idVehicle}`, null)
      .pipe(catchError(this.errMsg.handleError));
  }
}
