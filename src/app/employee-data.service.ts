import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  private apiUrl = environment.baseUrl + "/api/Employees";

  private employeesCache =  new BehaviorSubject<Employee[] | null>(null);

  private http = inject(HttpClient);

  getEmployees(): Observable<Employee[] | null> {
     if (this.employeesCache.value === null) {
      this.http.get<Employee[]>(this.apiUrl).subscribe(
        (data) => {
          this.employeesCache.next(data);
        }
      )
     }

     return this.employeesCache.asObservable(); //Return as an immutable observable
}

  getEmployeeById(id: string): Observable<Employee> | null {
    const cachedEmployees = this.employeesCache.value;
    if (cachedEmployees) {
      const employee = cachedEmployees.find((emp) => {
        emp.employeeId === id;
      })
      if (employee) {
        return new Observable<Employee>((observer) => {
          observer.next(employee);
          observer.complete()
        })
      }
    }
    return null //Is this a good idea in this language?
  }
}
