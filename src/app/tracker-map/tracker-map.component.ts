import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { searchSB } from '../models/searchSB.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmService } from '../services/adm-services/adm.service';
import { BusinessName } from '../models/businessName.model';
import { ApiService } from '../services/api-covid-services/api.service';
import { DataService } from '../services/data-services/data.service';


@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html',
  styleUrls: ['./tracker-map.component.scss']
})


export class TrackerMapComponent implements OnInit {
  [x: string]: any;

  //BusinessName Form Group
  businessSearch: FormGroup = new FormGroup({});

  //data
  searchSB: searchSB[] = [];
  businessName!: string;

  //map
  title: string = 'COVIDBIT project';
  lat!: number
  lng!: number 
  zoom: number = 10;
  address: string | undefined;
  private geoCoder!: google.maps.Geocoder;

  businessNameDB: BusinessName = { name: '' };
  locationToBeSearched: String = '';
  searchedBusinessID: String = '';

  //Map Marker Card Info
  endpoint: string = '';
  cardBusinessName: String = '';
  cardBusinessType: String = '';
  cardCertification!: boolean;
  cardBusinessLocation: String = ''; 
  foundBusinessCases: Array<any> = [];

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public adm: AdmService, private apiService: ApiService, public searchService: DataService) {}

  ngOnInit() {

    this.lat = 43.795246;
    this.lng = -79.3499;
    this.cardBusinessName = "COVIDBIT";

    this.searchSB = [
      {
        "ID": 1,
        "businessName": "CN Tower",
        "businessLocation": "290 Bremner Blvd",
        "category": "Entertainment",
        "cases": 0,
        "employees": "100"
      },
      {
        "ID": 2,
        "businessName": "Queen Street Warehouse",
        "businessLocation": "232 Queen St W",
        "category": "Restaurant",
        "cases": 10,
        "employees": "10-50"
      },
      {
        "ID": 3,
        "businessName": "Maha's Egyptian Brunch",
        "businessLocation": "226 Greenwood Ave",
        "category": "Restaurant",
        "cases": 2,
        "employees": "1-10"
      }

    ]

    this.businessSearch = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      searchLocation: new FormControl('')
    })
  
}

  onSubmit(){
    //Check if Business Name Entered Is in the Database
    this.adm.searchBusinessNameLocationAdm(this.businessNameDB).subscribe(
      data => {
        console.log(data);

        //Get Business Location and Store it
        this.getBusinessLocation(data);

        //Get Lat and Long of Business' Address 
        this.apiService.getLocationCoords(this.locationToBeSearched).subscribe((data) => {
          
          //Set Lat and Long of google map
          this.getCoords(data)

        })
      
        //Get Business Info for Map Marker Information Card
        this.searchService.getMapInfo(this.searchedBusinessID).subscribe((data) => {
          console.log(data);
          this.setMapInfoCard(data);
          this.endpoint = `http://localhost:4200/business-user-view/${this.searchedBusinessID}`
        })

      }
    );

    this.adm.searchUserCases(this.businessNameDB).subscribe(data => {
      console.log(data);
      this.getCases(data);
      console.log(this.foundBusinessCases);
    });

  }

  //Set Business Location 
  getBusinessLocation(data: any) {
    for (let i = 0; i < data.myUsers.length; i++) {

      if (data.myUsers[i].businessName == this.businessSearch.get('businessName')?.value) {
        this.locationToBeSearched = data.myUsers[i].location;
        this.searchedBusinessID = data.myUsers[i]._id;
      }

    }
  }

  getCases(data: any) {
    for (let i = 0; i < data.cases.length; i++) {

      if (data.cases[i].businessName == this.businessSearch.get('businessName')?.value) {
        this.foundBusinessCases.push(data.cases[i]);
      }

    }
  }

  //Set Coordinates for Google Map based on Business' Address
  getCoords(data: any) {
    for (let i = 0; i < data.results.length; i++) {

      // console.log(data.results[0].geometry.location.lat);
      // console.log(data.results[0].geometry.location.lng);

      this.lat = data.results[0].geometry.location.lat;
      this.lng = data.results[0].geometry.location.lng;
      this.zoom = 12;

    }
  }

  setMapInfoCard(data: any){
    this.cardBusinessName = data.foundBusiness.businessName;
    this.cardBusinessLocation = data.foundBusiness.location;
    this.cardBusinessType = data.foundBusiness.businessType;
    this.cardCertification = data.foundBusiness.certification;
  }

  //calendar   
  date = new Date();

 




}
