const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');
const displayCourseName = document.getElementById('displayCourseName');

const selectedCourse = courses.find((c) => c.id === courseId);
if (selectedCourse) {
  displayCourseName.innerText = selectedCourse.title;
} else {
  displayCourseName.innerText = 'Okänd kurs';
}

const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const bookingData = {
    courseId: courseId,
    courseTitle: selectedCourse ? selectedCourse.title : 'Okänd',
    customerName: formData.get('customerName'),
    address: formData.get('address'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    date: new Date().toLocaleDateString(),
  };

  try {
    const response = await fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      alert('Tack! Din bokning är mottagen.');
      window.location.href = '../index.html';
    }
  } catch (error) {
    console.error('Fel vid bokning:', error);
  }
});
