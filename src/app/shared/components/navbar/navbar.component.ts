import { Component, inject, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  langService = inject(LanguageService);

  isScrolled = signal(false);
  mobileOpen = signal(false);

  navLinks = [
    { path: '/', key: 'nav.home', exact: true },
    { path: '/works', key: 'nav.works', exact: false },
    { path: '/service', key: 'nav.service', exact: false },
    { path: '/about', key: 'nav.about', exact: false },
    { path: '/contact', key: 'nav.contact', exact: false },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobile() {
    this.mobileOpen.update(v => !v);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }
}
