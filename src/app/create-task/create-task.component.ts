import { Component, OnInit} from '@angular/core';
import {SaveDataService} from '../save-data.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']

})
export class CreateTaskComponent implements OnInit {
  localSt: any = [];

  newDiv: any;
  numberOfElem: number = 0;
  childDiv: any;
  btnLow: any;
  btnNormal: any;
  btnHight: any;
  dateOfCreate: any = new Date();
  spanElem: any;
  toggle: any;
  ourElem: any;
  ourToggleElem: any;
  delIcon: any;
  delElem: any;
  sortElem:any;
  statusElem:any;
  timeCr: number = 0;
  lengthOfPlaceholder: number = 500;
  /*----------------------------------*/
  firstPlHold: any;
  secondPlHold: any;
  thirdPlHold: any;
  /*----------------------*/
  numberBtnLow: number = 0;
  numberBtnNormal: number = 0;
  numberBtnHight: number = 0;
  numberTextElem: number = 0;
  numberToggleElem: number = 0;
  numberDelElem: number = 0;

  constructor(private saveDataService: SaveDataService) {
  }

  create(itemBgColor = 'palegreen', itemText = 'new Task', itemContentd = true,
         itemDelBtn = 'none', itemColumn = 'doIt', parentClassName = 'do-it-low', itemDate,
         itemVisibleColorBtn = 'inline-block') {

    this.lengthOfPlaceholder += 100;
    this.firstPlHold = document.querySelector('.placeholder-1');
    this.firstPlHold.style.height = this.lengthOfPlaceholder + 'px';
    this.secondPlHold = document.querySelector('.placeholder-2');
    this.secondPlHold.style.height = this.lengthOfPlaceholder + 'px';
    this.thirdPlHold = document.querySelector('.placeholder-3');
    this.thirdPlHold.style.height = this.lengthOfPlaceholder + 'px';

    this.newDiv = document.createElement('div');
    document.querySelector('.'+parentClassName).appendChild(this.newDiv);
    this.newDiv.className = itemColumn;
    this.newDiv.style.cssText = ' width: 100%; height:100px; margin-top:5px;';
    this.newDiv.style.backgroundColor = itemBgColor;
    this.newDiv.setAttribute('data-timecreate', this.timeCr++);
    this.newDiv.setAttribute('data-numberOfElem',this.numberOfElem++);

    this.btnLow = document.createElement('div');
    this.newDiv.appendChild(this.btnLow);
    this.btnLow.style.cssText = 'cursor: pointer; width: 10px; height:10px; border: solid 0.01px black; margin-left:5px; background-color: green; border-radius:50%'
    this.btnLow.className = 'green';
    this.btnLow.style.display = itemVisibleColorBtn ;
    this.btnLow.addEventListener('click', this.setPriority);
    this.btnLow.addEventListener('click', this.sorting);
    let num1 = this.numberBtnLow++;
    this.btnLow.id = 'low'+num1;
    this.btnLow.addEventListener('click', () => this.saveDataService.changeBgColor(num1, 'palegreen'));

    this.btnNormal = document.createElement('div');
    this.newDiv.appendChild(this.btnNormal);
    this.btnNormal.style.cssText = 'cursor: pointer;  width: 10px; height:10px; border: solid 0.01px black; margin-left:5px; background-color: yellow; border-radius:50%'
    this.btnNormal.style.display = itemVisibleColorBtn ;
    this.btnNormal.addEventListener('click', this.setPriority);
    this.btnNormal.addEventListener('click', this.sorting);
    let num2 = this.numberBtnNormal++;
    this.btnNormal.id = 'normal'+num2;
    this.btnNormal.addEventListener('click', () => this.saveDataService.changeBgColor(num2, 'yellow'));

    this.btnHight = document.createElement('div');
    this.newDiv.appendChild(this.btnHight);
    this.btnHight.style.cssText = 'cursor: pointer; width: 10px; height:10px; border: solid 0.01px black; margin-left:5px; background-color: red; border-radius:50%'
    this.btnHight.style.display = itemVisibleColorBtn;
    this.btnHight.addEventListener('click', this.setPriority);
    this.btnHight.addEventListener('click', this.sorting);
    let num3 = this.numberBtnHight++;
    this.btnHight.id = 'hight'+num3;
    this.btnHight.addEventListener('click', () => this.saveDataService.changeBgColor(num3, 'coral'));

    this.spanElem = document.createElement('span');
    this.newDiv.appendChild(this.spanElem);
    this.spanElem.style.cssText = 'color: grey; font-size:12px; margin-left:5px';
    this.dateOfCreate = new Date();
    if (itemDate == undefined){itemDate = this.dateOfCreate.getHours() + ':' + this.dateOfCreate.getMinutes() + '//' + this.dateOfCreate.getDate() + '.' + (this.dateOfCreate.getMonth()+1) + '.'+this.dateOfCreate.getFullYear()};
    this.spanElem.innerHTML = itemDate;

    this.toggle = document.createElement('span');
    this.newDiv.appendChild(this.toggle);
    this.toggle.style.cssText = 'color: grey; font-size: 16px; margin-left:5px; cursor: pointer;';
    this.toggle.innerHTML = '=>';
    let num5 = this.numberToggleElem++;
    this.toggle.id ='id' + num5;
    this.toggle.onclick = this.toggleElem;
    this.toggle.addEventListener('click', this.setPriority);
    this.toggle.addEventListener('click', this.sorting);
    this.toggle.addEventListener('click', () => this.saveDataService.changeRediness(num5));

    this.delIcon = document.createElement('div');
    this.newDiv.appendChild(this.delIcon);
    this.delIcon.innerHTML = 'x';
    this.delIcon.style.cssText = 'display: inline-block ; border: solid 0.01px black; background-color:black; cursor: pointer; color: white; font-size: 11px; float: right; width: 11px; height:11px; text-align: center';
    this.delIcon.style.display = itemDelBtn;
    let num6 = this.numberDelElem++;
    this.delIcon.id = 'del' + num6;
    this.delIcon.addEventListener('click', () => this.saveDataService.deleteInData(num6));
    this.delIcon.addEventListener('click', this.delElement);

    this.childDiv = document.createElement('div');
    this.newDiv.appendChild(this.childDiv);
    this.childDiv.style.cssText = 'width:100%; font-size: 16px; height:90px; overflow: auto; outline:none;'
    this.childDiv.setAttribute('contenteditable', itemContentd);
    this.childDiv.innerHTML = itemText;
    let num4 = this.numberTextElem++;
    this.childDiv.id = num4;
    this.childDiv.addEventListener('blur', () => this.saveDataService.changeTextInTask(num4) )

    this.saveDataService.addData(this.numberOfElem, this.newDiv.dataset.timecreate, this.newDiv.style.backgroundColor, this.childDiv.innerHTML,
      this.childDiv.getAttribute('Contenteditable'), this.delIcon.style.display, this.newDiv.className, this.newDiv.parentNode.className, itemDate, itemVisibleColorBtn);

  }

  setPriority() {
      this.ourElem = this;

        if (this.ourElem.style.backgroundColor == 'green' ) {
          this.ourElem.parentNode.style.backgroundColor = 'palegreen';
          document.querySelector('.'+ this.ourElem.parentNode.parentNode.parentNode.className+'-low').appendChild(this.ourElem.parentNode);
        } else if (this.ourElem.style.backgroundColor == 'yellow') {
          this.ourElem.parentNode.style.backgroundColor = 'yellow';
          document.querySelector('.'+ this.ourElem.parentNode.parentNode.parentNode.className+'-normal').appendChild(this.ourElem.parentNode);
        } else if (this.ourElem.style.backgroundColor == 'red') {
          this.ourElem.parentNode.style.backgroundColor = 'coral';
          document.querySelector('.'+ this.ourElem.parentNode.parentNode.parentNode.className+'-height').appendChild(this.ourElem.parentNode);
        } else {
          if (this.ourElem.parentNode.style.backgroundColor == 'palegreen'){
            document.querySelector('.'+ this.ourElem.parentNode.parentNode.parentNode.className+'-low').appendChild(this.ourElem.parentNode);
          } else if (this.ourElem.parentNode.style.backgroundColor == 'yellow' ){
          document.querySelector('.'+ this.ourElem.parentNode.parentNode.parentNode.className+'-normal').appendChild(this.ourElem.parentNode);
        } else {
          document.querySelector('.'+ this.ourElem.parentNode.parentNode.parentNode.className+'-height').appendChild(this.ourElem.parentNode);
          }
        }
      }

    toggleElem() {

      this.ourToggleElem = this;
      if (this.ourToggleElem.parentNode.style.backgroundColor == 'palegreen' ){
        this.statusElem = 'low';
      } else if (this.ourToggleElem.parentNode.style.backgroundColor == 'yellow') {
        this.statusElem = 'normal';
      } else {
        this.statusElem = 'height';
      }

      if (this.ourToggleElem.parentNode.className == 'doIt') {
        document.querySelector('.in-progress-'+this.statusElem).appendChild(this.ourToggleElem.parentNode);
        this.ourToggleElem.parentNode.className = 'inProgress';
        this.ourToggleElem.parentNode.children[6].setAttribute('contenteditable', 'false') /* 6 - означає, що eлемент текстового поля 7-ий в переліку дітей створюваного div*/

      } else if (this.ourToggleElem.parentNode.className == 'inProgress') {
        document.querySelector('.done-'+this.statusElem).appendChild(this.ourToggleElem.parentNode);
        this.ourToggleElem.parentNode.className = 'done-element';
        this.ourToggleElem.parentNode.children[5].style.display = 'inline-block'; /* 5 - означає, що кнопка видалення діва 6-а в переліку дітей створюваного div*/
        this.ourToggleElem.parentNode.children[0].style.display = 'none';
        this.ourToggleElem.parentNode.children[1].style.display = 'none';   /* 0,1,2 - означають круглі кнопки, якими встановлюється пріорітет задачі*/
        this.ourToggleElem.parentNode.children[2].style.display = 'none';   /*ці кнопки відповідно перша, друга і третя в переліку дітей створюваного div */
      } else {
        document.querySelector('.aborted-'+this.statusElem).appendChild(this.ourToggleElem.parentNode);
        this.ourToggleElem.parentNode.className = 'aborted-element';
      }
    }

    delElement(){

      this.delElem = this;
      this.delElem.parentNode.parentNode.removeChild(this.delElem.parentNode);
  }

    sorting() {
      this.sortElem = this;

      if (this.sortElem.parentNode.previousSibling) {
        for (let i = 0; i < this.sortElem.parentNode.parentNode.children.length - 1; i++) {
          if (this.sortElem.parentNode.previousSibling.dataset.timecreate > this.sortElem.parentNode.dataset.timecreate) {
            this.sortElem.parentNode.parentNode.insertBefore(this.sortElem.parentNode, this.sortElem.parentNode.previousSibling);
          }
        }
      }
    }

    ngOnInit() {
    this.localSt = this.saveDataService.returnData();

    localStorage.clear();

      this.localSt.forEach( (task) => {
        this.create(task.itemBgCoor, task.itemText, task.itemContend, task.itemDelBtn, task.itemColumn, task.itemParentClassName, task.itemDate, task.itemVisibleColorBtn);
      }
    );
  }
}
