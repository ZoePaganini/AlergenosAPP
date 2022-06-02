import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plato, Tpv, Type } from '../plato';
import { PlatoService } from '../plato.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage-tpv.component.html',
  styleUrls: ['./homepage-tpv.component.scss']
})

export class HomepageTPVComponent implements OnInit {
  readonly logoFamily = "/assets/Viva_Family.svg"
  readonly logoAdults = "/assets/Viva_Adults.svg"
  readonly logoJaumell = "/assets/Son_Jaumell.svg"

  hotel!: string
  platosArray!: Plato[]
  platosFiltradosArray!: Plato[]
  mensajeError!: string
  tpvs: Tpv[] = []
  distinctTPVs!: Tpv[]
  tpv!: any
  tpvParam!: any
  menuTPV: Tpv = { codigo: "MENU", descripcion: "MENÚ BUFFET" }
  hasTPVParam: boolean = true
  correctTPV: boolean = true

  constructor(
    private route: ActivatedRoute,
    public platosService: PlatoService
  ) {
  }

  showPlatos(busqueda: any) {
    this.platosFiltradosArray = this.platosArray.filter(plato =>
        plato.description.toUpperCase().indexOf(busqueda.toString().toUpperCase()) != -1)
  }

  cambioTab() {
    this.platosFiltradosArray = this.platosArray
  }

  showAlergenos(selectedItems: string[]) {
    if (selectedItems.length != 0) {
        this.platosFiltradosArray = this.platosArray.filter(p => !p.allergens.some(allergen => selectedItems.includes(allergen.alergenoEs)))
      } else {
        this.platosFiltradosArray = this.platosArray
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

  getTPV(tpv: any){
    if(tpv != null) {
      this.tpvParam = tpv
      this.hasTPVParam = true
      console.log("Tiene parametro")
    } else{
      console.log("No tiene parametro")
    }
  }

  ngOnInit() {
    this.hotel = this.route.snapshot.params['hotel']
    this.tpvParam = this.route.snapshot.params['tpv']
    this.platosService.getTPVs(this.hotel).subscribe({
      next: (tpvs) => {
        this.distinctTPVs = tpvs
        this.distinctTPVs.some(tpv => (tpv.codigo == this.tpvParam.toUpperCase()) ? this.correctTPV = true : this.correctTPV = false)
        this.platosService.getPlatos(this.hotel).subscribe({
          next: (platos) => {
            this.platosArray = platos.filter(plato => (this.tpvParam.toUpperCase() == "COM") ? plato.tpv?.codigo == this.tpvParam || plato.type == Type.Menu : plato.tpv?.codigo == this.tpvParam)
            this.platosFiltradosArray = platos.filter(plato => (this.tpvParam.toUpperCase() == "COM") ? plato.tpv?.codigo == this.tpvParam || plato.type == Type.Menu : plato.tpv?.codigo == this.tpvParam)
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