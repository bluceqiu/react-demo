import $ from 'jquery'
import createReactUnit from './unit'

let React =  {
    render,
    nextRootIdx: 0
}


/**
 * ele: 字符串  组件  jsx-> 虚拟dom  类
 */
function render(ele, cont){
    let createReactUnitInstance = createReactUnit(ele);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIdx);
    $(cont).html(markUp);
}

export default React