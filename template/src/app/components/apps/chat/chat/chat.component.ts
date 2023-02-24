import { Component, OnInit, Input } from '@angular/core';
import { ChatMessages, ChatUsers, Messages } from '../../../../shared/model/chat.models';
import { ChatService } from '../../../../shared/services/chat.service';
import * as XLSX from 'xlsx';
import { FileManagerComponent } from '../../file-manager/file-manager.component';
import { Console } from 'console';
import { NgForm } from '@angular/forms';
import { empty } from 'rxjs';
//import { Input } from 'hammerjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  public openTab : string = "call";
  public users : ChatUsers[] = []
  public searchUsers : ChatUsers[] = []
  public chatUser : any;
  public profile : any;
  public chat : any;
  public chatText : string;
  public error : boolean = false;
  public notFound: boolean = false;
  public id : any;
  public searchText : string;
  public showEmojiPicker:boolean = false;
  public emojies: any;
  public mobileToggle: boolean = false;
  fileManComponent: FileManagerComponent;
  public chathis: any;
  public jsonFileData: any;
  public openChat : boolean;
  myArrayMessages: Messages; 

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {  
    this.chatService.getChats(1);
    this.chatService.chatHistory;
    //this.userChat(this.id)
    //this.getProfile()
  }

  openCurrentChat() {
    this.openChat = false;
  }

  public toggleEmojiPicker(){
    this.showEmojiPicker=!this.showEmojiPicker;
  }

  addEmoji(event){
    const text = `${event.emoji.native}`;
    this.chatText = text;
    this.showEmojiPicker = false;
  }

  public tabbed(val) {
  	this.openTab = val
  }

  // Get user Profile
  public getProfile() {
    this.chatService.getCurrentUser().subscribe(userProfile => this.profile = userProfile)
  }

  // User Chat
  public userChat(id:number){   
    this.openChat = true; 

    this.chatService.getMessageByChatId(id);
    this.chatService.pastOpenchat;
   
    //console.log(this.chatService.pastOpenchat + " this is past chat");
    // chatToUser(id).subscribe(chatUser => this.chatUser = chatUser)
   // this.chathis = this.chatService.getChats(id);
  }
 
  // Send Message to User
  public sendMessagee(form) { 
    if(!form.value.message){
      this.error = true
      return false
    }
    this.error = false;

    if( this.chatService.chatCompleted!=true && this.chatService.chatStarted!=true){
          this.chatService.sendMessage(this.chatService.currentChatObject,this.chatService.currentJsonData,form.value.message)
    }
    else{
      const chat : ChatMessages = {
        chatMessageId:0,
        userId: 1,
        messages:[]
      }

      console.log(" Works fine");
     // console.log(chat.messages[0].question + " what if....");
     // console.log("wow Still Works fine");

      this.jsonFileData= FileManagerComponent.convertedToJsonString,
      this.chatService.sendMessage(chat,this.jsonFileData,form.value.message) 

    }
     // this.chatText = ''
   // this.chatUser.seen = 'online'
    //this.chatUser.online = true
  }

  searchTerm(term: any) {
    if(!term) return this.searchUsers = this.users
    term = term.toLowerCase();
    let user = []
    this.users.filter(users => {
      if(users.name.toLowerCase().includes(term)) {
        user.push(users)
      } 
    })
    this.searchUsers = user
  }

  mobileMenu() {
    this.mobileToggle = !this.mobileToggle;
  }
    
}
