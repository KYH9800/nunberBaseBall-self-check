// 태그 선택
const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $record = document.querySelector('#record');
const $log = document.querySelector('#log');

/* PC */
// 제공된 숫자 범위를 배열에 1~9까지 만들어 담는다
// todo: Array(), fill(), map()
// Array(10) [].length === 10;
// Array(10).fill(0) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let numbers = Array(10).fill(0).map((ele, idx) => {
    return idx; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}); // 1~9까지의 숫자를 제공
// for (let i = 0; i < 10; i++) {
//     numbers.push(i);
// }
// 4개의 숫자를 무작위로 뽑아 배열에 담는다
let answer = []; // pc가 뽑은 4자리의 숫자 배열
for (let n = 0; n < 4; n += 1) {
    // todo: 뽑은만큼 제공된 숫자의 배열 길이도 1씩 줄어든다
    const index = Math.floor(Math.random() * (numbers.length - n)); // 0 ~ 8의 정수
    answer.push(numbers[index]);
    numbers.splice(index, 1); // 뽑은 숫자는 지워준다
}
console.log("answer: ", answer);

function defeated() { // 패배를 알리는 함수
    const massage = document.createTextNode(`패배!! 정답은 ${answer.join('')} 입니다`);
    $log.appendChild(massage);
}
/* user */
// 콜백(리스너) 함수
let tries = [];
let out = 0; // out rules
// 검사하는 함수
const ckeckInput = (input) => {
    if (input.length !== 4) { // 길이가 4자리가 아닌가?
        return alert('4자리 숫자를 입력해 주세요');
    }
    if (new Set(input).size !== 4) { // 중복된 숫자가 있는가?
        // new Set() 중복된 숫자는 포함하지 않는 메서드
        return alert('숫자가 중복되지 않게 입력해주세요');
    }
    if (tries.includes(input)) { // 이미 시도한 값은 아닌가? 
        return alert('이미 시도한 값입니다');
    }
    return true;
}
// submit
const onSubmit = (event) => {
    event.preventDefault() // 기본동작 막기
    let inputTag = event.target[0]; // $input Tag 선택
    const value = inputTag.value; // input의 값을 변수에 담는다 / $input.value;
    inputTag.value = '';
    inputTag.focus(); // 커서를 집중
    // 검사하는 함수(위)
    if (!ckeckInput(value)) return;
    console.log('value:', value);
    // 홈런
    if (answer.join('') === value) { // answer의 값 === 입력값 ? 홈런 : count -1 && 다시시도
        $log.textContent = `${value} 홈런!! 게임에 승리했습니다`;
        return;
    }
    // 기회는 10번
    if (tries.length >= 9) {
        defeated(); // 패배를 알리는 함수
        $record.append(`${value}`);
        return;
    }
    // todo: 몇 스트라이크 몇 볼인지 검사하기
    // todo: self-check >> you have to make out rules

    // todo: forEach
    let strike = 0;
    let ball = 0;

    /** 반복문을 대체하는 배열 메서드 forEach
     * answer의 배열에 각각 적용하는 메서드
     * 요소를(element) 하나씩 받아온다.
     * 받아온 요소(element)의 index 자리도 받아온다
     */
    // ex: answer = [ 3146 ];
    // ex: value = [ 3214 ];
    answer.forEach((element, idx) => {
        const index = value.indexOf(element);
        if (index > -1) { // index가 존재하는가? (일치하는 숫자 발견)
            if (index === idx) { // 자릿수도 동일 (스트라이크)
                strike += 1;
            } else { // ball
                ball += 1;
            }
        }
    });
    // for (let i = 0; i < answer.length; i++) {}
    if (out === 3) {
        defeated(); // 패배를 알리는 함수
        return;
    }
    if (strike === 0 && ball === 0) {
        $log.append('맞는 숫자가 없네요. OUT 입니다', document.createElement('br'));
        out += 1;
        console.log(out);
    } else {
        $log.append(`${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
    }
    // todo: 몇 아웃인지도 알릴수 있다면 좋겠다.
    $record.append(`${value}`, document.createElement('br')); // 입력했던 숫자 기록
    tries.push(value);
}

// 이벤트 리스너
$form.addEventListener('submit', onSubmit);

// Math.floor(Math.random() * 9); 소수점 이하 자르고 정수를 0 ~ 9 까지 무작위로 뽑는다
// e.preventDefault() // 기본동작 막기
/*
// pc가 뽑은 answer에 담긴 숫자가 4자리라면 user가 게임을 실행
if (answer.length === 4 && answer.indexOf(undefined) === -1) { // answer의 길이가 4이고 undefined가 없다면 참
   $log.textContent = 'pc가 4개의 숫자를 뽑았습니다.';
} else {
   history.go(0);
}
 */