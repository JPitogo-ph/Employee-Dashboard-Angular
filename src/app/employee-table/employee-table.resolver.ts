import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { EmployeeDataService } from '../employee-data.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

export const employeeTableResolver: ResolveFn<boolean> = () => {
  // Sets the BehaviorSubject inside the service
  let service = inject(EmployeeDataService)
  let http = inject(HttpClient)

  const response = http.get<Employee[]>(service.apiUrl).pipe(
    retry(5),
    catchError((err) => {
      console.error(err)
      return throwError(() => new Error("Request failed after 3 retries"))
    })
  )
  service.setEmployees(response)

  return true; //Doesn't matter if true/false, must resolve to the type specified in ResolveFn or navigation blocks
};
