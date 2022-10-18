$(function() {

  // Points & Credit Card setup/configuration
  let [points, ccNum] = [
    parseInt(localStorage.getItem("points")),
    localStorage.getItem("cc-number")
  ]

  $( ".card--balance h1" ).text(`${points} Points`)
  $( ".ccNumber span" ).text(ccNum)
  
  // Weekly reward validity checking
  let [today, nextDailyReward] = [
    Date.parse(new Date().toString()),
    Date.parse(localStorage.getItem("next-daily-reward"))
  ]

  const membership = localStorage.getItem("membership")
  const dailyRewardEarnings = membership === "ultimate" ? 50 : 25

  if (today < nextDailyReward) {
    $( ".card--reward pre" ).text( "Claimed" ).addClass( "invalid" )
  } else {
    $( ".card--reward pre" ).text( `+${dailyRewardEarnings} BP` )
  }

  // Weekly reward
  $( ".card--reward div" ).click(function() {
    const nextWeek = new Date()

    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(0,0,0,0)
    
    const nextWeekFormatted = nextWeek.toLocaleDateString('en-ZA', {   
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    })

    if (today >= nextDailyReward) {
      localStorage.setItem("next-daily-reward", nextWeek)
      localStorage.setItem("points", points + dailyRewardEarnings)

      points = +localStorage.getItem("points")

      Swal.fire(
        'Daily Reward Claimed',
        `Awesome! Come again at ${`${nextWeekFormatted}`} for another surprise!`,
        'success'
      )
      
      $( ".card--balance h1" ).text(`${points} Points`)
      $( ".card--reward pre" ).text('Claimed').addClass('invalid')

      nextDailyReward = Date.parse(localStorage.getItem("next-daily-reward"))
    } else {
      Swal.fire(
        'Oops!',
        `Come again at ${nextWeekFormatted} for another reward!`,
        'error'
      )
    }
  });
});