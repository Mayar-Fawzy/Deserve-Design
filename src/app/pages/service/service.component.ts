import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  steps = [
    { num: '01', icon: '💬', key: 'service.steps.s1' },
    { num: '02', icon: '🎨', key: 'service.steps.s2' },
    { num: '03', icon: '🪵', key: 'service.steps.s3' },
    { num: '04', icon: '📋', key: 'service.steps.s4' },
    { num: '05', icon: '🔧', key: 'service.steps.s5' },
    { num: '06', icon: '🔑', key: 'service.steps.s6' },
  ];

  benefits = [
    { icon: '⭐', key: 'service.benefits.b1' },
    { icon: '💰', key: 'service.benefits.b2' },
    { icon: '👥', key: 'service.benefits.b3' },
    { icon: '🎯', key: 'service.benefits.b4' },
    { icon: '🔄', key: 'service.benefits.b5' },
    { icon: '❤️', key: 'service.benefits.b6' },
  ];
}
