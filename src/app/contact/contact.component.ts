import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../shared/components/feedback/toast';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  secretKey: string = "mgejpeda";

  emailForm = this.fb.group({
    name: [""],
    email: [""],
    phone: [""],
    subject: [""],
    message: [""]
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
    private toastService: ToastService) { }

  sendEmail(name: string, email: string, phone: string, subject: string, message: string) {

    let url = "https://formspree.io/f/" + this.secretKey;

    const httpOptions = {
      headers: new HttpHeaders({
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    let data = `name=${name}&email=${email}&phone=${phone}&subject=${subject}&message=${message}`;
    let errorMessage: string = "";

    this.httpClient.post<any>(url, data, httpOptions).subscribe({
      next: data => {
        console.log("email send" + JSON.stringify(data));
        // Show success component
        this.showToast("Your email was sent succesfully!", "success");
      },
      error: error => {
        errorMessage = error.message;
        console.log('error!', errorMessage);
        this.showToast("There was an error sending the email!", "error");
      }
    });
  }

  showToast(text: string, type: any) {
    this.toastService.show({
      text: text,
      type: type,
    });
  }
}
