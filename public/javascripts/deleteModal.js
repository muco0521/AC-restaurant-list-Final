// use sweetalert2 & use fetch send POST
const restaurantPanel = document.querySelector('#restaurant-panel')
restaurantPanel.addEventListener('click', function onDeleteBtnClick(event) {
  const { id, name } = event.target.dataset

  if (id) {
    Swal.fire({
      title: `${name}<br>確定要刪除此餐廳嗎?`,
      text: `(刪除將無法復原)`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            fetch(`/restaurants/${id}?_method=delete`, {
              method: "POST",
            })
              .then(() => location.href = '/')
              .catch(error => console.log(error))
          }
        })
      }
    })
  }
})