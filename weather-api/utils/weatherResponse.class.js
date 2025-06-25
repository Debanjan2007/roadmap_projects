const weatherResponse = class {
    constructor(location , dateTime , forecast , current){
        this.location = location;
        this.dateTime = dateTime;
        this.forecast = forecast;
        this.current = current;
    }
}

export default weatherResponse;
