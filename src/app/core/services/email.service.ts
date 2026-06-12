import { Injectable } from '@angular/core';

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  date?: string;
  message?: string;
}

// Uses FormSubmit.co — zero-setup, no account needed.
// FIRST submission: FormSubmit sends a confirmation email to momayar920@gmail.com.
// Click the activation link in that email once. All future submissions deliver instantly.

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly endpoint = 'https://formsubmit.co/ajax/f5a609f994cccfffc259758d03e8e4ae';

  async send(form: ContactForm): Promise<void> {
    const payload = {
      _subject: `New Design Inquiry — ${this.formatType(form.projectType)} | ${form.name}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: form.email,
      'Client Name': form.name,
      'Email Address': form.email,
      'Phone Number': form.phone,
      'Project Type': this.formatType(form.projectType),
      'Project Description': form.description,
      'Preferred Start Date': form.date || 'Flexible / Not specified',
      'Additional Notes': form.message || '—',
    };

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed: HTTP ${response.status}`);
    }

    const result = await response.json() as { success: boolean; message?: string };
    if (!result.success) {
      throw new Error(result.message ?? 'Submission rejected by server');
    }
  }

  private formatType(type: string): string {
    const labels: Record<string, string> = {
      apartment: 'Apartment',
      villa: 'Villa / House',
      office: 'Office / Commercial',
      other: 'Other',
    };
    return labels[type] ?? type;
  }
}
