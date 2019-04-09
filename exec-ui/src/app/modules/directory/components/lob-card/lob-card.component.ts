import {Component, Input, OnInit} from '@angular/core';
import {Lob} from "../../../shared/domain-models/lob";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lob-card',
  templateUrl: './lob-card.component.html',
  styleUrls: ['./lob-card.component.scss']
})
export class LobCardComponent implements OnInit {

    @Input() public lob: Lob;
    public id: string;
    public name: string;
    public initials: string;

  constructor(private router: Router) { }

  ngOnInit() {
      this.initials = this.lob.id;
      this.name = this.lob.name;
  }

    goToLob(name: string) {
        this.router.navigate(['lob', name]);
    }

}
