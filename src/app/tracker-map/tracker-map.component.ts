
import { Component, OnInit, ViewChild} from '@angular/core';

import { searchSB } from '../models/searchSB.model';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmService } from '../services/adm-services/adm.service';
import { BusinessName } from '../models/businessName.model';
import { ApiService } from '../services/api-covid-services/api.service';
import { DataService } from '../services/data-services/data.service';
import { BusinessNameandLocation } from '../models/businessName&Location.model';



@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html',
  styleUrls: ['./tracker-map.component.scss']
})


export class TrackerMapComponent implements OnInit {

  //BusinessName Form Group
  businessSearch: FormGroup = new FormGroup({});

  //data
  searchSB: searchSB[] = [];
  businessName!: string;

  //map
  title: string = 'COVIDBIT project';
  lat!: any
  lng!: any
  latTest: number = 43.8563158
  lngTest: number = -79.5085383
  zoom: number = 10;
  mapMarkers: Array<any> = [];
  markerInfo!: BusinessNameandLocation

  businessNameDB: BusinessName = { name: '' };
  businessNameSearch: BusinessName = { name: 'Pizza Pizaa' };
  locationToBeSearched: String = '';
  searchedBusinessID: String = '';

  //Map Marker Card Info
  endpoint: string = '';
  cardBusinessName: String = '';
  cardBusinessType: String = '';
  cardCertification!: boolean;
  cardBusinessLocation: String = ''; 
  foundBusinessCases: Array<any> = [];

  markers: BusinessNameandLocation[] = [];
  mapMarkerCaseCount!: number;
  userLocationMarkerAnimation: any = 'DROP';
  validSearch = false;
  indexToChange!: number

  @ViewChild('infoWindow') markerInfoWindow;


  constructor(public adm: AdmService, private apiService: ApiService, public searchService: DataService) {}

  ngOnInit() {

    this.searchService.getAllBusiness().subscribe(    
      data => {
        console.log(data);
        this.initializeMapMarkers(data);
      });

    this.lat = 43.795246;
    this.lng = -79.3499;
    this.cardBusinessName = "COVIDBIT";

    this.businessSearch = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      searchLocation: new FormControl('')
    })
  
}

  onSubmit() {

    let searchedBusiness = this.markers.find(e => e.name === this.businessSearch.get('businessName')?.value);
    console.log(searchedBusiness);

    if (this.businessSearch.get('businessName')?.value === searchedBusiness?.name) {
      this.validSearch = false;
      this.lat = searchedBusiness?.lat;
      this.lng = searchedBusiness?.lng;
      this.zoom = 12;

      let foundIndex = this.markers.findIndex(x => x.id == searchedBusiness?.id);
      this.markers[foundIndex].animation = 'BOUNCE';

      function quickChange(index, array){
        array[index].animation = 'DROP';
      }

      setTimeout(quickChange, 2000, foundIndex, this.markers);

      

    } else {
      this.validSearch = true;
    }

  }

  initializeMapMarkers(data: any){
     for (let i = 0; i < data.users.length; i++) {
       
      let newMarker = {} as BusinessNameandLocation;

      //Set Business Info
      newMarker.name = data.users[i].businessName;
      newMarker.location = data.users[i].location;
      newMarker.businessType = data.users[i].businessType;
      newMarker.id = data.users[i]._id;
      newMarker.animation = 'DROP';

      //Make Call to Google API to get Coords of the businesses location/address
      this.apiService.getLocationCoords(data.users[i].location).subscribe((geoInfo) => {
          
      //Set Lat and Long of google map to businesses map marker lat and lng
       newMarker.lat = this.setMarkerLat(geoInfo);
       newMarker.lng = this.setMarkerLng(geoInfo)

      })

      //Set Businesses Map Marker Case Count
     let toBeSearched = {name: data.users[i].businessName}
    
     this.adm.getUserCases(toBeSearched).subscribe(caseData => {
      console.log(caseData);
      newMarker.cases = caseData.cases.length;
    });
  
      //Add Map Marker to Marker Array
      this.markers.push(newMarker);

     }

     console.log(this.markers);

  }

  //Map Marker Helper Functions
  setMarkerLat(coordsData: any) {
    for (let i = 0; i < JSON.parse(coordsData.body).results.length; i++) {
      return JSON.parse(coordsData.body).results[0].geometry.location.lat;
    }
  }

  setMarkerLng(coordsData: any) {
    console.log(JSON.parse(coordsData.body).results);
    for (let i = 0; i < JSON.parse(coordsData.body).results.length; i++) {
       return JSON.parse(coordsData.body).results[0].geometry.location.lng;
    }
  }

  markerOver(m: BusinessNameandLocation) {
    m.animation = 'BOUNCE';
  }

  markerOut(m: BusinessNameandLocation) {
    m.animation = '';
  }

  changeAnimation(index: number) {
    this.markers[this.indexToChange].animation = 'DROP';
  }

}
