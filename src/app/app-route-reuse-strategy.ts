import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from "@angular/router";

export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {
  public override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return (future.routeConfig === curr.routeConfig) || future.data['reuseComponent'];
  }
}
