import { Component, ViewEncapsulation, TemplateRef, Input, ContentChild, ElementRef, Renderer2, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'number-info',
    templateUrl: './number-info.component.html',
    styleUrls: [ './number-info.less' ]
})
export class NumberInfoComponent implements OnChanges {
    _title = '';
    _titleTpl: TemplateRef<any>;
    /** 标题 */
    @Input()
    set title(value: string | TemplateRef<any>) {
        if (value instanceof TemplateRef) {
            this._title = null;
            this._titleTpl = value;
        } else
            this._title = value;
    }

    _subTitle = '';
    _subTitleTpl: TemplateRef<any>;
    /** 子标题 */
    @Input()
    set subTitle(value: string | TemplateRef<any>) {
        if (value instanceof TemplateRef) {
            this._subTitle = null;
            this._subTitleTpl = value;
        } else
            this._subTitle = value;
    }

    _total = '';
    _totalTpl: TemplateRef<any>;
    /** 总量 */
    @Input()
    set total(value: string | TemplateRef<any>) {
        if (value instanceof TemplateRef) {
            this._total = null;
            this._totalTpl = value;
        } else
            this._total = '' + value;
    }

    _subTotal = '';
    _subTotalTpl: TemplateRef<any>;
    /** 总量后缀 */
    @Input()
    set subTotal(value: string | TemplateRef<any>) {
        if (value instanceof TemplateRef)
            this._subTotalTpl = value;
        else
            this._subTotal = value;
    }

    /** 子总量 */
    @Input() suffix: string;

    /** 增加状态 */
    @Input() status: 'up' | 'down';

    /** 状态样式 */
    @Input() theme: 'light' = 'light';

    /** 设置数字和描述直接的间距（像素） */
    @Input()
    get gap() { return this._gap; }
    set gap(value: any) {
        this._gap = coerceNumberProperty(value);
    }
    private _gap = 8;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    _classMap: string[] = [];
    setClass() {
        this._classMap.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));

        this._classMap = [ `number-info` ];
        if (this.theme) this._classMap.push(this.theme);

        this._classMap.forEach(v => this.renderer.addClass(this.el.nativeElement, v));
    }

    ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
        this.setClass();
    }
}
