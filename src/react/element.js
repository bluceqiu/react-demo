
class Element{
    constructor(type, props){
        this.type = type;
        this.props = props;
    }
}

// 返回虚拟dom， 用对象来描述元素
function createElement(type, props, ...children){
    props = props || {};
    props.children = children;

    return new Element(type, props);
}

export default createElement;