import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AirlineManagementService } from 'src/app/Services/airline-management.service';
import { AirlineRegisterModel } from 'src/app/Models/airline-register-model';
import { FlightModel } from 'src/app/Models/flight-model';

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.css']
})
export class ManageAirlineComponent implements OnInit {
  airlineRegisterForm: any;
  airlineAdded: boolean = false;
  airlineRegisterModel:AirlineRegisterModel | undefined;

  airlineBlockForm: any;
  airlineBlocked: boolean = false;
  selectedAirline:any;
  airlineList: string[] = [];

  addInventoryForm: any;
  inventoryAdded:boolean = false;
  mealList:string[] = ["Non-veg", "Veg", "None"];
  mealOpted: any;

  searchScheduleForm:any;
  scheduleSearched:boolean = false;
  flightModel:any = {};
  userName:string = "Venkat";
  airlineStatus:string = "Active";
  flightStatus:string = "Active";
  editClicked: boolean = false;
  mealOptionEdited:any;

  constructor(private formBuilder:FormBuilder, private airlineManageService: AirlineManagementService) { }

  ngOnInit(): void {
    this.airlineRegisterForm = this.formBuilder.group({
      airlineName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      contactAdress: ['', Validators.required]
    });

    this.airlineBlockForm = this.formBuilder.group({
      airlineName: ['', Validators.required]
    });

    this.addInventoryForm = this.formBuilder.group({
      flightNumber: ['', Validators.required],
      airlineName: ['', Validators.required],
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      departureTime: ['', Validators.required],
      reachTime: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      instrumentUsed: ['', Validators.required],
      noOfBizClassSeats: ['', Validators.required],
      noOfNonBizClassSeats: ['', Validators.required],
      ticketCost: ['', Validators.required],
      noOfRows: ['', Validators.required],
      optedForMeal: ['', Validators.required]
    });

    this.searchScheduleForm = this.formBuilder.group({
      airlineName: ['', Validators.required],
      flightNumber: ['', Validators.required],
      instrumentUsed: ['', Validators.required]
    });

    this.airlineManageService.getActiveAirlines().subscribe(
      data => {
        if(data != null || data != undefined)
        this.airlineList = data;
        console.log(data)
      }
    );
  }

  //Add or Register Airline code
  get addAirlineControls(){
    return this.airlineRegisterForm.controls;
  }

  addAirline(){
    this.airlineAdded = true;
    if(this.airlineRegisterForm.invalid)
    return

    //service call
    this.airlineRegisterModel = {
        "airlineName": this.airlineRegisterForm.value.airlineName,
        "contactNumber": this.airlineRegisterForm.value.contactNumber,
        "contactAddress": this.airlineRegisterForm.value.contactAddress,
        "airlineStatus": this.airlineStatus,
        "userName": this.userName
    }
    this.airlineManageService.registerAirline(this.airlineRegisterModel).subscribe(
      data => {
        if(data != null || data != undefined){
          alert(data);
        }
      }
    );
    //alert('success!')
  }

  resetAddAirlineForm(){
    this.airlineAdded = false;
    this.airlineRegisterForm.reset();
  }

  // Block Airline code
  get blockAirlineControls(){
    return this.airlineBlockForm.controls;
  }

  blockAirline(){
    this.airlineBlocked = true;
    if(this.airlineBlockForm.invalid)
    return
    console.log(this.selectedAirline);
    //service call
    this.airlineManageService.blockAirline(this.selectedAirline, this.userName).subscribe(
      data => {
        if(data != null || data != undefined){
          alert(data);
        }
      }
    )
    //alert('success!')
  }

  resetBlockAirlineForm(){
    this.airlineBlocked = false;
    this.airlineBlockForm.reset();
  }

  //Add Inventory or flight code
  get addInventoryControls(){
    return this.addInventoryForm.controls;
  }

  addInventory(){
    this.inventoryAdded = true;
    if(this.addInventoryForm.invalid)
    return
    let flightDetails = this.addInventoryForm.value;
    this.flightModel = {
        "flightId": 0,
        "flightNumber": flightDetails.flightNumber,
        "airlineName": flightDetails.airlineName,
        "fromPlace": flightDetails.fromPlace,
        "toPlace": flightDetails.toPlace,
        "departureTime": flightDetails.departureTime,
        "reachTime": flightDetails.reachTime,
        "scheduledDate": flightDetails.scheduledDate,
        "instrumentUsed": flightDetails.instrumentUsed,
        "noOfBizClassSeats": flightDetails.noOfBizClassSeats,
        "noOfNonBizClassSeats": flightDetails.noOfNonBizClassSeats,
        "ticketCost": flightDetails.ticketCost,
        "noOfRows": flightDetails.noOfRows,
        "optedForMeal": flightDetails.optedForMeal,
        "flightStatus": this.flightStatus,
        "createdBy": this.userName
    }
    //service call
    this.airlineManageService.addOrScheduleFlight(this.flightModel).subscribe(
      data => {
        if(data != null || data != undefined){
          alert(data);
        }
      }
    );
  }

  resetInventoryForm(){
    this.inventoryAdded = false;
    this.addInventoryForm.reset();
  }

  //Search Schedule code
  get scheduleSearchControls(){
    return this.searchScheduleForm.controls;
  }

  searchSchedule(){
    this.scheduleSearched = true;
    if(this.searchScheduleForm.invalid)
    return

    let scheduleSearchInputs = this.searchScheduleForm.value
    //service call
    this.airlineManageService.getFlightDetails(scheduleSearchInputs.airlineName, scheduleSearchInputs.flightNumber, scheduleSearchInputs.instrumentUsed)
    .subscribe(
      data => {
        if(data != null || data != undefined){
          this.flightModel = data;
          console.log(this.flightModel);
          //alert("success");
        }
      }
    );
  }

  resetScheduleForm(){
    this.scheduleSearched = false;
    this.searchScheduleForm.reset();
  }

  editFlight(flightModel: FlightModel){
    this.editClicked = true;
  }

  scheduleFlight(flightModel:FlightModel){
    this.editClicked = false;
    console.log(flightModel)
    this.airlineManageService.addOrScheduleFlight(flightModel).subscribe(
      response =>{
        alert(response);
      }
    );
  }
}
