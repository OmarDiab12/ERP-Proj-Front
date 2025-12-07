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
  private readonly defaultProjects: EngineeringProject[] = [
    {
      id: 1,
      title: 'تصميم برج الأعمال - الرياض',
      client: 'شركة روافد القابضة',
      location: 'الرياض - المملكة العربية السعودية',
      budget: 9200000,
      startDate: '2024-02-10',
      endDate: '2024-12-18',
      status: 'قيد التنفيذ',
      description: 'تصميم وتنفيذ برج تجاري من 24 طابقاً بمرافق ذكية وفق معايير الاستدامة.',
      imageUrl: 'https://images.unsplash.com/photo-1496309732348-3627f3f040ee?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'تطوير مخطط سكني - جدة',
      client: 'صروح للتطوير',
      location: 'جدة - المملكة العربية السعودية',
      budget: 6100000,
      startDate: '2023-11-01',
      endDate: '2024-09-30',
      status: 'مكتمل',
      description: 'إعداد المخططات والبنية التحتية لمخطط سكني يضم 180 وحدة.',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'مشروع منتجع الشاطئ',
      client: 'هيئة السياحة',
      location: 'نيوم - المملكة العربية السعودية',
      budget: 7800000,
      startDate: '2024-03-15',
      endDate: '2025-01-10',
      status: 'جديد',
      description: 'تصميم منتجع بحري فاخر يضم فلل خاصة ومرافق ترفيهية متكاملة.',
      imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'مركز بحوث تقني',
      client: 'وزارة الاتصالات',
      location: 'الدمام - المملكة العربية السعودية',
      budget: 4300000,
      startDate: '2024-01-20',
      endDate: '2024-11-05',
      status: 'مؤجل',
      description: 'تصميم مركز بحوث متخصص بالتحول الرقمي مع مختبرات وتجهيزات متقدمة.',
      imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  private projectsSubject = new BehaviorSubject<EngineeringProject[]>([...this.defaultProjects]);

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
