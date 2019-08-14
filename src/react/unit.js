import $ from 'jquery';
class Unit{
    constructor(ele){
        this.currentEle = ele;
    }
}

class ReactText extends Unit{
    getMarkUp(idx){
        this._rootId = idx;
        let markUp = `<span data-rid=${idx}>${this.currentEle}</span>`
        return markUp;
    }
}

class ReactNativeUnit extends Unit{
    getMarkUp(idx){
        this._rootId = idx;
        let {type, props} = this.currentEle;
        let tagStart = `<${type} data-rid="${idx}"`;
        let tagEnd = `</${type}>`;
        let contentString;

        for (const propName in props) {
            if(/on[a-zA-Z]/.test(propName)){
                let eventType = propName.slice(2).toLowerCase();
                $(document).on(eventType, `[data-rid="${idx}"]`, props[propName]);
            }else if(propName === 'children'){
                contentString = props[propName].map((child, idx) => {
                    let childInstance = createReactUnit(child);
                    return childInstance.getMarkUp(`${this._rootId}.${idx}`);
                }).join('');
            }else{
                tagStart += ` ${propName}=${props[propName]}`
            }
        }

        let markUp = `${tagStart}>${contentString}${tagEnd}`;
        return markUp;
    }
}

class ReactCompositUnit extends Unit{
    getMarkUp(idx){
        this._rootId = idx;
        let {type:Component, props} = this.currentEle;
        let componentInstance = new Component(props);
        componentInstance.componentWillMount && componentInstance.componentWillMount();
        
        let instanceRender = componentInstance.render();

        let ReactCompositUnitInstance = createReactUnit(instanceRender); // child 进到这里了
        
        let markUp = ReactCompositUnitInstance.getMarkUp(idx);

        $(document).on('mounted', ()=>{
            componentInstance.componentDidMount && componentInstance.componentDidMount();
        })

        return markUp;
    }
}

export default function createReactUnit(ele){
    if(typeof ele === 'string' || typeof ele === 'number'){
        return new ReactText(ele);
    }

    if(typeof ele === 'object' && typeof ele.type === 'string'){
        return new ReactNativeUnit(ele);
    }

    if(typeof ele === 'object' && typeof ele.type === 'function'){
        return new ReactCompositUnit(ele);
    }
    
}