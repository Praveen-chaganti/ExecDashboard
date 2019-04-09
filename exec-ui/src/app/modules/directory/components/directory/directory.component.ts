import { PortfolioService, Portfolio } from '../../../shared/shared.module';
import {Component, OnInit, Input} from '@angular/core';
import { SortingService } from '../../../../services/sorting.service';
import {HeadingModel} from '../../../shared/component-models/heading-model';
import { DirectoryHeadingStrategy } from '../../strategies/directory-heading-strategy';
import {Router, ActivatedRoute} from "@angular/router";
import {Lob} from "../../../shared/domain-models/lob";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  providers: [PortfolioService, SortingService, DirectoryHeadingStrategy]
})

export class DirectoryComponent implements OnInit {

  @Input() public heading = 'Select an Executive';
  public portfolios = new Array<Portfolio>();
  public lobList = ['360', 'CARD', 'COAF', 'COMMERCIAL', 'DIGITAL', 'INFOSEC', 'RETAIL BANK', 'SHARED TECH'];
  public lobs = new Array<Lob>();
  public allLobs = new Array<Lob>();
  public allPortfolios = new Array<Portfolio>();
  public isNilPortfolio: boolean;
  public isNilLob: boolean;
  public headingModel: HeadingModel;
  public hModelEnggMat: HeadingModel;
  public hModelSelPrtFo: HeadingModel;
  public qryString = '';

  constructor(private portfolioService: PortfolioService,
              private sortingService: SortingService,
              private strategy: DirectoryHeadingStrategy,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          if (typeof params["search_str"] != 'undefined' && params["search_str"]){
              this.qryString = params["search_str"];
          } else { this.qryString = ""; } });

      this.headingModel = this.strategy.parse();
      this.hModelEnggMat = this.strategy.parse_enggMat();
      this.hModelSelPrtFo = this.strategy.parse_selPrtFo()

      this.portfolioService.getPortfolios().subscribe(result => {
          this.sortingService
              .sort({array:result, byProperty: 'executive.lastName', thenByProperty: 'executive.firstName'})
              .forEach((portfolio) => {
                  this.allPortfolios.push(portfolio);
              });
          if (this.qryString === ""){
              this.portfolios = this.allPortfolios;
              this.isNilPortfolio = (this.portfolios.length === 0);
          }else{
              this.search();
          }
      }, error => { console.log(error); });

      this.lobList.forEach(lob => {
          console.log("get LOB : " + lob);
          var iLob = new Lob();
          iLob.id = lob.charAt(0);
          iLob.name= lob;
          this.allLobs.push(iLob);
      });

      if(this.qryString === ""){
          this.lobs = this.allLobs;
          this.isNilLob = (this.lobs.length === 0);
      }else {
          this.search();
      }
      console.log("LOB length : " + this.lobs.length)

    /*this.portfolioService.getPortfolios()
      .subscribe(
        result => {
          this.sortingService
            .sort<Portfolio>({array: result, byProperty: 'executive.lastName', thenByProperty: 'executive.firstName'})
            .forEach((portfolio) =>
              this.portfolios.push(portfolio));
          this.allPortfolios = this.portfolios;
        },
        error => {
          console.log(error);
        }
      );*/
  }

  search() {
    this.portfolios = this.allPortfolios;
      const value = this.qryString;
      if (this.qryString && !!this.qryString.length) {
      const searchResult = new Array<Portfolio>();
      this.portfolios.forEach(element => {
        if ((element.executive.firstName).toLowerCase().includes(value.toLowerCase())
          || (element.executive.lastName).toLowerCase().includes(value.toLowerCase())) {
          searchResult.push(element);
        }
      });
      this.portfolios = searchResult;
    }
    this.isNilPortfolio = (this.portfolios.length === 0);

    this.lobs = this.allLobs;
      if (this.qryString && !!this.qryString.length) {
          const searchResult = new Array<Lob>();
          this.lobs.forEach(element => {
              if ((element.name).toLowerCase().includes(value.toLowerCase())) {
                  searchResult.push(element);
              }
          });
          this.lobs = searchResult;
      }
      this.isNilLob = (this.lobs.length === 0);
  }

  showAll(){
      this.qryString = "";
      this.router.navigate(['directory']);
      this.portfolios = this.allPortfolios;
      this.lobs = this.allLobs;
  }
}
