import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { 
          BehaviorSubject, 
          catchError, 
          map, 
          Observable, 
          of, 
          retry, 
          throwError } from 'rxjs';
import { Employee } from './models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  private apiUrl = environment.baseUrl + "/api/employees";

  private employeesCache$ =  new BehaviorSubject<Employee[] | []>([]);
  private employeeCacheAccess$ = this.employeesCache$.asObservable(); //For signal API

  private http = inject(HttpClient);

  //Request and init on instantiation
  constructor() {
    this.http.get<Employee[]>(this.apiUrl).pipe(
      retry(5),
      catchError((err) => {
        console.error("Request failed after retries", err)
        return throwError(() => new Error("Failed to GET data after 3 retries"))
      }),
    ).subscribe((value) => 
      this.employeesCache$.next(value)
    )
  }

//   getEmployees(): Observable<Employee[]> {
//      if (this.employeesCache$.value.length === 0) {
//       this.http.get<Employee[]>(this.apiUrl).subscribe(
//         (data) => {
//           this.employeesCache$.next(data);
//         }
//       )
//      }

//      return this.employeesCache$.asObservable(); //Return as an immutable observable
// }

//   getEmployeeById(id: string | null): Observable<Employee | null> {
//     const cachedEmployees = this.employeesCache$.value;
//     if (cachedEmployees) {
//       const employee = cachedEmployees.find((emp) => emp.employeeId === id);
//       if (employee) {
//         return of(employee)
//         }
//       }
//     return of(null) //I'm expecting this will never actually run in this specific project.
//   }

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
