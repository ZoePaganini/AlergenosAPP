import { Component, Input, OnInit } from '@angular/core';
import {  Plato } from '../plato';
import "@angular/compiler";
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-platoslist',
  templateUrl: './platoslist.component.html',
  styleUrls: ['./platoslist.component.scss']
})
export class PlatoslistComponent implements OnInit {

  esEscritorio: any
  @Input() platosArray!: Plato[];
  constructor(
    private dispositivoService: DeviceDetectorService
  ) {
    this.esEscritorio = this.dispositivoService.isDesktop()
   }

  ngOnInit(): void {}
  
}