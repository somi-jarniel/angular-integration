import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkspaceModel } from '../../shared/models/workspace.model';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http:HttpClient) { }

  all(): Observable<WorkspaceModel> {
    return this.http.get<WorkspaceModel>(API_URL + 'api/client/workspaces');
  }

  get(id: number): Observable<WorkspaceModel> {
    return this.http.get<WorkspaceModel>(API_URL + 'api/client/workspaces/' + id);
  }

  create(workspaceModel: WorkspaceModel): Observable<any> {
    return this.http.post<any>(API_URL + 'api/client/workspaces', workspaceModel);
  }

  update(id: number, workspaceModel: WorkspaceModel): Observable<any> {
    return this.http.put<any>(API_URL + 'api/client/workspaces/' + id, workspaceModel);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete<WorkspaceModel>(API_URL + 'api/client/workspaces/' + id);
  }
}
