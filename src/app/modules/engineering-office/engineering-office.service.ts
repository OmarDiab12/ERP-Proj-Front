import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface EngineeringProject {
  id: number;
  title: string;
  client: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'جديد' | 'قيد التنفيذ' | 'مكتمل' | 'مؤجل';
  description: string;
  imageUrl: string;
}

export interface EngineeringProjectPayload {
  title: string;
  client: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: EngineeringProject['status'];
  description: string;
  responsibleEngineer: string;
  contactNumber: string;
  permits?: File[];
  drawings?: File[];
}

@Injectable({ providedIn: 'root' })
export class EngineeringOfficeService {
  private projectsSubject = new BehaviorSubject<EngineeringProject[]>([]);

  getProjects(): Observable<EngineeringProject[]> {
    return this.projectsSubject.asObservable();
  }

  submitProject(payload: EngineeringProjectPayload): Observable<EngineeringProject> {
    const nextId = this.projectsSubject.value.length + 1;
    const newProject: EngineeringProject = {
      id: nextId,
      title: payload.title,
      client: payload.client,
      location: payload.location,
      budget: payload.budget,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: payload.status,
      description: payload.description,
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
    };

    this.projectsSubject.next([newProject, ...this.projectsSubject.value]);
    return of(newProject);
  }

  buildFormData(payload: EngineeringProjectPayload): FormData {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(file => formData.append(key, file));
      } else {
        formData.append(key, value as any);
      }
    });
    return formData;
  }
}
