
/**
 * @ignore
 */
export interface MenuItem {
  displayName?: string;
  iconName?: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
  level?: string;
  active?: boolean;
}

/**
 * @ignore
 */
export interface UserInfo {
  shopName?: string;
  shopId?: any;
  username?: string;
  [props: string]: any;
}
