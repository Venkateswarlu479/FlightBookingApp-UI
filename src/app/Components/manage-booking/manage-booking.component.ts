import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SearchModel } from 'src/app/Models/search-model';
import { BookingManagementService } from 'src/app/Services/booking-management.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { PassengerModel } from 'src/app/Models/passenger-model';
import { BookingModel } from 'src/app/Models/booking-model';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  ticketDetails: any = {};
  flightDetails: any[] = [];
  flightSearchModel: SearchModel | undefined;
  searchFlightForm: any;
  flightSearched:boolean = false;
  flightModel: any = {};

  passengersList: PassengerModel[] = [];
  seatNumbers: string[] = [];
  bookingDetails: BookingModel | undefined;
  bookingInfoForm:any;
  bookingInfoAdded: boolean = false;
  flightId: any;
  airlineName: any;


  constructor(private bookingManagementService: BookingManagementService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchFlightForm = this.formBuilder.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      journeyDate: ['', Validators.required]
    });
    
    this.bookingInfoForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      noOfSeats: ['', Validators.required],
      optForMeal: ['', Validators.required],
      seatNumber: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  //search flight code starts
  get searchFlightControls(){
    return this.searchFlightForm.controls;
  }

  searchFlight(){
    this.flightSearched = true;
    if(this.searchFlightForm.invalid)
    return

    this.flightSearchModel = {
      "FromPlace": this.searchFlightForm.value.fromPlace,
      "ToPlace": this.searchFlightForm.value.toPlace,
      "JourneyDate": this.searchFlightForm.value.journeyDate,
    };
    this.bookingManagementService.getFlights(this.flightSearchModel).subscribe( 
      data => {
        this.flightDetails = data;
        this.snackBar.open("Flights fetched successfully", "GetFlights", {duration: 1000});
      },
      error => {
        console.log(error);
      }
    );
  }

  resetSearchForm(){
    this.flightSearched = false;
    this.searchFlightForm.reset();
  }

  //ticket booking code starts
  BookTickets(flightModel:any){
    console.log(flightModel);
    this.airlineName = flightModel.airlineName;
    this.flightId = flightModel.flightId;
  }

  get bookingInfoControls(){
    return this.bookingInfoForm.valid;
  }

  addBookingInfo(){

  }
  ContinueBooking(){
    this.bookingInfoAdded = true;
  }

  resetBookingForm(){
    this.bookingInfoAdded = false;
    this.bookingInfoForm.reset();
  }






















  getTicketDetailsByPNR(pnr: string){
    this.bookingManagementService.getTicketDetails(pnr).subscribe(
      obj => {
        console.log(obj);
        this.ticketDetails = obj;
        this.snackBar.open("Ticket Details fetched successfully", "getTicketDetailsByPNR", {duration: 1000});
      },
      error => {
        console.log(error);
      }
    );
  }
}
