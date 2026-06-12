import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  differences = [
    { icon: '🔄', key: 'about.differences.d1' },
    { icon: '👷', key: 'about.differences.d2' },
    { icon: '💎', key: 'about.differences.d3' },
    { icon: '🤝', key: 'about.differences.d4' },
  ];

  values = [
    { icon: '⭐', key: 'about.values.v1' },
    { icon: '🛡️', key: 'about.values.v2' },
    { icon: '💡', key: 'about.values.v3' },
    { icon: '❤️', key: 'about.values.v4' },
  ];

  stats = [
    { value: 100, suffix: '+', key: 'stats.projects' },
    { value: 80, suffix: '+', key: 'stats.clients' },
    { value: 10, suffix: '+', key: 'stats.years' },
    { value: 15, suffix: '', key: 'stats.team' },
  ];

  displayedStats: { value: number; target: number; suffix: string; key: string }[] = [];
  private observer: IntersectionObserver | null = null;
  private animated = false;

  ngOnInit() {
    this.displayedStats = this.stats.map(s => ({ ...s, value: 0, target: s.value }));
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    setTimeout(() => {
      const el = document.querySelector('.about-stats-section');
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
}
