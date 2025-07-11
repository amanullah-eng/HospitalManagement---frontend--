
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Patient } from "../model/patient";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/api/patient';

  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  add(patient: Patient) {
    return this.http.post<Patient>(this.baseUrl, patient, httpOptions);
  }

  update(patient: Patient) {
    return this.http.put<void>(`${this.baseUrl}/${patient.id}`, patient);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
