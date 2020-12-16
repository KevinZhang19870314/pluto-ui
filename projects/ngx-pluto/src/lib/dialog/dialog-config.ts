/**
 * @ignore
 */
export class DialogConfig<D = any> {
  data?: D;
  userClass?: string;
  backdrop?: boolean; //是否允许点击空白处关闭，默认开启;
}
