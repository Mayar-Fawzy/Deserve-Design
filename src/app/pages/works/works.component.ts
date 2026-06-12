import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService, Project } from '../../core/services/projects.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent {
  private projectsService = inject(ProjectsService);
  langService = inject(LanguageService);

  allProjects = this.projectsService.getAll();
  filteredProjects = signal<Project[]>(this.allProjects);
  activeFilter = signal('all');

  lightboxOpen = signal(false);
  lightboxProject = signal<Project | null>(null);
  lightboxIndex = signal(0);

  filters = [
    { key: 'all',         label: 'works.filter_all' },
    { key: 'modern',      label: 'works.filter_modern' },
    { key: 'luxury',      label: 'works.filter_luxury' },
    { key: 'contemporary',label: 'works.filter_contemporary' },
    { key: 'commercial',  label: 'works.filter_commercial' },
    { key: 'apartments',  label: 'works.filter_apartments' },
  ];

  setFilter(cat: string) {
    this.activeFilter.set(cat);
    this.filteredProjects.set(this.projectsService.getByCategory(cat));
  }

  openLightbox(project: Project, index = 0) {
    this.lightboxProject.set(project);
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    this.lightboxProject.set(null);
    document.body.style.overflow = '';
  }

  prevImage() {
    const project = this.lightboxProject();
    if (!project) return;
    const total = project.images.length;
    this.lightboxIndex.update(i => (i - 1 + total) % total);
  }

  nextImage() {
    const project = this.lightboxProject();
    if (!project) return;
    const total = project.images.length;
    this.lightboxIndex.update(i => (i + 1) % total);
  }

  getName(p: Project) { return this.langService.currentLang() === 'ar' ? p.nameAr : p.nameEn; }
  getLocation(p: Project) { return this.langService.currentLang() === 'ar' ? p.locationAr : p.locationEn; }
  getStyle(p: Project) { return this.langService.currentLang() === 'ar' ? p.styleAr : p.styleEn; }
  getDesc(p: Project) { return this.langService.currentLang() === 'ar' ? p.descriptionAr : p.descriptionEn; }
}
