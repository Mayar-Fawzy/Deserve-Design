import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="min-h-screen" style="padding-top: 76px;">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`:host { display: block; }`]
})
export class App implements OnInit {
  private themeService = inject(ThemeService);
  private langService = inject(LanguageService);

  ngOnInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }
}
