import { Injectable } from "@nestjs/common";
import { AccessControl, IQueryInfo } from "accesscontrol";
import { roles } from "src/app.roles";

@Injectable()
export class AccessControlService {
    accessControl: AccessControl;
    currentUser: any;

    constructor() {//@GetUser() private currentUser: any //@Req() private request: Request
      this.accessControl = roles;
    }

    canUser(query: IQueryInfo, currentUser: any, resourceOwnerID?: number) {
        if(resourceOwnerID && (resourceOwnerID !== currentUser.id)) {
            query.possession = "any";
        } else {
            query.possession = "own";
        }
        query.role = currentUser.roles;
        var permission = this.accessControl.permission(query);
        
        return permission.granted;
    }
}