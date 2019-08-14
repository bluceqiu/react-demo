
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

export default function createReactUnit(ele){
    if(typeof ele === 'string' || typeof ele === 'number'){
        return new ReactText(ele);
    }
    
}