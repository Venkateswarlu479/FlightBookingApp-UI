export interface FlightModel {
    flightId: number,
    flightNumber: string,
    airlineName: string,
    fromPlace: string,
    toPlace: string,
    departureTime: string,
    reachTime: string,
    scheduledDate: string,
    instrumentUsed: string,
    noOfBizClassSeats: number,
    noOfNonBizClassSeats: number,
    ticketCost: number,
    noOfRows: number,
    optedForMeal: string,
    flightStatus: string,
    createdBy: string
}
