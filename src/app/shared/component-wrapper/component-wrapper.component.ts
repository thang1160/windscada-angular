import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss']
})
export class ComponentWrapperComponent implements OnInit {

  constructor() { }

  @Input() title: string | undefined;

  ngOnInit(): void {
  }

}
