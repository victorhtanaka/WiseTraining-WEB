import { MatSidenav } from '@angular/material/sidenav';
import * as i0 from "@angular/core";
export declare class SidenavService {
    private sidenav;
    private sidenavState;
    sidenavState$: import("rxjs").Observable<boolean>;
    setSidenav(sidenav: MatSidenav): void;
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidenavService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SidenavService>;
}
