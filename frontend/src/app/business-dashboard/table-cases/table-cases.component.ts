// Server - CovidBit - Fast Pandas
// Created:  10, February, 2021, Valya Derksen
// Modified: 01, April, 2021, Teresa Costa: backend integration, added global variables

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

  // Table settings
  allColumns = [ 'dateReported', 'status', 'acquisition', 'gender', 'age'];

  constructor() {}

  ngOnInit(): void {}

  data: TreeNode<Case>[] = [
    {
      data: { dateReported: 'Mar 13, 2021', status: 'Under Investigation', gender: 'Male',  age: 45, acquisition: 'Workplace Outbreak'},
    },
  ];

}
