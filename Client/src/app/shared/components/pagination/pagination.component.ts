import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  //input is what we receive from parent component
  @Input() totalCount !: number;
  @Input() pageSize !: number;
  @Output() pageChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  onPageChange(event : any){
    this.pageChanged.emit(event.page);
  }

}
