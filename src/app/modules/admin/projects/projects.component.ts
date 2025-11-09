// import { Component } from '@angular/core';
// import { DataService } from 'src/app/Core/services/data.service';

// @Component({
//   selector: 'app-projects',
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css']
// })
// export class ProjectsComponent {
//   showStepper = false;
//   projects: any[] = [];
//   columns: any[] = [];
//   actions: any[] = [];

//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
//     this.columns = [
//       { field: 'id', header: '#' },
//       { field: 'name', header: 'اسم المشروع' },
//       { field: 'clientName', header: 'العميل' },
//       { field: 'brokerName', header: 'الوسيط' },
//       { field: 'status', header: 'الحالة' }
//     ];

//     this.actions = [
//       { label: 'تعديل', icon: 'pi pi-pencil', styleClass: 'btn-warning', action: 'edit' },
//       { label: 'حذف', icon: 'pi pi-trash', styleClass: 'btn-danger', action: 'delete' }
//     ];

//     // حمل البيانات الحقيقية من الـ API (إن وجدت)
//     this.loadProjects();
//   }

//   loadProjects() {
//     this.dataService.GetAllProjects().subscribe({
//       next: (res: any) => {
//         // API may return { data: [...] } or array directly — normalize
//         const list = res?.data ?? res ?? [];
//         if (Array.isArray(list) && list.length) {
//           this.projects = list;
//           console.log('Loaded projects', this.projects);
//         } else {
//           // fallback sample data if API returns empty
//           this.projects = [
//             { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', status: 'جاري' },
//             { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', status: 'منتهي' }
//           ];
//         }
//       },
//       error: (err) => {
//         console.error('Failed to load projects', err);
//         // keep sample data on error
//         this.projects = [
//           { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', status: 'جاري' },
//           { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', status: 'منتهي' }
//         ];
//       }
//     });
//   }

//   openStepper() {
//     this.showStepper = true;
//   }

//   closeStepper() {
//     this.showStepper = false;
//     // refresh the projects list after the stepper closes (in case a new project was created)
//     this.loadProjects();
//   }

//   editProject(project: any) {
//     console.log('Edit project', project);
//   }

//   deleteProject(id: number) {
//     console.log('Delete project', id);
//   }
// }


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
  // define the 4 UI groups and which backend status values they include
  groupDefs = [
    { key: 'new', label: 'المشاريع الجديدة', statuses: ['PendingApproval', 'Accepted'], css: 'purple' },
    { key: 'inprogress', label: 'المشروعات الجارية', statuses: ['InProgress'], css: 'green' },
    { key: 'onhold', label: 'المشروعات المتوقفة', statuses: ['OnHold'], css: 'yellow' },
    { key: 'completed', label: 'المشروعات المكتملة', statuses: ['Completed', 'Canceled'], css: 'blue' }
  ];

  // projects grouped by group key
  projectsByGroup: { [groupKey: string]: any[] } = {};
  // currently editing project (passed into stepper)
  editingProject: any = null;
  isEditMode = false;

  constructor(private dataService: DataService) {}

  /** Format a number as Saudi Riyal or show '-' when missing. If value is 0, show '0 ر.س' */
  formatCurrencyOrDash(value: any): string {
    if (value === null || value === undefined || value === '') return '-';
    const n = Number(value);
    if (!isFinite(n)) return '-';
    if (n === 0) return '0 ر.س';
    try {
      return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
    } catch (e) {
      return n.toFixed(2) + ' ر.س';
    }
  }

  /** Compute net profit for a project object when explicit value not present */
  computeNetProfitForProject(p: any): number {
    if (!p) return 0;
    const provided = p.netProfit ?? p.NetProfit ?? p.net_profit ?? null;
    if (provided !== null && provided !== undefined && provided !== '') return Number(provided) || 0;
    const totalPayments = Number(p.totalPayments ?? p.TotalPayments ?? p.payments ?? 0) || 0;
    const totalExpenses = Number(p.totalExpenses ?? p.TotalExpenses ?? p.expenses ?? 0) || 0;
    const contractors = Number(p.totalContractorPayments ?? p.totalContractorPayments ?? p.contractorPayments ?? 0) || 0;
    return totalPayments - totalExpenses - contractors;
  }

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
              this.groupProjects();
              console.log('Loaded projects', this.projects);
        } else {
          // fallback sample data if API returns empty
              this.projects = [
                { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', Status: 'InProgress' },
                { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', Status: 'Completed' }
              ];
              this.groupProjects();
        }
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        // keep sample data on error
        this.projects = [
          { id: 1, name: 'مشروع A', clientName: 'عميل 1', brokerName: 'وسيط 1', Status: 'InProgress' },
          { id: 2, name: 'مشروع B', clientName: 'عميل 2', brokerName: 'وسيط 2', Status: 'Completed' }
        ];
        this.groupProjects();
      }
    });
  }

  private groupProjects() {
    // initialize empty arrays
    this.projectsByGroup = {};
    this.groupDefs.forEach(g => this.projectsByGroup[g.key] = []);

    (this.projects || []).forEach(p => {
      const st = p.Status ?? p.status ?? '';
      // find a group where statuses include st
      const def = this.groupDefs.find(g => g.statuses.includes(st));
      if (def) {
        this.projectsByGroup[def.key].push(p);
      } else {
        // put unmatched into 'new' group as fallback
        this.projectsByGroup['new'].push(p);
      }
    });
  }

  getCountForGroup(key: string) {
    return (this.projectsByGroup[key] || []).length;
  }

  openStepper() {
    this.showStepper = true;
  }

  closeStepper() {
    this.showStepper = false;
    this.editingProject = null;
    this.isEditMode = false;
    // refresh the projects list after the stepper closes (in case a new project was created/edited)
    this.loadProjects();
  }

  editProject(project: any) {
    // Try to fetch full project details by id before opening the stepper
    const id = project?.Id ?? project?.id ?? project?.projectId ?? project?.ID ?? null;
    if (id) {
      this.dataService.GetProjectById(id).subscribe({
        next: (res: any) => {
          const full = res?.data ?? res ?? project;
          this.editingProject = full;
          this.isEditMode = true;
          this.showStepper = true;
        },
        error: (err) => {
          console.error('Failed to load full project details, opening with provided object', err);
          this.editingProject = project;
          this.isEditMode = true;
          this.showStepper = true;
        }
      });
    } else {
      // no id found, open with whatever we have
      this.editingProject = project;
      this.isEditMode = true;
      this.showStepper = true;
    }
  }

  deleteProject(id: number) {
    console.log('Delete project', id);
  }
}
