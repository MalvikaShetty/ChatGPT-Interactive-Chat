import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import * as XLSX from 'xlsx';
import { parse } from 'sql-parser';
import * as JSZip from 'jszip';
import { Document, Paragraph, TextRun } from 'docx';
import * as docx from 'docx';
// import { docx } from 'docx-to-json';
import * as mammoth from 'mammoth';
import * as promisify from 'es6-promisify';
import * as Docxtemplater from 'docxtemplater';
import { Router } from '@angular/router';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})



export class FileManagerComponent implements OnInit {


  //convertedExcelToJsonString: string="";
  static convertedToJsonString: any;
  

  constructor(private chatService: ChatService,private router: Router) { }

  ngOnInit() {
  }

  //export myVariable: string = "Hello, world!";

 xlsxfileUpload(event:any){
    
    //this.UploadedFile= true;
 
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event:any)=>{
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData,{type:'binary'});
      workbook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        FileManagerComponent.convertedToJsonString = JSON.stringify(data, undefined,4);
       console.log( FileManagerComponent.convertedToJsonString);
       alert("File uploaded! Go ahead and ask your questions");
       this.router.navigate(['/chat']);
      })
    }
  }


  // sqlfileUpload(event:any){
    
  //   const selectedFile = event.target.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.readAsText(selectedFile, 'UTF-8');
  //   fileReader.onload = (event) => {
  //     const result= parse(event.target.result);
  //     const json = JSON.stringify(result);
  //     console.log(json);
  //     // console.log(FileManagerComponent.convertedToJsonString);
  //   }
  // }


  // async parseWordFile(file: File): Promise<string> {
  //   const fileReader = new FileReader();
  //   return new Promise<string>((resolve, reject) => {
  //     fileReader.onload = async () => {
  //       const zip = new JSZip(fileReader.result);
  //       const content = await zip.file('word/document.xml').async('string');
  //       const doc = new Document().createFromXmlString(content);
  //       const paragraphs = doc.getParagraphs().map((p: Paragraph) => {
  //         const textRuns = p.getTextRuns().map((t: TextRun) => t.text);
  //         return textRuns.join('');
  //       });
  //       resolve(JSON.stringify({ paragraphs }));
  //     };
  //     fileReader.onerror = () => {
  //       reject(fileReader.error);
  //     };
  //     fileReader.readAsArrayBuffer(file);
  //   });
  // }

  // async docfileUpload(event: any) {
  //   const file: File = event.target.files[0];
  //   const jsonString = await parseWordFile(file);
  //   console.log(jsonString);
  // }
  // async docFileUpload(event: any) {
  //   const file: File = event.target.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.readAsArrayBuffer(file);
  //   fileReader.onload = () => {
  //     const arrayBuffer: any = fileReader.result;
  //     const doc = new docx.Document(arrayBuffer);
  //     const paragraphs = doc.getBody().getChildren();
  //     const content = paragraphs.map((p) => p.getText());
  //     const jsonContent = JSON.stringify(content);
  //     console.log(jsonContent);
  //   };
  // }
  // async docFileUpload(event: any): Promise<string> {
  //   const file : File = event.target.files[0];
  //   const readFile = promisify(mammoth.readFile);
  //   const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
  //   const html = result.value;
  //   // Convert the HTML to JSON using a JSON library
  //   const json = JSON.stringify(html);
  //   console.log(json + " yay got converted")
  //   return json;
  // }

  // async docFileUpload(event: any): Promise<string> {
  //   const file : File = event.target.files[0];
  //   const buffer = await file.arrayBuffer();
  //   const zip = new JSZip(buffer);
  //   const doc = new Docxtemplater().loadZip(zip);
  //   const data = doc.getFullData();
  //   // Convert the data to JSON using a JSON library
  //   const json =  JSON.stringify(data);
  //   return json;
  // }
  // async onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];

  //   if (file) {
  //     const fileReader = new FileReader();

  //     fileReader.onload = async () => {
  //       const content = fileReader.result as ArrayBuffer;
  //       const json = await docx(content);

  //       const jsonStr = JSON.stringify(json);
  //       const blob = new Blob([jsonStr], { type: 'application/json' });
  //       fileSaver.saveAs(blob, `${file.name}.json`);

  //     };

  //     fileReader.readAsArrayBuffer(file);
  //   }
  // }

  
}

export const myExportedProperty = FileManagerComponent.convertedToJsonString;
