import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  activeProfile = {
    name: '',
    email: '',
    id: 0,
    functions: Array.from<string>([]),
  };

  constructor() { }
}
