document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    document.querySelector('body').classList.add('loaded')    
  }, 500);
  
  if (document.querySelector('.js-toTop')) {
    const topBtn = document.querySelector('.js-toTop');
    topBtn.addEventListener('click', () => {
      window.scroll({ top: 0, behavior: 'smooth'})
    })
  }

  const fadeinTarget = document.querySelectorAll('.fadein')

  const fadeinCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('show')) {
        entry.target.classList.add('show')
      }
    })
  }

  const observer = new IntersectionObserver(fadeinCallback, {
    rootMargin: '-20% 0px',
  });

  fadeinTarget.forEach(target => {
    observer.observe(target);
  });

  const fadeinCreditTarget = document.querySelectorAll('.fadeinCredit')
  
  const fadeinCreditCallback = (entries) => {
    entries.forEach((entry) => {
      let time = 150
      if (entry.isIntersecting && !entry.target.classList.contains('show')) {
        setTimeout(() => {
          entry.target.querySelectorAll('.fadeinCreditTarget').forEach((item) => {
            setTimeout(() => {
              item.classList.add('show')
            }, time);
            time += 150
          })
        }, 500);
      }
    })
  }

  const creditObserver = new IntersectionObserver(fadeinCreditCallback, {
    rootMargin: '-8% 0px',
  });

  fadeinCreditTarget.forEach(target => {
    creditObserver.observe(target);
  });

  if (document.querySelector('.js-ModalBtn')) {
    document.querySelectorAll('.js-ModalBtn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const modal = document.querySelector('.common-Modal')
        modal.classList.add('active')
        console.log(e.target);
        modal.querySelector('.js-Modal-Num').innerHTML = e.target.dataset.num
        modal.querySelector('.js-Modal-Brand').innerHTML = e.target.dataset.brand;
        document.querySelector('html').style.overflow = 'hidden'
      })
    })

    document.querySelector('.js-Modal-Close').addEventListener('click', () => {
      document.querySelector('.common-Modal').classList.remove('active')
      document.querySelector('html').style.overflow = ''
    })

    document.querySelector('.common-Modal-Bg').addEventListener('click', () => {
      document.querySelector('.common-Modal').classList.remove('active')
      document.querySelector('html').style.overflow = ''
    })
  }

  class alignWidth {
    align(target, standardNum, changeNums) {
      setTimeout(() => {
        const standardWidth = target.querySelectorAll('.js-alignWidth-standard p')[standardNum].clientWidth
        changeNums.forEach((num) => {
          target.querySelectorAll('.js-alignWidth-standard p')[num].style.width = `${standardWidth}px`
        })
      }, 400);
    }
    alignMulti(target, standardNumMulti, changeNumsMulti) {
      setTimeout(() => {
        standardNumMulti.forEach((standardNum, index) => {
          const standardWidth = target.querySelectorAll('.js-alignWidth-standard p')[standardNum].clientWidth
          changeNumsMulti[index].forEach((changeNum) => {
            target.querySelectorAll('.js-alignWidth-standard p')[changeNum].style.width = `${standardWidth}px`
          })
        })
      }, 400);
    }
  }

  const aligns = () => {
    if (window.innerWidth > 767) {
      if (document.querySelector('.js-look-alignWidth-0')) {
        new alignWidth().align(document.querySelector('.js-look-alignWidth-0'), 1, [2, 3, 4]);
        new alignWidth().alignMulti(document.querySelector('.js-look-alignWidth-1'), [0, 1], [[3], [2]]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-2'), 4, [0, 1, 2]);
        // new alignWidth().align(document.querySelector('.js-look-alignWidth-3'), 3, [2]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-4'), 2, [1]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-5'), 0, [1]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-6'), 0, [1, 2]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-7'), 0, [1]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-10'), 3, [1]);
        new alignWidth().align(document.querySelector('.js-look-alignWidth-11'), 1, [0, 2, 4]);
      } else if (document.querySelector('.js-item-alignWidth-0')) {
        new alignWidth().align(document.querySelector('.js-item-alignWidth-2'), 1, [0]);
        new alignWidth().align(document.querySelector('.js-item-alignWidth-5'), 2, [1]);
        new alignWidth().align(document.querySelector('.js-item-alignWidth-7'), 2, [0, 1]);
        new alignWidth().align(document.querySelector('.js-item-alignWidth-8'), 2, [1]);
      }
    } else {
      document.querySelectorAll('.js-alignWidth-standard p').forEach((item) => {
        item.style.width = ''
      })
    }
  }

  aligns()

  window.addEventListener('resize', () => {
    aligns()
  })
})
