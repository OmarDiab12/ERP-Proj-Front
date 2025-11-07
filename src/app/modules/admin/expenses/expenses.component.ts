import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Core/services/data.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
    smallSelectedTab: number = 0;
  allExpenses: any[] = [];
  categories: string[] = [];
  activeTab: string = '';
  loading = false;

  // form modal
  showModal = false;
  isEditMode = false;
  selectedExpense: any = null;

  constructor(private dataService: DataService, private confirmationService: ConfirmationService) {}

  columns = [
    { field: 'description', header: 'الوصف' },
    { field: 'amount', header: 'المبلغ' },
    { field: 'expenseDate', header: 'تاريخ المصروف' },
    { field: 'category', header: 'الفئة' },
  ];

  expenseFields = [
    { name: 'description', label: 'الوصف', type: 'text', required: true },
    { name: 'amount', label: 'المبلغ', type: 'number', required: true },
    { name: 'expenseDate', label: 'تاريخ المصروف', type: 'date', required: true },
    { name: 'category', label: 'الفئة', type: 'text', required: true },
    { name: 'file', label: 'ملف مرفق', type: 'file' }
  ];


  ngOnInit() {
    this.getAllExpenses();
  }

  currentPage: number = 1;
pageSize: number = 10;

  getAllExpenses(page: number = this.currentPage, pageSize: number = this.pageSize) {
    this.loading = true;
    this.dataService.GetAllOperationalExpenses(page,pageSize).subscribe({
      next: (res: any) => {
        this.allExpenses = res?.data || [];
        this.categories = [...new Set(this.allExpenses.map(e => e.category))];
        if (this.categories.length > 0) this.activeTab = this.categories[0];
        console.log(this.allExpenses);
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  getExpensesByCategory(category: string) {
    return this.allExpenses.filter(e => e.category === category);
  }

  openAddExpenseForm() {
    this.isEditMode = false;
    this.selectedExpense = null;
    this.showModal = true;
  }

  submitExpense(formData: any) {
    const payload = this.prepareFormData(formData);
    this.dataService.AddOperationalExpense(payload).subscribe({
      next: () => {
        this.closeModal();
        this.getAllExpenses();
      }
    });
  }

  openEditExpenseForm(expense: any) {
    this.isEditMode = true;
    this.selectedExpense = expense;
    this.showModal = true;
  }

  updateExpense(formData: any) {
    const payload = this.prepareFormData(formData, this.selectedExpense.id);
    this.dataService.EditOperationalExpense(payload).subscribe({
      next: () => {
        this.closeModal();
        this.getAllExpenses();
      }
    });
  }

  deleteExpense(expense: any) {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف المصروف "${expense.description}"؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'إلغاء',
      accept: () => {
        this.dataService.DeleteOperationalExpense(expense.id).subscribe({
          next: () => this.getAllExpenses()
        });
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  prepareFormData(formData: any, id?: number) {
    const fd = new FormData();
    if (id) fd.append('Id', id.toString());
    fd.append('Description', formData.description);
    fd.append('Amount', formData.amount);
    fd.append('ExpenseDate', formData.expenseDate);
    fd.append('Category', formData.category);
    // if (formData.file) fd.append('File', formData.file);
      if (formData.file) {
    fd.append('File', formData.file);
  } else {
    fd.append('File', '');
  }
    return fd;
  }



  onPageChange(event: any) {
  this.getAllExpenses(event.page, event.pageSize);
}

}
