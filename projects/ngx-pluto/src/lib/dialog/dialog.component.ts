import { Component, OnInit, AfterViewInit, OnDestroy, Type, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { DialogRef } from './dialog-ref';
import { Subject, Observable } from 'rxjs';
import { DialogConfig } from './dialog-config';

/**
 * @ignore
 */
@Component({
  selector: 'np-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class NpDialog implements OnInit, AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose: Observable<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef,
    public config: DialogConfig) {
    this.onClose = this._onClose.asObservable();
    console.log(config.userClass);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();  // Avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(evt: MouseEvent) {
    if (this.config.backdrop === false) {
      return
    }
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
