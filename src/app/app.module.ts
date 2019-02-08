import { RoomService } from './shared-service/room.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HttpModule} from '@angular/http';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import {enableProdMode} from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule } from '@angular/forms';
import {
MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

import { IonicApp, IonicModule, App } from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import { ListhotelComponent } from './components/listhotel/listhotel.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './shared-service/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserAccount } from './components/userAccount/userAccount.component';
import { EditUser } from './components/userAccount/editUser/editUser.component';
import { ConfirmEmail } from './components/confirmEmail/confirmEmail.component';
import { FriendsService } from './shared-service/friends.service';
import { HotelService } from './shared-service/hotel.service';
import { LocationService } from './shared-service/location.service';
import { SortingPipe } from './components/pipes/sorting.pipe';
import { SerachPipe } from './components/pipes/serach.pipe';
import { HotelProfileComponent } from './components/hotel-profile/hotel-profile.component';
import { MapComponent } from './components/hotel-profile/map/map.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { AirlineService } from './shared-service/airline.service';
import { EditHotelComponent } from './components/edit-hotel/edit-hotel.component';
import { AirlineProfileComponent } from './components/airline-profile/airline-profile.component';
import { HotelServicesComponent } from './components/hotel-services/hotel-services.component';
import { AddEditHotelServiceComponent } from './components/add-edit-hotel-service/add-edit-hotel-service.component';
import { RegisterAirlineComponent } from './components/register-airline/register-airline.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightService } from './shared-service/flight.service';
import { AddEditRoomComponent } from './components/add-edit-room/add-edit-room.component';
import { RoomComponent } from './components/room/room.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { AddDestinationComponent } from './components/add-destination/add-destination.component';
import { DestinationService } from './shared-service/destination.service';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { AirlineServicesComponent } from './components/airline-services/airline-services.component';
import { AddAirlineServiceComponent } from './components/add-airline-service/add-airline-service.component';
import { AddAirlineConfigurationComponent } from './components/add-airline-configuration/add-airline-configuration.component';
import { FlightProfileComponent } from './components/flight-profile/flight-profile.component';
import { AddSeatsComponent } from './components/add-seats/add-seats.component';
import { SeatService } from './shared-service/seat-service.service';
import { FlightReservationComponent } from './components/flight-reservation/flight-reservation.component';
import { IndexComponent } from './components/index/index.component';
import { DisplayAllHotelsForReservationComponent } from './components/display-all-hotels-for-reservation/display-all-hotels-for-reservation.component';
import { FastHotelResComponent } from './components/fast-hotel-res/fast-hotel-res.component';
import { HotelReservationComponent } from './components/hotel-reservation/hotel-reservation.component';
import { FastFlightReservationsComponent } from './components/fast-flight-reservations/fast-flight-reservations.component';
import {AccountService} from './shared-service/account.service';
import { FastFlightReservationsService } from './shared-service/fast-flight-reservations.service';
import { AddFastFlightReservationComponent } from './components/add-fast-flight-reservation/add-fast-flight-reservation.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';



const appRoutes: Routes = [
{path: 'dashboard', component: DashboardComponent},
{path:  '', redirectTo: '/dashboard', pathMatch: 'full'},
{path: 'hotels', component: ListhotelComponent},
{path: 'registration', component: RegistrationComponent},
{path: 'login', component: LoginComponent},
{path: 'userAccount', component: UserAccount},
{path: 'userAccount/editUser', component: EditUser},
{path: 'confirmEmail/:token', component: ConfirmEmail},
{path: 'hotels/:id', component: HotelProfileComponent},
{path: 'addHotel', component: AddHotelComponent},
{path: 'hotels/:id/edit', component: EditHotelComponent},
{path: 'hotels/:id/services', component: HotelServicesComponent},
{path: 'hotels/:id/services/:mode/:serviceId', component: AddEditHotelServiceComponent},
{path: 'hotels/:id/services/:mode', component: AddEditHotelServiceComponent},
{path: 'hotels/:id/rooms/:mode/:roomId', component: AddEditRoomComponent},
{path: 'hotels/:id/rooms/:mode', component: AddEditRoomComponent},
{path: 'hotels/:id/rooms', component: RoomComponent},
{path: 'reservations/hotel-reservation/:resId/:hotelId', component: HotelReservationComponent},
{path: 'reservations/hotel-reservation/:resId/:hotelId/rooms-on-discount', component: FastHotelResComponent},
{path: 'reservations/:id/hotels', component: DisplayAllHotelsForReservationComponent},

{path: 'index', component: IndexComponent},

{path: 'system-admin/airlines', component: RegisterAirlineComponent},

{path: 'system-admin/addAdmin', component: AdminSettingsComponent},
{path: 'change-password', component: ChangePasswordComponent},


  {path: 'airlines', component: AirlinesComponent},
  {path: 'airlines/:id', component: AirlineProfileComponent},
  {path: 'airlines/:id/flights', component: FlightsComponent},
  {path: 'airlines/:id/flights/addFlight', component: AddFlightComponent},
  {path: 'airlines/:id/destinations/:mode', component: AddDestinationComponent },
  {path: 'airlines/:id/destinations/:mode/:destId', component: AddDestinationComponent },
  {path: 'airlines/:id/destinations', component: DestinationsComponent},
  {path: 'airlines/:id/services', component: AirlineServicesComponent},
  {path: 'airlines/:id/services/:mode', component: AddAirlineServiceComponent},
  {path: 'airlines/:id/services/:mode/:serviceId', component: AddAirlineServiceComponent},
  {path: 'airlines/:id/configuration/:mode', component: AddAirlineConfigurationComponent},
  {path: 'airlines/:id/configuration/:mode/:confId', component: AddAirlineConfigurationComponent},
  {path: 'airlines/:id/flights/:flightId', component: FlightProfileComponent},
  {path: 'addSeats', component: AddSeatsComponent},
  {path: 'flightReservation', component: FlightReservationComponent},
  {path: 'fastFlightReservations', component: FastFlightReservationsComponent},
  {path: 'addfastFlightReservations', component: AddFastFlightReservationComponent},



];
enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListhotelComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent,
    UserAccount,
    EditUser,
    ConfirmEmail,
    SortingPipe,
    SerachPipe,
    HotelProfileComponent,
    MapComponent,
    AddHotelComponent,
    AirlinesComponent,
    EditHotelComponent,
    AirlineProfileComponent,
    HotelServicesComponent,
    AddEditHotelServiceComponent,
    RegisterAirlineComponent,
    FlightsComponent,
    AddEditRoomComponent,
    RoomComponent,
    AddFlightComponent,
    AddDestinationComponent,
    DestinationsComponent,
    AirlineServicesComponent,
    AddAirlineServiceComponent,
    AddAirlineConfigurationComponent,
    FlightProfileComponent,
    AddSeatsComponent,
    FlightReservationComponent,
    IndexComponent,
    DisplayAllHotelsForReservationComponent,
    FastHotelResComponent,
    HotelReservationComponent,
    FastFlightReservationsComponent,
    AddFastFlightReservationComponent,
    AdminSettingsComponent,
    ChangePasswordComponent,



  ],


  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    CdkTableModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [ LocationService, HotelService, FriendsService,
     UserService, HttpModule, DatePipe, AirlineService, FlightService,
    RoomService, DestinationService, SeatService, AccountService, FastFlightReservationsService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
