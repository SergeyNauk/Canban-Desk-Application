import {Task} from './task';

export class SaveDataService {
  data: Task[] = [];

  allTask: any;
  classElem: any;
  classParentEl: any;
  delElem: any;

  constructor() {
  }

  addData(itemEl: number, itemTimeCreate: any, itemBgColor: string, itemText: any, itemContentd: boolean,
          itemDelBtn: string, itemColumn: string, itemParentClassName: string, itemDate: string, itemVisibleColorBtn: string) {

   if (this.data == null) {
     this.data = [];
   }

    this.data.push(new Task(itemEl, itemTimeCreate, itemBgColor, itemText, itemContentd, itemDelBtn, itemColumn, itemParentClassName, itemDate, itemVisibleColorBtn));

    this.saveInLocal();
  }

  saveInLocal(){

    this.allTask = JSON.stringify(this.data);

    localStorage.setItem('ourTasks', this.allTask);

    localStorage.ourTasks;
    this.data = JSON.parse(localStorage.getItem('ourTasks'));
  }

  changeBgColor(idNumberElem, bgColorElem) {

    if (bgColorElem =='palegreen') {
      this.classParentEl = document.getElementById('low'+idNumberElem).parentNode.parentNode;
    } else if (bgColorElem == 'yellow') {
      this.classParentEl = document.getElementById('normal'+idNumberElem).parentNode.parentNode;
    } else {
      this.classParentEl = document.getElementById('hight'+idNumberElem).parentNode.parentNode;
    }

    this.data[idNumberElem].itemBgCoor = bgColorElem;
    this.data[idNumberElem].itemParentClassName = this.classParentEl.className;

    this.saveInLocal();
  }

  changeTextInTask (idNumberElem){
    this.data[idNumberElem].itemText = document.getElementById(idNumberElem).innerHTML;

    this.saveInLocal();

  }

  changeRediness(idNumberElem){
    this.classElem = document.getElementById('id'+idNumberElem).parentNode;

    this.data[idNumberElem].itemColumn = this.classElem.className;
    this.data[idNumberElem].itemParentClassName = this.classElem.parentNode.className;

    if (this.classElem.className == 'inProgress') {
      this.data[idNumberElem].itemContend = false;
    } else if (this.classElem.className == 'done-element'){
      this.data[idNumberElem].itemDelBtn = 'inline-block';
      this.data[idNumberElem].itemVisibleColorBtn ='none';
    }

    this.saveInLocal();
  }

  deleteInData(idNumberElem){

    this.delElem = document.getElementById('del'+idNumberElem);

   this.data.forEach( (ourDiv, number) => {
     if (ourDiv.itemTimeCreate == idNumberElem) {
       this.data.splice(number, 1);
     }
    }
   );

    this.saveInLocal();
  }

  returnData(){

    localStorage.ourTasks;
    return JSON.parse(localStorage.getItem('ourTasks'));

  }
}
