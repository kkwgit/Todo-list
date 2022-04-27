//유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// 체크 버튼을 누르면 할일이 종료되고 밑줄 생성
//1. 체크 버튼을 클릭하는 순간 false -> true
///2. true이면 종료 / 밑줄 생성
// 3. false이면 안끝난걸로 간주

// 진행중 , 완료 탭을 누르면 언더바가 이동한다
// DONE 탭은 끝난 아이템만, 진행중은 진행중인 아이템만 추가
// 전체탭을 누르면 다시 전체 아이템으로 돌아온다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("u-line")
let taskList = [];
let mode = "all";
let filterList = []


addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
      Filter(event);
    });
  }


for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){Filter(event)})
}

function addTask(){
    let taskValue = taskInput.value;
    let task ={
        id:randomIDGenerate(),
        taskContent: taskValue,
        isComplete:false
    }
    taskList.push(task)
    taskInput.value = "";
    console.log(taskList)
    render();
}

function render(){
    let list=[];
    if(mode == "all"){
        list = taskList;
    } else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    } 

    let resultHTML = "";
    
    for (let i=0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `
            <div class="task task-done">
                            <span>
                                ${list[i].taskContent}
                            </span>
                            <div class="button-box">
                                <button onclick="toggleComplet('${list[i].id}')">
                                    <i class="fa-solid fa-rotate-right"></i>
                                </button>
                                <button onclick="deleteTask('${list[i].id}')">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
            `;

        } else{
            resultHTML += `
            <div class="task">
                            <span>
                                ${list[i].taskContent}
                            </span>
                            <div class="button-box">
                                <button onclick="toggleComplet('${list[i].id}')">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button onclick="deleteTask('${list[i].id}')">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
            `;
        }

 }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplet(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    Filter();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    Filter();
}

function Filter(e){
    
    if (e) {
        mode=e.target.id
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
          e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
      }

    filterList = [];
    if(mode == "all"){
        render();
    }else if (mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
    
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        
         }
        
        console.log(filterList)
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
