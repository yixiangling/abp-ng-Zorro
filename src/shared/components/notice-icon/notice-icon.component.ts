import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NoticeItem } from './notice-item';

@Component({
    selector: 'notice-icon',
    templateUrl: './notice-icon.component.html',
    styleUrls: [ './notice-icon.less' ]
})
export class NoticeIconComponent {
    @Input() data: NoticeItem[] = [];

    /** 图标上的消息总数 */
    @Input()
    get count() { return this._count; }
    set count(value: any) {
        this._count = coerceNumberProperty(value);
    }
    private _count: number;

    /** 图标不展示数字，只有一个小红点 */
    @Input()
    get dot() { return this._dot; }
    set dot(value: any) {
        this._dot = coerceBooleanProperty(value);
    }
    private _dot = false;

    /** 弹出卡片加载状态 */
    @Input()
    get loading() { return this._loading; }
    set loading(value: any) {
        this._loading = coerceBooleanProperty(value);
    }
    private _loading = false;

    @Output() select = new EventEmitter<any>();
    @Output() clear = new EventEmitter<string>();

    /** 手动控制Popover显示 */
    @Input()
    get popoverVisible() { return this._popoverVisible; }
    set popoverVisible(value: any) {
        this._popoverVisible = coerceBooleanProperty(value);
    }
    private _popoverVisible = false;

    @Output() popoverVisibleChange = new EventEmitter<boolean>();

    onVisibleChange(result: boolean) {
        this.popoverVisibleChange.emit(result);
    }

    onSelect(i: any) {
        this.select.emit(i);
    }

    onClear(title: string) {
        this.clear.emit(title);
    }
}
