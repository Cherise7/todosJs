
var arr = [];
var list = document.querySelector('.list');
var itemNum = document.querySelector('.itemNum');
var clearall = document.querySelector('.clearall');
var btn = document.querySelector('.btn');
var all = document.querySelector('.btn button:nth-child(1)');
var active = document.querySelector('.btn button:nth-child(2)');
var completed = document.querySelector('.btn button:nth-child(3)');
var mulBtn = document.querySelector('.mulBtn');
var addText = document.querySelector('.addText');
// 内容显示
// conshow(false,false)
// all 状态
all.onfocus = function () {
    btnNoAct()
    this.classList.add('active')
    conshow(false,false)
}
// active 状态
active.onfocus = function () {
    btnNoAct()
    this.classList.add('active')
    conshow(true,false)
    
}
// completed 状态
completed.onfocus = function () {
    btnNoAct()
    this.classList.add('active')
    conshow(false, true)
}
// 按钮的排他事件
function btnNoAct() {
    for (var i = 0; i < btn.children.length; i++) {
        btn.children[i].classList.remove('active')
    }
}
// 清空所有划掉的项
clearall.onclick = function () {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ischoose) {
            arr.splice(i, 1)
            i--
            for (var j = 0; j < btn.children.length; j++) {
                if (btn.children[j].classList.contains('active')) {
                    console.log(btn.children[j]);
                    btn.children[j].onfocus()
                }
            }
        }
    }
}


function conshow(flag1,flag2) {
    list.innerHTML = '';
    num = 0;
    num2 = 0;
    // all的显示内容
    for (var i = 0; i < arr.length; i++) {
        list.innerHTML += arr[i].content;
        if (flag1) {
            if (arr[i].ischoose) {
                list.children[i].classList.add('none')
            }
        }else if (flag2){
            if (!arr[i].ischoose) {
                list.children[i].classList.add('none')
            }
        }
        con = document.querySelectorAll('.con');
        // ischoose 的选择生成内容
        if (arr[i].ischoose) {
            con[i].classList.add('delline')
        } else {
            con[i].classList.remove('delline')
        }
        chooseone = document.querySelectorAll('.chooseone');
        chooseone[i].style.height = list.children[i].offsetHeight - 20 + "px";
        del = document.querySelectorAll('.del');
        // itemNum 内容
        if (!arr[i].ischoose) {
            chooseone[i].children[0].innerHTML = '';
            num++
        } else {
            chooseone[i].children[0].innerHTML = '√';
            num2++
        }

    }
    // item显示内容
    itemNum.innerHTML = num;
    // clearall是否显示
    if (num2) {
        clearall.style.display = 'block'
    } else {
        clearall.style.display = 'none'
    }
    // chooseone的点击事件
    console.log(chooseone)
    for (var n = 0; n < chooseone.length; n++) {
        chooseone[n].setAttribute('index', n)
        chooseone[n].onclick = function () {
            // console.log(this.parentNode);
            ind = this.getAttribute('index');
            if (!chooseone[ind].children[0].innerHTML) {
                arrjudge(true, this.parentNode)
                conshow(flag1, flag2)
                chooseone[ind].children[0].innerHTML = '√'
            } else {
                arrjudge(false, this.parentNode)
                conshow(flag1, flag2)
                chooseone[ind].children[0].innerHTML = ''
            }
        }
    }
    // 鼠标进入/离开li的事件
    for (var j = 0; j < list.children.length; j++) {
        list.children[j].setAttribute('ind', j)
        list.children[j].onmouseover = function () {
            var i = this.getAttribute('ind')
            this.children[2].style.display = 'block';
            // 删除
            del[i].onclick = function delClick() {
                arr.splice(i, 1)
                conshow(false, false)
            };

        }
        list.children[j].onmouseleave = function () {
            this.children[2].style.display = 'none';
        }
    }
    // 多选全选
    mulBtn.onclick = function () {
        if (mulBtn.classList.contains('chooall')) {
            mulBtn.classList.remove('chooall')
            for (var i = 0; i < arr.length; i++) {
                arr[i].ischoose = false;
                conshow(flag1, flag2)
            }

        } else {
            mulBtn.classList.add('chooall')
            for (var i = 0; i < arr.length; i++) {
                arr[i].ischoose = true;
                conshow(flag1, flag2)
            }
        }
    }

}
// 
// 数组属性的判断与更改
function arrjudge(flag, ele) {
    var ids
    for (var i = 0; i < list.children.length; i++) {
        if (list.children[i] == ele) {
            arr[i].ischoose = flag
        }

    }
}
// 回车按下事件
addText.onkeyup = function (e) {
    e = event || e;
    var key = e.keyCode;
    if (key == 13 && addText.value != '') {
        arr.push({
            content: "<li><div class ='chooseone'><span>√</span></div><span class = 'con'>" + addText.value + "</span><span class='del'>×</span></li>",
            ischoose: false
        })
        addText.value = ''
        conshow(false, false)
    }
}
