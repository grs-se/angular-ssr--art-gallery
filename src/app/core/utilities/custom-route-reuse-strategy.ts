import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, } from '@angular/router';

export class CustomRouteReuseStrategy {
//export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  routesToCache: string[] = ["dashboard"];
  storedRouteHandles = new Map<string, DetachedRouteHandle>();

  // Decides if the route should be stored
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    //return this.routesToCache.indexOf(route!.routeConfig!.path!) > -1;
    return route.data['reuseRoute'] === true;
  }

  //Store the information for the route we're destructing
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRouteHandles.set(route!.routeConfig!.path!, handle);
  }

  //Return true if we have a stored route object for the next route
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRouteHandles.has(route!.routeConfig!.path!);
  }

  //If we returned true in shouldAttach(), now return the actual route data for restoration
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | any {
    if (route.routeConfig && route.routeConfig.path) {
      return this.storedRouteHandles.get(route.routeConfig.path);
    }
  }

  //Reuse the route if we're going to and from the same route
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
  //private routeStore = new Map<string, DetachedRouteHandle>();
  //shouldDetach(route: ActivatedRouteSnapshot): boolean {
  //  const path = route.routeConfig.path;
  //  return path && ['compA', 'compB'].includes(path);
  //}
  //store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | undefined): void {
  //  this.routeStore.set(route.routeConfig.path, handle);
  //}
  //shouldAttach(route: ActivatedRouteSnapshot): boolean {
  //  const path = route.routeConfig.path;
  //  return (
  //    path && ['compA', 'compB'].includes(path) && !!this.routeStore.get(path)
  //  );
  //}
  //override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | undefined {
  //  const path = route!.routeConfig!.path;
  //  return this.routeStore.get(path!);
  //}
  //shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
  //  return future.routeConfig === curr.routeConfig;
  //}
  //private routeStore = new Map<string, DetachedRouteHandle>();

  //shouldDetach(route: ActivatedRouteSnapshot): boolean | "" | undefined {
  //  if (route.routeConfig && route.routeConfig.path) {
  //    const path = route.routeConfig.path;
  //    return path && ['compA', 'compB'].includes(path);
  //  }
  //  return
  //}
  //store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  //  if (route.routeConfig && route.routeConfig.path) {
  //    this.routeStore.set(route.routeConfig.path, handle);
  //  }
  //}
  //shouldAttach(route: ActivatedRouteSnapshot): boolean | "" | undefined {
  //  if (route.routeConfig && route.routeConfig.path) {
  //    const path = route.routeConfig.path;
  //    return (
  //      path && ['compA', 'compB'].includes(path) && !!this.routeStore.get(path)
  //    );
  //  }
  //  return;
  //}
  //retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | undefined {
  //  if (route.routeConfig && route.routeConfig.path) {

  //    const path = route.routeConfig.path;
  //    return this.routeStore.get(path);
  //  }
  //  return;
  //}
  //shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
  //  return future.routeConfig === curr.routeConfig;
  //}
}
