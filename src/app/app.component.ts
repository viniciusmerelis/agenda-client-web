import {Component} from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {

    menuMode = 'static';

    constructor(
        private primengConfig: PrimeNGConfig,
        private translateService: TranslateService
    ) {
        this.translateService.addLangs(['pt']);
        this.translateService.setDefaultLang('pt');
        this.translateService.stream('primeng').subscribe(data => this.primengConfig.setTranslation(data));
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    }
}
