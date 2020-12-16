
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
export const MOCKMENUITEMLIST: MenuItem[] = [
  {
    displayName: '主页',
    iconName: 'fa fa-home fa-fw',
    route: '/home',
  },
  {
    displayName: '组件示例',
    iconName: 'fas fa-place-of-worship',
    expanded: true,
    children: [
      {
        displayName: 'title',
        route: '/title'
      },
      {
        displayName: 'button',
        route: '/button'
      },
      {
        displayName: 'badge',
        route: '/badge'
      },
      {
        displayName: 'box',
        route: '/box'
      },
      {
        displayName: 'tooltip',
        route: '/tooltip'
      },
      {
        displayName: 'kebab',
        route: '/kebab'
      },
      {
        displayName: 'input',
        route: '/input'
      },
      {
        displayName: 'textarea',
        route: '/textarea'
      },
      {
        displayName: 'date-picker',
        route: '/date-picker'
      },
      {
        displayName: 'checkbox',
        route: '/checkbox'
      },
      {
        displayName: 'radio-button',
        route: '/radio-button'
      },
      {
        displayName: 'switch',
        route: '/switch'
      },
      {
        displayName: 'panel',
        route: '/panel'
      },
      {
        displayName: 'dropdown',
        route: '/dropdown'
      },
      {
        displayName: 'paginator',
        route: '/paginator'
      },
      {
        displayName: 'progress-bar',
        route: '/progress-bar'
      },
      {
        displayName: 'circle-bar',
        route: '/circle-bar'
      },
      {
        displayName: 'tab',
        route: '/tab'
      },
      {
        displayName: 'draggable-pics',
        route: '/draggable-pics'
      },
      {
        displayName: 'img-upload',
        route: '/img-upload'
      },
      {
        displayName: 'cropper',
        route: '/cropper'
      },
      {
        displayName: 'stepper',
        route: '/stepper'
      },
      {
        displayName: 'dialog',
        route: '/dialog'
      },
      {
        displayName: 'table',
        route: '/table'
      },
      {
        displayName: 'tree',
        route: '/tree'
      }]
  }
];
