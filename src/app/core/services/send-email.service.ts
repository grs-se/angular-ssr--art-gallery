import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  secretKey: string = "";

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  sendEmail(name: string, email: string, message: string) {

    let url = "https://formspree.io/f/" + this.secretKey;

    const httpOptions = {
      headers: new HttpHeaders({
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    let data = `name=${name}&email=${email}&message=${message}`;
    let errorMessage: string = "";

    this.httpClient.post<any>(url, data, httpOptions).subscribe({
      next: data => {
        console.log("email send" + JSON.stringify(data));
      },
      error: error => {
        errorMessage = error.message;
        console.log('error!', errorMessage);
      }
    });
  }
}
