// script.js

// Handle tab clicks
const tabs = document.querySelectorAll('.navbar-menu a');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active class to the clicked tab and corresponding content
        const target = this.getAttribute('href');
        document.querySelector(target).classList.add('active');
        this.classList.add('active');

        // Load calendar content if needed
        if (target === '#calendarDay') {
            loadCalendar();
        }
    });
});

// Function to load the calendar content
function loadCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    if (!calendarContainer.innerHTML.trim()) {
        calendarContainer.innerHTML = '<p>Loading calendar...</p>';
        // Simulate loading content
        setTimeout(() => {
            calendarContainer.innerHTML = '<p>This is the daily calendar.</p>';
        }, 1000);
    }
}

// Handle form submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Show spinner
    document.getElementById('spinnerModal').style.display = 'flex';

    // Collect form data
    const formData = new FormData(bookingForm);

    // Send data to server (replace 'YOUR_WEB_APP_URL' with your actual URL)
    fetch('https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec', {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Hide spinner
        document.getElementById('spinnerModal').style.display = 'none';
        // Display message in modal
        if (data.success) {
            document.getElementById('modalMessage').innerHTML = '<span class="alert-icon alert-success">&#x2714;</span> Booking successfully saved!';
            bookingForm.reset();
        } else {
            document.getElementById('modalMessage').innerHTML = '<span class="alert-icon alert-error">&#x2716;</span> ' + data.message;
        }
        document.getElementById('modal').style.display = 'flex';
    })
    .catch(error => {
        document.getElementById('spinnerModal').style.display = 'none';
        document.getElementById('modalMessage').innerHTML = '<span class="alert-icon alert-error">&#x2716;</span> There was an error.';
        document.getElementById('modal').style.display = 'flex';
    });
});

// Function to close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
