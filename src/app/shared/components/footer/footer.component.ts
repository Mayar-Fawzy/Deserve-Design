import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  links = [
    { path: '/', key: 'nav.home' },
    { path: '/works', key: 'nav.works' },
    { path: '/service', key: 'nav.service' },
    { path: '/about', key: 'nav.about' },
    { path: '/contact', key: 'nav.contact' },
  ];
}
