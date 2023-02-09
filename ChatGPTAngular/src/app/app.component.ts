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
  previousQAnswered=false;
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
  
  
  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

  submitQuestion(question:string){
    if(this.previousQAnswered==true){
      this.previousQAnswered=false;
    }
    // this.ifQuestionSubmitted=true;
    // if(this.ifQuestionSubmitted==true){
   this.answerIsBeingGenerated= "Your answer is being generated...";
   // }
   this.apis.postFileJsonDetails(this.convertedExcelToJsonString, question);
   if( this.apis._returnedChatGPTResponse!= null){
    this.delay(3000).then(any=>{
      this.previousQAnswered=true;
      //this.questionAndResponse. =  this.apis._returnedChatGPTResponse;
      this.questionAndResponse.push({question: "Q:"+question, response:"A:"+ this.apis._returnedChatGPTResponse});
      
 });
  this.inputQuestion = '';
  //  alert("wowow");

  }
  
   
   //  if(this.apis._returnedChatGPTResponse!=null){
  //   this.answerIsBeingGenerated="";
  //  }
   
    //this.ifQuestionSubmitted=false;
  }

}
