import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertEmail } from '../../models/alert-email';

@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.scss'],
  imports: [
    NgClass,
    NgForOf,
    FormsModule
  ],
  standalone: true
})
export class EmailManagementComponent implements OnInit {
  emails: string[] = [];
  searchTerm: string = '';
  newEmail: string = '';

  constructor(private alertService: AlertService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.alertService.getAlertEmailList().subscribe({
      next: (emails: AlertEmail[]) => {
        this.emails = emails.map(e => e.email);
      },
      error: () => {
        this.toastr.error('Failed to load email list');
      }
    });
  }
  filteredEmails(): string[] {
    return this.emails.filter(email => email.toLowerCase().includes(this.searchTerm.toLowerCase())).sort();
  }

  addEmail(): void {
    if (this.newEmail) {
      const alertEmail: AlertEmail = { email: this.newEmail };
      this.alertService.addEmailToAlertList(alertEmail).subscribe({
        next: (alertEmail) => {
          this.toastr.success('Email added successfully');
          this.loadEmails();
          this.newEmail = '';
        },
        error: (error) => {
          this.toastr.error(error);
        }
      });
    }
  }

  deleteEmail(email: string): void {
    const alertEmail: AlertEmail = { email };
    this.alertService.deleteEmailFromAlertList(alertEmail).subscribe({
      next: (alertEmail) => {
        this.toastr.success('Email deleted successfully');
        this.loadEmails();
      },
      error: () => {
        this.toastr.error('Failed to delete email');
      }
    });
  }
}
