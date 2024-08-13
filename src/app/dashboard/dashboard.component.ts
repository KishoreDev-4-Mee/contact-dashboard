import { Component, OnInit } from '@angular/core';
import { Loader, LoaderOptions } from 'google-maps';
import * as L from "leaflet";

declare var DataTable: any
// declare var L: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showData = true
  loading = true
  ngOnInit() {

    setTimeout(() => {
      // new DataTable('#userdata', {
      //   colReorder: true,
      //   responsive: true
      // })
      this.loading = false
      setTimeout(() => {
        const savedData = localStorage.getItem('contactFormData');

        if (savedData) {
          this.showData = true

          const UserData = savedData ? JSON.parse(savedData) : [];

          new DataTable('#userdata', {
            data: UserData,
            columns: [
              { title: "Name", data: 'name' },
              { title: "Phone Number", data: 'phonenumber' },
              { title: "Email", data: 'email' },
              { title: "Longitude", data: 'longitude' },
              { title: "Latitude", data: 'latitude' },
              {
                title: "Addresses",
                data: 'addresses',
                render: function (data: any, type: any, row: any) {
                  return data.map((address: any) => `${address.street}, ${address.city}, ${address.state}, ${address.zip}`).join('.<br>');
                }
              }
            ]
          })

          this.initMap(UserData)
        }
        else {
          this.showData = false

        }

        // map Integration



      }, 1000)
      // this.map()


    }, 2000);
  }

  initMap(userData: any) {


    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var members: any = [
      // { name: 'John Doe', lat: 40.7128, lng: -74.0060 }, // New York
      // { name: 'Jane Smith', lat: 34.0522, lng: -118.2437 }, // Los Angeles
      // { name: 'Sam Brown', lat: 41.8781, lng: -87.6298 }, // Chicago
      // { name: 'Lisa White', lat: 29.7604, lng: -95.3698 } // Houston
    ];

    userData.forEach((user: any) => {
      members.push({ name: user.name, lat: user.latitude, lng: user.longitude })
    })

    members.forEach((member: any) => {
      const marker = L.marker([member.lat, member.lng]).addTo(map);
      marker.bindPopup(`<h3>${member.name}</h3>`);
    });

  }

  // updateLocalStorage() {
  //   const savedData = localStorage.getItem('contactFormData');
  //   if (savedData) {
  //     const formData = JSON.parse(savedData);

  //     // Update specific fields (example: updating name)
  //     // formData.name = this.contactForm.get('name').value;

  //     localStorage.setItem('contactFormData', JSON.stringify(formData));
  //     console.log('Form data updated in localStorage:', formData);
  //   }
  // }


  async map() {
    const options: LoaderOptions = {/* todo */ };
    const loader = new Loader('AIzaSyCzPraGiYde-bqKxkCgiETLDXov135IKbA', options);

    const google = await loader.load();
    const map = new google.maps.Map(document.getElementById('map')!, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
}
