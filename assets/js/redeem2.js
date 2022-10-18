/* ==========
File: * redeem/redeem.js *
Created using JQuery :)

STRUCTURE:
1) Version Checking
2)  Quiz function

========== */

$(function() {

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

      else if (code == 'ultimate' && localStorage.getItem("FJEUWJKJSJ") != 'true') {

        localStorage.setItem("membership", "ultimate")

        const today = new Date().toString()
        const end = new Date(today)

        end.setDate(end.getDate() + 7)
        end.setHours(0,0,0,0)

        console.log(end)

        localStorage.setItem( "membership-expiry", end )

        localStorage.setItem("FJEUWJKJSJ", true)

        Swal.fire(
          'Awesome!',
          `You have got 1 week of BPoints Ultimate Membership!`,
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
});