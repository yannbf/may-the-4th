import { MenuType, Menu, Platform, Animation } from 'ionic-angular';

/*
* AMAZING idea by Paul Vetter:
* https://github.com/EbilPanda
*/

export class MenuShiftType extends MenuType {
    constructor(private menu: Menu, private plt: Platform) {
        super(plt);

        let contentOpenedX: string, menuClosedX: string, menuOpenedX: string;

        contentOpenedX = menu.width() + 'px';
        menuOpenedX = '0px';
        menuClosedX = -menu.width() + 'px';

        let menuAni = new Animation(plt, menu.getMenuElement());
        menuAni.fromTo('translateX', menuClosedX, menuOpenedX);
        this.ani.add(menuAni);

        let contentApi = new Animation(plt, menu.getContentElement());
        let scale = 0.85;
        contentApi.fromTo('translateX', '0px', contentOpenedX);
        contentApi.fromTo('scale', '1', `${scale}`);
        contentApi.beforeAddClass('opening');
        contentApi.afterRemoveClass('opening');
        this.ani.add(contentApi);
    }
}