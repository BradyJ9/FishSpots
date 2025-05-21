import { Component, Input } from "@angular/core";
import { CatchDto } from "../../../model/dto/CatchDto";

@Component ({
    selector: 'add-catch-bar',
    templateUrl: './add-catch-bar.component.html',
    styleUrl: './add-catch-bar.component.css',
    imports: []
})

export class AddCatchBarComponent {
    constructor() {}

    @Input() currCatch!: CatchDto
    @Input() removeCatch!: (index: number) => void;
    @Input() indexInList!: number;
}