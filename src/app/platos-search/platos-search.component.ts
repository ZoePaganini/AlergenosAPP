import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AlergenoEs, Tpv, Type } from '../plato';
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
  readonly temaFamilyFlecha = "invert(49%) sepia(39%) saturate(4641%) hue-rotate(13deg) brightness(103%) contrast(101%)"
  readonly temaAdultsFlecha = "invert(24%) sepia(8%) saturate(7497%) hue-rotate(148deg) brightness(92%) contrast(88%)"
  readonly temaJaumellFlecha = "invert(24%) sepia(8%) saturate(7497%) hue-rotate(148deg) brightness(92%) contrast(88%)"

  @Output() public buscarEvent = new EventEmitter<string>()
  @Output() public filtrosEvent = new EventEmitter<string[]>()
  @Output() public tpvEvent = new EventEmitter<string>()
  @Output() public tabEvent = new EventEmitter()
  @Input() hotel!: string
  @Input() tpvs!: Tpv[]

  busqueda: string = ''
  alergenos: any
  selectedAlergenos = []
  selectedTPV: string = ''
  dropdownConfig: IDropdownSettings = {}
  tpvsConfig: IDropdownSettings = {}

  constructor(
    private platoService: PlatoService,
  ) { }

  tpvFiltrado() {
    this.busqueda = ''
    console.log(this.selectedTPV)
    this.tpvEvent.emit(this.selectedTPV)
  }

  buscarPlato() {
    this.buscarEvent.emit(this.busqueda)
  }

  tabCambiado()
  {
    this.busqueda = ''
    this.selectedAlergenos = []
    this.selectedTPV = ''
    this.tabEvent.emit()
  }

  alergenosFiltrados() {
    this.filtrosEvent.emit(this.selectedAlergenos)
  }

  ngOnInit(): void {
    this.alergenos = Object.values(AlergenoEs).map(item => String(item))
    this.dropdownConfig = {
      singleSelection: false,
      idField: '',
      textField: '',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Buscar alérgenos',
      noFilteredDataAvailablePlaceholderText: ''
    }
    this.tpvsConfig = {
      singleSelection: true,
      idField: 'codigo',
      textField: 'descripcion',
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Buscar TPVs',
      noFilteredDataAvailablePlaceholderText: '',
      noDataAvailablePlaceholderText: '',
      closeDropDownOnSelection: true
    }
    this.temaHotel()
  }

  temaHotel() {
    switch (this.hotel)
    {
      case '04':
      case '15':  document.documentElement.style.setProperty('--color-fondo', this.temaAdults);
                  document.documentElement.style.setProperty('--color-etiquetas', this.temaAdultsEtiquetas);
                  document.documentElement.style.setProperty('--color-flecha', this.temaAdultsFlecha)
                  break;
      case '21':  document.documentElement.style.setProperty('--color-fondo', this.temaJaumell);
                  document.documentElement.style.setProperty('--color-etiquetas', this.temaJaumellEtiquetas);
                  document.documentElement.style.setProperty('--color-flecha', this.temaJaumellFlecha)
                  break;
      default:    document.documentElement.style.setProperty('--color-fondo', this.temaFamily);
                  document.documentElement.style.setProperty('--color-etiquetas', this.temaFamilyEtiquetas);
                  document.documentElement.style.setProperty('--color-flecha', this.temaFamilyFlecha)
                  break;
    }
  }
}