/* ==========
File: * 𝚎𝚊𝚛𝚗/𝚖𝚊𝚒𝚗.𝚓𝚜 *
Created using JQuery :)

STRUCTURE:
1) Version Checking
2)  Quiz function
3) Bedtime story key-checking & validating
4) Custom Offer
 --- End ---

========== */

$(() => {

  // Show user points
  let points = parseInt(localStorage.getItem("points"))
  $( "#balance" ).text(`${points} Points `)

  // Quiz function
  const quizIsValid = localStorage.getItem("quiz-completed")

  if ($.parseJSON(quizIsValid)) {
    $( ".card.card--quiz pre" ).html('Completed').addClass('invalid')
    $( "#completed #completed__div" ).append( $( ".card.card--quiz" ) );
  }

  // Guessing Game function
  const gameIsValid = localStorage.getItem("gsg-completed")

  if ($.parseJSON(gameIsValid)) {
    $( ".card.card--game pre" ).html('Completed').addClass('invalid')
    $( "#completed #completed__div" ).append( $( ".card.card--game" ) );
  }

  // Completed offers checking
  if ($('#completed #completed__div').html() == "") {
    $("#completed").remove()
  }

  if (!$.trim($('#one-time-offers').html())) {
    $("#oto_label").remove()
    $("#one-time-offers").remove()
  }

  function addPoints(pointsToAdd) {
    localStorage.setItem("points", points + +pointsToAdd)
    points = parseInt(localStorage.getItem("points"))
    $( "#balance" ).text(`${points} Points `)
  }

  
  /* === Quiz START === */
  $( "#quiz" ).click(() => {
    let quizcompleted = localStorage.getItem("quiz-completed").toLowerCase()

    if (quizcompleted == 'false') {
      window.open("//avner.sg/quizzes/1/");

      setTimeout(function(){ 
        addPoints(80)

        localStorage.setItem("quiz-completed", true)

        $( ".card.card--quiz pre" ).html('Completed')
        $( ".card.card--quiz pre" ).css('background-color', '#FF4242')

        Swal.fire(
          'Quiz completed!',
          'You have earned 80 points!',
          'success'
        )
      }, 1000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'You have already completed this offer. Try another one!',
        confirmButtonText: 'Ok!'
      }) // Dialog
    } // Quiz completed else statement
  }); // Quiz clicked function
  /* === Quiz END === */

  /* === Bedtime Story START === */
  $( "#bedtime-story" ).click(() => {
    // Instructions
    Swal.fire({
      icon: 'info',
      title: 'Instructions',
      html: `
        <p>1. Tell Avner a bedtime story for at least 5 minutes</p>
        <p>2. Ask Avner to provide a secret key!</p>
      `,
      confirmButtonText: 'Done!',
      showCancelButton: true
    }).then( result => {
      // Check if user confirmed instructions
      if ( result.isConfirmed ) {
        (async () => {
          const { value: key } = await Swal.fire({
            icon: 'question',
            title: 'Please enter the key',
            text: 'Enter the key given by the Glorious King Avner',
            input: 'text',
            inputPlaceholder: 'ABC1234',
            inputAttributes: {
              autocapitalize: 'off'
            },
            footer: '<a href="../key" target="_blank">Need the key? Get it here now!</a>'
          })
          
          // Check user-entered key
          if ( key === localStorage.getItem('bs-key') ) {
            addPoints(150)
            
            Swal.fire(
              'Offer completed!',
              'Thank you for telling a bedtime story! Here\'s 150 points.',
              'success'
            )
          } else {
            Swal.fire(
              'Incorrect key!',
              'The key you entered is incorrect. Please note that the key is case-sensetive.',
              'error'
            )
          }
        })()
      }
    })
  });
  /* === Bedtime Story END === */

  /* === Massage START === */
  $( "#massage" ).click(() => {
    // Instructions
    Swal.fire({
      icon: 'info',
      title: 'Instructions',
      html: `<p>1. Give Avner a relaxing massage. (5 Minutes)</p>
            <p>2. Ask Avner to provide a secret key!</p>`,
      confirmButtonText: 'Done!',
      showCancelButton: true
    })
    .then( result => {
      // Check if user confirmed instructions
      if ( result.isConfirmed ) {
        (async () => {
          const { value: key } = await Swal.fire({
            icon: 'question',
            title: 'Please enter the key',
            text: 'Enter the key given by the Glorious King Avner',
            input: 'text',
            inputPlaceholder: 'ABC1234',
            inputAttributes: {
              autocapitalize: 'off'
            },
            footer: '<a href="../key" target="_blank">Need the key? Get it here now!</a>'
          })
          
          // Check user-entered key
          if ( key === localStorage.getItem('bs-key') ) {
            addPoints(75)
            
            Swal.fire(
              'Offer completed!',
              'Thank you for giving Avner a massage! Here\'s 75 points.',
              'success'
            )
          } else {
            Swal.fire(
              'Incorrect key!',
              'The key you entered is incorrect. Please note that the key is case-sensetive.',
              'error'
            )
          }
        })()
      }
    })
  });
  /* === Massage END === */

  $( "#milk" ).click(() => {
    // Instructions
    Swal.fire({
      icon: 'info',
      title: 'Instructions',
      html: `<p>1. Make Avner yummy milk. (6 scoops + ~210ml water)</p>
            <p>2. Ask Avner to provide a secret key!</p>`,
      confirmButtonText: 'Done!',
      showCancelButton: true
    })
    .then( result => {
      // Check if user confirmed instructions
      if ( result.isConfirmed ) {
        (async () => {
          const { value: key } = await Swal.fire({
            icon: 'question',
            title: 'Please enter the key',
            text: 'Enter the key given by the Glorious King Avner',
            input: 'text',
            inputPlaceholder: 'ABC1234',
            inputAttributes: {
              autocapitalize: 'off'
            },
            footer: '<a href="../key" target="_blank">Need the key? Get it here now!</a>'
          })
          
          // Check user-entered key
          if ( key === localStorage.getItem('bs-key') ) {
            addPoints(30)
            
            Swal.fire(
              'Offer completed!',
              'Thank you for the milk! Here\'s 30 points.',
              'success'
            )
          } else {
            Swal.fire(
              'Incorrect key!',
              'The key you entered is incorrect. Please note that the key is case-sensetive.',
              'error'
            )
          }
        })()
      }
    })
  });

  /* === Custom Offer START === */
  $( "#custom-offer" ).click(() => {
    (async () => {
      
      const { value: cs_password } = await Swal.fire({
        icon: 'warning',
        title: 'Verification',
        text: 'Enter a password to verify that you are the Great and Almighty, Glorious King Avner',
        input: 'password',
        inputLabel: 'Password:',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter something!'
          }
        }
      })
      
      if ( cs_password === "kingavner" ) {
        (async () => {
          
          const { value: offerEarnings } = await Swal.fire({
            icon: 'question',
            title: 'How much points are to be earned?',
            input: 'text',
            inputLabel: 'Points:',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to enter something!'
              }
            }
          })
          
          if (offerEarnings) {
            addPoints(offerEarnings)

            Swal.fire(
              'Success!',
              `You have earned ${offerEarnings} Points!`,
              'success'
            )
          }
        })()
      }
      
      })()
  });
  /* === Custom Offer END === */

  /* === Quiz START === */
  $( "#guessing-game" ).click(() => {
    let gsg_completed = localStorage.getItem("gsg-completed").toLowerCase()

    if (gsg_completed == 'false') {

      (async () => {

        const { value: gsg_key } = await Swal.fire({
          icon: 'info',
          title: 'How to redeem?',
          html: `
                <p>1. Play this <a href="//replit.com/@aphotic/EVENT-Number-Guessing-Game" target="_blank">game</a></p>
                <p>2. You will receive a code when you guess the random number in 5 or less tries</p>
                <p>3. Enter the secret code below!</p>
          `,
          input: 'text',
          inputPlaceholder: 'Your code (eg. gonggong)'
        })
          
        if (gsg_key == 'guesser') {
          addPoints(80)

          localStorage.setItem("gsg-completed", true)

          $( ".card.card--game pre" ).html('Completed')
          $( ".card.card--game pre" ).css('background-color', '#FF4242')
            
          Swal.fire(
            'Offer completed!',
            'You sure are a lucky one! Here\'s some 80 points!',
            'success'
          )
        }
          
      })()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'You have already completed this offer. Try another one!',
        confirmButtonText: 'Ok!'
      }) // Dialog
    } // Quiz completed else statement
  }); // Quiz clicked function
  /* === Quiz END === */
});