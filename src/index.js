import React from './react/core'

let aaa = React.createElement('div', {name: 'name'}, '你好', React.createElement('button', {name:'btn', onclick:function(){alert(1)} }, '按钮'));

class subCounter{
    constructor(props){
        this.state = {name: 'son'}
    }
    componentWillMount(){
        console.log('child 将要 挂载');
    }
    componentDidMount(){
        console.log('child 挂载完成');
    }
    render(){
        return this.state.name;
    }
}

class Counter extends React.Components{
    constructor(props) {
        super(props);
        this.state = {number: aaa}
    }
    componentWillMount(){
        console.log('parent 将要 挂载');
    }

    componentDidMount(){
        console.log('parent 挂载完成');
    }

    render(){
        return React.createElement(subCounter, {name: 'son'});
    }    
}

let bbb = React.createElement(Counter, {name: 'counter'});

// 前面少了一步由 <Counter name='couter'/>  -> 转换为AST的时候，   转换为React.createElement 的形式
React.render(bbb, document.getElementById('root'))