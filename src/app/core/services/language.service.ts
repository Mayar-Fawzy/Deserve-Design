import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  currentLang = signal<'en' | 'ar'>('en');

  constructor() {
    const saved = localStorage.getItem('deserve-lang') as 'en' | 'ar' | null;
    const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
    const lang = saved || browserLang;
    this.currentLang.set(lang);
    this.applyLang(lang);

    effect(() => {
      this.applyLang(this.currentLang());
    });
  }

  toggle() {
    this.currentLang.update(l => (l === 'en' ? 'ar' : 'en'));
  }

  setLanguage(lang: 'en' | 'ar') {
    this.currentLang.set(lang);
  }

  get isRtl(): boolean {
    return this.currentLang() === 'ar';
  }

  private applyLang(lang: 'en' | 'ar') {
    this.translate.use(lang);
    document.documentElement.setAttribute('lang', lang);
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('deserve-lang', lang);
  }
}
