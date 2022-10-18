/* ==========
File: * redeem/redeem.js *
Created using JQuery :)

STRUCTURE:
1) Version Checking
2)  Quiz function

========== */

$(function() {
  /* === Version Checking START === */
  function checkVersion(db) {
    if (db.getItem("points") === null ||
        db.getItem("cc-number") === null ||
        db.getItem("next-daily-reward") === null ||
        db.getItem("quiz-completed") === null ||
        db.getItem("gsg-completed") === null) {
      return true;
    } else {
      return false;
    }
  }

  function applyStorage(db) {
    if (db.getItem("points") === null) { db.setItem("points", 0) }
    if (db.getItem("cc-number") === null) { db.setItem("cc-number", `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`); }
    if (db.getItem("next-daily-reward") === null) { db.setItem("next-daily-reward", new Date()) }
    if (db.getItem("quiz-completed") === null) { db.setItem("quiz-completed", false) }
    if (db.getItem("gsg-completed") === null) { db.setItem("gsg-completed", false) }
  }

  if (checkVersion(localStorage)) {
    applyStorage(localStorage)
  } else {
    console.log("%cVersion is up-to-date!", "color:lightgreen");
  }
  /* === Version Checking END === */

  // Show user points
  let points = parseInt(localStorage.getItem("points"))
  $( "#balance" ).append(`${points} Points `)

  $( "#redeem" ).click(function() {
    (async () => {

      const { value: code } = await Swal.fire({
        icon: 'question',
        title: 'Enter the Gift Card\'s code',
        text: '(╭ರᴥ•́ ) Find you code hidden inside the Gift Card bag!',
        input: 'text',
        inputLabel: 'Enter your gift card\'s code:',
        inputPlaceholder: 'C0D3-COD3-C0DE-CODE'
      })
      
      if (code == 'BOBO-KMURA-4545-OOPSIE' &&
          localStorage.getItem("CD1") != 'true'
      ) {
        localStorage.setItem("points", points + 150)
        points = localStorage.getItem('points')
        $( "#balance" ).html(`<img class="icon cc" />${points} Points `)

        localStorage.setItem("CD1", true)

        Swal.fire(
          'Awesome!',
          'You have earned 150 points!',
          'success'
        )
      }
      
      else if (code == '796C-9390-BF6F-F7F0' && localStorage.getItem("CD2") != 'true') {
        
        function random(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var p = Math.ceil(Math.random() * 10) / 10
        let earnedPoints = 0

        if (p < 0.6) {
          // 50% chance of being here
          console.log('60% chance:', p)
          earnedPoints = random(200, 335)
          console.log(earnedPoints)
        }
        else if (p < 0.7){
          // 10% chance of being here
          console.log('10% chance:', p)
          earnedPoints = random(335, 415)
          console.log(earnedPoints)
        }
        else {
          // 30% chance of being here
          console.log('30% chance:', p)
          earnedPoints = random(415, 600)
          console.log(earnedPoints)
        }

        localStorage.setItem("points", points + earnedPoints)
        points = localStorage.getItem('points')
        $( "#balance" ).html(`<img class="icon cc" />${points} Points `)

        localStorage.setItem("CD2", true)

        Swal.fire(
          'Awesome!',
          `You have earned ${earnedPoints} points!`,
          'success'
        )
      }

      else if (code == 'GAMI-NGCH-AIRA-NDPC' && localStorage.getItem("CD3") != 'true') {

        localStorage.setItem("membership", "ultimate")

        const today = new Date().toString()
        const tomorrow = new Date(today)

        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0,0,0,0)

        const tomorrowTomorrow = tomorrow
        tomorrowTomorrow.setDate(tomorrowTomorrow.getDate() + 1)
        tomorrowTomorrow.setHours(0,0,0,0)

        console.log(tomorrowTomorrow)

        localStorage.setItem( "membership-expiry", tomorrowTomorrow )

        localStorage.setItem("CD3", true)

        Swal.fire(
          'Awesome!',
          `You have got BPoints Ultimate Membership!`,
          'success'
        )
      }
      
      else {
        Swal.fire({
          icon: 'error',
          title: 'ヽ(•́o•̀)ノ Oops!',
          text: 'This code appears to be invalid. You may have already redeemed it.',
          footer: '<a href="mailto:avner.keinan@gmail.com?subject=HOW%20COME%20MY%20GIFT%20CARD%20NOT%20WORKING%20%E3%83%BD%E0%BC%BC%20%E0%B2%A0%E7%9B%8A%E0%B2%A0%20%E0%BC%BD%EF%BE%89%20(edit%20this)" target="_blank">Message BPoints ELITE Technical Support</a>'
        })
      }
    })()
  });

  $( "#shop--scrollto" ).click( function () {
    location.replace('#shop')
  })
});