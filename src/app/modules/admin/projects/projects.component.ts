import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
showStepper = false;
  projects: any[] = [];
  columns: any[] = [];
  actions: any[] = [];

  ngOnInit(): void {
    this.columns = [
      { field: 'id', header: '#' },
      { field: 'name', header: 'اسم المشروع' },
      { field: 'clientName', header: 'العميل' },
      { field: 'brokerName', header: 'الوسيط' },
      { field: 'status', header: 'الحالة' }
    ];

    this.actions = [
      { label: 'تعديل', icon: 'pi pi-pencil', styleClass: 'btn-warning', action: 'edit' },
      { label: 'حذف', icon: 'pi pi-trash', styleClass: 'btn-danger', action: 'delete' }
    ];

    // بيانات تجريبية
    this.projects = [
      { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', status: 'جاري' },
      { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', status: 'منتهي' }
    ];
  }

  openStepper() {
    this.showStepper = true;
  }

  closeStepper() {
    this.showStepper = false;
  }

  editProject(project: any) {
    console.log('Edit project', project);
  }

  deleteProject(id: number) {
    console.log('Delete project', id);
  }
}
