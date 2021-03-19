import { Component, OnInit } from '@angular/core';

interface Case {
  dateReported: string;
  status: string;
  gender: string;
  age: number;
  acquisition: string;
  items?: number;
}
interface TreeNode<T> {
  data: T;
}

@Component({
  selector: 'app-table-cases',
  templateUrl: './table-cases.component.html',
  styleUrls: ['./table-cases.component.scss']
})
export class TableCasesComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  // Table settings
  allColumns = [ 'dateReported', 'status', 'acquisition', 'gender', 'age'];

  data: TreeNode<Case>[] = [
    {
      data: { dateReported: 'Mar 13, 2021', status: 'Under Investigation', gender: 'Male',  age: 45, acquisition: 'Workplace Outbreak'},
    },
  ];

}
