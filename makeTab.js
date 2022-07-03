var codes=[
    "void main(){"
    ,"print();"
    ,"if(true){"
    ,"{"
    ,"print();"
    ,"}"
    ,"}"
    // "sss{}{}{{}}"
    // ,"\t\tprint();"
]
//var stack = [];
var tabDepth = 0
function countTab(line){
    // "void main(){"  line에 괄호는 무조건 한개
    serachValue = "{";
    serachValue2 = "}";
    foundPos = line.indexOf(serachValue); //여는 괄호 조회
    foundPosClose = line.indexOf(serachValue2); //닫는 괄호 조회
    if(foundPosClose != -1) foundPos = foundPosClose // 닫는괄호가 있다는 뜻

    // 괄호가 없는 경우
    if(foundPos == -1) {
        line = insertTab(line, tabDepth)
        return line 
    }
    else {
        if(foundPosClose!=-1){
            tabDepth-=1
        }
        line = insertTab(line, tabDepth)
        //열린괄호인 경우
        if(foundPosClose==-1){
            tabDepth+=1
        }
        if(tabDepth<0) {
            errorCheck("tab");
            return false
        }
        return line
    }
}
function insertTab(line, mydepth){
    tabString =""
    for(let i = 0; i < mydepth; i++){
        tabString+= "\t";
    }
    line = tabString+line;
    return line
}

function errorCheck(kind){
    if(kind=="tab"){
        console.log("괄호 체크 error");
    }
}
function checkBracket(line){
    serachValue = "{";
    serachValue2 = "}";
    let foundPos = []
    let posEnd = 0;
    let posSt = 0;
    while(true){
        foundPosOpen = line.indexOf(serachValue, posEnd);
        foundPosClose = line.indexOf(serachValue2, posEnd);
        foundPos = Math.min(foundPosOpen, foundPosClose)
        if(foundPos == -1) break;
        posEnd = foundPos+1;
        //posSt, posEnd 차이가 1 인경우 별도의 처리 필요 괄호다음 바로 괄호가 나오는 경우
        stack.push(line.substring(posSt, posEnd-1))
        stack.push(line.substring(posEnd-1, posEnd))
      
        console.log("dbg--------------"+posSt+" "+posEnd);
        posSt = posEnd;
        
        console.log("stack:"+stack);
    }
    
}

for( line in codes){
    let cntResult = countTab(codes[line])
    if(cntResult == false)
        break
    console.log(cntResult, tabDepth)
}
if(tabDepth>0){
    errorCheck("tab");
}