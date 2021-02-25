import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html',
  styleUrls: ['./tracker-map.component.scss']
})


export class TrackerMapComponent implements OnInit {
  
  //map
  title: string = 'COVIDBIT project';
  lat: number = 43.651070;
  lng: number = -79.347015;
  zoom: number = 10;
  address: string | undefined;
  private geoCoder!: google.maps.Geocoder;


  //COVID-19 Tracker API Variables
  caseInformation: any;
  currentDate: any;
  totalCases: any
  totalCriticals: any
  totalFatalities: any
  totalHospitalizations: any;
  totalRecoveries: any;
  totalTests: any
  totalVaccinations: any
  totalVaccinated: any
  totalVaccinesDistributed: any

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor ( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private apiService: ApiService) { }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    
    //Call COVID API
    this.apiService.getCaseData().subscribe((data) => {
      console.log("Connection Made")
      this.caseInformation = data;

      //Check for ON (Ontario) Province Prefix
      for (let i = 0; i < this.caseInformation.data.length; i++) {
        if (this.caseInformation.data[i].province == "ON") {

            //Store API Data in Varibales (All Total Data)
            this.currentDate = this.caseInformation.data[i].date;
            this.totalCases = this.caseInformation.data[i].total_cases;
            this.totalCriticals = this.caseInformation.data[i].total_criticals;
            this.totalFatalities = this.caseInformation.data[i].total_fatalities;
            this.totalHospitalizations = this.caseInformation.data[i].total_hospitalizations;
            this.totalRecoveries = this.caseInformation.data[i].total_recoveries;
            this.totalTests = this.caseInformation.data[i].total_tests;
            this.totalVaccinations = this.caseInformation.data[i].total_vaccinations;
            this.totalVaccinated = this.caseInformation.data[i].total_vaccinated;
            this.totalVaccinesDistributed = this.caseInformation.data[i].total_vaccines_distributed;
            return
        } else {
          console.log("false")
          return
        }
      }
      
    })

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(lat: number, lng: number) {
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng } }, (results: { formatted_address: string; }[], status: string) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  //calendar   
  date = new Date();
  
}
