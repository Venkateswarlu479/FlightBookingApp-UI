import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = "http://localhost:7419/api/AirlineManagement/";
  }

  registerAirline(airlineRegisterModel: AirlineRegisterModel): Observable<string>{
    this.url = this.baseUrl+"RegisterAirline";
    return this.httpClient.post<string>(this.url, airlineRegisterModel);
  }

  getActiveAirlines(): Observable<string[]>{
    this.url = this.baseUrl+"GetAirlines";
    return this.httpClient.get<string[]>(this.url);
  }

  blockAirline(airlineName:string, userName:string):Observable<string>{
    this.url = this.baseUrl+"BlockAirline";
    let params = new HttpParams();
    params = params.append('airlineName', airlineName);
    params = params.append('userName', userName);
    return this.httpClient.post<string>(this.url, null, {params: {'airlineName': airlineName, 'userName': userName}})
  }

  addOrScheduleFlight(flightModel: FlightModel):Observable<string>{
    this.url = this.baseUrl+"AddOrScheduleFlight";
    return this.httpClient.post<string>(this.url, flightModel);
  }

  getFlightDetails(airlineName:string, flightNumber:string, instrumentUsed:string):Observable<FlightModel>{
    this.url = this.baseUrl+"FlightDetails/"+airlineName+"/"+flightNumber+"/"+instrumentUsed;
    return this.httpClient.get<FlightModel>(this.url);
  }
}
