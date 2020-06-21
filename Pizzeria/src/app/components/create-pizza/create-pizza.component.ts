import { ErrorDialogComponent } from './../dialog/error-dialog/error-dialog.component';
import { MessageDialogComponent } from './../dialog/message-dialog/message-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Pizza } from 'app/model/Pizza';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { PizzaService } from 'app/services/pizza.service';
import { User } from 'app/model/user';
import * as jwt_decode from 'jwt-decode';
import { MatDialog, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { InformationDialogComponent } from '../dialog/information-dialog/information-dialog.component';
import { PizzaComponents } from 'app/model/PizzaComponents';
@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.scss']
})
export class CreatePizzaComponent implements OnInit {
  public user: User;
  public createPizzaFormGroup: FormGroup;
  public pizzaId = 0;
  public id = 0;
  public title = 'Kreiranje ponude';
  public pizza: Pizza;
  public dataSource: any;
  public displayedColumns: string[] = ['redniBroj', 'imeSastojka', 'kolicina', 'akcija'];
  public listPizza: Pizza [] = [];
  public listPizzaCompoments: PizzaComponents [] = new Array();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) public table: MatTable<any>;
  constructor(
     protected userService: UserService,
     protected pizzaService: PizzaService,
     protected router: Router,
     protected route: ActivatedRoute,
     protected dialog: MatDialog
      ) { }

  ngOnInit() {
    this.findUser();
    this.getListPizza();
    this.dataSource =  new MatTableDataSource<any>(this.listPizzaCompoments);
    this.dataSource.paginator = this.paginator;
    this.createPizzaFormGroup = new FormGroup({
      pizzaName: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      nameCompoment: new FormControl(null, []),
      quantity: new FormControl(null , [])
    });
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id > 0) {
      this.populateAndChangeForm();
    }
  }

  public addComponents() {
    const pizzaComponents: PizzaComponents = {
      componentId: 0,
      pizzaId: this.pizzaId ? this.pizzaId : 0,
      componentsName: this.createPizzaFormGroup.controls.nameCompoment.value,
      quantity: this.createPizzaFormGroup.controls.quantity.value
    };
    if (pizzaComponents.componentsName && pizzaComponents.quantity) {
      this.listPizzaCompoments.push(pizzaComponents);
      console.log(this.listPizzaCompoments);
      this.dataSource = new MatTableDataSource<any>(this.listPizzaCompoments);
      this.dataSource.paginator = this.paginator;
      this.table.renderRows();
      this.createPizzaFormGroup.controls.nameCompoment.setValue('');
      this.createPizzaFormGroup.controls.quantity.setValue('');
    }
  }

  public deleteRow(element: PizzaComponents) {
    this.listPizzaCompoments = this.listPizzaCompoments.filter(i => i !== element);
    this.dataSource =  new MatTableDataSource<any>(this.listPizzaCompoments);
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
  }

  public createPizza() {
    const pizza: Pizza = {
      pizzaId: this.pizzaId,
      pizzaName: this.createPizzaFormGroup.controls.pizzaName.value,
      pizzaComponents: this.listPizzaCompoments,
      price: this.createPizzaFormGroup.controls.price.value
    };
    if (this.pizzaExist(pizza)) {
      this.dialog.open(ErrorDialogComponent, {data: {message: 'Pizza već postoji u sistemu'}, disableClose: true});
    } else {
      const openDialog = this.dialog.open(InformationDialogComponent, {data:
        {message: 'Kreiranje ponude...'},
        disableClose: true});
      this.pizzaService.createPizza(pizza).subscribe((res) => {
       console.log(res);
       this.router.navigate(['/review-offers']);
       openDialog.close();
     });
    }
  }
  public populateAndChangeForm() {
    this.title = 'Promena ponude';
    this.pizzaService.getPizza(this.id).subscribe((res) => {
      this.pizza =  res;
      this.createPizzaFormGroup.controls.pizzaName.setValue(this.pizza.pizzaName);
      this.listPizzaCompoments = res.pizzaComponents;
      this.dataSource = new MatTableDataSource<any>(this.listPizzaCompoments);
      this.dataSource.paginator = this.paginator;
      this.table.renderRows();
      this.createPizzaFormGroup.controls.price.setValue(this.pizza.price);
    });
  }
  public updatePizza() {
    const pizza: Pizza = {
      pizzaId: this.id,
      pizzaName: this.createPizzaFormGroup.controls.pizzaName.value,
      pizzaComponents: this.listPizzaCompoments,
      price: this.createPizzaFormGroup.controls.price.value
    };
    const openDialog = this.dialog.open(InformationDialogComponent, {data:
      {message: 'Ažuriranje ponude...'},
       disableClose: true});
    this.pizzaService.updatePizza(pizza).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/review-offers']);
      openDialog.close();
    });
  }
  private findUser() {
    this.user = jwt_decode(localStorage.getItem('token'));
  }
  private getListPizza() {
    this.pizzaService.getListPizza().subscribe((res: Pizza []) => {
      this.listPizza = res;
    });
  }
  private pizzaExist(pizza: Pizza) {
    let exist = false;
    this.listPizza.forEach((p: Pizza) => {
        if (p.pizzaName.toUpperCase() === pizza.pizzaName.toUpperCase()) {
          exist = true;
          return exist;
        }
    });
    return exist;
  }
}
