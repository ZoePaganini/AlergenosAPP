import { Component, Input, OnInit } from '@angular/core';
import {  Plato } from '../plato';
import { PlatoService } from '../plato.service';
import "@angular/compiler";

@Component({
  selector: 'app-platoslist',
  templateUrl: './platoslist.component.html',
  styleUrls: ['./platoslist.component.scss']
})
export class PlatoslistComponent implements OnInit {

  @Input() platosArray!: Plato[];
  constructor() { }

  ngOnInit(): void {}
  
}