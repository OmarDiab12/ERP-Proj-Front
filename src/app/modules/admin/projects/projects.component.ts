import { Component } from '@angular/core';
import { DataService } from 'src/app/Core/services/data.service';

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

  constructor(private dataService: DataService) {}

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

    // حمل البيانات الحقيقية من الـ API (إن وجدت)
    this.loadProjects();
  }

  loadProjects() {
    this.dataService.GetAllProjects().subscribe({
      next: (res: any) => {
        // API may return { data: [...] } or array directly — normalize
        const list = res?.data ?? res ?? [];
        if (Array.isArray(list) && list.length) {
          this.projects = list;
        } else {
          // fallback sample data if API returns empty
          this.projects = [
            { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', status: 'جاري' },
            { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', status: 'منتهي' }
          ];
        }
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        // keep sample data on error
        this.projects = [
          { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', status: 'جاري' },
          { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', status: 'منتهي' }
        ];
      }
    });
  }

  openStepper() {
    this.showStepper = true;
  }

  closeStepper() {
    this.showStepper = false;
    // refresh the projects list after the stepper closes (in case a new project was created)
    this.loadProjects();
  }

  editProject(project: any) {
    console.log('Edit project', project);
  }

  deleteProject(id: number) {
    console.log('Delete project', id);
  }
}
