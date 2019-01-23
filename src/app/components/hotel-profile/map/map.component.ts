import {Component, Input, OnInit} from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import {Style, Stroke, Fill, Icon, Marker} from 'ol/style';
import { fromLonLat } from 'ol/proj';
import {LocationService} from '../../../shared-service/location.service';
import Feature from 'ol/Feature';
import Vector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Geolocation from 'ol/Geolocation.js';
// import Size from 'ol/size';
// import Pixel from 'ol/pixel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  geolocation: Geolocation;
  accuracyFeature: Feature;
  iconStyle: Style;
  data: any;

  lat: number;
  lng: number;
  @Input() address: string[];
  @Input() city: string[];
  @Input() state: string[];

  constructor(private service: LocationService) { }

  ngOnInit() {
    // alert(this.address + '  ' + this.state);
    console.log(this.address.length);
    console.log(this.city.length);
    console.log(this.state.length);

    this.service.getCoordinates(this.address, this.city, this.state).subscribe(
      res => {
        this.data = res;
        if (res == undefined) {
        //  console.log('Res je undefined');
        }
        if (res.results == undefined) {
         // console.log('Res.results je undefined');
        }

        if (res.results[0].locations[0] == undefined) {
        //  console.log('res.results.locations je undefined');
        }
        // console.log(res.results[0].locations[0].latLng.lat);
         this.lat = res.results[0].locations[0].latLng.lat;
         this.lng = res.results[0].locations[0].latLng.lng;

        this.source = new OlXYZ({
          url: 'http://tile.osm.org/{z}/{x}/{y}.png'
        });

        this.layer = new OlTileLayer({
          source: this.source
        });

        this.view = new OlView({
           center: fromLonLat([ this.lng, this.lat]),
        //  center: fromLonLat([ 19.83598, 45.24512]),
          zoom: 16
        });

        const marker = new Feature({
          geometry: new Point(
           // fromLonLat([ 19.83598, 45.24512])
             fromLonLat([ this.lng, this.lat])
          ),
        });



        this.iconStyle = new Style({
          image: new Icon(/** @type {olx.style.IconOptions} */ {
            scale: 0.05,
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: '../../assets/images/marker.png'
          })
        });
        const vectorSource = new Vector({
          features: [marker]
        });
        const markerVectorLayer = new VectorLayer({
          source: vectorSource,
          style: this.iconStyle
        });

        this.map = new OlMap({
          target: 'map',
          layers: [this.layer , markerVectorLayer],
          view: this.view
        });

      },
      error1 => {
        alert('Doslo je do greske: ' + error1);
      }
    );

  }

}
