import { Injectable, Req } from "@nestjs/common";
import { AccessControl, IQueryInfo } from "accesscontrol";
import { roles } from "src/app.roles";
import { GetUser } from "src/auth/decorator";

@Injectable()
export class AccessControlService {
    accessControl: AccessControl;

    constructor(@Req  () private request: Request) {//@GetUser() private currentUser: any
      this.accessControl = roles;
  
    }

    canUser(query: IQueryInfo, resourceOwnerID?: number) {
        // if(resourceOwnerID && (resourceOwnerID !== this.currentUser.id)) {
        //     query.possession = "any";
        // } else {
        //     query.possession = "own";
        // }
        // query.role = this.currentUser.roles;
        // var permission = this.accessControl.permission(query);
        
        // return permission.granted;
    }

}