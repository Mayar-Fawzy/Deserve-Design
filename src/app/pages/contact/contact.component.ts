import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { EmailService, ContactForm } from '../../core/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private emailService = inject(EmailService);

  submitting = signal(false);
  submitted = signal(false);
  error = signal('');

  form: ContactForm & { agree?: boolean } = {
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    date: '',
    message: '',
    agree: false,
  };

  projectTypes = [
    { value: 'apartment', labelKey: 'contact.form.project_types.apartment' },
    { value: 'villa',     labelKey: 'contact.form.project_types.villa' },
    { value: 'office',    labelKey: 'contact.form.project_types.office' },
    { value: 'other',     labelKey: 'contact.form.project_types.other' },
  ];

  contactInfo = [
    {
      icon: 'location',
      labelKey: 'contact.address',
      value: 'Cairo, Egypt',
    },
    {
      icon: 'phone',
      labelKey: 'contact.phone',
      value: '+20 XXX XXX XXXX',
    },
    {
      icon: 'email',
      labelKey: 'contact.email',
      value: 'momayar920@gmail.com',
    },
    {
      icon: 'clock',
      labelKey: 'contact.hours',
      value: 'Satâ€“Thu: 9AM â€“ 6PM',
    },
  ];

  async onSubmit(ngForm: NgForm) {
    if (ngForm.invalid) {
      Object.values(ngForm.controls).forEach(c => c.markAsTouched());
      return;
    }
    if (!this.form.agree) {
      this.error.set('Please agree to be contacted.');
      return;
    }

    this.submitting.set(true);
    this.error.set('');

    try {
      await this.emailService.send(this.form);
      this.submitted.set(true);
      ngForm.resetForm();
      this.form = { name: '', email: '', phone: '', projectType: '', description: '', date: '', message: '', agree: false };
    } catch {
      this.error.set('contact.form.error_msg');
    } finally {
      this.submitting.set(false);
    }
  }
}
