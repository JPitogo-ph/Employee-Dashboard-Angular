import { Component, computed, inject, input, output } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: `
    @if (isVisible())
    {<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-semibold mb-4 text-center">
          Confirmation
        </h2>
        <p class="overflow-hidden">Are you sure you want to delete employee  <strong> {{ employee()?.lastName }}, {{ employee()?.firstName }}</strong> with 
          id <strong>{{ employee()?.employeeId }}?</strong>
        </p>
        <div class="flex justify-between mt-4">
        <button class="border bg-blue-300 p-1 rounded text-white" (click)="deleteEmployee(employee()?.employeeId!)" [disabled]="!isEmployeeIdValid()">Confirm</button>
        <button class="border bg-blue-300 p-1 rounded text-white" (click)="close()">Cancel</button>
      </div>
      </div>
    </div>}
  `,
  styles: ``
})
export class ModalComponent {
  service = inject(EmployeeDataService)

  //Bool that controls visibilityy
  isVisible = input(false);

  //Employee Info to display on template
  employee = input<Employee | null>(null);
  isEmployeeIdValid = computed(() => {
    return this.employee()?.employeeId ? true : false
  })
   
  //Output and function to close modal
  closeModal = output<boolean>();
  close() {
    this.closeModal.emit(false);
  }

  deleteEmployee(id: string) {
    this.service.deleteData(id).subscribe({
      next: res => {
        this.close();
        console.log('Delete Success');
        this.service.refreshData();
      },
      error: err => {
        this.close();
        console.error('Error on Delete', err)
      }
    })
  }
}
