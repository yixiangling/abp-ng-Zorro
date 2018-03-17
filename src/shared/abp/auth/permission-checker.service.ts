import { Injectable } from '@angular/core';
import { Abp } from './../abp';

@Injectable()
export class PermissionCheckerService {

    isGranted(permissionName: string): boolean {
        return Abp.auth.isGranted(permissionName);
    }

}
