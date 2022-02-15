//>>built
define("dojox/calendar/Touch","dojo/_base/array dojo/_base/lang dojo/_base/declare dojo/dom dojo/dom-geometry dojo/_base/window dojo/on dojo/_base/event dojo/keys".split(" "),function(k,e,s,m,u,t,h,f,v){return s("dojox.calendar.Touch",null,{touchStartEditingTimer:500,touchEndEditingTimer:1E4,postMixInProperties:function(){this.on("rendererCreated",e.hitch(this,function(b){var a=b.renderer.renderer;this.own(h(a.domNode,"touchstart",e.hitch(this,function(b){this._onRendererTouchStart(b,a)})))}))},_onRendererTouchStart:function(b,
a){var c=this._edProps;c&&c.endEditingTimer&&(clearTimeout(c.endEditingTimer),c.endEditingTimer=null);var d=a.item.item;c&&c.endEditingTimer&&(clearTimeout(c.endEditingTimer),c.endEditingTimer=null);null!=c&&c.item!=d&&(c.startEditingTimer&&clearTimeout(c.startEditingTimer),this._endItemEditing("touch",!1),c=null);if(!c){var n=[];n.push(h(t.doc,"touchend",e.hitch(this,this._docEditingTouchEndHandler)));n.push(h(this.itemContainer,"touchmove",e.hitch(this,this._docEditingTouchMoveHandler)));this._setEditingProperties({touchMoved:!1,
item:d,renderer:a,rendererKind:a.rendererKind,event:b,handles:n,liveLayout:this.liveLayout});c=this._edProps}this._isEditing?(e.mixin(c,this._getTouchesOnRenderers(b,c.editedItem)),this._startTouchItemEditingGesture(b)):1<b.touches.length?f.stop(b):(this._touchSelectionTimer=setTimeout(e.hitch(this,function(){this._saveSelectedItems=this.get("selectedItems");this.selectFromEvent(b,d._item,a,!1)?this._pendingSelectedItem=d:delete this._saveSelectedItems;this._touchSelectionTimer=null}),200),c.start=
{x:b.touches[0].screenX,y:b.touches[0].screenY},this.isItemEditable(c.item,c.rendererKind)&&(this._edProps.startEditingTimer=setTimeout(e.hitch(this,function(){this._touchSelectionTimer&&(clearTimeout(this._touchSelectionTimer),delete this._touchSelectionTime);this._pendingSelectedItem?(this.dispatchChange(null==this._saveSelectedItems?null:this._saveSelectedItems[0],this._pendingSelectedItem,null,b),delete this._saveSelectedItems,delete this._pendingSelectedItem):this.selectFromEvent(b,d._item,a);
this._startItemEditing(c.item,"touch",b);c.moveTouchIndex=0;this._startItemEditingGesture([this.getTime(b)],"move","touch",b)}),this.touchStartEditingTimer)))},_docEditingTouchMoveHandler:function(b){var a=this._edProps,c=b.touches[0].screenX,d=b.touches[0].screenY;if(a.startEditingTimer&&(25<Math.abs(c-a.start.x)||25<Math.abs(d-a.start.y)))clearTimeout(a.startEditingTimer),a.startEditingTimer=null,clearTimeout(this._touchSelectionTimer),this._touchSelectionTimer=null,this._pendingSelectedItem&&(delete this._pendingSelectedItem,
this.selectFromEvent(b,null,null,!1));a.touchMoved=!0;if(this._editingGesture&&(f.stop(b),a.itemBeginDispatched)){c=[];d="resizeEnd"==a.editKind?a.editedItem.endTime:a.editedItem.startTime;switch(a.editKind){case "move":c[0]=this.getTime(b,-1,-1,null==a.moveTouchIndex||0>a.moveTouchIndex?0:a.moveTouchIndex);break;case "resizeStart":c[0]=this.getTime(b,-1,-1,a.resizeStartTouchIndex);break;case "resizeEnd":c[0]=this.getTime(b,-1,-1,a.resizeEndTouchIndex);break;case "resizeBoth":c[0]=this.getTime(b,
-1,-1,a.resizeStartTouchIndex),c[1]=this.getTime(b,-1,-1,a.resizeEndTouchIndex)}this._moveOrResizeItemGesture(c,"touch",b);"move"==a.editKind?-1==this.renderData.dateModule.compare(a.editedItem.startTime,d)?this.ensureVisibility(a.editedItem.startTime,a.editedItem.endTime,"start",this.autoScrollTouchMargin):this.ensureVisibility(a.editedItem.startTime,a.editedItem.endTime,"end",this.autoScrollTouchMargin):"resizeStart"==b.editKind||"resizeBoth"==b.editKind?this.ensureVisibility(a.editedItem.startTime,
a.editedItem.endTime,"start",this.autoScrollTouchMargin):this.ensureVisibility(a.editedItem.startTime,a.editedItem.endTime,"end",this.autoScrollTouchMargin)}},autoScrollTouchMargin:10,_docEditingTouchEndHandler:function(b){f.stop(b);var a=this._edProps;a.startEditingTimer&&(clearTimeout(a.startEditingTimer),a.startEditingTimer=null);this._isEditing?(e.mixin(a,this._getTouchesOnRenderers(b,a.editedItem)),this._editingGesture&&(0==a.touchesLen?(this._endItemEditingGesture("touch",b),0<this.touchEndEditingTimer&&
(a.endEditingTimer=setTimeout(e.hitch(this,function(){this._endItemEditing("touch",!1)}),this.touchEndEditingTimer))):(this._editingGesture&&this._endItemEditingGesture("touch",b),this._startTouchItemEditingGesture(b)))):(a.touchMoved?(this._saveSelectedItems&&(this.set("selectedItems",this._saveSelectedItems),delete this._saveSelectedItems,delete this._pendingSelectedItem),k.forEach(a.handles,function(a){a.remove()})):(f.stop(b),k.forEach(a.handles,function(a){a.remove()}),this._touchSelectionTimer?
(clearTimeout(this._touchSelectionTimer),this.selectFromEvent(b,a.item._item,a.renderer,!0)):this._pendingSelectedItem&&(this.dispatchChange(0==this._saveSelectedItems.length?null:this._saveSelectedItems[0],this._pendingSelectedItem,null,b),delete this._saveSelectedItems,delete this._pendingSelectedItem),this._pendingDoubleTap&&this._pendingDoubleTap.item==a.item?(this._onItemDoubleClick({triggerEvent:b,renderer:a.renderer,item:a.item._item}),clearTimeout(this._pendingDoubleTap.timer),delete this._pendingDoubleTap):
(this._pendingDoubleTap={item:a.item,timer:setTimeout(e.hitch(this,function(){delete this._pendingDoubleTap}),this.doubleTapDelay)},this._onItemClick({triggerEvent:b,renderer:a.renderer,item:a.item._item}))),this._edProps=null)},_startTouchItemEditingGesture:function(b){var a=this._edProps,c=-1!=a.resizeStartTouchIndex,d=-1!=a.resizeEndTouchIndex;c&&d||this._editingGesture&&2==a.touchesLen&&(d&&"resizeStart"==a.editKind||c&&"resizeEnd"==a.editKind)?(this._editingGesture&&"resizeBoth"!=a.editKind&&
this._endItemEditingGesture("touch",b),a.editKind="resizeBoth",this._startItemEditingGesture([this.getTime(b,-1,-1,a.resizeStartTouchIndex),this.getTime(b,-1,-1,a.resizeEndTouchIndex)],a.editKind,"touch",b)):c&&1==a.touchesLen&&!this._editingGesture?this._startItemEditingGesture([this.getTime(b,-1,-1,a.resizeStartTouchIndex)],"resizeStart","touch",b):d&&1==a.touchesLen&&!this._editingGesture?this._startItemEditingGesture([this.getTime(b,-1,-1,a.resizeEndTouchIndex)],"resizeEnd","touch",b):this._startItemEditingGesture([this.getTime(b)],
"move","touch",b)},_getTouchesOnRenderers:function(b,a){for(var c=this._getStartEndRenderers(a),d=-1,e=-1,f=-1,h=null!=c[0]&&null!=c[0].resizeStartHandle,k=null!=c[1]&&null!=c[1].resizeEndHandle,l=0,p=!1,r=this.itemToRenderer[a.id],g=0;g<b.touches.length;g++){if(-1==d&&h&&(p=m.isDescendant(b.touches[g].target,c[0].resizeStartHandle)))d=g,l++;if(-1==e&&k&&(p=m.isDescendant(b.touches[g].target,c[1].resizeEndHandle)))e=g,l++;if(-1==d&&-1==e)for(var q=0;q<r.length;q++)if(p=m.isDescendant(b.touches[g].target,
r[q].container)){f=g;l++;break}if(-1!=d&&-1!=e&&-1!=f)break}return{touchesLen:l,resizeStartTouchIndex:d,resizeEndTouchIndex:e,moveTouchIndex:f}}})});