import type { RouteLocationRaw } from 'vue-router';

export interface MenuItem {
  key: string;
  relatedKeys: string[];
  title: string;
  caption?: string;
  icon?: string;
  to?: RouteLocationRaw;
}
export interface Menu extends MenuItem {
  children?: MenuItem[];
}
