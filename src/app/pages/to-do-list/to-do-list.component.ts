import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {

  isChecked: boolean = false;

  toDoList = [{isChecked: false}, {isChecked: false}]

  checkValue(event: any){
    console.log(event);
 }

}
