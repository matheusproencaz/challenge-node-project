import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['brand', 'color', 'plate', 'type', 'actions'];
  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: VehicleService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.service.getAllVehicles()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Vehicle>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteVehicle(id: string): void {
    this.service.deleteVehicleById(id)
      .subscribe(res => {
        this.dataSource.data = this.dataSource.data.filter(vehicle => vehicle.id !== id);
        this.openSnackBar('Veículo deletado com Sucesso!', 'Fechar');
      });
  }

  openDialogCreateVehicle(): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, null);

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.dataSource.data.push(result);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Veículo criada com sucesso!', 'Fechar');
    });
  }

  openDialogUpdateVehicle(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, { data: vehicle });
    dialogRef.afterClosed().subscribe(result => {
      
      if(!result) return;

      this.dataSource.data = this.dataSource.data.filter(c => c.id !== result.id);
      this.dataSource.data.push(result);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Veículo atualizado com sucesso!', 'Fechar');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
