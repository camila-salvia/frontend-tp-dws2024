import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  
  // supuestamente aca se ponen los metodos para acceder al back

  // Método para obtener datos
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cancha`);
  }
  }

  