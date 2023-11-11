// 유저가 값을 입력한다.
//  + 버튼을 누르면 클릭하면, 할 일이 추가된다.
// delete버튼을 누르면 할 일이 삭제된다.
// check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하면 true로 전환
// 2. true면 밑줄 보여주가
// 3. false이면 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 완료 탭은 끝난 아이템만, 진행중인 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let userInput = document.querySelector('.user_input');
let addBtn = document.querySelector('.add_btn');
let tabs = document.querySelectorAll('.menu_btn button');
let textList = [];
let menu = 'all';
let filterList = [];

addBtn.addEventListener('click', userBtn);

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

// 버튼을 누르면 userInput 값
function userBtn() {
  let text = {
    id: randomIDGenerate(),
    textContent: userInput.value,
    isComplete: false,
  };
  textList.push(text);
  render();
}

// 오늘 할 일 출력
function render() {
  let resultHTML = '';
  let list = [];

  if (menu === 'all') {
    list = textList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="txt_wrap">
      <div class="txt check_line">${list[i].textContent}</div>
      <div class="btn_wrap">
        <button class="check_btn" onclick="checkBtn('${list[i].id}')"><img src="../images/restart.svg"></button>
        <button class="delete_btn" onclick="deleteBtn('${list[i].id}')"><img src="../images/delete.svg"></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="txt_wrap">
          <div class="txt">${list[i].textContent}</div>
          <div class="btn_wrap">
            <button class="check_btn" onclick="checkBtn('${list[i].id}')"><img src="../images/done.svg"></button>
            <button class="delete_btn" onclick="deleteBtn('${list[i].id}')"><img src="../images/delete.svg"></button>
          </div>
        </div>`;
    }
  }
  document.querySelector('.txt_area').innerHTML = resultHTML;

}

function checkBtn(id) {
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].id === id) {
      textList[i].isComplete = !textList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteBtn(id) {
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].id === id) {
      textList.splice(i, 1);
    }
  }
  render();
}

function filter(event) {
  menu = event.target.id;
  filterList = [];
  if (menu === 'ongoing') {
    for (let i = 0; i < textList.length; i++) {
      if (textList[i].isComplete === false) {
        filterList.push(textList[i]);
      }
    }
  } else if (menu === 'done') {
    for (let i = 0; i < textList.length; i++) {
      if (textList[i].isComplete) {
        filterList.push(textList[i]);
      }
    }
  }
  render();
}

// 정보에 랜덤한 아이디 부여
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}