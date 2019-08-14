import $ from 'jquery'
import createReactUnit from './unit';
import createElement from './element';
import Components from './component';

let React =  {
    render,
    nextRootIdx: 0,
    createElement,
    Components
}

/**
 * ele: 字符串  组件  jsx-> 虚拟dom  类
 */
function render(ele, cont){
    let createReactUnitInstance = createReactUnit(ele);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIdx);
    $(cont).html(markUp);
    $(document).trigger('mounted');
}



export default React;