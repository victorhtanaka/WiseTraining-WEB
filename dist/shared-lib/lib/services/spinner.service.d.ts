import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SpinnerService {
    visibility: BehaviorSubject<boolean>;
    constructor();
    show(): void;
    hide(): void;
    isVisible(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpinnerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SpinnerService>;
}
