import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';

export const validateIdGuard: CanActivateFn = (route) => {
  const service = inject(EmployeeDataService);
  const router = inject(Router)
  const employeeCacheAccess = service.employeeCacheAccess;
  const employeeId = route.paramMap.get('id');

  const canNavigate = computed(() => {
    let isEmployeePresent = employeeCacheAccess().some((emp) => {
      return String(emp.employeeId) === employeeId;
    })
    return isEmployeePresent;
  })
  if (canNavigate()) {return canNavigate();}
  else {
    router.navigate(["**"]);
    return canNavigate()
  }
};
