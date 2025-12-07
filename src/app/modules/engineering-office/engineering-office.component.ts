import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EngineeringOfficeService, EngineeringProject } from './engineering-office.service';

@Component({
  selector: 'app-engineering-office',
  templateUrl: './engineering-office.component.html',
  styleUrls: ['./engineering-office.component.css']
})
export class EngineeringOfficeComponent implements OnInit, OnDestroy {
  projects: EngineeringProject[] = [];
  filteredProjects: EngineeringProject[] = [];
  searchTerm = '';
  statusFilter = 'الكل';
  showNewProjectDialog = false;
  projectForm: FormGroup;
  drawings: File[] = [];
  permits: File[] = [];
  private subs = new Subscription();
  statuses: (EngineeringProject['status'] | 'الكل')[] = ['الكل', 'جديد', 'قيد التنفيذ', 'مكتمل', 'مؤجل'];

  constructor(private engineeringOfficeService: EngineeringOfficeService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      client: ['', Validators.required],
      location: ['', Validators.required],
      budget: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['جديد', Validators.required],
      description: ['', Validators.required],
      responsibleEngineer: ['', Validators.required],
      contactNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.engineeringOfficeService.getProjects().subscribe((projects) => {
        this.projects = projects;
        this.applyFilters();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  statusClass(status: EngineeringProject['status']): string {
    switch (status) {
      case 'جديد':
        return 'status-new';
      case 'قيد التنفيذ':
        return 'status-in-progress';
      case 'مكتمل':
        return 'status-done';
      case 'مؤجل':
        return 'status-paused';
      default:
        return '';
    }
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(project => {
      const matchesTerm = project.title.toLowerCase().includes(term) || project.client.toLowerCase().includes(term) || project.location.toLowerCase().includes(term);
      const matchesStatus = this.statusFilter === 'الكل' || project.status === this.statusFilter;
      return matchesTerm && matchesStatus;
    });
  }

  openNewProjectDialog(): void {
    this.showNewProjectDialog = true;
  }

  closeNewProjectDialog(): void {
    this.showNewProjectDialog = false;
    this.projectForm.reset({ status: 'جديد' });
    this.drawings = [];
    this.permits = [];
  }

  onFileDrop(event: DragEvent, type: 'drawings' | 'permits'): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    this.addFiles(files, type);
  }

  onFileSelect(event: Event, type: 'drawings' | 'permits'): void {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    this.addFiles(files, type);
    target.value = '';
  }

  addFiles(files: File[], type: 'drawings' | 'permits'): void {
    if (type === 'drawings') {
      this.drawings = [...this.drawings, ...files];
    } else {
      this.permits = [...this.permits, ...files];
    }
  }

  removeFile(index: number, type: 'drawings' | 'permits'): void {
    if (type === 'drawings') {
      this.drawings = this.drawings.filter((_, i) => i !== index);
    } else {
      this.permits = this.permits.filter((_, i) => i !== index);
    }
  }

  submitProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.projectForm.value,
      budget: Number(this.projectForm.value.budget),
      drawings: this.drawings,
      permits: this.permits
    };

    this.engineeringOfficeService.submitProject(payload).subscribe(() => {
      this.closeNewProjectDialog();
    });
  }
}
