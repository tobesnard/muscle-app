import { Component } from "@angular/core";
import { TitleComponent } from "../title/title.component";
import { FrontendSwitcherComponent } from "../frontend-switcher/frontend-switcher.component";

@Component({
    selector: "app-main",
    standalone: true,
    imports: [TitleComponent, FrontendSwitcherComponent],
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent {
}