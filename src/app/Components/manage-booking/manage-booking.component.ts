import { Component, OnInit } from '@angular/core';
import { SearchModel } from 'src/app/Models/search-model';
import { BookingManagementService } from 'src/app/Services/booking-management.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  ticketDetails: any = {};
  flightDetails: any = {};
  flightSearchModel: SearchModel | undefined;

  constructor(private bookingManagementService: BookingManagementService) { }

  ngOnInit(): void {
    this.flightSearchModel = {
      "FromPlace": "Guntur",
      "ToPlace": "Bangolore",
      "JourneyDate": "14-08-2022"
    };
    this.bookingManagementService.getFlights(this.flightSearchModel).subscribe(data => {
      console.log(data);
      this.flightDetails = data;
    });

    this.bookingManagementService.getTicketDetails("IO18WP").subscribe(obj => {
      console.log(obj);
      this.ticketDetails = obj;
    })
  }

}
