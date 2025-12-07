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
  private projectsSubject = new BehaviorSubject<EngineeringProject[]>([
    {
      id: 1,
      title: 'تصميم مبنى إداري حديث',
      client: 'شركة الريادة',
      location: 'الرياض، السعودية',
      budget: 850000,
      startDate: '2024-03-01',
      endDate: '2024-11-30',
      status: 'قيد التنفيذ',
      description: 'إشراف كامل على تصميم وتنفيذ مبنى إداري بمواصفات ذكية.',
      imageUrl: 'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'مجمع سكني فاخر',
      client: 'أملاك الشرق',
      location: 'جدة، السعودية',
      budget: 1450000,
      startDate: '2024-01-10',
      endDate: '2025-02-15',
      status: 'جديد',
      description: 'تصميم هندسي كامل لمجمع سكني يتضمن مرافق ترفيهية وخدمات متكاملة.',
      imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      title: 'ترميم مبنى تراثي',
      client: 'الهيئة العامة للسياحة',
      location: 'الدرعية التاريخية',
      budget: 320000,
      startDate: '2023-09-05',
      endDate: '2024-06-30',
      status: 'مكتمل',
      description: 'مشروع ترميم شامل مع المحافظة على الهوية المعمارية التراثية.',
      imageUrl: 'https://images.unsplash.com/photo-1529429617124-aee4f2e3d5a8?auto=format&fit=crop&w=900&q=80'
    }
  ]);

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
