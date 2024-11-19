import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'employees', component: EmployeeTableComponent}
];
