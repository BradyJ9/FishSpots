import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CatchDto } from "../../../model/dto/CatchDto";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component ({
    selector: 'add-catch-bar',
    templateUrl: './add-catch-bar.component.html',
    styleUrl: './add-catch-bar.component.css',
    imports: [ReactiveFormsModule]
})

export class AddCatchBarComponent {
    constructor() {}

    public catchForm! : FormGroup;

    @Input() currCatch!: CatchDto;
    @Output() currCatchChange = new EventEmitter<CatchDto>();
    @Input() removeCatch!: (index: number) => void;
    @Input() indexInList!: number;

    

    ngOnInit() {
        this.catchForm = new FormGroup({
            species: new FormControl('', Validators.required),
            weight: new FormControl('', [Validators.min(0)]),
            length: new FormControl('', [Validators.min(0)])
        });
    }

    public updateCatch() {
        this.currCatchChange.emit(this.currCatch);
    }
}