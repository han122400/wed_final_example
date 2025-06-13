// 로그인 처리 함수
function Login() {
  var userID = document.getElementById('userID').value
  var password = document.getElementById('pw').value

  var saveUser = localStorage.getItem('user_' + userID)
  if (saveUser) {
    // JSON으로 사용자 정보 읽기
    var user = JSON.parse(saveUser)
    if (user.password == password) {
      sessionStorage.setItem('loginUser', userID)
      alert('로그인 성공!')
      window.location.href = 'index.html'
    } else {
      alert('비밀번호가 틀렸습니다.')
    }
  } else {
    var signup = confirm('계정 정보가 없습니다. 회원가입 하시겠습니까?')
    if (signup) {
      window.location.href = 'signup.html'
    }
  }
}

// 회원가입 처리 함수
function Signup() {
  var userID = document.getElementById('userID').value
  var password = document.getElementById('pw').value

  // 중복 아이디 확인
  if (localStorage.getItem('user_' + userID)) {
    alert('이미 있는 아이디 입니다.')
    return
  }

  // 사용자 정보 JSON으로 저장
  var user = { userID: userID, password: password }
  localStorage.setItem('user_' + userID, JSON.stringify(user))
  alert('회원가입 성공!')
  window.location.href = 'index.html'
}

function Logout() {
  //로그아웃
  if (confirm('로그아웃 하시겠습니까?')) {
    sessionStorage.removeItem('loginUser')
    window.location.href = 'index.html'
  }
}

//회원 탈퇴
function Delete() {
  if (confirm('정말 회원탈퇴를 진행하시겠습니까?')) {
    localStorage.clear()
    sessionStorage.clear()
    alert('회원탈퇴가 완료되었습니다.')
    window.location.href = 'signup.html'
  }
}

function locate_Login() {
  window.location.href = 'login.html'
}

// 타입라이터 함수
function typeWriter(el, text, speed, callback) {
  let i = 0
  el.textContent = ''
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i++)
    } else {
      clearInterval(timer)
      if (callback) callback()
    }
  }, speed)
}

document.addEventListener('DOMContentLoaded', () => {
  // index.html에서만 로그인 상태에 따라 우측 카드 텍스트 변경
  if (
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html'
  ) {
    const loginUser = sessionStorage.getItem('loginUser')
    const cardEls = document.querySelectorAll('.card, .right-skill-card')
    if (loginUser && cardEls.length > 0) {
      // 첫 번째 카드의 h2 텍스트 변경
      const h2 = cardEls[0].querySelector('h2')
      if (h2) {
        h2.textContent = `${loginUser}님 안녕하세요!`
        h2.style.color = '#fff'
        h2.style.fontSize = '22px'
      }
      // 로그인 버튼 숨기기
      const btn = cardEls[0].querySelector('.btn')
      if (btn) btn.style.display = 'none'
      // 로그아웃 버튼 추가 (없을 때만)
      if (!cardEls[0].querySelector('.logout-btn')) {
        const logoutBtn = document.createElement('button')
        logoutBtn.className = 'btn logout-btn'
        logoutBtn.textContent = '로그아웃'
        logoutBtn.style.marginTop = '10px'
        logoutBtn.onclick = Logout
        cardEls[0].appendChild(logoutBtn)
      }
    }
  }

  // 타이핑 이펙트
  if (
    document.getElementById('typing1') &&
    document.getElementById('typing2') &&
    document.getElementById('typing3')
  ) {
    const t1 = document.getElementById('typing1')
    const t2 = document.getElementById('typing2')
    const t3 = document.getElementById('typing3')
    // 첫 줄: 팀명 + 로고
    t1.style.fontSize = '70px'
    t1.style.fontWeight = 'bold'
    t1.style.display = 'inline-block'
    t1.innerHTML = ''
    typeWriter(t1, '팀명: C.M.D', 100, () => {
      // 로고 이미지를 바로 오른쪽에 추가
      const logo = document.createElement('img')
      logo.src = 'img/teamlogo.png'
      logo.alt = 'CMD 로고'
      logo.style.height = '200px'
      logo.style.width = '200px'
      logo.style.verticalAlign = 'middle'
      logo.style.marginLeft = '18px'
      t1.appendChild(logo)
      // 두 번째 줄: 주제
      t2.style.fontSize = '50px'
      t2.style.fontWeight = '600'
      t2.style.marginTop = '18px'
      t2.innerHTML = ''
      typeWriter(t2, '주제: What is AI?', 80, () => {
        // 세 번째 줄: 주제 설명
        t3.style.fontSize = '30px'
        t3.style.fontWeight = '500'
        t3.style.marginTop = '18px'
        t3.innerHTML = ''
        typeWriter(
          t3,
          '- Deep Learning AI와 그와 관련된 AI 소개(생성형 AI, 이미지 인식 기반 AI)',
          40,
          () => {
            // 네 번째 줄: AI 서비스 활용 방식
            const explain = document.createElement('div')
            explain.style.fontSize = '20px'
            explain.style.fontWeight = '400'
            explain.style.marginTop = '150px'
            explain.innerHTML =
              'AI 서비스 활용 방식: 저희는 AI 서비스로 chatgpt를 사용하여 코드 오류 검사 및 기능 구현을 위해 필요한 함수 서치에 활용하였습니다.'
            t3.parentNode.appendChild(explain)
          }
        )
      })
    })
  }

  // 모달(팝업창) 열고 닫기 기능

  document.querySelectorAll('.detail-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation()
      const modalId = this.getAttribute('data-modal')
      const modal = document.getElementById(modalId)
      if (modal) modal.classList.add('active')
    })
  })

  document.querySelectorAll('.modal').forEach((modal) => {
    // X 버튼 클릭 시 닫기
    modal.querySelector('.close-btn').addEventListener('click', function () {
      modal.classList.remove('active')
    })
    // 바깥쪽 클릭 시 닫기
    modal.addEventListener('mousedown', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active')
      }
    })
  })
})
