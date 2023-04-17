import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/services/company/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'address', 'phone', 'actions'];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: CompanyService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog
              ) { }
  
  ngOnInit(): void {
    this.service.getAllCompanies()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Company>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteCompany(id: string): void {
    this.service.deleteCompanyById(id)
      .subscribe(res => {
        this.dataSource.data = this.dataSource.data.filter(company => company.id !== id);
        this.openSnackBar('Empresa deletada com Sucesso!', 'Fechar');
      });
  }

  openDialogCreateCompany(): void {
    const dialogRef = this.dialog.open(CompanyFormComponent, null);

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      
      this.dataSource.data.push(result);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Empresa criada com sucesso!', 'Fechar');
    });
  }

  openDialogUpdateCompany(company: Company): void {
    const dialogRef = this.dialog.open(CompanyFormComponent, { data: company });
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.dataSource.data = this.dataSource.data.filter(c => c.id !== result.id);
      this.dataSource.data.push(result);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Empresa atualizada com sucesso!', 'Fechar');
    });
  }

  print(thing: any): void {
    console.log(thing);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
