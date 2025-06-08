import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { CatchDto } from "../../../model/dto/CatchDto";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CatchService } from "../../services/catch.service";

@Component ({
    selector: 'add-catch-bar',
    templateUrl: './add-catch-bar.component.html',
    styleUrl: './add-catch-bar.component.css',
    imports: [ReactiveFormsModule]
})

export class AddCatchBarComponent {
    constructor(private cdf: ChangeDetectorRef) {}

    public catchForm! : FormGroup;
    public catchImage: File | null = null;

    @Input() currCatch!: CatchDto;
    @Output() currCatchChange = new EventEmitter<CatchDto>();
    @Input() removeCatch!: (index: number) => void;
    @Input() indexInList!: number;
    @Output() catchFileChange = new EventEmitter<File>();

    @Input() submitted: boolean = false;

    ngOnInit() {
        this.catchForm = new FormGroup({
            species: new FormControl('', Validators.required),
            weight: new FormControl('', [Validators.min(0)]),
            length: new FormControl('', [Validators.min(0)])
        });
    }

    public updateCatch() {
        this.currCatchChange.emit(this.currCatch);
        //this.catchFileChange.emit(undefined);
    }

    public onFileSelected = (event: Event, index: number) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.catchImage = input.files[0];
            this.currCatchChange.emit(this.currCatch);
            this.catchFileChange.emit(input.files[0]);
        }
        this.cdf.detectChanges();
    }
}