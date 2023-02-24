import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatDB } from '../../shared/data/chat/chat';
import { ChatMessages, ChatUsers, Messages } from '../model/chat.models';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Location } from '@angular/common';

var today = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public observer: Subscriber<{}>;
  public chat: any[] = []
  public users: any[] = []
  public chatHistory : ChatMessages[] = []
  public pastOpenchat: ChatMessages[] = []
  readonly base="https://localhost:44372/api/GPTStock"
  _returnedChatGPTResponse: string="";
  listChatsMessagesInService: Messages; 
  listChats: ChatMessages[]=[];
  public chatCompleted:boolean=false;
  public currentChatObject:any;
  public currentJsonData:any[]=[];
  public chatStarted:boolean=true;
  currentList:ChatMessages[]=[];

  constructor(private http:HttpClient , private location:Location) {
    this.chat = ChatDB.chat
    this.users = ChatDB.chatUser
  }

  //formChat:ChatMessages = new ChatMessages();
 

  // Get User Data
  public getUsers(): Observable<ChatUsers[]> {
    const users = new Observable(observer => {
      observer.next(this.users);
      observer.complete();
    });
    return <Observable<ChatUsers[]>>users;
  }

  // Get cuurent user
  public getCurrentUser() {
    return this.getUsers().pipe(map(users => {
      return users.find((item) => {
        return item.authenticate === 0;
      });
    }));
  }

  // chat to user
  public chatToUser(id: number) {
    return this.getUsers().pipe(map(users => {
      return users.find((item) => {
        return item.id === id;
      });
    }));
  }

  // Get users chat

  public getChats(id:any){
    this.http.get(this.base + "/getmessages/" + id).toPromise().then(res=> this.chatHistory = res as ChatMessages[]);
  }


  // public getUserChat(): Observable<ChatMessages[]> {
  //   const chat = new Observable(observer => {
  //     observer.next(this.chat);
  //     observer.complete();
  //   });
  //   return <Observable<ChatMessages[]>>chat;
  // }

  // // Get chat History
  // public getChatHistory(id: number) {
  //   return this.getUserChat().pipe(map(users => {
  //     return users.find((item) => {
  //       return item.userId === id;
  //     });
  //   }));
  // }

  // Send Message to user
  public sendMessage(chat:ChatMessages, jsonData, questionInput:string){
        setTimeout(function () {
          document.querySelector(".chat-history").scrollBy({ top: 200, behavior: 'smooth' });
        }, 310)
       this.responseMessage(chat,jsonData,questionInput);
  }

  wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
 
  public async responseMessage(chat:ChatMessages,jsonData,questionInput:string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<any>(this.base+"/stocktable/" + questionInput , jsonData , { headers: headers})
    .subscribe(result => 
      { this._returnedChatGPTResponse = result;}, 
      error => console.error(error)); 

      setTimeout(()=> {
        this.listChatsMessagesInService={
          messageId: 0,
          userId: 1,
          question: questionInput,
          answer: this._returnedChatGPTResponse
        };

       
        if(this.chatCompleted==false && this.chatStarted==true){
          this.listChats = [{
            chatMessageId:0,
            userId: 1,
            messages:[] 
            }];
            console.log("yayaya");
            this.currentList = this.listChats;
            this.listChats[0].messages.push(this.listChatsMessagesInService);  
           
        }
        else{
          console.log(" oh no yaya did not go in the loop")
          this.currentList[0].messages.push(this.listChatsMessagesInService);
          console.log(JSON.stringify(this.currentList) + " yaya went in the loop")
         
        }
          chat.messages.push(this.listChatsMessagesInService);
          this.currentChatObject = { ...chat };
          this.currentJsonData= jsonData;
          this.currentList = this.currentList;
         
      
          console.log( JSON.stringify(this.listChats) + " welllll")
       
          console.log(this._returnedChatGPTResponse + " edennmom ");
          this.chatStarted=false;
          this.chatCompleted=false;
          document.querySelector(".chat-history").scrollBy({ top: 200, behavior: 'smooth' });
      }, 3000);

      

      setTimeout(()=> {
        this.http.post(this.base + "/postmessage" , chat).subscribe( error => console.error(error));
        this.chatCompleted=true;
        this.chatStarted=true;
        this.listChats=null;
        window.location.reload();
      },120000)

     
  }

  public getMessageByChatId(id:any){
    this.http.get(this.base + "/getmessagesbychatId/" + id).toPromise().then(res=> this.pastOpenchat = res as ChatMessages[]);
  }

}
