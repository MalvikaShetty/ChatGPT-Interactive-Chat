import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { ApisService } from './apis.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public apis:ApisService ) { }
  
  title = 'Interactive Chat';
  convertedExcelToJsonString: string="";
  inputQuestion = '';
  UploadedFile= false;
  answerIsBeingGenerated:string="";
  jsonArrayFromExcel!: any;
  headers: string[]=[];
  ifQuestionSubmitted=false;
  questionAndResponse = [{question: '', response: ''}];
  //stringofJson: string="";

  fileUpload(event:any){
    
    this.UploadedFile= true;
 
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event:any)=>{
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData,{type:'binary'});
      workbook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.convertedExcelToJsonString = JSON.stringify(data, undefined,4);
        //this.newStr =  this.convertedJson.substring(1, this.convertedJson.length-1);
       // this.stringofJson = this.convertedJson.replace(/{|}/g, " ").replace(/\[|\]/g, " ");
       this.jsonArrayFromExcel = JSON.parse(this.convertedExcelToJsonString);
       this.headers = Object.keys(this.jsonArrayFromExcel[0]);
       //console.log( this.jsonArrayFromExcel);
      })
    }
  }
  
  
 

  submitQuestion(question:string){
    // this.ifQuestionSubmitted=true;
    // if(this.ifQuestionSubmitted==true){
    this.answerIsBeingGenerated= "Your answer is being generated...";
   // }
   this.apis.postFileJsonDetails(this.convertedExcelToJsonString, question);
   this.questionAndResponse.push({question: question, response: this.apis._returnedChatGPTResponse});
   //  if(this.apis._returnedChatGPTResponse!=null){
  //   this.answerIsBeingGenerated="";
  //  }
   
    //this.ifQuestionSubmitted=false;
  }

}
