import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { catchError, interval, of, Subscription, switchMap } from "rxjs";
import { HealthCheckService } from "../../services/healthcheck.service";

@Component ({
    selector: 'loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrl: './loading-dialog.component.css',
    imports: [MatDialogModule, MatIconModule,CommonModule],
    encapsulation: ViewEncapsulation.None
})

export class LoadingDialogComponent {
    backendHealthy = true;
    private pollSub?: Subscription;
    
    constructor(private healthCheckService:HealthCheckService) {}

    ngOnInit():void{
        this.checkForBackend();
    }

    ngOnDestroy(): void {
        this.pollSub?.unsubscribe();
    }

    private checkForBackend():void{
        this.pollSub = interval(2000).pipe(
        switchMap(() =>
            this.healthCheckService.getHealthCheck().pipe(
            catchError(() => of(null))
            )
        )
        ).subscribe((response) => {
        if (response && response.status === 200) {
            this.backendHealthy = true;
        } else {
            this.backendHealthy = false;
        }
        });
    }
}