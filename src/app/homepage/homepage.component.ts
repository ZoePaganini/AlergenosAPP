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

  readonly logoFamily = "/assets/Viva_Family.png"
  readonly logoAdults = "/assets/Viva_Adults.png"
  readonly logoJaumell = "/assets/SonJaumell.png"

  hotel!: string
  platosArray: Plato[] = []
  platosFiltradosArray: Plato[] = []


  constructor(
    private route: ActivatedRoute,
    private platosService: PlatoService
  ) 
  {

  }

  showPlatos(busqueda: any) 
  {
    this.platosFiltradosArray = this.platosArray.filter(plato => 
      plato.description.toUpperCase().indexOf(busqueda.toString().toUpperCase()) != -1
    )    
  }

  cambioTab()
  {
    this.platosFiltradosArray = this.platosArray
  }

  showAlergenos(selectedItems: string[])
  {
    switch(selectedItems.length)
    {
      case 0:   this.platosFiltradosArray = this.platosArray
                break
      default:  this.platosFiltradosArray = []  
                this.platosArray.forEach(
                  plato => plato.allergens.filter(
                    alergeno => {
                      if(selectedItems.includes(alergeno.alergenoEs) && !this.platosFiltradosArray.includes(plato)) {
                        this.platosFiltradosArray.push(plato)
                      }
                    }
                  )
                )
                break
    }
   

    console.log(this.platosFiltradosArray) 
  }

  getLogo(): string {
    switch(this.hotel) {
      case '04':
      case '15': return this.logoAdults
      case '21': return this.logoJaumell
      default: return this.logoFamily
    }
  }

  ngOnInit() {   
  
    this.hotel = this.route.snapshot.params['hotel']
    this.platosService.getPlatos(this.hotel).subscribe(
      platos =>{ 
        this.platosArray = platos
        this.platosFiltradosArray = platos
      }
    );
  }
}