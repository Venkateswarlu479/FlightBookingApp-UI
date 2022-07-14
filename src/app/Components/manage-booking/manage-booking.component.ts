import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SearchModel } from 'src/app/Models/search-model';
import { BookingManagementService } from 'src/app/Services/booking-management.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { PassengerModel } from 'src/app/Models/passenger-model';
import { BookingModel } from 'src/app/Models/booking-model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  ticketDetails: any = {};
  flightDetails: any[] = [];
  searchFlightForm: any;
  flightSearched:boolean = false;
  flightModel: any = {};

  bookingDetails: BookingModel = {
    "flightId": 0,
      "name": '',
      "email": '',
      "bookingClass": '',
      "noOfSeats": 0,
      "airlineName": '',
      "optForMeal": '',
      "seatNumbers": [],
      "passengerList": [],
      "totalPrice": 0,
      "journeydate": ''
  };
  passengersList: PassengerModel[] = [];
  seatNumbers: string[] = [];
  bookingInfoForm:any;
  bookingInfoAdded: boolean = false;
  flightId: number = 0;
  airlineName: string = '';
  bizClassTicketPrice:number=0;
  nonBizClassTicketPrice:number=0;
  journeyDate:string = '';
  mealList:string[] = ["Veg","Non-Veg","None"]
  mealOpted:string = '';
  bookingClassType: string[] = ["Business Class", "NonBusiness Class"]
  bookingClassSelected: string = '';
  genderType: string[] = ["Male", "Female", "others"]
  genderSelected: string = '';
  emailId: any = localStorage.getItem("emailId");
  userName: any = localStorage.getItem("userName");
  passengerCount:number = 0;

  discountForm:any;
  discountApplied: boolean = false;
  discountAmount: number = 0;
  pnrNumber: string = '';
  ticketFetched: boolean = false;
  bookingHistory:any[] = [];
  cancelAllowed: boolean = false;
  date:Date = new Date()

  @ViewChild('content') content!: ElementRef;

  constructor(private bookingManagementService: BookingManagementService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.searchFlightForm = this.formBuilder.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      journeyDate: ['', Validators.required]
    });
    
    this.bookingInfoForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bookingClass: ['', Validators.required],
      noOfSeats: ['', Validators.required],
      optForMeal: ['', Validators.required],
      seatNumber: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.discountForm = this.formBuilder.group({
      discountCode: ['']
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

    let flightSearchModel: SearchModel = {
      "FromPlace": this.searchFlightForm.value.fromPlace,
      "ToPlace": this.searchFlightForm.value.toPlace,
      "JourneyDate": this.searchFlightForm.value.journeyDate,
    };
    this.bookingManagementService.getFlights(flightSearchModel).subscribe( 
      data => {
        this.flightDetails = data;
        this.snackBar.open("Flights fetched successfully", "GetFlights", {duration: 1000});
      },
      error => {
        console.log(error);
        this.snackBar.open("Exception occured while getting response", "GetFlights", {duration: 1000});
      }
    );
  }

  resetSearchForm(){
    this.flightSearched = false;
    this.searchFlightForm.reset();
  }

  //Book ticket code starts
  addFlightDetails(flightModel:any){
    console.log(flightModel);
    this.airlineName = flightModel.airlineName;
    this.flightId = flightModel.flightId;
    this.bizClassTicketPrice = flightModel.bizClassTicketPrice;
    this.nonBizClassTicketPrice = flightModel.nonBizClassTicketPrice;
    this.journeyDate = flightModel.scheduledDate;
  }

  get bookingInfoControls(){
    return this.bookingInfoForm.controls;
  }

  addPassenger(value: any){
    this.passengerCount++;
    let passenger: PassengerModel = {
      "name": value.name,
      "age": value.age,
      "gender": value.gender
    }
    this.passengersList.push(passenger);
    this.seatNumbers.push(value.seatNumber);

    console.log(this.passengersList, this.seatNumbers);
    if(this.passengerCount < value.noOfSeats){
      this.bookingInfoForm.controls['name'].reset();
      this.bookingInfoForm.controls['age'].reset();
      this.bookingInfoForm.controls['gender'].reset();
      this.bookingInfoForm.controls['seatNumber'].reset();
    }
  }

  addBookingInfo(){
    this.bookingInfoAdded = true;

    if(this.bookingInfoForm.invalid)
    return

    this.bookingDetails = {
      "flightId": this.flightId,
      "name": this.userName,
      "email": this.emailId,
      "bookingClass": this.bookingInfoForm.value.bookingClass,
      "noOfSeats": this.bookingInfoForm.value.noOfSeats,
      "airlineName": this.airlineName,
      "optForMeal": this.bookingInfoForm.value.optForMeal,
      "seatNumbers": this.seatNumbers,
      "passengerList": this.passengersList,
      "journeydate": this.journeyDate,
      "totalPrice": this.bookingInfoForm.value.bookingClass == "Business Class" ? this.bizClassTicketPrice : this.nonBizClassTicketPrice
    };

    console.log(this.bookingDetails);
  }

  resetBookingForm(){
    this.bookingInfoAdded = false;
    this.passengerCount = 0;
    this.bookingInfoForm.reset();
  }

  //Apply discount form code starts
  get discountFormControls(){
    return this.discountForm.controls;
  }

  applyDiscount(){
    this.discountApplied = true;

    if(this.discountForm.invalid)
    return

    this.bookingManagementService.getDiscount(this.discountForm.value.discountCode).subscribe(
      data => {
        this.discountAmount = data.discountAmount;
        this.bookingDetails.totalPrice = this.bookingDetails.totalPrice - this.discountAmount;
        console.log(this.bookingDetails.totalPrice);
        this.snackBar.open("Discount Applied", "applyDiscount", {duration: 1000});
      },
      error => {
        console.log(error);
        this.snackBar.open("Discount code is invalid/expired", "applyDiscount", {duration: 1000});
      }
    );
  }

  resetDiscountForm(){
    this.discountApplied = false;
    this.discountForm.reset();
  }

  bookTicket(){
    console.log(this.bookingDetails);
    this.bookingManagementService.bookTicket(this.bookingDetails).subscribe(
      data =>{
        //this.pnrNumber = data;
        console.log(data);
        this.snackBar.open("Booking successful "+data, "bookTicket")
      },
      error => {
        console.log(error);
        this.snackBar.open("Exception occured while getting response", "bookTicket", {duration: 1000});
      }
    );
  }

  getTicketDetailsByPNR(pnr: string){
    let latestDate = this.datepipe.transform(this.date, "yyyy-MM-dd");
    this.bookingManagementService.getTicketDetails(pnr).subscribe(
      data => {
        console.log(data);
        this.ticketFetched = true;
        this.cancelAllowed = (data.journeydate == latestDate) ? true : false;
        this.ticketDetails = data;
        this.snackBar.open("Ticket Details fetched successfully", "getTicketDetailsByPNR", {duration: 1000});
      },
      error => {
        console.log(error);
        this.snackBar.open("Error occured while fetching ticket details", "getTicketDetailsByPNR", {duration: 1000});
      }
    );
  }

  cancelTicketDetailsByPNR(pnr: string){
    this.bookingManagementService.cancelTicketByPNR(pnr).subscribe(
      data => {
        console.log(data);
        this.snackBar.open("Ticket cancelled successfully", "cancelTicketDetailsByPNR", {duration: 1000});
      },
      error => {
        console.log(error);
        this.snackBar.open("Error occured while cancelling ticket", "cancelTicketDetailsByPNR", {duration: 1000});
      }
    );
  }

  getBookingHistoryByEmailId(){
    this.bookingManagementService.getBookingHistoryByEmail(this.emailId).subscribe(
      data => {
        console.log(data);
        this.bookingHistory = data;
        this.snackBar.open("Booking history fetched successfully", "getBookingHistoryByEmailId", {duration: 1000});
      },
      error => {
        console.log(error);
        this.snackBar.open("Error occured while fetching Booking History", "getBookingHistoryByEmailId", {duration: 1000});
      }
    );
  }

  downloadTicket(){
    html2canvas(this.content.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.content.nativeElement.innerHTML)
      PDF.save(`Flight Ticket.pdf`);
    });
  }
  
  onTabChanged(event: MatTabChangeEvent){
    if(event.index == 4){
      this.getBookingHistoryByEmailId();
    }
  }

  viewPassengerInfo(data:any){
    console.log(data);
    alert("Passenger Info\n\n"+ JSON.stringify(data));
  }
}
