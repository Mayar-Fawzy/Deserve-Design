import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService, Project } from '../../core/services/projects.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private projectsService = inject(ProjectsService);
  langService = inject(LanguageService);

  featuredProjects: Project[] = [];

  stats = [
    { value: 100, suffix: '+', key: 'stats.projects' },
    { value: 80,  suffix: '+', key: 'stats.clients' },
    { value: 10,  suffix: '+', key: 'stats.years' },
    { value: 15,  suffix: '',  key: 'stats.team' },
  ];

  displayedStats: { value: number; target: number; suffix: string; key: string }[] = [];

  services = [
    { icon: '🏠', key: 'services_preview.design' },
    { icon: '🔨', key: 'services_preview.renovation' },
    { icon: '💡', key: 'services_preview.consultation' },
    { icon: '🔑', key: 'services_preview.handover' },
  ];

  private observer: IntersectionObserver | null = null;
  private statsAnimated = false;

  ngOnInit() {
    this.featuredProjects = this.projectsService.getFeatured();
    this.displayedStats = this.stats.map(s => ({ ...s, value: 0, target: s.value }));

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !this.statsAnimated) {
            this.statsAnimated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    setTimeout(() => {
      const el = document.querySelector('.stats-section');
      if (el) this.observer!.observe(el);
    }, 100);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  animateCounters() {
    this.displayedStats.forEach((stat, i) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.target / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const current = Math.min(Math.round(increment * step), stat.target);
        this.displayedStats[i] = { ...stat, value: current };
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }

  getProjectName(project: Project): string {
    return this.langService.currentLang() === 'ar' ? project.nameAr : project.nameEn;
  }

  getProjectLocation(project: Project): string {
    return this.langService.currentLang() === 'ar' ? project.locationAr : project.locationEn;
  }

  getProjectStyle(project: Project): string {
    return this.langService.currentLang() === 'ar' ? project.styleAr : project.styleEn;
  }
}
