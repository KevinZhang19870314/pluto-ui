import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { NpDialogModule } from './dialog.module';
import { NpDialog } from './dialog.component';
import { DialogConfig } from './dialog-config';
import { DialogInjector } from './dialog-injector';
import { DialogRef } from './dialog-ref';

/**
 * @ignore
 */
@Injectable({
  providedIn: NpDialogModule
})
export class DialogService {
  dialogComponentRef: ComponentRef<NpDialog>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public open(componentType: Type<any>, config: DialogConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NpDialog);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
      sub.unsubscribe();
    });

    this.dialogComponentRef = componentRef;

    return dialogRef;
  }

  // [KevinZhang]: Need to pass dialogComponentRef as parameter, because this service is providedIn DialogModule,
  // so only one instance in this module, thus we need to pass dialogComponentRef once we open a new dialog,
  // this will deal with a scenario for nested dialog close event
  private removeDialogComponentFromBody(dialogComponentRef: ComponentRef<NpDialog>) {
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
  }
}
