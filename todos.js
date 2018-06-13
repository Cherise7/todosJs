var arr = [
    {
        id: 1,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>111</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>222</span><span class='del'>×</span></li>",
        ischoose: false
    }
]
var list = document.querySelector('.list');
var del, chooseone, con
// 内容显示
conshow()
function conshow() {
    list.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        list.innerHTML += arr[i].content;
        chooseone = document.querySelectorAll('.chooseone');
        del = document.querySelectorAll('.del');
        con = document.querySelectorAll('.con');
        chooseone[i].style.height = list.children[i].offsetHeight - 20 + "px";
        // ischoose 的选择生成内容
        if (arr[i].ischoose) {
            con[i].classList.add('delline')
        }else{
            con[i].classList.remove('delline') 
        }
    }
}
    // chooseone的点击事件
for (var n = 0; n < chooseone.length; n++) {
    chooseone[n].onclick = function () {
        // console.log(this.parentNode);
        if (!this.children[0].innerHTML) {
            arrjudge(true, this.parentNode)
            conshow()
            console.log(this.children[0]);
            this.children[0].innerHTML = '√'
        } else {
            arrjudge(false, this.parentNode)
            conshow()
            this.children[0].innerHTML = ''
            console.log(this.children[0]);
        }
    }
}
    // 鼠标进入/离开li的事件
for (var j = 0; j < list.children.length; j++) {
    list.children[j].onmouseover = function () {
        this.children[2].style.display = 'block';
    }
    list.children[j].onmouseleave = function () {
        this.children[2].style.display = 'none';
    }
}

// 数组属性的判断与更改
function arrjudge(flag,ele) {
    for (var i = 0; i < list.children.length; i++) {
        if (list.children[i] == ele) {
            arr[i].ischoose = flag
        }

    }
}