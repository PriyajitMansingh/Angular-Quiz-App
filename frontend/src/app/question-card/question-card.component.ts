import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent {

  @Input() title!: string;
  @Input() description!: string;
  @Input() assignedTo: any = null;


  @Output() assignClicked = new EventEmitter<void>();
  @Output() editClicked = new EventEmitter<void>();
@Output() deleteClicked = new EventEmitter<void>();

  onAssign() {
    this.assignClicked.emit();
  }
  onEdit(){
    this.editClicked.emit();
  }
  onDelete(){
    this.deleteClicked.emit();
  }

  onAdd(){
    
  }
}
