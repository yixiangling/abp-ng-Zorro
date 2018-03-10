import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { EditorRoutingModule } from './editor-routing.module';
import { UeditorComponent } from './ueditor/ueditor.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        EditorRoutingModule
    ],
    declarations: [UeditorComponent]
})
export class EditorModule {}
