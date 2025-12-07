import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PartnershipProject, PartnershipStats, PartnershipsService } from 'src/app/Core/services/partnerships.service';

@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.css']
})
export class PartnershipsComponent implements OnInit {
  stats: PartnershipStats = {
    totalPartnerships: 0,
    activeProjects: 0,
    totalInvestment: 0,
    expectedProfit: 0
  };

  projects: PartnershipProject[] = [];
  searchTerm = '';
  loading = false;

  constructor(private partnershipsService: PartnershipsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    forkJoin({
      stats: this.partnershipsService.getStats(),
      projects: this.partnershipsService.getProjects()
    }).subscribe({
      next: ({ stats, projects }) => {
        this.stats = stats;
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredProjects(): PartnershipProject[] {
    if (!this.searchTerm.trim()) {
      return this.projects;
    }
    const term = this.searchTerm.toLowerCase();
    return this.projects.filter(p =>
      (p.name || '').toLowerCase().includes(term) ||
      (p.owner || '').toLowerCase().includes(term) ||
      (p.status || '').toLowerCase().includes(term)
    );
  }

  onSearchChange(): void {
    // when the search box changes, reload from backend to allow server-side filtering
    this.partnershipsService.getProjects(this.searchTerm).subscribe({
      next: (projects) => this.projects = projects,
      error: () => this.projects = []
    });
  }

  onCreateProject(): void {
    // Placeholder action for creating a new project
    console.log('إنشاء مشروع جديد من مساحة الشراكات');
  }

  formatNumber(value: number): string {
    try {
      return value.toLocaleString(undefined, { minimumFractionDigits: 0 });
    } catch (e) {
      return `${value}`;
    }
  }
}
