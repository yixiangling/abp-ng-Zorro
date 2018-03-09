import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'tag-select',
    templateUrl: './tag-select.component.html',
    styleUrls: [ './tag-select.less' ]
})
export class TagSelectComponent {

    @HostBinding('class.tag-select')
    _cls = true;

    /** 是否启用 `展开与收进` */
    @HostBinding('class.has-expand')
    @Input()
    get expandable() { return this._expandable; }
    set expandable(value: any) {
        this._expandable = coerceBooleanProperty(value);
    }
    private _expandable = true;

    @HostBinding('class.expanded')
    expand = false;

    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    trigger() {
        this.expand = !this.expand;
        this.change.emit(this.expand);
    }
}
