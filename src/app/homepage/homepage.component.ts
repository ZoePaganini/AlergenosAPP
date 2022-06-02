import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plato, Tpv, Type } from '../plato';
import { PlatoService } from '../plato.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  readonly logoFamily = "/assets/Viva_Family.svg"
  readonly logoAdults = "/assets/Viva_Adults.svg"
  readonly logoJaumell = "/assets/Son_Jaumell.svg"

  hotel!: string
  platosArray!: Plato[]
  platosFiltradosArray!: Plato[]
  platosFiltradoTPV!: Plato[]
  mensajeError!: string
  tpvs: Tpv[] = []
  distinctTPVs!: Tpv[]
  tpv!: any
  tpvParam!: any
  menuTPV: Tpv = { codigo: "MENU", descripcion: "MENÚ BUFFET" }
  hasTPVParam: boolean = false
  correctTPV: boolean = false

  constructor(
    private route: ActivatedRoute,
    public platosService: PlatoService
  ) {
  }

  tpvPlatos(tpv: string) {
    this.tpv = tpv
    if (tpv != "") {
      this.platosFiltradosArray = this.platosArray.filter(plato =>
        plato.tpv?.codigo == this.tpv || (plato.type == Type.Menu && plato.tpv == null && this.tpv == "MENU"))
    }
    else {
      this.platosFiltradosArray = this.platosArray
    }
  }
  showPlatos(busqueda: any) {
    if (!this.tpv) {
      this.platosFiltradosArray = [...new Map(this.platosArray.map((item) => [item.item, item])).values()];
      this.platosFiltradosArray = this.platosFiltradosArray.filter(plato =>
        plato.description.toUpperCase().indexOf(busqueda.toString().toUpperCase()) != -1 )
    } else {
      this.platosFiltradosArray = this.platosArray.filter(plato =>
        plato.description.toUpperCase().indexOf(busqueda.toString().toUpperCase()) != -1 && (plato.tpv?.codigo == this.tpv || (plato.type == Type.Menu && this.tpv == "MENU")))
    }
  }

  cambioTab() {
    this.platosFiltradosArray = this.platosArray
    this.platosFiltradosArray = this.platosArray.filter(p => this.platosArray.some(p2 => p.description == p2.description))
  }


  showAlergenos(selectedItems: string[]) {
    if (this.tpv && this.tpv != "") {
      if (selectedItems.length != 0) {
        this.platosFiltradosArray = []
        this.platosFiltradosArray = this.platosArray.filter(p => !p.allergens.some(allergen => selectedItems.includes(allergen.alergenoEs)) && (p.tpv?.codigo == this.tpv || p.type == Type.Menu && this.tpv == "MENU"))
      } else {
        this.platosFiltradosArray = this.platosArray.filter(p => p.tpv?.codigo == this.tpv || (p.type == Type.Menu && this.tpv == "MENU"))
      }
    } else {
      if (selectedItems.length != 0) {
        this.platosFiltradosArray = []
        this.platosFiltradosArray = [...new Map(this.platosArray.map((item) => [item.item, item])).values()];
        this.platosFiltradosArray = this.platosFiltradosArray.filter(p => !p.allergens.some(allergen => selectedItems.includes(allergen.alergenoEs)))
      } else {
        this.platosFiltradosArray = [...new Map(this.platosArray.map((item) => [item.item, item])).values()];
      }
    }
  }

  getLogo(): string {
    switch (this.hotel) { 
      case '04':
      case '15': return this.logoAdults
      case '21': return this.logoJaumell
      case '02':
      case '05':
      case '16':
      case '22': return this.logoFamily
      default: return '?'
    }
  }

  getHotelCorrecto() {
    switch (this.hotel) {
      case '04':
      case '15': return true
      case '21': return true
      case '02':
      case '05':
      case '16':
      case '22': return true
      default: return false
    }
  }

  ngOnInit() {
    this.hotel = this.route.snapshot.params['hotel']
    this.platosService.getTPVs(this.hotel).subscribe({
      next: (tpvs) => {
        this.distinctTPVs = tpvs
        this.distinctTPVs.push(this.menuTPV)
        this.platosService.getPlatos(this.hotel).subscribe({
          next: (platos) => {
            this.platosArray = platos
            this.platosFiltradosArray = platos
          },
          error: (error) => {
            this.mensajeError = 'Ha ocurrido un error a la hora de recoger los datos: ' + error.status + ' ' + error.statusText
            console.log(error)
          }
        });
      },
      error: (error) => {
        this.mensajeError = 'Ha ocurrido un error a la hora de recoger los datos de los TPVs: ' + error.status + ' ' + error.statusText
        console.log(error)
      }
    })
  }
}