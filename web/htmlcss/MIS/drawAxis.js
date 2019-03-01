//折线图的坐标轴
function drawAxis(maxValue) {
    var lineWrapper = document.getElementById("line-wrapper");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "line");
    canvas.setAttribute("width", "650");
    canvas.setAttribute("height", "330");
    lineWrapper.appendChild(canvas);

    if (canvas.getContext) {   //确定浏览器支持canvas
        var ctx = canvas.getContext("2d");
        ctx.save();//Canvas 状态是以堆(stack)的方式保存的，每一次调用 save 方法，当前的状态就会被推入堆中保存起来。可以调用任意多次 save 方法
        ctx.beginPath(); //添加ctx.beginPath();否则xy轴颜色会被覆盖
        ctx.moveTo(30.5, 60);  //默认左上角坐标为(0,0);
        ctx.lineTo(30.5, 270.5);
        ctx.lineTo(630.5, 270.5);
        ctx.stroke();
        // y轴刻度
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            let y = 60.5 + 35 * i;   //从上到下实际的大小,把两条线之间距离设置为35；
            let valueY = maxValue * (6 - i) / 6;  //y轴显示的值，从上到下
            ctx.moveTo(30.5, y);//坐标轴内表格
            ctx.lineTo(630.5, y);
            ctx.strokeStyle = "#dbdbdb";
            ctx.stroke();
            ctx.beginPath();//坐标轴左侧延长
            ctx.moveTo(30.5, y);
            ctx.lineTo(25, y);
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.font = "12px 微软雅黑";
            ctx.fillText(valueY, 0, y+5); //坐标的数值，以及位置(0,y+5)
        }
        // x轴刻度
        ctx.restore();//每一次调用 restore 方法，上一个保存的状态就从堆中弹出，所有设定都恢复
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            let x = 30.5 + 50 * i;
            let month = (i + 1) + "月";
            ctx.moveTo(x, 270.5);
            ctx.lineTo(x, 275);
            ctx.stroke();
            ctx.font = "13px 微软雅黑";
            ctx.fillText(month, x - 10, 290);
        }
    }
    return ctx;
}