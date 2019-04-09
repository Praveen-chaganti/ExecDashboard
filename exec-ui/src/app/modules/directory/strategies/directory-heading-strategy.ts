import {Strategy} from '../../shared/strategies/strategy';
import {HeadingModel} from '../../shared/component-models/heading-model';
import { Injectable } from '@angular/core';

@Injectable()
export class DirectoryHeadingStrategy implements Strategy<void, HeadingModel> {
  parse() {
    const model = new HeadingModel();
    model.icon = 'person';
    model.primaryText = 'Select a Portfolio';

    return model;
  }

    parse_search() {
        const model = new HeadingModel();
        model.icon = 'search';
        model.primaryText = '';
        return model;
    }

    parse_enggMat() {
        const model = new HeadingModel();
        model.icon = 'rocket';
        model.primaryText = 'Engineering Maturity';
        return model;
    }

    parse_selPrtFo() {
        const model = new HeadingModel();
        model.icon = 'briefcase';
        model.primaryText = 'Select a Portfolio';

        return model;
    }
}
