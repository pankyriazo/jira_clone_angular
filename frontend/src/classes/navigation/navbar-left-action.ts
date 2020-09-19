import { NavbarLeftActionI } from 'src/directives/navigation/navbar-left-action';

export class NavbarLeftAction implements NavbarLeftActionI {
    public icon: string;
    public tooltip: string;
    public classes: string[];
    public handler: Function;

    constructor(_icon: string, _tooltip: string, _classes: string[], _handler: Function) {
        this.icon = _icon;
        this.tooltip = _tooltip;
        this.classes = _classes;
        this.handler = _handler;
    }
}
