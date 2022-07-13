import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchModel} from 'src/app/Models/search-model';
import { BookingModel } from '../Models/booking-model';

@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {
  baseUrl:string;
  url:string = '';

  constructor(private httpclient: HttpClient) {
    this.baseUrl = "http://localhost:22842/api/FlightBooking/";
   }

  getFlights(flightSearchModel: SearchModel):Observable<any>{
  this.url = this.baseUrl+"SearchFlight";
  const httpOptions = new HttpHeaders(
    {
      "Content-Type": 'application/json',
      "Authorization": 'bearer '+localStorage.getItem("token")
    }
  )

  return this.httpclient.post<SearchModel>(this.url, flightSearchModel, {headers: httpOptions});
  }

  bookTicket(bookingDetails: BookingModel){
    this.url = this.baseUrl+"BookTicket";
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )
    
    return this.httpclient.post(this.url, bookingDetails, {headers: httpOptions, responseType: 'text'})
  }

  getTicketDetails(pnr: string):Observable<any>{
    this.url = this.baseUrl+"TicketDetails/"+pnr;
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpclient.get(this.url, {headers: httpOptions});
  }

  cancelTicketByPNR(pnr: string){
    this.url = this.baseUrl+"CancelTicket";
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpclient.post(this.url, null,{headers: httpOptions, params: {'pnrNumber': pnr}, responseType: 'text'});
  }

  getBookingHistoryByEmail(email: string){
    this.url = this.baseUrl+"BookingHistory/"+email;
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpclient.get(this.url, {headers: httpOptions});
  }

  getPassengersData(bookingId: number){
    this.url = this.baseUrl+"PassengersData/"+bookingId;
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpclient.get(this.url, {headers: httpOptions});
  }

  getDiscount(discountCode: string){
    this.url = this.baseUrl+"GetDiscount/"+discountCode;
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpclient.get(this.url, {headers: httpOptions});
  }

  addDiscount(discountCode: string, amount:number){
    this.url = this.baseUrl+"AddDiscount";
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpclient.post(this.url, null, {headers: httpOptions, params: {"discountCode": discountCode, "discountAmount": amount}, responseType: 'text'});
  }
}
