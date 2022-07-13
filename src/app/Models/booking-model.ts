import { PassengerModel } from "./passenger-model";

export interface BookingModel {
    flightId: number,
    name: string,
    email: string,
    noOfSeats: number,
    optForMeal: string,
    totalPrice: number,
    seatNumbers: string[],
    passengerList: PassengerModel[],
    airlineName: string
}
