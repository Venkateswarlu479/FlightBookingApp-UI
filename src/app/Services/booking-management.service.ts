import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SearchModel} from 'src/app/Models/search-model';

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
  return this.httpclient.post<SearchModel>(this.url, flightSearchModel);
  }

  getTicketDetails(pnr: string):Observable<any>{
    this.url = this.baseUrl+"TicketDetails/"+pnr;
    return this.httpclient.get(this.url);
  }
}
