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

document.addEventListener('DOMContentLoaded', () => {
  // 순차 타이핑
  const t1 = document.getElementById('typing1')
  const t2 = document.getElementById('typing2')
  const t3 = document.getElementById('typing3')
  typeWriter(t1, '안녕하세요', 120, () => {
    setTimeout(() => {
      typeWriter(t2, '이제혁 홈페이지 입니다.', 80, () => {
        setTimeout(() => {
          typeWriter(t3, '92212996 이제혁', 80)
        }, 300)
      })
    }, 300)
  })

  // 로그인 상태에 따라 우측 카드 텍스트 변경
  const loginUser = sessionStorage.getItem('loginUser')
  const loginCard = document.querySelector('.right .card .card-content h2')
  const loginBtn = document.querySelector('.right .card .card-content .btn')
  if (loginUser && loginCard) {
    loginCard.innerHTML = `<span style="font-size:22px;">${loginUser}님 안녕하세요!</span>`
    if (loginBtn) loginBtn.style.display = 'none'
  }

  // 3) 스크롤 위치 기반 nav active 토글
  const secs = Array.from(document.querySelectorAll('section[id]'))
  const links = Array.from(document.querySelectorAll('.nav-link'))

  function updateNav() {
    const centerY = window.scrollY + window.innerHeight / 2
    let activeId = secs[0].id
    for (const s of secs) {
      if (centerY >= s.offsetTop) activeId = s.id
      else break
    }
    links.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`)
    })
  }
  window.addEventListener('scroll', updateNav)
  updateNav()

  // 4) nav 클릭 시 모바일 메뉴만 닫기
  links.forEach((a) => {
    a.addEventListener('click', () => navMenu.classList.remove('active'))
  })
})