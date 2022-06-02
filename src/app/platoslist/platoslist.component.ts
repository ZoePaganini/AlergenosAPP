import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {  Plato } from '../plato';
import "@angular/compiler";
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-platoslist',
  templateUrl: './platoslist.component.html',
  styleUrls: ['./platoslist.component.scss']
})
export class PlatoslistComponent implements OnInit {

  mensajeError!: string
  sum = 50;
  direction = "";
  esEscritorio: any
  @Input() hotel!: string
  @Input() platosArray!: Plato[]
  platosArraySlice!: Plato[]
  constructor(
    private dispositivoService: DeviceDetectorService,
  ) {
    this.esEscritorio = this.dispositivoService.isDesktop()
   }

  ngOnInit(): void {
    this.appendItems()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.platosArraySlice = this.platosArray
    this.appendItems()
  }  

  onScrollDown(ev: any) {

    this.sum += 50;
    this.appendItems();
  }

  onScrollUp(ev: any) {
    this.sum += 50;
    this.prependItems();

  }
  appendItems() {
    this.addItems("push");
  }

  prependItems() {
    this.addItems("unshift");
  }

  addItems(_method: string) {
      if( _method === 'push'){
        this.platosArraySlice = this.platosArray.slice(0, this.sum)
      }else if( _method === 'unshift'){
        this.platosArraySlice = this.platosArray.slice(this.sum, 0)
      }
  }
}