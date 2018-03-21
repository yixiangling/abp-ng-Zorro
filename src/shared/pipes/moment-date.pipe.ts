import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * 基于 moment 日期格式化，显示更多细节参考：
 *
 * @see http://momentjs.com/docs/#/displaying
 *
 * @example
 * ```html
 * {{ data | toDate }}
 * 2017-09-17 15:35
 *
 * {{ data | toDate: 'YYYY年MM月DD日' }}
 * 2017年09月17
 *
 * {{ data | toDate: 'fn' }}
 * 10 秒前
 * ```
 */
@Pipe({ name: 'toDate' })
export class MomentDatePipe implements PipeTransform {
    transform(value?: Date | moment.Moment, formatString: string = 'YYYY-MM-DD HH:mm'): string {
        if (value) {
            let d = (value instanceof Date) ? moment(value) : value;
            if (formatString === 'fn')
                return moment(value).fromNow();
            return moment(value).format(formatString);
        } else {
            return '';
        }
    }
}
