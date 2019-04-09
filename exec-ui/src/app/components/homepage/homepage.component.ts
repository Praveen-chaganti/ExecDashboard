import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {HeadingModel} from "../../modules/shared/component-models/heading-model";
import {DirectoryHeadingStrategy} from "../../modules/directory/strategies/directory-heading-strategy";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
    providers: [DirectoryHeadingStrategy]
})
export class HomepageComponent implements OnInit {

    public searchStr = '';
    public model: HeadingModel;

  constructor(private router: Router, private strategy: DirectoryHeadingStrategy) {
      this.model = strategy.parse_search();
  }

  ngOnInit() {
  }

  searchPortfolios(){
      console.log(this.searchStr)

      let navigationExtras: NavigationExtras = {
          queryParams: {
              "search_str": this.searchStr
          }
      };
      this.router.navigate(['directory'], navigationExtras);
  }

  showAllPortfolios(){
      console.log("show all click")
      this.router.navigate(['directory']);
  }

    printSome(){
      console.log("from image")
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "search_str": this.searchStr
            }
        };
        this.router.navigate(['directory'], navigationExtras);
    }

}
