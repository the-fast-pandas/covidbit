// Server - CovidBit - Fast Pandas
// Created:  16, February, 2021, Adilah
// Modified: 01, March, 2021, John Turkson: improvements on backend/frontend integration
//           28, March, 2021, Teresa Costa: backend integration, global variables
//           12, April, 2021, Teresa Costa: map markers work

import { Component, OnInit, ViewChild } from '@angular/core';
// Local Service
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmService } from '../services/adm-services/adm.service';
import { ApiService } from '../services/api-covid-services/api.service';
import { DataService } from '../services/data-services/data.service';
import { BusinessNameLocation } from '../models/businessNameLocation.model';

@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html',
  styleUrls: ['./tracker-map.component.scss']
})

export class TrackerMapComponent implements OnInit {

  //BusinessName Form Group
  businessSearch: FormGroup = new FormGroup({});

  //map
  lat: any = 43.8563158;
  lng: any = -79.5085383;
  zoom: number = 10;

  //Map Marker Card Info
  markers: Array<BusinessNameLocation> = [];
  validSearch: boolean = false;
  indexToChange: number = 0

  @ViewChild('infoWindow') markerInfoWindow;

  constructor(public adm: AdmService, private apiService: ApiService, public searchService: DataService) { }

  ngOnInit() {
    this.searchService.getAllBusiness().subscribe(
      data => {
        this.initializeMapMarkers(data);
      });
    this.businessSearch = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      searchLocation: new FormControl('')
    })
  }

  onSubmit() {
    let searchedBusiness = this.markers.find(e => e.name === this.businessSearch.get('businessName')?.value);
    if (this.businessSearch.get('businessName')?.value === searchedBusiness?.name) {
      this.validSearch = false;
      this.lat = searchedBusiness?.lat;
      this.lng = searchedBusiness?.lng;
      this.zoom = 12;
      let foundIndex = this.markers.findIndex(x => x.id == searchedBusiness?.id);
      this.markers[foundIndex].animation = 'BOUNCE';
      function quickChange(index, array) {
        array[index].animation = 'DROP';
      }
      setTimeout(quickChange, 2000, foundIndex, this.markers);
    } else {
      this.validSearch = true;
    }
  }

  initializeMapMarkers(data: any) {
    for (let i = 0; i < data.users.length; i++) {
      let newMarker = {} as BusinessNameLocation;
      //Set Business Info
      newMarker.name = data.users[i].businessName;
      newMarker.location = data.users[i].location;
      newMarker.businessType = data.users[i].businessType;
      newMarker.id = data.users[i]._id;
      newMarker.animation = 'DROP';
      //Make Call to Google API to get Coordinates
      this.apiService.getLocationCoords(data.users[i].location).subscribe((geoInfo) => {
        newMarker.lat = this.setMarkerLat(geoInfo);
        newMarker.lng = this.setMarkerLng(geoInfo);
      })
      const toBeSearched = { name: data.users[i].businessName };
      //Get COVID CAses
      this.adm.getUserCases(toBeSearched).subscribe(caseData => {
        newMarker.cases = caseData.cases.length;
      });
      //Add Map Marker to Marker Array
      this.markers.push(newMarker);
    }
  }

  //Gets Latitude
  setMarkerLat(coordsData: any) {
    for (let i = 0; i < JSON.parse(coordsData.body).results.length; i++) {
      return JSON.parse(coordsData.body).results[i].geometry.location.lat;
    }
  }
  //Gets Longitude
  setMarkerLng(coordsData: any) {
    for (let i = 0; i < JSON.parse(coordsData.body).results.length; i++) {
      return JSON.parse(coordsData.body).results[i].geometry.location.lng;
    }
  }
  //Animation for Marker on Map
  markerOver(m: BusinessNameLocation) {
    m.animation = 'BOUNCE';
  }
  markerOut(m: BusinessNameLocation) {
    m.animation = '';
  }
  changeAnimation(index: number) {
    this.markers[this.indexToChange].animation = 'DROP';
  }

}