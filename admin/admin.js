if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}

const addCourseForm = document.getElementById('addCourseForm');
const bookingsList = document.getElementById('bookingsList');

const fetchAndDisplayBookings = async () => {
  try {
    const response = await fetch('http://localhost:3000/bookings');
    const bookings = await response.json();

    if (bookings.length === 0) {
      bookingsList.innerHTML = '<p>Inga bokningar finns ännu.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'admin-table';
    table.innerHTML = `
            <thead>
                <tr>
                    <th>Kund</th>
                    <th>Kurs</th>
                    <th>Kurs-ID</th>
                    <th>Datum</th>
                </tr>
            </thead>
            <tbody id="bookingTableBody"></tbody>
        `;

    bookingsList.innerHTML = '';
    bookingsList.appendChild(table);

    const tbody = document.getElementById('bookingTableBody');

    bookings.forEach((booking) => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = booking.customerName;

      const courseCell = document.createElement('td');
      courseCell.textContent = booking.courseTitle;

      const idCell = document.createElement('td');
      idCell.textContent = booking.courseId;

      const dateCell = document.createElement('td');
      dateCell.textContent = booking.date || 'Saknas';

      row.appendChild(nameCell);
      row.appendChild(courseCell);
      row.appendChild(idCell);
      row.appendChild(dateCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Kunde inte ladda bokningar:', error);
  }
};

addCourseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(addCourseForm);

  const newCourse = {
    id: formData.get('id'),
    title: formData.get('title'),
    length: formData.get('length'),
    price: formData.get('price'),
    startDate: formData.get('startDate'),
    description: formData.get('description'),
    type: 'Klassrum',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
  };

  try {
    const response = await fetch('http://localhost:3000/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });

    if (response.ok) {
      alert('Kursen har sparats!');
      addCourseForm.reset();
    }
  } catch (error) {
    alert('Kunde inte spara kursen.');
  }
});

fetchAndDisplayBookings();
