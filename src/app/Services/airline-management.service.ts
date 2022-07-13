import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineRegisterModel } from '../Models/airline-register-model';
import { FlightModel } from '../Models/flight-model';

@Injectable({
  providedIn: 'root'
})
export class AirlineManagementService {
  baseUrl:string;
  url: string = '';
  token: any;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = "http://localhost:7419/api/AirlineManagement/";
  }

  registerAirline(airlineRegisterModel: AirlineRegisterModel){
    this.url = this.baseUrl+"RegisterAirline";
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpClient.post(this.url, airlineRegisterModel, {headers: httpOptions, responseType: 'text'});
  }

  getActiveAirlines(): Observable<string[]>{
    this.url = this.baseUrl+"GetAirlines";
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )

    return this.httpClient.get<string[]>(this.url, {headers: httpOptions});
  }

  blockAirline(airlineName:string, userName:string){
    this.url = this.baseUrl+"BlockAirline";
    let params = new HttpParams();
    params = params.append('airlineName', airlineName);
    params = params.append('userName', userName);

    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )
    
    return this.httpClient.post(this.url, null, {headers: httpOptions, params: {'airlineName': airlineName, 'userName': userName}, responseType: 'text'});
  }

  addOrScheduleFlight(flightModel: FlightModel){
    this.url = this.baseUrl+"AddOrScheduleFlight";
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )
    return this.httpClient.post(this.url, flightModel, {headers: httpOptions, responseType: 'text'});
  }

  getFlightDetails(airlineName:string, flightNumber:string, instrumentUsed:string):Observable<FlightModel>{
    this.url = this.baseUrl+"FlightDetails/"+airlineName+"/"+flightNumber+"/"+instrumentUsed;
    const httpOptions = new HttpHeaders(
      {
        "Content-Type": 'application/json',
        "Authorization": 'bearer '+localStorage.getItem("token")
      }
    )
    return this.httpClient.get<FlightModel>(this.url, {headers: httpOptions});
  }
}
