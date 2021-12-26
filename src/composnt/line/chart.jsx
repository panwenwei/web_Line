
import { onMount, onCleanup } from "solid-js";
 class Kline {
    constructor(container,option){
        this.prefix = 'Kline'
        this.font = "Microsoft YaHei, Arial, Helvetica, sans-serif";
        this._container = container
        this._option = option
        this.data = option
        this.dpr = window.devicePixelRatio
        this.width = container.offsetWidth * this.dpr
        this.height = container.offsetHeight * this.dpr
        console.log(this.width,this.height)
        this.s = 31.72 //昨日收盘价
        this.k = 1.05
        this.initTime()
        this.initCanvas()
        this.BGLine()
        this.setData()
        this.drawMLine()
        this.event()

        console.log(1,this._container)
    }

    initTime(){
        var time = new Date()
        var y = time.getFullYear()
        var m = time.getMonth()+1
        var d = time.getDate()
        var oldTime = (new Date(`${y}/${m}/${d} 09:15:00`)).getTime()/1000;
        console.log(oldTime)
    }

    initCanvas(){
        this.padding = {
            t:20,
            l:0,
            b:20,
            r:0
        }
        this.bar = {
            h:this.gi(this.height * 0.22),
            t:20
        }

        this._container.style.position = 'relative'
        // this._container.style.cursor = 'pointer'
        //创建BG
        this.ctxBGElem = document.createElement('CANVAS')
        this.ctxBGElem.id = this.prefix + '_BG'
        this.ctxBG = this.ctxBGElem.getContext('2d')
        this.ctxBGElem.width = this.width
        this.ctxBGElem.height = this.height
        this.ctxBGElem.style.cssText = 'position:absolute;top:0px;left:0px'
        this.ctxBGElem.style.height = this.height/this.dpr +'px'
        this.ctxBGElem.style.width = this.width/this.dpr +'px'
        //创建Line
        this.ctxLineElem = document.createElement('CANVAS')
        this.ctxLine = this.ctxLineElem.getContext('2d')
        this.ctxLineElem.id = this.prefix + '_Line'
        this.ctxLineElem.width = this.width
        this.ctxLineElem.height = this.height
        this.ctxLineElem.style.cssText = 'position:absolute;top:0px;left:0px'
        this.ctxLineElem.style.height = this.height/this.dpr +'px'
        this.ctxLineElem.style.width = this.width/this.dpr +'px'
        //创建top

        this.ctxTopElem = document.createElement('CANVAS')
        this.ctxTop = this.ctxTopElem.getContext('2d')
        this.ctxTopElem.id = this.prefix + '_Top'
        this.ctxTopElem.width = this.width
        this.ctxTopElem.height = this.height
        this.ctxTopElem.style.cssText = 'position:absolute;top:0px;left:0px'
        this.ctxTopElem.style.height = this.height/this.dpr +'px'
        this.ctxTopElem.style.width = this.width/this.dpr +'px'

        this._container.appendChild(this.ctxTopElem)
        this._container.appendChild(this.ctxLineElem)
        this._container.appendChild(this.ctxBGElem)

        this.ctxBG.translate(.5, .5);
        this.ctxLine.translate(.5, .5);
        this.ctxTop.translate(.5, .5)

    }


    BGLine(){
        let g = this.ctxBG
        var mx = this.width/8
        var my = (this.height-this.padding.t-this.padding.b-this.bar.h)/8
        var Lineh = this.height-this.padding.t-this.padding.b-this.bar.h
        var LinehT =  this.height-this.padding.b-this.bar.h
        var Linehx = LinehT+this.bar.t
        for(var i=0; i<=8;i++){
            this.ctxBG.strokeStyle = "#ddd"
            this.ctxBG.lineWidth = .5
            //绘制x
           if(i==8){
            var  y =  this.gi(i * my) + this.padding.t  - 1
            var  x = this.gi(i * mx) - 1
           }else{
            var  y = this.gi(i * my) + this.padding.t
            var  x = this.gi(i * mx)
           }

           if(i==0 || i==8){
                this.drawLine(this.ctxBG,x,this.padding.t,x,this.height-this.padding.t)
           }else{
               this.drawLine(this.ctxBG,x,this.padding.t,x,LinehT)
           }

           this.drawLine(this.ctxBG,0,y,this.width,y)
           

           switch(i){
                case 0:
                g.font = 14 + "px " + this.font
                g.textBaseline = "middle";
                g.textAlign = "left";
                g.fillStyle = "#555";
                g.fillText("09:30", 0, this.height-6);
                break;
                case 2:
                g.textAlign = "center";
                g.fillText("10:30", x, this.height-6 );
                break;
                break;
                case 4:
                g.textAlign = "center";
                g.fillText("11:30/13:00", x, this.height-6 );
                break;
                case 6:
                g.textAlign = "center";
                g.fillText("14:00", x, this.height-6 );
                break;
                case 8:
                g.textAlign = "right";
                g.fillText("15:00", x, this.height-6)
                break;
           }

        }

        //量能显示
        var barH = this.bar.h-this.bar.t
        var barHy = this.gi(barH/2)
        for(var i=0;i<=2;i++){
            var y = Linehx + barHy * i
            this.drawLine(g,0,y,this.width,y)
            console.log(y,barH)
        }
        //矩形
        g.fillStyle="#F9F9F9";
        g.fillRect(0,LinehT,this.width,this.bar.t)



    }

    drawLine(ctx,x, y, X, Y){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.stroke();
    ctx.closePath();
    }

    compute(data){
        var t = this
        if(data.length==undefined){
            return []
        }else{
            var l = data.length
            var h = this.height-this.padding.t-this.padding.b-this.bar.h
            var hh = h/2

            for(var i=0;i<l;i++){
                var item = data[i]

                console.log(h)
            }
        }

    }

    InitData(){
        console.time('2')
        var dd = []
        this.data.map(function(item,index){
            var key = item[0]
        })
        console.timeEnd('2')


        var t = this
        t.max = this.s
        t.min = this.s
        t.barMax = 0
        this.data.map(function(item,key){
            var k = item[1]
            var v = item[3]
            if(k>t.max){
                t.max = k
            }
            if(k<t.min){
                t.min = k
            }
            if(t.barMax<v){
                t.barMax = v
            }
            if(key==0){
                t.data[key][5] = t.s - k
            }else{
                t.data[key][5] =  k - t.data[key-1][1]
            }

        })
        this.lineP = Math.ceil((Math.max(Math.abs(this.max-this.s),Math.abs(this.s-t.min))* this.k / this.s) *10000)/10000
    }

    setData(){
        this.InitData()
        this.compute(this.data)

    }

    update(data){


    }

    clearCanvas(ctx, t, e, i, n) {
        ctx.clearRect(t, e, i, n);
    }

    showTop(x,y){
        console.log(x)
        var h  = this.height-this.padding.b
        if(y<this.padding.t){
            y= this.padding.t
        }else if(y>h){
            y = h
        }
        var ctx =this.ctxTop
        this.clearCanvas(ctx,0,0,this.width,this.height)
        if(x==null){
            // 显示最后一个
        }else{
            var k = this.gi(x/(this.width/241))
            var d = this.data[k]
            if(d){
                //
                // ctx.textAlign = "right";
                ctx.save()
                ctx.font = 14 + "px " + this.font
                if(d[1]-this.s>0){
                    ctx.fillStyle = "red"
                }else{
                    ctx.fillStyle = "green"
                }
                ctx.fillText(`速值:${d[1]}`,0, 15)
                ctx.restore()
                this.drawLine(ctx,x,this.padding.t,x,this.height-this.padding.b)
                this.drawLine(ctx,0,y,this.width,y)
            }
            
        }
    }

    event(){
        var t = this
        this._container.onmousemove = function(e){
            var x = e.offsetX * t.dpr
            var y = e.offsetY * t.dpr
            t.showTop(x,y)
        }
        console.log('鼠标事件',this.ctxTopElem)

    }

    drawMLine(){
        var bart = this.height  - this.padding.b
        var s  = this.s
        var ctx = this.ctxLine
        var barH = this.bar.h-this.bar.t
        var barHp = barH/this.barMax
        var h = this.height-this.padding.t-this.padding.b-this.bar.h
        var hh = h/2
        var hhp = hh/this.lineP
        var data = this.data
        var l = data.length
        var dotSpace = this.width/241
        ctx.lineWidth = 1.5
        ctx.strokeStyle = "#566a80"
        ctx.save()
        ctx.translate(0, h/2+this.padding.t)
        ctx.beginPath()
        var x
        for(var i=0; i<l; i++){
            // 画k线图
            x = dotSpace*i
            var t = data[i][1]
            var p = (s - t)/s
            var y = hhp * p
            if(i==0){
            ctx.moveTo( x, y );
        }else{
            ctx.lineTo( x, y );
        }
        }
        ctx.restore()
        ctx.stroke()
      

        //渐变
        ctx.save()
        ctx.translate(0, h/2+this.padding.t)
        ctx.lineTo( x, hh);
        ctx.lineTo( 0,  hh );
        var gradient = ctx.createLinearGradient(0,0, 0,h)
        gradient.addColorStop(0, 'rgba(18,133,252,0.1)')
        gradient.addColorStop(1, 'rgba(18,133,252,0)')
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.fillStyle = "#1285FC"
        ctx.restore()

        //成交量
        ctx.save()
        ctx.translate(0,bart)
        for(var i=0; i<l; i++){
            var x = dotSpace*i
            //画成交量图
            var v = data[i][3]
            var c = data[i][5]
            var barHpV =  barHp * v
            if(c>0){
                ctx.fillStyle="red";
            }else{
                ctx.fillStyle="green";
            }
            ctx.fillRect(x,-barHpV,1,barHpV)
        }
ctx.restore()

    }

    gi(a){
        var t = .5 + a | 0;
        t = .5 + a;
        t = .5 + a << 0;
        return t
    }

}

var l  = {"trend":{"code":"603538","day":"20211221","time":"1640072157","preclose_px":31.72,"hprice":32.12,"lprice":31.5,"begin_px":31.63,"trend":[["09:30",31.63,31.63,25,0],["09:31",31.7,31.683,277,1],["09:32",31.63,31.658,280,0],["09:33",31.62,31.649,269,0],["09:34",31.62,31.646,107,2],["09:35",31.59,31.619,506,0],["09:36",31.7,31.619,114,1],["09:37",31.84,31.624,43,1],["09:38",31.81,31.629,40,0],["09:39",31.77,31.64,121,0],["09:40",31.79,31.648,119,1],["09:41",31.88,31.653,61,1],["09:42",31.88,31.665,93,2],["09:43",31.93,31.669,33,1],["09:44",31.84,31.684,163,0],["09:45",31.9,31.688,66,1],["09:46",31.94,31.696,75,1],["09:47",31.86,31.705,116,0],["09:48",31.85,31.712,112,0],["09:49",31.85,31.719,131,2],["09:50",31.79,31.72,33,0],["09:51",31.74,31.72,19,0],["09:52",31.7,31.72,38,0],["09:53",31.7,31.72,32,2],["09:54",31.67,31.718,234,0],["09:55",31.65,31.717,29,0],["09:56",31.61,31.715,84,0],["09:57",31.61,31.71,156,2],["09:58",31.62,31.708,60,1],["09:59",31.65,31.707,41,1],["10:00",31.69,31.707,42,1],["10:01",31.61,31.705,124,0],["10:02",31.61,31.703,58,2],["10:03",31.65,31.702,31,1],["10:04",31.69,31.701,100,1],["10:05",31.69,31.701,6,2],["10:06",31.75,31.701,129,1],["10:07",31.74,31.702,51,0],["10:08",31.75,31.702,17,1],["10:09",31.7,31.702,9,0],["10:10",31.72,31.702,23,1],["10:11",31.7,31.702,10,0],["10:12",31.67,31.702,41,0],["10:13",31.67,31.702,33,2],["10:14",31.63,31.701,35,0],["10:15",31.61,31.7,38,0],["10:16",31.6,31.697,156,0],["10:17",31.59,31.696,53,0],["10:18",31.6,31.694,73,1],["10:19",31.61,31.694,11,1],["10:20",31.62,31.694,10,1],["10:21",31.6,31.692,63,0],["10:22",31.6,31.692,23,2],["10:23",31.61,31.692,10,1],["10:24",31.61,31.692,12,2],["10:25",31.61,31.69,72,2],["10:26",31.61,31.689,93,2],["10:27",31.59,31.688,51,0],["10:28",31.6,31.687,45,1],["10:29",31.61,31.687,10,1],["10:30",31.69,31.687,45,1],["10:31",31.65,31.686,18,0],["10:32",31.61,31.686,40,0],["10:33",31.65,31.686,1,1],["10:34",31.69,31.686,72,1],["10:35",31.74,31.687,35,1],["10:36",31.82,31.692,164,1],["10:37",31.83,31.693,27,1],["10:38",31.78,31.693,16,0],["10:39",31.77,31.693,18,0],["10:40",31.7,31.693,7,0],["10:41",31.7,31.693,0,2],["10:42",31.7,31.693,21,2],["10:43",31.71,31.693,20,1],["10:44",31.76,31.693,14,1],["10:45",31.65,31.692,167,0],["10:46",31.71,31.692,65,1],["10:47",31.65,31.692,4,0],["10:48",31.66,31.692,1,1],["10:49",31.66,31.692,0,2],["10:50",31.75,31.692,54,1],["10:51",31.77,31.693,8,1],["10:52",31.88,31.697,204,1],["10:53",31.8,31.698,31,0],["10:54",31.85,31.7,85,1],["10:55",31.85,31.7,11,2],["10:56",31.8,31.7,8,0],["10:57",31.85,31.701,17,1],["10:58",31.81,31.701,6,0],["10:59",31.84,31.701,38,1],["11:00",31.84,31.702,22,2],["11:01",31.7,31.705,294,0],["11:02",31.75,31.705,13,1],["11:03",31.76,31.705,8,1],["11:04",31.7,31.705,7,0],["11:05",31.7,31.705,0,2],["11:06",31.7,31.705,26,2],["11:07",31.7,31.705,12,2],["11:08",31.7,31.705,0,2],["11:09",31.7,31.705,0,2],["11:10",31.71,31.706,29,1],["11:11",31.73,31.707,158,1],["11:12",31.73,31.707,2,2],["11:13",31.77,31.708,153,1],["11:14",31.8,31.709,22,1],["11:15",31.77,31.709,46,0],["11:16",31.77,31.709,20,2],["11:17",31.74,31.709,22,0],["11:18",31.74,31.709,8,2],["11:19",31.77,31.71,29,1],["11:20",31.8,31.71,31,1],["11:21",31.77,31.71,18,0],["11:22",31.77,31.71,10,2],["11:23",31.76,31.71,4,0],["11:24",31.74,31.71,19,0],["11:25",31.73,31.71,11,0],["11:26",31.73,31.71,3,2],["11:27",31.73,31.71,9,2],["11:28",31.7,31.71,78,0],["11:29",31.74,31.71,2,1],["11:30",31.75,31.71,2,1],["13:01",31.77,31.711,102,1],["13:02",31.75,31.711,58,0],["13:03",31.75,31.711,69,2],["13:04",31.75,31.711,0,2],["13:05",31.72,31.711,3,0],["13:06",31.68,31.711,44,0],["13:07",31.69,31.711,24,1],["13:08",31.71,31.711,4,1],["13:09",31.72,31.711,6,1],["13:10",31.68,31.711,8,0],["13:11",31.72,31.711,13,1],["13:12",31.72,31.711,21,2],["13:13",31.75,31.711,55,1],["13:14",31.76,31.712,40,1],["13:15",31.78,31.712,35,1],["13:16",31.76,31.712,9,0],["13:17",31.76,31.712,11,2],["13:18",31.77,31.712,30,1],["13:19",31.78,31.712,5,1],["13:20",31.78,31.712,0,2],["13:21",31.76,31.712,17,0],["13:22",31.76,31.712,2,2],["13:23",31.8,31.713,84,1],["13:24",31.77,31.713,28,0],["13:25",31.75,31.714,68,0],["13:26",31.77,31.714,26,1],["13:27",31.77,31.714,33,2],["13:28",31.73,31.715,193,0],["13:29",31.73,31.715,34,2],["13:30",31.73,31.715,29,2],["13:31",31.76,31.715,1,1],["13:32",31.75,31.715,9,0],["13:33",31.73,31.715,43,0],["13:34",31.73,31.715,12,2],["13:35",31.75,31.715,74,1],["13:36",31.76,31.715,19,1],["13:37",31.75,31.715,12,0],["13:38",31.75,31.715,3,2],["13:39",31.76,31.716,1,1],["13:40",31.76,31.716,2,2],["13:41",31.74,31.716,3,0],["13:42",31.73,31.716,3,0],["13:43",31.74,31.716,2,1],["13:44",31.73,31.716,17,0],["13:45",31.74,31.716,36,1],["13:46",31.74,31.716,57,2],["13:47",31.76,31.716,9,1],["13:48",31.74,31.716,92,0],["13:49",31.75,31.716,33,1],["13:50",31.74,31.716,4,0],["13:51",31.73,31.716,11,0],["13:52",31.73,31.716,0,2],["13:53",31.74,31.716,7,1],["13:54",31.76,31.716,13,1],["13:55",31.75,31.716,26,0],["13:56",31.76,31.716,7,1],["13:57",31.76,31.716,4,2],["13:58",31.76,31.716,11,2],["13:59",31.75,31.716,7,0],["14:00",31.78,31.717,156,1],["14:01",31.78,31.717,6,2],["14:02",31.76,31.718,23,0],["14:03",31.77,31.718,7,1],["14:04",31.77,31.718,18,2],["14:05",31.8,31.719,207,1],["14:06",31.78,31.719,15,0],["14:07",31.78,31.72,35,2],["14:08",31.78,31.72,23,2],["14:09",31.78,31.72,70,2],["14:10",31.78,31.721,100,2],["14:11",31.76,31.722,167,0],["14:12",31.77,31.722,28,1],["14:13",31.76,31.722,12,0],["14:14",31.76,31.722,15,2],["14:15",31.74,31.723,213,0],["14:16",31.76,31.723,42,1],["14:17",31.75,31.723,6,0],["14:18",31.76,31.723,37,1],["14:19",31.76,31.723,20,2],["14:20",31.76,31.723,15,2],["14:21",31.77,31.723,14,1],["14:22",31.76,31.723,17,0],["14:23",31.75,31.724,99,0],["14:24",31.78,31.724,191,1],["14:25",31.78,31.725,31,2],["14:26",31.78,31.725,0,2],["14:27",31.79,31.725,26,1],["14:28",31.8,31.725,89,1],["14:29",31.83,31.726,49,1],["14:30",31.85,31.728,198,1],["14:31",31.89,31.731,235,1],["14:32",31.85,31.731,26,0],["14:33",31.8,31.731,30,0],["14:34",31.83,31.732,20,1],["14:35",31.83,31.732,10,2],["14:36",31.83,31.732,7,2],["14:37",31.86,31.733,77,1],["14:38",31.86,31.733,6,2],["14:39",31.86,31.733,24,2],["14:40",31.89,31.734,111,1],["14:41",31.89,31.735,34,2],["14:42",31.96,31.74,333,1],["14:43",31.97,31.745,227,1],["14:44",32.04,31.752,331,1],["14:45",32.02,31.753,23,0],["14:46",32.03,31.756,154,1],["14:47",32.04,31.759,131,1],["14:48",32.08,31.763,175,1],["14:49",32.07,31.765,84,0],["14:50",32.08,31.768,139,1],["14:51",32.12,31.771,87,1],["14:52",32.08,31.773,107,0],["14:53",32.02,31.777,161,0],["14:54",32.11,31.78,150,1],["14:55",32.11,31.784,150,2],["14:56",32.04,31.79,317,0],["14:57",31.99,31.795,316,0],["14:58",31.99,31.795,0,2],["14:59",31.99,31.795,0,2],["15:00",32.03,31.798,147,1]],"errcode":0,"total_turnover":45388458,"px_change_rate":0.98},"chouma":{"List":[{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM20":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM10":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM0":{"ActiveBuy":15815,"PassiveBuy":63260,"ActiveSell":63260,"PassiveSell":15815,"DDJE":0},"Time":"09:30","ZLBuy":"0","ZLSell":"0","ZLJE":0,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"79075","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":502439,"PassiveSell":0,"DDJE":-502439},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":120340,"PassiveSell":211988,"DDJE":-332328},"CM20":{"ActiveBuy":234217,"PassiveBuy":0,"ActiveSell":107105,"PassiveSell":166950,"DDJE":-39838},"CM10":{"ActiveBuy":616187,"PassiveBuy":717362,"ActiveSell":416829,"PassiveSell":309974,"DDJE":606746},"CM0":{"ActiveBuy":1166019,"PassiveBuy":2141546,"ActiveSell":1712187,"PassiveSell":1327486,"DDJE":267892},"Time":"09:35","ZLBuy":"0","ZLSell":"-834767","ZLJE":-834767,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"4999061","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":502439,"PassiveSell":0,"DDJE":-502439},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":120340,"PassiveSell":211988,"DDJE":-332328},"CM20":{"ActiveBuy":234217,"PassiveBuy":0,"ActiveSell":107105,"PassiveSell":166950,"DDJE":-39838},"CM10":{"ActiveBuy":679847,"PassiveBuy":781040,"ActiveSell":543798,"PassiveSell":551190,"DDJE":365899},"CM0":{"ActiveBuy":1712511,"PassiveBuy":2729344,"ActiveSell":2236694,"PassiveSell":1696422,"DDJE":508739},"Time":"09:40","ZLBuy":"0","ZLSell":"-834767","ZLJE":-834767,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"6229552","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":502439,"PassiveSell":0,"DDJE":-502439},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":0,"PassiveBuy":318599,"ActiveSell":120340,"PassiveSell":211988,"DDJE":-13729},"CM20":{"ActiveBuy":234217,"PassiveBuy":0,"ActiveSell":107105,"PassiveSell":166950,"DDJE":-39838},"CM10":{"ActiveBuy":679847,"PassiveBuy":781040,"ActiveSell":543798,"PassiveSell":678870,"DDJE":238219},"CM0":{"ActiveBuy":2302680,"PassiveBuy":3194825,"ActiveSell":3020746,"PassiveSell":2158915,"DDJE":317844},"Time":"09:45","ZLBuy":"318599","ZLSell":"-834767","ZLJE":-516168,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"7581640","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":502439,"PassiveSell":0,"DDJE":-502439},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":54163,"PassiveBuy":580179,"ActiveSell":120340,"PassiveSell":211988,"DDJE":302014},"CM20":{"ActiveBuy":243783,"PassiveBuy":216852,"ActiveSell":107105,"PassiveSell":166950,"DDJE":186580},"CM10":{"ActiveBuy":804181,"PassiveBuy":781040,"ActiveSell":674292,"PassiveSell":685232,"DDJE":225697},"CM0":{"ActiveBuy":2573445,"PassiveBuy":3618315,"ActiveSell":3792170,"PassiveSell":2611363,"DDJE":-211773},"Time":"09:50","ZLBuy":"634342","ZLSell":"-834767","ZLJE":-200425,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"8891221","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":502439,"PassiveSell":0,"DDJE":-502439},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":243783,"PassiveBuy":216852,"ActiveSell":462105,"PassiveSell":309519,"DDJE":-310989},"CM10":{"ActiveBuy":804181,"PassiveBuy":971240,"ActiveSell":674292,"PassiveSell":685232,"DDJE":415897},"CM0":{"ActiveBuy":2934553,"PassiveBuy":4023719,"ActiveSell":4349643,"PassiveSell":2829900,"DDJE":-221271},"Time":"09:55","ZLBuy":"951241","ZLSell":"-834767","ZLJE":116474,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"10212181","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":502439,"PassiveSell":0,"DDJE":-502439},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":243783,"PassiveBuy":216852,"ActiveSell":462105,"PassiveSell":315859,"DDJE":-317329},"CM10":{"ActiveBuy":804181,"PassiveBuy":971240,"ActiveSell":819702,"PassiveSell":716841,"DDJE":238878},"CM0":{"ActiveBuy":3364826,"PassiveBuy":4950168,"ActiveSell":5130687,"PassiveSell":3222226,"DDJE":-37919},"Time":"10:00","ZLBuy":"951241","ZLSell":"-834767","ZLJE":116474,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"11549976","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":497304,"PassiveBuy":384809,"ActiveSell":237033,"PassiveSell":252459,"DDJE":392621},"CM10":{"ActiveBuy":804181,"PassiveBuy":1088196,"ActiveSell":819702,"PassiveSell":716841,"DDJE":355834},"CM0":{"ActiveBuy":3675232,"PassiveBuy":5174613,"ActiveSell":5640023,"PassiveSell":3440612,"DDJE":-230790},"Time":"10:05","ZLBuy":"951241","ZLSell":"-1468769","ZLJE":-517528,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"12575872","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":497304,"PassiveBuy":384809,"ActiveSell":237033,"PassiveSell":252459,"DDJE":392621},"CM10":{"ActiveBuy":804181,"PassiveBuy":1088196,"ActiveSell":819702,"PassiveSell":716841,"DDJE":355834},"CM0":{"ActiveBuy":3887876,"PassiveBuy":5304709,"ActiveSell":5770119,"PassiveSell":3653256,"DDJE":-230790},"Time":"10:10","ZLBuy":"951241","ZLSell":"-1468769","ZLJE":-517528,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"12924952","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":497304,"PassiveBuy":384809,"ActiveSell":237033,"PassiveSell":252459,"DDJE":392621},"CM10":{"ActiveBuy":804181,"PassiveBuy":1363128,"ActiveSell":927175,"PassiveSell":716841,"DDJE":523293},"CM0":{"ActiveBuy":4027182,"PassiveBuy":5855106,"ActiveSell":6083529,"PassiveSell":3792562,"DDJE":6197},"Time":"10:15","ZLBuy":"951241","ZLSell":"-1873222","ZLJE":-921981,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"13883263","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":497304,"PassiveBuy":384809,"ActiveSell":237033,"PassiveSell":252459,"DDJE":392621},"CM10":{"ActiveBuy":921064,"PassiveBuy":1404195,"ActiveSell":933493,"PassiveSell":868473,"DDJE":523293},"CM0":{"ActiveBuy":4099866,"PassiveBuy":6253266,"ActiveSell":6516423,"PassiveSell":3830500,"DDJE":6209},"Time":"10:20","ZLBuy":"951241","ZLSell":"-1873222","ZLJE":-921981,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"14546835","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":497304,"PassiveBuy":384809,"ActiveSell":237033,"PassiveSell":252459,"DDJE":392621},"CM10":{"ActiveBuy":990604,"PassiveBuy":1448449,"ActiveSell":946141,"PassiveSell":957009,"DDJE":535903},"CM0":{"ActiveBuy":4340107,"PassiveBuy":6455518,"ActiveSell":6750276,"PassiveSell":4051743,"DDJE":-6394},"Time":"10:25","ZLBuy":"951241","ZLSell":"-1873222","ZLJE":-921981,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"15210627","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":54163,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":618913},"CM20":{"ActiveBuy":566844,"PassiveBuy":577630,"ActiveSell":237033,"PassiveSell":252459,"DDJE":654982},"CM10":{"ActiveBuy":921064,"PassiveBuy":1404195,"ActiveSell":1082064,"PassiveSell":957009,"DDJE":286186},"CM0":{"ActiveBuy":4460323,"PassiveBuy":6812677,"ActiveSell":7120069,"PassiveSell":4171958,"DDJE":-19027},"Time":"10:30","ZLBuy":"951241","ZLSell":"-1873222","ZLJE":-921981,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"15744972","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":934449},"CM20":{"ActiveBuy":636565,"PassiveBuy":723542,"ActiveSell":237033,"PassiveSell":252459,"DDJE":870615},"CM10":{"ActiveBuy":921064,"PassiveBuy":1404195,"ActiveSell":1221632,"PassiveSell":957009,"DDJE":146618},"CM0":{"ActiveBuy":4793431,"PassiveBuy":6920504,"ActiveSell":7234246,"PassiveSell":4890313,"DDJE":-410624},"Time":"10:35","ZLBuy":"1266777","ZLSell":"-1873222","ZLJE":-606445,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"16736469","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":934449},"CM20":{"ActiveBuy":636565,"PassiveBuy":723542,"ActiveSell":237033,"PassiveSell":252459,"DDJE":870615},"CM10":{"ActiveBuy":921064,"PassiveBuy":1404195,"ActiveSell":1221632,"PassiveSell":957009,"DDJE":146618},"CM0":{"ActiveBuy":4907962,"PassiveBuy":7092133,"ActiveSell":7405876,"PassiveSell":5004847,"DDJE":-410628},"Time":"10:40","ZLBuy":"1266777","ZLSell":"-1873222","ZLJE":-606445,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"16952627","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":934449},"CM20":{"ActiveBuy":636565,"PassiveBuy":1021240,"ActiveSell":487226,"PassiveSell":252459,"DDJE":918120},"CM10":{"ActiveBuy":921064,"PassiveBuy":1404195,"ActiveSell":1300757,"PassiveSell":1165899,"DDJE":-141397},"CM0":{"ActiveBuy":5227840,"PassiveBuy":7342331,"ActiveSell":7624455,"PassiveSell":5115832,"DDJE":-170116},"Time":"10:45","ZLBuy":"1266777","ZLSell":"-1873222","ZLJE":-606445,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"17861628","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":211988,"DDJE":934449},"CM20":{"ActiveBuy":636565,"PassiveBuy":1021240,"ActiveSell":487226,"PassiveSell":252459,"DDJE":918120},"CM10":{"ActiveBuy":921064,"PassiveBuy":1404195,"ActiveSell":1300757,"PassiveSell":1165899,"DDJE":-141397},"CM0":{"ActiveBuy":5361176,"PassiveBuy":7459653,"ActiveSell":7741777,"PassiveSell":5249168,"DDJE":-170116},"Time":"10:50","ZLBuy":"1266777","ZLSell":"-1873222","ZLJE":-606445,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"18074243","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":404453,"PassiveSell":0,"DDJE":-404453},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":120340,"PassiveSell":524019,"DDJE":622418},"CM20":{"ActiveBuy":636565,"PassiveBuy":1021240,"ActiveSell":487226,"PassiveSell":252459,"DDJE":918120},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1455154,"ActiveSell":1300757,"PassiveSell":1165899,"DDJE":237597},"CM0":{"ActiveBuy":5883134,"PassiveBuy":7640830,"ActiveSell":7973927,"PassiveSell":5787144,"DDJE":-237107},"Time":"10:55","ZLBuy":"1266777","ZLSell":"-2185253","ZLJE":-918476,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"19153250","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":28620,"PassiveBuy":448380,"ActiveSell":404453,"PassiveSell":0,"DDJE":72547},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1430972,"PassiveSell":1165899,"DDJE":266231},"CM0":{"ActiveBuy":6093253,"PassiveBuy":7716971,"ActiveSell":8475808,"PassiveSell":6025874,"DDJE":-691458},"Time":"11:00","ZLBuy":"1419417","ZLSell":"-2185253","ZLJE":-765836,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"20351673","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":28620,"PassiveBuy":448380,"ActiveSell":404453,"PassiveSell":0,"DDJE":72547},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1430972,"PassiveSell":1165899,"DDJE":266231},"CM0":{"ActiveBuy":6115480,"PassiveBuy":7802563,"ActiveSell":8561401,"PassiveSell":6048101,"DDJE":-691459},"Time":"11:05","ZLBuy":"1419417","ZLSell":"-2185253","ZLJE":-765836,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"20522897","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":28620,"PassiveBuy":448380,"ActiveSell":404453,"PassiveSell":0,"DDJE":72547},"CM30":{"ActiveBuy":734938,"PassiveBuy":928837,"ActiveSell":444700,"PassiveSell":524019,"DDJE":695056},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1430972,"PassiveSell":1165899,"DDJE":266231},"CM0":{"ActiveBuy":6293299,"PassiveBuy":7881813,"ActiveSell":8672407,"PassiveSell":6591090,"DDJE":-1088385},"Time":"11:10","ZLBuy":"1816415","ZLSell":"-2185253","ZLJE":-368838,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"21154853","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1430972,"PassiveSell":1343810,"DDJE":88320},"CM0":{"ActiveBuy":6518924,"PassiveBuy":7992983,"ActiveSell":8840752,"PassiveSell":7061315,"DDJE":-1390160},"Time":"11:15","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"21926934","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1430972,"PassiveSell":1343810,"DDJE":88320},"CM0":{"ActiveBuy":6728661,"PassiveBuy":8091427,"ActiveSell":8939194,"PassiveSell":7271052,"DDJE":-1390158},"Time":"11:20","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"22270066","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1430972,"PassiveSell":1343810,"DDJE":88320},"CM0":{"ActiveBuy":6766778,"PassiveBuy":8237450,"ActiveSell":9085215,"PassiveSell":7309171,"DDJE":-1390158},"Time":"11:25","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"22419266","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1614003,"ActiveSell":1586373,"PassiveSell":1343810,"DDJE":-67081},"CM0":{"ActiveBuy":6811177,"PassiveBuy":8481631,"ActiveSell":9173995,"PassiveSell":7353570,"DDJE":-1234757},"Time":"11:30","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"22707846","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1772753,"ActiveSell":1903678,"PassiveSell":1343810,"DDJE":-225636},"CM0":{"ActiveBuy":7147730,"PassiveBuy":8846337,"ActiveSell":9380146,"PassiveSell":7690159,"DDJE":-1076238},"Time":"13:05","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"23583750","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1772753,"ActiveSell":1903678,"PassiveSell":1343810,"DDJE":-225636},"CM0":{"ActiveBuy":7217485,"PassiveBuy":8963584,"ActiveSell":9497398,"PassiveSell":7759914,"DDJE":-1076243},"Time":"13:10","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"23758089","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1772753,"ActiveSell":1925882,"PassiveSell":1438970,"DDJE":-343000},"CM0":{"ActiveBuy":7633336,"PassiveBuy":9058774,"ActiveSell":9570385,"PassiveSell":8080606,"DDJE":-958881},"Time":"13:15","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"24265972","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1249099,"PassiveBuy":1772753,"ActiveSell":1925882,"PassiveSell":1438970,"DDJE":-343000},"CM0":{"ActiveBuy":7750876,"PassiveBuy":9096882,"ActiveSell":9608495,"PassiveSell":8198146,"DDJE":-958883},"Time":"13:20","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"24466108","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":727511,"PassiveSell":408930,"DDJE":-1136441},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":897078,"ActiveSell":444700,"PassiveSell":524019,"DDJE":298058},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":1925882,"PassiveSell":1438970,"DDJE":-190367},"CM0":{"ActiveBuy":7998736,"PassiveBuy":9347834,"ActiveSell":9945300,"PassiveSell":8512777,"DDJE":-1111507},"Time":"13:25","ZLBuy":"2296135","ZLSell":"-2185253","ZLJE":110882,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"25130248","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":1925882,"PassiveSell":1438970,"DDJE":-190367},"CM0":{"ActiveBuy":8479315,"PassiveBuy":9527464,"ActiveSell":10042396,"PassiveSell":8796622,"DDJE":-832239},"Time":"13:30","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"26050707","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2040110,"PassiveSell":1438970,"DDJE":-304595},"CM0":{"ActiveBuy":8720571,"PassiveBuy":9784487,"ActiveSell":10185191,"PassiveSell":9037879,"DDJE":-718012},"Time":"13:35","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"26548989","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2040110,"PassiveSell":1438970,"DDJE":-304595},"CM0":{"ActiveBuy":8755497,"PassiveBuy":9809887,"ActiveSell":10210591,"PassiveSell":9072807,"DDJE":-718014},"Time":"13:40","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"26615666","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2040110,"PassiveSell":1438970,"DDJE":-304595},"CM0":{"ActiveBuy":8996721,"PassiveBuy":9882867,"ActiveSell":10283571,"PassiveSell":9314031,"DDJE":-718014},"Time":"13:45","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"26980654","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2040110,"PassiveSell":1438970,"DDJE":-304595},"CM0":{"ActiveBuy":9276098,"PassiveBuy":10127213,"ActiveSell":10527917,"PassiveSell":9593407,"DDJE":-718013},"Time":"13:50","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"27453597","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":252459,"DDJE":1191255},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2040110,"PassiveSell":1438970,"DDJE":-304595},"CM0":{"ActiveBuy":9371347,"PassiveBuy":10197055,"ActiveSell":10597759,"PassiveSell":9688657,"DDJE":-718014},"Time":"13:55","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"27621869","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":369699,"PassiveBuy":1214478,"ActiveSell":444700,"PassiveSell":524019,"DDJE":615458},"CM20":{"ActiveBuy":916053,"PassiveBuy":1300726,"ActiveSell":487226,"PassiveSell":506538,"DDJE":1223015},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2040110,"PassiveSell":1438970,"DDJE":-304595},"CM0":{"ActiveBuy":9620416,"PassiveBuy":10244702,"ActiveSell":10651760,"PassiveSell":9963134,"DDJE":-749776},"Time":"14:00","ZLBuy":"2296135","ZLSell":"-2464513","ZLJE":-168378,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"28207623","YiDong":"0"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1733101},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":444700,"PassiveSell":524019,"DDJE":933056},"CM20":{"ActiveBuy":636565,"PassiveBuy":1294375,"ActiveSell":487226,"PassiveSell":738531,"DDJE":705183},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2049644,"PassiveSell":1632827,"DDJE":-507986},"CM0":{"ActiveBuy":10316437,"PassiveBuy":10359081,"ActiveSell":10788367,"PassiveSell":10233312,"DDJE":-346161},"Time":"14:05","ZLBuy":"2613733","ZLSell":"-2464513","ZLJE":149220,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"29065709","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":0,"PassiveBuy":540088,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-1193013},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":797346,"PassiveSell":524019,"DDJE":580410},"CM20":{"ActiveBuy":661989,"PassiveBuy":1494589,"ActiveSell":487226,"PassiveSell":738531,"DDJE":930821},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2297488,"PassiveSell":1680497,"DDJE":-803500},"CM0":{"ActiveBuy":10602518,"PassiveBuy":10457600,"ActiveSell":11026690,"PassiveSell":10497149,"DDJE":-463721},"Time":"14:10","ZLBuy":"2801175","ZLSell":"-2464513","ZLJE":336662,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"30320852","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":60343,"PassiveBuy":1210250,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-462508},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":797346,"PassiveSell":524019,"DDJE":580410},"CM20":{"ActiveBuy":661989,"PassiveBuy":1494589,"ActiveSell":487226,"PassiveSell":738531,"DDJE":930821},"CM10":{"ActiveBuy":1315872,"PassiveBuy":1858613,"ActiveSell":2446759,"PassiveSell":1680497,"DDJE":-952771},"CM0":{"ActiveBuy":10751773,"PassiveBuy":10689390,"ActiveSell":11779330,"PassiveSell":10706748,"DDJE":-1044915},"Time":"14:15","ZLBuy":"3531680","ZLSell":"-2464513","ZLJE":1067167,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"31305356","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":60343,"PassiveBuy":1210250,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":-462508},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":797346,"PassiveSell":524019,"DDJE":580410},"CM20":{"ActiveBuy":661989,"PassiveBuy":1494589,"ActiveSell":487226,"PassiveSell":738531,"DDJE":930821},"CM10":{"ActiveBuy":1376197,"PassiveBuy":1909413,"ActiveSell":2446759,"PassiveSell":1680497,"DDJE":-841646},"CM0":{"ActiveBuy":10853411,"PassiveBuy":10740204,"ActiveSell":11880944,"PassiveSell":10868715,"DDJE":-1156044},"Time":"14:20","ZLBuy":"3531680","ZLSell":"-2464513","ZLJE":1067167,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"31597545","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":540027,"PassiveBuy":1303684,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":110610},"CM40":{"ActiveBuy":816399,"PassiveBuy":537319,"ActiveSell":404453,"PassiveSell":0,"DDJE":949265},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":997432,"PassiveSell":635178,"DDJE":269165},"CM20":{"ActiveBuy":661989,"PassiveBuy":1494589,"ActiveSell":487226,"PassiveSell":738531,"DDJE":930821},"CM10":{"ActiveBuy":1411131,"PassiveBuy":2033275,"ActiveSell":2446759,"PassiveSell":1941010,"DDJE":-943363},"CM0":{"ActiveBuy":10948711,"PassiveBuy":10952963,"ActiveSell":12110908,"PassiveSell":11106946,"DDJE":-1316180},"Time":"14:25","ZLBuy":"3793553","ZLSell":"-2464513","ZLJE":1329040,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"32672500","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":540027,"PassiveBuy":1364047,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":170973},"CM40":{"ActiveBuy":1218036,"PassiveBuy":546883,"ActiveSell":404453,"PassiveSell":0,"DDJE":1360466},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":997432,"PassiveSell":635178,"DDJE":269165},"CM20":{"ActiveBuy":935780,"PassiveBuy":1717453,"ActiveSell":487226,"PassiveSell":738531,"DDJE":1427476},"CM10":{"ActiveBuy":1563805,"PassiveBuy":2348499,"ActiveSell":2580445,"PassiveSell":2202426,"DDJE":-870567},"CM0":{"ActiveBuy":11273133,"PassiveBuy":11064281,"ActiveSell":12696524,"PassiveSell":11998016,"DDJE":-2357126},"Time":"14:30","ZLBuy":"4265117","ZLSell":"-2464513","ZLJE":1800604,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"34573306","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":540027,"PassiveBuy":1364047,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":170973},"CM40":{"ActiveBuy":1218036,"PassiveBuy":546883,"ActiveSell":404453,"PassiveSell":0,"DDJE":1360466},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":997432,"PassiveSell":635178,"DDJE":269165},"CM20":{"ActiveBuy":935780,"PassiveBuy":1717453,"ActiveSell":487226,"PassiveSell":738531,"DDJE":1427476},"CM10":{"ActiveBuy":1637151,"PassiveBuy":2377200,"ActiveSell":2580445,"PassiveSell":2202426,"DDJE":-768520},"CM0":{"ActiveBuy":11403665,"PassiveBuy":11226692,"ActiveSell":12887628,"PassiveSell":12201891,"DDJE":-2459162},"Time":"14:35","ZLBuy":"4265117","ZLSell":"-2464513","ZLJE":1800604,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"34869444","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":540027,"PassiveBuy":1364047,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":170973},"CM40":{"ActiveBuy":1218036,"PassiveBuy":546883,"ActiveSell":404453,"PassiveSell":0,"DDJE":1360466},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":997432,"PassiveSell":635178,"DDJE":269165},"CM20":{"ActiveBuy":935780,"PassiveBuy":1717453,"ActiveSell":487226,"PassiveSell":738531,"DDJE":1427476},"CM10":{"ActiveBuy":1869893,"PassiveBuy":2536471,"ActiveSell":2717356,"PassiveSell":2202426,"DDJE":-513418},"CM0":{"ActiveBuy":11709675,"PassiveBuy":11334990,"ActiveSell":13018285,"PassiveSell":12740633,"DDJE":-2714253},"Time":"14:40","ZLBuy":"4265117","ZLSell":"-2464513","ZLJE":1800604,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"35675775","YiDong":"1"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":1662252,"PassiveBuy":1427967,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":1357118},"CM40":{"ActiveBuy":2398319,"PassiveBuy":687674,"ActiveSell":404453,"PassiveSell":0,"DDJE":2681540},"CM30":{"ActiveBuy":649187,"PassiveBuy":1252588,"ActiveSell":1012356,"PassiveSell":1323153,"DDJE":-433734},"CM20":{"ActiveBuy":935780,"PassiveBuy":1717453,"ActiveSell":487226,"PassiveSell":994531,"DDJE":1171476},"CM10":{"ActiveBuy":2049193,"PassiveBuy":2542875,"ActiveSell":2768588,"PassiveSell":2813155,"DDJE":-989675},"CM0":{"ActiveBuy":12048809,"PassiveBuy":11549422,"ActiveSell":13377676,"PassiveSell":14006879,"DDJE":-3786324},"Time":"14:45","ZLBuy":"6069437","ZLSell":"-2464513","ZLJE":3604924,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"39092040","YiDong":"3"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":1662252,"PassiveBuy":1427967,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":1357118},"CM40":{"ActiveBuy":2577619,"PassiveBuy":940632,"ActiveSell":404453,"PassiveSell":0,"DDJE":3113798},"CM30":{"ActiveBuy":972984,"PassiveBuy":1284658,"ActiveSell":1012356,"PassiveSell":1323153,"DDJE":-77867},"CM20":{"ActiveBuy":1407449,"PassiveBuy":1717453,"ActiveSell":487226,"PassiveSell":994531,"DDJE":1643145},"CM10":{"ActiveBuy":2097420,"PassiveBuy":2591005,"ActiveSell":2768588,"PassiveSell":2941474,"DDJE":-1021637},"CM0":{"ActiveBuy":12478435,"PassiveBuy":11886239,"ActiveSell":14047643,"PassiveSell":15331159,"DDJE":-5014128},"Time":"14:50","ZLBuy":"6857562","ZLSell":"-2464513","ZLJE":4393049,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"41067374","YiDong":"3"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":1841552,"PassiveBuy":1792995,"ActiveSell":1127445,"PassiveSell":605656,"DDJE":1901446},"CM40":{"ActiveBuy":2398319,"PassiveBuy":687674,"ActiveSell":404453,"PassiveSell":0,"DDJE":2681540},"CM30":{"ActiveBuy":972984,"PassiveBuy":1284658,"ActiveSell":1332992,"PassiveSell":1323153,"DDJE":-398503},"CM20":{"ActiveBuy":1709093,"PassiveBuy":1820171,"ActiveSell":487226,"PassiveSell":994531,"DDJE":2047507},"CM10":{"ActiveBuy":2206594,"PassiveBuy":3004642,"ActiveSell":2989907,"PassiveSell":3069914,"DDJE":-848585},"CM0":{"ActiveBuy":12934115,"PassiveBuy":12672171,"ActiveSell":14920026,"PassiveSell":16069206,"DDJE":-5382946},"Time":"14:55","ZLBuy":"6857562","ZLSell":"-2673079","ZLJE":4184483,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"43905913","YiDong":"3"},{"CM100":{"ActiveBuy":0,"PassiveBuy":0,"ActiveSell":0,"PassiveSell":0,"DDJE":0},"CM50":{"ActiveBuy":1841552,"PassiveBuy":1818611,"ActiveSell":2302814,"PassiveSell":711310,"DDJE":646039},"CM40":{"ActiveBuy":2398319,"PassiveBuy":687674,"ActiveSell":404453,"PassiveSell":0,"DDJE":2681540},"CM30":{"ActiveBuy":972984,"PassiveBuy":1617250,"ActiveSell":1332992,"PassiveSell":1323153,"DDJE":-65911},"CM20":{"ActiveBuy":1830825,"PassiveBuy":2557265,"ActiveSell":487226,"PassiveSell":994531,"DDJE":2906333},"CM10":{"ActiveBuy":2216203,"PassiveBuy":3075033,"ActiveSell":2989907,"PassiveSell":3069914,"DDJE":-768585},"CM0":{"ActiveBuy":13145630,"PassiveBuy":13226276,"ActiveSell":15464452,"PassiveSell":16306407,"DDJE":-5398953},"Time":"15:00","ZLBuy":"6857562","ZLSell":"-3595894","ZLJE":3261668,"DuiDaoCount":"0","DuiDaoMoney":"0","CJJE":"45388457","YiDong":"3"}]},"pankou":{"day":20211221,"code":"603538","name":"\u7f8e\u8bfa\u534e","preclose_px":31.72,"status":86,"real":{"time":153729010,"last_px":32.03,"px_change":0.31,"px_change_rate":0.98,"high_px":32.12,"low_px":31.5,"open_px":31.63,"avg_px":31.798,"turnover_ratio":0.95,"total_amount":14274,"total_turnover":45388458,"vol_ratio":0.7,"up_px":34.89,"down_px":28.55,"amplitude":1.95,"entrust_rate":4.22,"amount_in":7053,"amount_out":7220,"pe_rate":26.54,"dyn_pb_rate":2.84,"circulation_amount":149575492,"circulation_value":4790903009,"total_shares":149588792,"market_value":4791329008,"actualcirculation_value":3240566795,"sjlt":3240566795},"sourcetype":4,"errcode":0,"ts":1640072157,"weituo":{"totals":2329,"avg_askpx":33.06,"s10":[0,0],"s9":[0,0],"s8":[0,0],"s7":[0,0],"s6":[0,0],"s5":[32.12,71],"s4":[32.11,22],"s3":[32.1,42],"s2":[32.09,35],"s1":[32.08,10],"totalb":2534,"avg_bidpx":31.43,"b1":[32.03,356],"b2":[32.01,50],"b3":[32,115],"b4":[31.99,29],"b5":[31.98,35],"b6":[0,0],"b7":[0,0],"b8":[0,0],"b9":[0,0],"b10":[0,0]},"fenbi":[["14:55:53",32.07,1,3,1,0,0,9621],["14:55:56",32.04,1,181,11,0,0,580122],["14:56:02",32.06,1,37,11,1,0,118556],["14:56:05",32.08,1,21,7,1,0,67356],["14:56:11",32.09,1,11,5,1,0,35288],["14:56:14",32.09,1,13,2,1,0,41707],["14:56:17",32.09,1,3,1,1,0,9627],["14:56:20",31.98,1,187,11,0,0,598452],["14:56:25",31.98,1,27,6,1,0,86362],["14:56:32",32.02,1,7,4,1,0,22366],["14:56:35",31.98,1,1,1,0,0,3198],["14:56:51",31.99,1,9,3,0,0,28791],["15:00:01",32.03,1,147,34,0,0,470841]]},"stockplate":null,"range":{"range":[]},"bid":{"code":"603538","day":20211221,"bid":[["09:21",31.73,1,1],["09:22",31.72,1,14],["09:22",31.7,0,15],["09:23",31.63,1,15],["09:23",31.63,1,15],["09:23",31.63,1,17],["09:24",31.63,0,20]],"preclose_px":31.72,"hprice":31.73,"lprice":31.63,"openpx":0.88,"flag":1,"time":1640160021,"errcode":0},"selval":1,"ttag":0.083218,"errcode":"0"}



export default function Chart() {
  let mycanvas;
  onMount(()=> {
    console.log("onMount");
    var d = l['trend']['trend']
    var a = d.slice(0,121)
    let chart = new Kline(mycanvas, a)
  });

  return (

    <div ref={mycanvas} class="h-70"></div>
  );
}



