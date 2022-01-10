import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  activeProfile = {
    username: '',
    email: '',
    id: 0,
    functions: Array.from<string>([]),
  };

  constructor() { }
}
