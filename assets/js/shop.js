$(() => {
  // Basic Configuration
  let points = parseInt(localStorage.getItem("points"))
  $( "#balance" ).append(`${points} Points `)

  function subtractPoints(pointsToSubtract) {
    localStorage.setItem("points", points - pointsToSubtract)
    points = parseInt(localStorage.getItem("points"));
    $( "#balance" ).text(`${points} Points `)
  }

  function notEnoughPoints(itemPrice) {
    Swal.fire({
      icon: 'error',
      title: 'ヽ(•́o•̀)ノ Oops!',
      text: `Uh-oh! You need ${itemPrice - points} more points. Come back later!`,
      confirmButtonText: 'Alright!',
      footer: '<a href="../earn">Let me start earning more points!</a>'
    })
  }

  function cancelPurchase() {
    Swal.fire({
      icon: 'error',
      title: 'Purchase cancelled!',
      text: 'Your purchase has been cancelled. No points were deducted',
    })
  }

  function purchaseItem(itemName, itemData) {
    let minimumPoints = Math.min.apply(Math, Object.values(itemData));

    // Check points
    if (points >= minimumPoints) {
      (async () => {
        let itemDataFormatted = {}

        Object.entries(itemData).forEach(entry => {
          const [key, value] = entry;
          itemDataFormatted[key] = `${key} (${value} BP)`;
        });

        const { value: time } = await Swal.fire({
          icon: 'question',
          title: `How should your ${itemName} be scheduled?`,
          input: 'select',
          inputOptions: itemDataFormatted,
          inputPlaceholder: 'Select an option',
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'Please select an option from the dropdown!'
            }
          }
        })
        
        if (time) {
          const { value: confirmation } = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `Your purchase cannot be refunded!`,
            input: 'text',
            inputLabel: `To proceed, type '${itemName}' below.`,
            inputPlaceholder: `${itemName}`,
            showCancelButton: true,
            footer: '<span>Do note that the input is case-sensetive!',
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            inputValidator: (value) => {
              if (!value) {
                return 'You need to type something!'
              }
              if (value !== itemName) {
                return 'Your input does not match the expected!'
              }
            }
          })

          if (confirmation) {
            // Subtract Points
            let itemPrice = itemData[time]
            subtractPoints(itemPrice)
        
            // Show success message
            Swal.fire({
              icon: 'success',
              title: '(ﾉ◕ヮ◕)ﾉ ♪',
              text: `WOO-HOO! Your ${time} minutes of ${itemName} has successfully been purchased!`,
              confirmButtonText: 'Awesome!'
            })
          } // if (confirmation === itemname)
          else {
            cancelPurchase()
          } // else ( if (confirmation) )
        } // if (time)
        else {
          cancelPurchase()
        } // else ( if (time) )
      })() // async
    } else {
      notEnoughPoints(minimumPoints)
    }
  }

  function dishwasher(itemName, itemData) {
    // Show confirmation message
    if ( points >= 100 ) {
      (async () => {
        let itemDataFormatted = itemData

          const { value: time } = await Swal.fire({
            icon: 'question',
            title: `When should your ${itemName} be scheduled?`,
            input: 'select',
            inputOptions: itemDataFormatted,
            inputPlaceholder: 'Select an option',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Please select an option from the dropdown!'
              }
            }
          })
          
          
          if (time) {

            const { value: confirmation } = await Swal.fire({
              title: 'Are you sure?',
              text: `Your purchase of ${itemName} cannot be refunded!`,
              icon: 'warning',
              input: 'text',
              inputLabel: `To proceed, type '${itemName}' below.`,
              inputPlaceholder: `${itemName}`,
              showCancelButton: true,
              footer: '<span>Do note that the input is case-sensetive!',
              inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
              },
              inputValidator: (value) => {
                if (!value) {
                  return 'You need to type something!'
                }
                if (value !== itemName) {
                  return 'Your input does not match the expected!'
                }
              }
            })

            if (confirmation) {
              subtractPoints(time)

              let itemTime = (time == 100) ? 'Breakfast'
                            : (time == 120) ? 'Dinner'
                            : 'After Guests'

              // Show success message
              Swal.fire({
                icon: 'success',
                title: '(ﾉ◕ヮ◕)ﾉ ♪',
                text: `WOO-HOO! Your ${itemName} (${itemTime}) has successfully been purchased!`,
                confirmButtonText: 'Awesome!'
              })
            } else {
              cancelPurchase()
            }
          } else {
            cancelPurchase()
          }
      })() // async
    } else {
      notEnoughPoints(100)
    }
  }

  function normalPurchase(itemName, itemPrice) {
    // Show confirmation message
    if (points >= itemPrice) {
      (async () => {
        const { value: confirmation } = await Swal.fire({
          title: 'Are you sure?',
          text: `Your purchase of a ${itemName} cannot be refunded!`,
          icon: 'warning',
          input: 'text',
          inputLabel: `To proceed, type '${itemName}' below.`,
          inputPlaceholder: `${itemName}`,
          showCancelButton: true,
          footer: '<span>Do note that the input is case-sensetive!',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to type something!'
            }
            if (value !== itemName) {
              return 'Your input does not match the expected!'
            }
          }
        })
        
        if (confirmation) {
            
          // Change user's points
          subtractPoints(itemPrice)
  
          // Show success message
          Swal.fire({
            icon: 'success',
            title: '(ﾉ◕ヮ◕)ﾉ ♪',
            text: `WOO-HOO! A ${itemName} has successfully been purchased!`,
            confirmButtonText: 'Awesome!'
          })
        }
        else {
          cancelPurchase()
        }
      })()
    } else {
      notEnoughPoints(itemPrice)
    }
  }

  function customPurchase() {
    (async () => {
      const { value: itemPrice } = await Swal.fire({
        icon: 'question',
        title: 'Please enter the item\'s price',
        text: 'Example: If the item\'s price is 100 BP, type \'100\' below',
        input: 'text',
        inputPlaceholder: 'Item price (in Bp)',
        showCancelButton: true,
      })

      // Show confirmation message
      if (points >= itemPrice) {
        const { value: confirmation } = await Swal.fire({
          title: 'Are you sure?',
          text: `Your purchase cannot be refunded!`,
          icon: 'warning',
          input: 'text',
          inputLabel: `To proceed, type '${itemPrice} BP' below.`,
          inputPlaceholder: `${itemPrice} BP`,
          showCancelButton: true,
          footer: '<span>Do note that the input is case-sensetive!',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to type something!'
            }
            if (value !== `${itemPrice} BP`) {
              return 'Your input does not match the expected!'
            }
          }
        })
          
        if (confirmation) {
          // Change user's points
          subtractPoints(itemPrice)
    
          // Show success message
          Swal.fire({
            icon: 'success',
            title: '(ﾉ◕ヮ◕)ﾉ ♪',
            text: `WOO-HOO! An item has successfully been purchased!`,
            confirmButtonText: 'Awesome!'
          })
        } else {
          cancelPurchase()
        }
      }
      else if (!itemPrice) {
        cancelPurchase()
      }
      else {
        notEnoughPoints(+itemPrice)
      }
    })()
  }

  // User membership
  let membership = localStorage.getItem( "membership" )

  // Massage
  let minMassagePrice = 100
  let maxMassagePrice = 190

  if (membership === 'ultimate') {
    minMassagePrice = 80
    maxMassagePrice = 170
  }

  $( "#massage h2 pre" ).text( `${minMassagePrice}-${maxMassagePrice} BP` )

  $( "#massage" ).click(function() {
    if (membership === 'ultimate') {
      purchaseItem('massage', {
        "5 Minutes": 80,
        "8 Minutes": 130,
        "10 Minutes": 170
      })
    } else {
      purchaseItem('massage', {
        "5 Minutes": 100,
        "8 Minutes": 150,
        "10 Minutes": 190
      })
    }
  });

  // Bedtime Story
  let minBsPrice = 210
  let maxBsPrice = 300

  if (membership === 'ultimate') {
    minBsPrice = 185
    maxBsPrice = 275
  }

  $( "#bedtime-story h2 pre" ).text( `${minBsPrice}-${maxBsPrice} BP` )

  $( "#bedtime-story" ).click(function() {
    if (membership === 'ultimate') {
      purchaseItem('massage', {
        "5 Minutes": 185,
        "8 Minutes": 235,
        "10 Minutes": 275
      })
    } else {
      purchaseItem('bedtime story', {
        "5 Minutes": 210,
        "8 Minutes": 260,
        "10 Minutes": 300
      })
    }
  });

    // Taxi
    let minTaxiPrice = 5
  
    $( "#escort h2 pre" ).text( `${minTaxiPrice}+ BP` )
  
    $( "#escort" ).click(function() {
      purchaseItem('escort', {
        "1 Stop": 5,
        "2 Stops": 10,
        "3 Stops": 15,
        "4 Stops": 20,
      })
    });
  

  $( "#dishwasher" ).click(function() {
    dishwasher('dishwashing', {
      'Most Popular': {
        100 : "Breakfast (100 BP)",
        120 : "Dinner (120 BP)"
      },
      'Other Options': {
        150: "After Guests (150 BP)"
      }
    })
  });

  // Mystery gift
  let giftPrice = 300

  if (membership === 'ultimate') {
    giftPrice = 270
  }

  $( "#gift h2 pre" ).text( `${giftPrice} BP` )

  $( "#gift" ).click(function() {
    normalPurchase('mystery gift', giftPrice)
  });

  $( "#custom-purchase" ).click(function() {
    customPurchase()
  });
  
});