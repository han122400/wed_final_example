// 나중에 인터랙티브 효과 추가할 때 사용하세요.
// 예: 카드 스택에 마우스 오버 시 확장 애니메이션
document.querySelectorAll('.card-stack img').forEach((img, idx) => {
  img.addEventListener('mouseenter', () => {
    img.style.transform += ' scale(1.05)'
    img.style.transition = 'transform 0.3s'
  })
  img.addEventListener('mouseleave', () => {
    // 원래 회전 상태로 되돌리기
    // xptmxm
    const rotations = ['rotate(-5deg)', 'rotate(3deg)', 'rotate(-2deg)']
    img.style.transform = rotations[idx]
  })
})
