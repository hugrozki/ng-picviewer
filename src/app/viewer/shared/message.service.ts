import { Injectable } from '@angular/core';
import { Message } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: Message | null;

  setMessage(type: string, message: string, code = null) {
    this.message = {
      type,
      message,
      code
    }
  }

  clearMessage() {
    this.message = null;
  }
}
