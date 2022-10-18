$(() => {
  // Credit Card Number
  $( "#username" ).html(localStorage.getItem("username"));

  // Credit Card Number
  $( "#ccNumber" ).text(localStorage.getItem("cc-number"));

  // Points
  $( "#points" ).text(localStorage.getItem("points"));

  // Membership
  $( "#membership" ).text(localStorage.getItem("membership"));

  // Membership Expiry
  $( "#membershipExpiry" ).text(localStorage.getItem("membership") == 'free' ? 'NA' : localStorage.getItem("membership-expiry"));

  // Edit Name function
  $( "#edit" ).click(() => {
    (async () => {

      const { value: username } = await Swal.fire({
        title: 'Please enter your name',
        input: 'text',
        inputPlaceholder: 'Username'
      })
      
      if (username) {
        localStorage.setItem('username', username)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Name changed successfully!'
        })

        $( "#username" ).html(localStorage.getItem("username"));

      }
      
      })()
  })
});