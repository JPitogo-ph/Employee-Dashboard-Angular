import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  private apiUrl = environment.baseUrl + "/api/Employees";

  private employeesCache =  new BehaviorSubject<Employee[] | []>([]);

  private http = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
     if (this.employeesCache.value === null) {
      this.http.get<Employee[]>(this.apiUrl).subscribe(
        (data) => {
          this.employeesCache.next(data);
        }
      )
     }

     return this.employeesCache.asObservable(); //Return as an immutable observable
}

  getEmployeeById(id: string): Observable<Employee | []> {
    const cachedEmployees = this.employeesCache.value;
    if (cachedEmployees) {
      const employee = cachedEmployees.find((emp) => {
        emp.employeeId === id;
      })
      if (employee) {
        return of(employee)
        }
      }
    return of([]) //I'm expecting this will never actually run in this specific project.
  }
}
