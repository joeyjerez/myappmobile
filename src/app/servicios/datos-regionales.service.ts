import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatosRegionalesService {
  private apiUrl= 'https://dev.matiivilla.cl/duoc/location/region';

  constructor(private http: HttpClient) {}

    obtenerRegiones():Observable<any>{
      return this.http.get<any>(this.apiUrl);
   }


   // Método para obtener comunas por región
  obtenerComunasPorRegion(regionId: string): Observable<any> {
    const url = `${this.apiUrl}/region/${regionId}/comunas`; // Ajusta la ruta según la estructura de tu API
    return this.http.get(url);
  }
}
