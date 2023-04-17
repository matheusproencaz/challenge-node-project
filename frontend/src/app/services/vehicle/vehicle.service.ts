import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle.model';
import { environment } from 'src/environments/environment';
import { ExceptionHandlerService } from '../exceptionHandler/exception-handler.service';
import { VehicleForm } from 'src/app/pages/vehicles/components/vehicle-form/vehicle-form.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
   private http: HttpClient,
    private errMsg: ExceptionHandlerService,
  ) { }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.baseUrl}/vehicles`)
      .pipe(catchError(this.errMsg.handleError));
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.baseUrl}/vehicles/${id}`)
    .pipe(catchError(this.errMsg.handleError));
  }

  deleteVehicleById(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/vehicles/${id}`)
      .pipe(catchError(this.errMsg.handleError));
  }

  createVehicle(vehicle: VehicleForm): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${environment.baseUrl}/vehicles`, vehicle)
      .pipe(catchError(this.errMsg.handleError));
  }

  updateVehicle(id: string, vehicle: VehicleForm): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${environment.baseUrl}/vehicles/${id}`, vehicle)
      .pipe(catchError(this.errMsg.handleError));
  }

}
