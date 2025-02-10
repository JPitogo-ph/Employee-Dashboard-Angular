import { computed, Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { 
          BehaviorSubject, 
          catchError, 
          Observable,
          of, 
                            } from 'rxjs';
import { Employee } from './models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  public apiUrl = environment.baseUrl + "/api/employees";
  private http = inject(HttpClient)

  private employeesCache$ =  new BehaviorSubject<Employee[] | []>([]);
  private employeeCacheAccess$ = this.employeesCache$.asObservable(); //For signal API

  setEmployees(employees: Observable<Employee[]>): void {
    employees.subscribe({
      next: (data) => this.employeesCache$.next(data),
      error: (err) => console.error("Final handler in service", err)
    })
  }

  postData(payload: any): Observable<any> { //Can static typing this be a DTO?
    return this.http.post(this.apiUrl, payload).pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          console.error("Error occured: ", err.error.message) //Client-side error
        }
        else {
          console.error(`Server returned error ${err.status} with body: ${err.error}`) //Server side
        }

        return of(err)
      })
    )
  }

  //Data from employee-details, this is set from that component
  employeeId = signal<string>('Report this if you see it')

  // Public Signal APIs for this service.
  employeeCacheAccess = toSignal(this.employeeCacheAccess$, {initialValue: [] as Employee[]});
  employeeDetails = computed(() => {
    return this.employeeCacheAccess().find((employee) => {
      return String(employee.employeeId) === this.employeeId()
    })
  })
  
}
