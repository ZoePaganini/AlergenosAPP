import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AlergenoEs } from '../plato';
import { PlatoService } from '../plato.service';


@Component({
  selector: 'app-platos-search',
  templateUrl: './platos-search.component.html',
  styleUrls: ['./platos-search.component.scss', ]
})
export class PlatosSearchComponent implements OnInit {

  readonly temaFamilyEtiquetas = "#FF8733"
  readonly temaAdultsEtiquetas = "#427E86"
  readonly temaJaumellEtiquetas = "#D9C39E"
  readonly temaFamily = "#FFF0E6"
  readonly temaAdults = "#E7EFF0"
  readonly temaJaumell = "#F6F0E7"

  @Output() public buscarEvent = new EventEmitter<string>()
  @Output() public filtrosEvent = new EventEmitter<string[]>()
  @Output() public tabEvent = new EventEmitter()
  @Input() hotel!: string

  busqueda: string = ''
  alergenos: any
  selectedAlergenos = []
  dropdownConfig: IDropdownSettings = {}

  constructor(
    private platoService: PlatoService,
  ) { }

  buscarPlato() {
    this.buscarEvent.emit(this.busqueda)
  }

  tabCambiado()
  {
    this.busqueda = ''
    this.selectedAlergenos = []
    this.tabEvent.emit()
  }

  alergenosFiltrados() {
    this.filtrosEvent.emit(this.selectedAlergenos)
  }

  ngOnInit(): void {
    this.alergenos = Object.values(AlergenoEs).map(item => String(item));
    this.dropdownConfig = {
      singleSelection: false,
      idField: '',
      textField: '',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Buscar alérgenos',
      noFilteredDataAvailablePlaceholderText: ''
    };
    this.temaHotel()
  }

  temaHotel() {
    switch (this.hotel)
    {
      case '04':
      case '15':  document.documentElement.style.setProperty('--color-fondo', this.temaAdults);
                  document.documentElement.style.setProperty('--color-etiquetas', this.temaAdultsEtiquetas);
                  break;
      case '21':  document.documentElement.style.setProperty('--color-fondo', this.temaJaumell);
                  document.documentElement.style.setProperty('--color-etiquetas', this.temaJaumellEtiquetas);
                  break;
      default:    document.documentElement.style.setProperty('--color-fondo', this.temaFamily);
                  document.documentElement.style.setProperty('--color-etiquetas', this.temaFamilyEtiquetas);
                  break;
    }
  }
}