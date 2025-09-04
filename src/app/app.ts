import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  loading = signal(false);
  success = signal<boolean | undefined>(undefined);

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    message: [''],
  });

  // ⚡ Замінити на адресу твого Worker
  private apiUrl = 'https://sendtelegram-fj4pnyrp4a-uc.a.run.app';

  submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.success.set(undefined);

    this.http.post(this.apiUrl, this.form.value).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.form.reset();
      },
      error: () => {
        this.success.set(false);
        this.loading.set(false);
      },
    });
  }
}
