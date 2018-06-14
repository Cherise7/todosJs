var arr = [
    {
        id: 1,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>111</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>333</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>3331</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>3332</span><span class='del'>×</span></li>",
        ischoose: true
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>3333</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>3334</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 2,
        content: "<li><div class ='chooseone'><span></span></div><span class = 'con'>3335</span><span class='del'>×</span></li>",
        ischoose: false
    },
    {
        id: 3,
        content: "<li><div class ='chooseone'><span>√</span></div><span class = 'con'>222</span><span class='del'>×</span></li>",
        ischoose: true
    }
]
var list = document.querySelector('.list');
var itemNum = document.querySelector('.itemNum');
var clearall = document.querySelector('.clearall');
var btn = document.querySelector('.btn');
var all = document.querySelector('.btn button:nth-child(1)');
var active = document.querySelector('.btn button:nth-child(2)');
var completed = document.querySelector('.btn button:nth-child(3)');
var mulBtn = document.querySelector('.mulBtn');
// 内容显示
conshow()
function conshow() {
    list.innerHTML = '';
    num = 0;
    num2 = 0;
    for (var i = 0; i < arr.length; i++) {
        list.innerHTML += arr[i].content;
        con = document.querySelectorAll('.con');
        // ischoose 的选择生成内容
        if (arr[i].ischoose) {
            con[i].classList.add('delline')
        }else{
            con[i].classList.remove('delline') 
        }
        chooseone = document.querySelectorAll('.chooseone');
        chooseone[i].style.height = list.children[i].offsetHeight - 20 + "px";
        del = document.querySelectorAll('.del');
        // itemNum 内容
        if (!arr[i].ischoose) {
            num++
        }else{
            chooseone[i].children[0].innerHTML = '√';
            num2++
        }
    }
    itemNum.innerHTML = num;
    if(num2){
        clearall.style.display = 'block'
    }else {
        clearall.style.display = 'none'
    }
    // chooseone的点击事件
    for (var n = 0; n < chooseone.length; n++) {
        chooseone[n].setAttribute('index',n)
        chooseone[n].setAttribute('index', n)
        chooseone[n].onclick = function () {
            // console.log(this.parentNode);
            ind = this.getAttribute('index');
            if (!chooseone[ind].children[0].innerHTML) {
                arrjudge(true, this.parentNode)
                conshow()
                chooseone[ind].children[0].innerHTML = '√'
            } else {
                arrjudge(false, this.parentNode)
                conshow()
                chooseone[ind].children[0].innerHTML = ''
            }
        }
    }
    // 鼠标进入/离开li的事件
    for (var j = 0; j < list.children.length; j++) {
        list.children[j].setAttribute('ind',j)
        list.children[j].onmouseover = function () {
            var i = this.getAttribute('ind')
            this.children[2].style.display = 'block';
            // 删除
            del[i].onclick = function delClick() {
                arr.splice(i, 1)
                conshow()
            };

        }
        list.children[j].onmouseleave = function () {
            this.children[2].style.display = 'none';
        }
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


// all 状态
all.onfocus = function () {
    btnNoAct()
    this.classList.add('active')
    conshow()
}
// active 状态
active.onfocus = function () {
    list.innerHTML = '';
    btnNoAct()
    this.classList.add('active')
    num4 = 0
    for (var i = 0; i < arr.length; i++) {
        if (!arr[i].ischoose) {
            list.innerHTML += arr[i].content;
            chooseone = document.querySelectorAll('.chooseone');
            chooseone[num4].style.height = list.children[num4].offsetHeight - 20 + "px";
            num4++
        }
    }
}
// completed 状态
completed.onfocus = function () {
    list.innerHTML = '';
    btnNoAct()
    this.classList.add('active')
    num3 = 0
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ischoose) {
            list.innerHTML += arr[i].content;
            chooseone = document.querySelectorAll('.chooseone');
            chooseone[num3].style.height = list.children[num3].offsetHeight - 20 + "px";
            chooseone[num3].children[0].innerHTML = '√';
            con = document.querySelectorAll('.con');
            con[num3].classList.add('delline')
            num3++
        }
    }
}
// 按钮的排他事件
function btnNoAct() {
    for (var i = 0; i < btn.children.length; i++) {
        btn.children[i].classList.remove('active')
    }
}
clearall.onclick = function () {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ischoose){
            arr.splice(i, 1)
            i--
            for (var j = 0; j < btn.children.length; j++) {
                if (btn.children[j].classList.contains('active')){
                    console.log(btn.children[j]);
                    btn.children[j].onfocus()
                }
            }
        }
    }
}
mulBtn.onclick = function () {
    if (mulBtn.classList.contains('chooall')){
        mulBtn.classList.remove('chooall')
        for (var i = 0; i < arr.length; i++) {
            arr[i].ischoose = false;
            conshow()
        }
    }else {
        mulBtn.classList.add('chooall')
        for (var i = 0; i < arr.length; i++) {
            arr[i].ischoose = true;
            conshow()
        }
    }
}