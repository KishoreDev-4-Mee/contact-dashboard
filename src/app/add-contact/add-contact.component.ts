import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      addresses: this.fb.array([this.createAddress()], Validators.required),
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  }

  get addresses() {
    return this.contactForm.get('addresses') as FormArray;
  }

  createAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  addAddress() {
    if (this.addresses.length < 5) {
      this.addresses.push(this.createAddress());
    }
  }

  removeAddress(index: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  onSubmit() {
    const savedData = localStorage.getItem('contactFormData');
    const UserData = savedData ? JSON.parse(savedData) : [];
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      UserData.push(formData)
      localStorage.setItem('contactFormData', JSON.stringify(UserData));
      console.log('Form data saved to localStorage:', formData);

      this.contactForm.reset()


    }
  }

}
