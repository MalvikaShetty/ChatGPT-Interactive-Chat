import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }

  readonly base="https://localhost:44372/api/GPTStock"
  
  _returnedChatGPTResponse: string="";
  postFileJsonDetails(jsonFileData: any,question:any){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<any>(this.base+"/stocktable/" + question ,jsonFileData, { headers: headers})
    .subscribe(result => 
      {this._returnedChatGPTResponse = result;}, 
      error => console.error(error)); 
  }

  getAns(){
    return this.http.get(this.base + '/getans');
  }

}
