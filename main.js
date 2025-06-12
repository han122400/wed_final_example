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
} // 테스트용 주석석

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

// 1) 타입라이터 함수
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

// 2) DOMContentLoaded 에서 타이핑 + 네비게이션 로직 실행
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

  // 타이핑 이펙트 (index.html 본문에서만 동작하도록 보장)
  if (
    document.getElementById('typing1') &&
    document.getElementById('typing2') &&
    document.getElementById('typing3')
  ) {
    const t1 = document.getElementById('typing1')
    const t2 = document.getElementById('typing2')
    const t3 = document.getElementById('typing3')
    typeWriter(t1, '기말', 120, () => {
      setTimeout(() => {
        typeWriter(t2, 'CMD 팀플 페이지.', 80, () => {
          setTimeout(() => {
            typeWriter(t3, 'A+ 받아야지', 80)
          }, 300)
        })
      }, 300)
    })
  }
})
