/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from './home.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/element';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from '../shared/model/model.service';
import * as import9 from '@angular/core/src/metadata/view';
import * as import10 from '@angular/core/src/linker/component_factory';
import * as import11 from './home.component.css.shim';
import * as import12 from '@angular/common/src/pipes/json_pipe';
export class Wrapper_HomeComponent {
  context:import0.HomeComponent;
  changed:boolean;
  constructor(p0:any) {
    this.changed = false;
    this.context = new import0.HomeComponent(p0);
  }
  detectChangesInInputProps(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this.changed;
    this.changed = false;
    return changed;
  }
  detectChangesInHostProps(view:import1.AppView<any>,el:any,throwOnChange:boolean):void {
  }
}
var renderType_HomeComponent_Host:import2.RenderComponentType = (null as any);
class _View_HomeComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import3.AppElement;
  _HomeComponent_0_4:Wrapper_HomeComponent;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_HomeComponent_Host0,renderType_HomeComponent_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    this._el_0 = import4.selectOrCreateRenderHostElement(this.renderer,'home',import4.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this._appEl_0 = new import3.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_HomeComponent0(this.viewUtils,this.injector(0),this._appEl_0);
    this._HomeComponent_0_4 = new Wrapper_HomeComponent(this.parentInjector.get(import8.ModelService));
    this._appEl_0.initComponent(this._HomeComponent_0_4.context,([] as any[]),compView_0);
    compView_0.create(this._HomeComponent_0_4.context,this.projectableNodes,(null as any));
    this.init(([] as any[]).concat([this._el_0]),[this._el_0],([] as any[]),([] as any[]));
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.HomeComponent) && (0 === requestNodeIndex))) { return this._HomeComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._HomeComponent_0_4.detectChangesInInputProps(this,this._el_0,throwOnChange);
    this.detectContentChildrenChanges(throwOnChange);
    this._HomeComponent_0_4.detectChangesInHostProps(this,this._el_0,throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_HomeComponent_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<any> {
  if ((renderType_HomeComponent_Host === (null as any))) { (renderType_HomeComponent_Host = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.None,([] as any[]),{})); }
  return new _View_HomeComponent_Host0(viewUtils,parentInjector,declarationEl);
}
export const HomeComponentNgFactory:import10.ComponentFactory<import0.HomeComponent> = new import10.ComponentFactory<import0.HomeComponent>('home',viewFactory_HomeComponent_Host0,import0.HomeComponent);
const styles_HomeComponent:any[] = [import11.styles];
var renderType_HomeComponent:import2.RenderComponentType = (null as any);
class _View_HomeComponent0 extends import1.AppView<import0.HomeComponent> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _text_10:any;
  _text_11:any;
  /*private*/ _expr_12:any;
  _pipe_json_0:import12.JsonPipe;
  /*private*/ _expr_14:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_HomeComponent0,renderType_HomeComponent,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_12 = import7.UNINITIALIZED;
    this._expr_14 = import7.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import3.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._el_0 = import4.createRenderElement(this.renderer,parentRenderNode,'div',new import4.InlineArray2(2,'class','home'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n  Home component\n  ',(null as any));
    this._el_2 = import4.createRenderElement(this.renderer,this._el_0,'strong',import4.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'Async data call return value:',(null as any));
    this._text_4 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_5 = import4.createRenderElement(this.renderer,this._el_0,'pre',import4.EMPTY_INLINE_ARRAY,(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_8 = import4.createRenderElement(this.renderer,this._el_0,'blockquote',import4.EMPTY_INLINE_ARRAY,(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_11 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._pipe_json_0 = new import12.JsonPipe();
    this.init(([] as any[]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._text_10,
      this._text_11
    ]
    ,([] as any[]),([] as any[]));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import7.ValueUnwrapper();
    this.detectContentChildrenChanges(throwOnChange);
    valUnwrapper.reset();
    const currVal_12:any = import4.interpolate(1,'',valUnwrapper.unwrap(this._pipe_json_0.transform(this.context.data)),'');
    if ((valUnwrapper.hasWrappedValue || import4.checkBinding(throwOnChange,this._expr_12,currVal_12))) {
      this.renderer.setText(this._text_6,currVal_12);
      this._expr_12 = currVal_12;
    }
    const currVal_14:any = import4.interpolate(1,'',this.context.data.data,'');
    if (import4.checkBinding(throwOnChange,this._expr_14,currVal_14)) {
      this.renderer.setText(this._text_9,currVal_14);
      this._expr_14 = currVal_14;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
}
export function viewFactory_HomeComponent0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<import0.HomeComponent> {
  if ((renderType_HomeComponent === (null as any))) { (renderType_HomeComponent = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.Emulated,styles_HomeComponent,{})); }
  return new _View_HomeComponent0(viewUtils,parentInjector,declarationEl);
}