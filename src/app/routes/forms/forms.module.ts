import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';

import { FormsRoutingModule } from './forms-routing.module';
import { HttpClientModule } from '@angular/common/http';

// JSON-Schema form
import { JsonSchemaModule } from '@shared/components/json-schema/json-schema.module';

import { StandardComponent } from './standard/standard.component';
import { ExtendedComponent } from './extended/extended.component';
import { UploadComponent } from './upload/upload.component';
import { CropperComponent } from './cropper/cropper.component';
import { ValidationComponent } from './validation/validation.component';

import { JSONSchemaComponent } from './json-schema/json-schema.component';

@NgModule({
    imports: [
        SharedModule,
        FormsRoutingModule,
        ColorPickerModule,
        ImageCropperModule,
        HttpClientModule,
        JsonSchemaModule
    ],
    declarations: [
        StandardComponent,
        ExtendedComponent,
        UploadComponent,
        CropperComponent,
        ValidationComponent,
        JSONSchemaComponent
    ]
})
export class FormsModule { }
