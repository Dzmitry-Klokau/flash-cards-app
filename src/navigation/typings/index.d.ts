declare type RouteName =
  | "home"
  | "admin"
  | "admin-game-details"
  | "profile"
  | "settings"
  | "game";

declare type RouteOptions = {
  path: string;
  Icon?: SvgIconComponent;
};

declare type Routes = { [ROUTE in RouteName]: RouteOptions };

declare type RouteItemObj = RouteOptions & {
  name: RouteName;
};
declare type RouteItemObjList = Array<RouteItemObj>;
