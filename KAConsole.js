var KAConsole = {
    VERSION: function() {
        return "1.1.0"
    },
    AUTHOR: function() {
        return "Peter@petercarnahan"
    },
    
    elt: null,
    pMesgs: null,
    proCon: null,
    prompt: null,
    
    tHeight: window.innerHeight/4,
    pHeight: 24,
    mHeight: this.tHeight-this.pHeight,
    
    promptLog: [""],
    pIndex:0,
    
    hidden:true,
    
    resize: function(newHeight) {
        if(newHeight < this.pHeight) {
            this.resize(this.pHeight)
            return false
        }
        this.tHeight = newHeight
        this.mHeight = this.tHeight-this.pHeight
        
        if(this.elt) {
            this.elt.style.height=this.tHeight+"px"
            this.pMesgs.style.height=this.mHeight+"px"
        }
    },
    
    prepObj: function(input) {
        var out = input;
        var str;
        if(typeof(input)!=="function"&&!(input instanceof Error)&&Object(input)===input) {
            out = input.toString()+": {<br>"
            var objs = []
            str = this.stringify(input)
            out += str
            out += "}"
        }
        return out
    },
    handleType: function(input) {
        var out = ""
        if(input===null||input===undefined) {
            out += input
        } else {
            switch(typeof input) {
                case "number":
                    out += input.toString()
                    break;
                case "string":
                    out += "\""+input+"\""
                    break;
                case "object":
                    if(Array.isArray(input)) {
                        out += "["
                        for(var index in input) {
                            out += this.handleType(input[index])
                            if(index < input.length-1) {
                                out += ","
                            }
                        }
                        out += "]"
                    } else {
                        out += Object.prototype.toString.call(input)
                    }
                    break;
                case "boolean":
                    out += input.toString()
                    break;
                case "function":
                    out += "function"
                    break;
            }
        }
        return out
    },
    stringify: function(obj,notHTMLFormat=false) {
        if(typeof obj==="object") {
            var keys = Object.keys(obj)
            var vals = Object.values(obj)
            var out = ""
            for(var i in keys) {
                try {
                    out += (notHTMLFormat?"    ":"&nbsp;&nbsp;&nbsp;&nbsp;")+keys[i] + ": "
                    var v = vals[i]
                    out += this.handleType(v)
                } catch(e) {
                    out += "\"Could not access "+keys[i]+": "+e.message+"\""
                }
                if(i !== keys.length-1) {
                    out += ","+(notHTMLFormat?"\n":"<br>")
                }
            }
            return out
        } else {
            return obj
        }
    },
    
    
    log: function(msg) {
        var toAdd = document.createElement("span")
        toAdd.width=window.innerWidth-2+"px"
        var tS = toAdd.style
        tS.color = "black"
        tS["overflow-wrap"]="break-word"
        toAdd.innerHTML = "> "+this.prepObj(msg)
        if(this.pMesgs) {
            this.pMesgs.appendChild(toAdd)
            this.pMesgs.scrollTo(0,this.pMesgs.scrollHeight)
        }
    },
    warn: function(msg) {
        var toAdd = document.createElement("span")
        var tS = toAdd.style
        tS.color = "rgb(255,255,0)"
        tS.backgroundColor="rgb(150,150,0)"
        toAdd.innerHTML = "> "+this.prepObj(msg)
        if(this.pMesgs) {
            this.pMesgs.appendChild(toAdd)
            this.pMesgs.scrollTo(0,this.pMesgs.scrollHeight)
        }
    },
    error: function(msg) {
        var toAdd = document.createElement("span")
        var tS = toAdd.style
        tS.color = "rgb(255,0,0)"
        tS.backgroundColor = "rgb(100,0,0)"
        toAdd.innerHTML = "> "+this.prepObj(msg)
        if(this.pMesgs) {
            this.pMesgs.appendChild(toAdd)
            this.pMesgs.scrollTo(0,this.pMesgs.scrollHeight)
        }
    },
    
    executePrompt: function() {
        var p = this.prompt.value
        if(p.trim() !== "") {
            var nPrompts = this.promptLog.slice(1,this.promptLog.length)
            nPrompts.unshift(p)
            this.promptLog = this.promptLog.slice(0,1)
            this.promptLog.push(nPrompts)
            this.promptLog = this.promptLog.flat()
            try {
                var KAC = this
                var f = function () {
                    if((p.includes("KAConsole.resetOutput()"))||(p.includes("KAConsole.reset()"))) {
                        eval(p.trim())
                    } else {
                        KAC.log(eval(p.trim()))
                    }
                }
                f()
            } catch(e) {
                this.error(e)
            }
        }
    },
    
    create: function() {
        this.resize(window.innerHeight/4)
        
        this.elt = document.createElement("div")
        var s = this.elt.style
        s.position = "fixed"
        s.width = window.innerWidth-2+"px"
        s.height = this.tHeight+"px"
        s.bottom = "0px"
        s.left = "0px"
        s["z-index"] = "100"
        s.border="1px solid black"
        s.margin="0px"
        s.padding="0px"
        
        this.pMesgs = document.createElement("div")
        this.pMesgs.style.position="absolute"
        this.pMesgs.style.top="0px"
        this.pMesgs.style.left="0px"
        this.pMesgs.style.width=window.innerWidth-2+"px"
        this.pMesgs.style.height=this.mHeight+"px"
        this.pMesgs.style["background-color"] = "rgb(250,250,250)"
        this.pMesgs.style["overflow-y"]="scroll"
        this.pMesgs.style.display="flex"
        this.pMesgs.style.flexDirection="column"
		this.pMesgs.style["text-align"]="left"
        
        this.proCon = document.createElement("span")
        this.proCon.style["background-color"] = "rgb(220,220,220)"
        this.proCon.style.position="absolute"
        this.proCon.style.width=window.innerWidth-2+"px"
        this.proCon.style.height=this.pHeight+"px"
        this.proCon.style.bottom="0px"
        this.proCon.style.left="0px"
        this.proCon.style["font-size"]="17px"
        this.proCon.textContent=">"
        this.proCon.style["text-align"]="left"
        
        this.prompt = document.createElement("input")
        this.prompt.type="text"
        this.prompt.style.position="absolute"
        this.prompt.style.width=(window.innerWidth-21)+"px"
        this.prompt.style.height=this.pHeight-4+"px"
        this.prompt.style.bottom="1px"
        this.prompt.style.left="1em"
        this.prompt.style.border="none"
        var KAC = this
        this.prompt.addEventListener("keydown", function(k) {
            if(k.code === "Enter") {
                KAC.executePrompt()
                KAC.prompt.value = ""
                KAC.pIndex = 0
                KAC.promptLog[0] = ""
            } 
            
            else if(k.code === "ArrowUp") {
                if(KAC.pIndex < KAC.promptLog.length-1) {
                    KAC.pIndex++
                    KAC.prompt.value=KAC.promptLog[KAC.pIndex]
                } else {
                    KAC.prompt.value=KAC.promptLog[KAC.pIndex]
                }
            } 
            
            else if(k.code === "ArrowDown") {
                if(KAC.pIndex > 0) {
                    KAC.pIndex--
                    KAC.prompt.value=KAC.promptLog[KAC.pIndex]
                } else {
                    KAC.prompt.value=KAC.promptLog[KAC.pIndex]
                }
            }
        })
        this.prompt.addEventListener("input",function() {
            KAC.promptLog[0] = KAC.prompt.value||""
            KAC.pIndex = 0
        })
        
        this.proCon.appendChild(this.prompt)
        this.elt.appendChild(this.proCon)
        this.elt.appendChild(this.pMesgs)
        document.body.appendChild(this.elt)
        
        this.hidden = false
    },
    
    hide: function() {
        this.elt.style.bottom="-"+(2*this.tHeight)+"px"
        this.prompt.blur()
        this.hidden = true
    },
    show: function() {
        this.elt.style.bottom="0px"
        this.hidden = false
    },
    
    resetLog: function() {
        this.promptLog = this.promptLog.slice(0,1)
    },
    resetOutput: function() {
        while(this.pMesgs.firstChild) {
            this.pMesgs.removeChild(this.pMesgs.lastChild)
        }
    },
    reset: function() {
        this.resetLog()
        this.resetOutput()
    },
    
    bindShowHide: function(keyCode) {
        document.body.addEventListener("keydown",function(k) {
            if(k.keyCode===keyCode) {
                KAConsole.hidden?KAConsole.show():KAConsole.hide()
            }
        })
    },
    bindDefault: function() {
        this.bindShowHide(192)
    },
    
    default: function() {
        this.create()
        this.bindDefault()
    },
}