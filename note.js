// 다이어리 달력 및 TODO 리스트 기능 구현

document.addEventListener('DOMContentLoaded', function () {
  // 로그인 체크 및 사용자명 표시
  var loginUser = sessionStorage.getItem('loginUser') // 세션스토리지에 저장되어 있는 로그인 정보 확인
  if (!loginUser) {
    alert('로그인 후 이용해주세요') // 안내 메시지 출력
    window.location.href = 'login.html'
    return
  }
  var h1 = document.querySelector('.question h1') // question h1을 불러옴
  if (h1) {
    h1.textContent = loginUser + '님의 다이어리 TODO 리스트' // 로그인 유저의 아이디 명과 문구를 함께 출력
  }

  // 1. 달력 렌더링
  var calendar = document.getElementById('diary-calendar')
  var today = new Date() // 달력의 현재 날짜, 월의 시작/끝, 시간 기록에 사용하기 위해 사용한 Date 객체
  var selectedDate = null

  function renderCalendar(year, month) {
    calendar.innerHTML = ''
    var firstDay = new Date(year, month, 1)
    var lastDay = new Date(year, month + 1, 0)
    var startDay = firstDay.getDay()
    var daysInMonth = lastDay.getDate()
    // 요일 헤더
    var weekDays = ['일', '월', '화', '수', '목', '금', '토']
    weekDays.forEach(function (d, i) {
      // forEach 반복문을 통해 달력 날짜, 요일, TODO 리스트 등을 순회하며 DOM을 생성함
      var wd = document.createElement('div')
      wd.textContent = d
      wd.style.fontWeight = 'bold'
      wd.style.opacity = '0.7'
      wd.className = 'calendar-weekday'
      if (i === 0) wd.classList.add('sun')
      if (i === 6) wd.classList.add('sat')
      calendar.appendChild(wd)
    })
    // 빈칸
    for (var i = 0; i < startDay; i++) {
      var empty = document.createElement('div')
      calendar.appendChild(empty)
    }
    // 날짜
    for (var d = 1; d <= daysInMonth; d++) {
      var day = document.createElement('div')
      day.className = 'diary-day'
      var weekDay = new Date(year, month, d).getDay()
      if (weekDay === 0) day.classList.add('sun')
      if (weekDay === 6) day.classList.add('sat')
      day.textContent = d
      var monthStr = (month + 1 < 10 ? '0' : '') + (month + 1)
      var dayStr = (d < 10 ? '0' : '') + d
      var dateStr = year + '-' + monthStr + '-' + dayStr
      day.dataset.date = dateStr
      day.addEventListener('click', function () {
        // 이벤트 리스너를 통해 클릭시 팝업창을 띄움
        openTodoModal(this.dataset.date, this)
      })
      calendar.appendChild(day)
    }
  }

  // 2. TODO 모달 열기/닫기
  var todoModal = document.getElementById('todo-modal')
  var selectedDateSpan = document.getElementById('selected-date')
  var closeModalBtn = document.getElementById('close-modal')
  var lastSelectedDay = null

  function openTodoModal(dateStr, dayElem) {
    selectedDate = dateStr
    selectedDateSpan.textContent = dateStr
    todoModal.classList.add('active')
    // 날짜 애니메이션
    if (lastSelectedDay) lastSelectedDay.classList.remove('selected')
    dayElem.classList.add('selected')
    lastSelectedDay = dayElem
    renderTodoList()
  }
  closeModalBtn.onclick = function () {
    todoModal.classList.remove('active')
    if (lastSelectedDay) lastSelectedDay.classList.remove('selected')
  }

  // 3. TODO 리스트 렌더링 및 기능
  var todoForm = document.getElementById('todo-form')
  var todoInput = document.getElementById('todo-input')
  var todoList = document.getElementById('todo-list')

  function getTodos() {
    if (!selectedDate) return []
    var data = localStorage.getItem('todo_' + selectedDate)
    return data ? JSON.parse(data) : []
  }
  function saveTodos(todos) {
    if (!selectedDate) return
    localStorage.setItem('todo_' + selectedDate, JSON.stringify(todos))
  }
  function renderTodoList() {
    todoList.innerHTML = ''
    var todos = getTodos()
    todos.forEach(function (todo, idx) {
      var li = document.createElement('li')
      li.className = 'todo-item' + (todo.completed ? ' completed' : '')
      // 체크박스
      var checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = !!todo.completed
      checkbox.onchange = function () {
        todos[idx].completed = checkbox.checked
        saveTodos(todos)
        renderTodoList()
      }
      li.appendChild(checkbox)
      // 텍스트(수정모드 지원)
      if (todo.editing) {
        var editInput = document.createElement('input')
        editInput.type = 'text'
        editInput.value = todo.text
        editInput.style.marginLeft = '8px'
        editInput.onkeydown = function (e) {
          if (e.key === 'Enter') finishEdit()
        }
        li.replaceChildren(checkbox, editInput)
        editInput.focus()
        editInput.onblur = finishEdit
        function finishEdit() {
          todos[idx].text = editInput.value
          todos[idx].editing = false
          saveTodos(todos)
          renderTodoList()
        }
        todoList.appendChild(li)
        return
      }
      var textSpan = document.createElement('span')
      textSpan.textContent = todo.text
      textSpan.style.marginLeft = '8px'
      li.appendChild(textSpan)
      // 시간
      var timeSpan = document.createElement('span')
      timeSpan.className = 'todo-time'
      timeSpan.textContent = todo.time || ''
      li.appendChild(timeSpan)
      // 수정/삭제 버튼
      var actions = document.createElement('span')
      actions.className = 'todo-actions'
      // 수정
      var editBtn = document.createElement('button')
      editBtn.innerHTML = '✏️'
      editBtn.title = '수정'
      editBtn.onclick = function () {
        todos[idx].editing = true
        saveTodos(todos)
        renderTodoList()
      }
      actions.appendChild(editBtn)
      // 삭제
      var delBtn = document.createElement('button')
      delBtn.innerHTML = '🗑️'
      delBtn.title = '삭제'
      delBtn.onclick = function () {
        if (confirm('삭제하시겠습니까?')) {
          //삭제시 확인창을 띄움
          todos.splice(idx, 1)
          saveTodos(todos)
          renderTodoList()
        }
      }
      actions.appendChild(delBtn)
      li.appendChild(actions)
      todoList.appendChild(li)
    })
  }
  // 4. TODO 추가
  todoForm.onsubmit = function (e) {
    e.preventDefault()
    var text = todoInput.value.trim()
    if (!text) return
    var now = new Date()
    var hour = now.getHours()
    var min = now.getMinutes()
    var timeStr =
      (hour < 10 ? '0' : '') + hour + ':' + (min < 10 ? '0' : '') + min
    var todos = getTodos()
    todos.push({ text: text, completed: false, time: timeStr })
    saveTodos(todos)
    todoInput.value = ''
    renderTodoList()
  }

  // 5. 초기 렌더링
  renderCalendar(today.getFullYear(), today.getMonth())
})
