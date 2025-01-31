import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { 
          BehaviorSubject, 
          Observable, 
                            } from 'rxjs';
import { Employee } from './models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  public apiUrl = environment.baseUrl + "/api/employees";

  private employeesCache$ =  new BehaviorSubject<Employee[] | []>([]);
  private employeeCacheAccess$ = this.employeesCache$.asObservable(); //For signal API

  setEmployees(employees: Observable<Employee[]>): void {
    employees.subscribe({
      next: (data) => this.employeesCache$.next(data),
      error: (err) => console.error("Final handler in service", err)
    })
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
