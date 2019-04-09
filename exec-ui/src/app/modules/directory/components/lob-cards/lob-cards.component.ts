import {Component, Input, OnInit} from '@angular/core';
import {Lob} from "../../../shared/domain-models/lob";

@Component({
  selector: 'app-lob-cards',
  templateUrl: './lob-cards.component.html',
  styleUrls: ['./lob-cards.component.scss']
})
export class LobCardsComponent implements OnInit {

    @Input() public lobs: Lob[];
  constructor() { }

  ngOnInit() {
  }

}
