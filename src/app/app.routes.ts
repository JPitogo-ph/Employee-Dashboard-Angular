import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'employees', component: EmployeeTableComponent},
    {path: 'employees/:id', component: EmployeeDetailsComponent},
    {path:'**', component:PageNotFoundComponent}
];
