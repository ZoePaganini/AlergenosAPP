import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plato } from '../plato';
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
  mensajeError!: string

  constructor(
    private route: ActivatedRoute,
    private platosService: PlatoService
  ) 
  {
  }

  showPlatos(busqueda: any) 
  {
    this.platosFiltradosArray = this.platosArray.filter(plato => 
      plato.description.toUpperCase().indexOf(busqueda.toString().toUpperCase()) != -1)
  }

  cambioTab()
  {
    this.platosFiltradosArray = this.platosArray
  }

  showAlergenos(selectedItems: string[])
  {
    if(selectedItems.length != 0)
    {
      this.platosFiltradosArray = []  
        this.platosArray.forEach(
          plato => plato.allergens.filter(
            alergeno => {
              if(selectedItems.includes(alergeno.alergenoEs) && !this.platosFiltradosArray.includes(plato)) {
                this.platosFiltradosArray.push(plato)
              }
            }
          )
        )
    } else
    {
      this.platosFiltradosArray = this.platosArray
    }
  }

  getLogo(): string {
    switch(this.hotel) {
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

  getHotelCorrecto()
  {
    switch(this.hotel) {
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
  }
}