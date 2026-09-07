import { Component } from "@angular/core";
import { TitleComponent } from "../title/title.component";

@Component({
    selector: "app-main",
    standalone: true,
    imports: [TitleComponent],
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent {
}