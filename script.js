// JavaScript for Tab Navigation
const tabs = document.querySelectorAll('.tabs a');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active class to the clicked tab and corresponding content
        const target = this.getAttribute('href').substring(1);
        document.getElementById(`${target}-content`).classList.add('active');
        this.classList.add('active');
    });
});

// Form Submission
var form = document.getElementById('myForm');
var modal = document.getElementById('myModal');
var modalMessage = document.getElementById('modalMessage');
var spinnerModal = document.getElementById('spinnerModal');

form.onsubmit = function(event) {
    event.preventDefault();

    var formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbxhVD0_-g7VKhYcOKMRTCaRx_OmoxgTCoIactfbWBRvL7v-MOXKlOabsXkF40Jd263B/exec', {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Debugging
        spinnerModal.style.display = 'none'; // Hide spinner modal

        if (data.success) {
            modalMessage.innerHTML = '<span class="alert-icon alert-success">&#x2714;</span> Booking successfully saved!';
        } else {
            modalMessage.innerHTML = '<span class="alert-icon alert-error">&#x2716;</span> ' + data.message;
        }

        modal.style.display = "flex";

        if (data.success) {
            form.reset(); // Reset form on success
        }
    })
    .catch(error => {
        spinnerModal.style.display = 'none'; // Hide spinner modal
        modalMessage.innerHTML = '<span class="alert-icon alert-error">&#x2716;</span> There was an error.';
        modal.style.display = "flex";
    });

    spinnerModal.style.display = 'flex'; // Show spinner modal during submission
}

function closeModal() {
    modal.style.display = "none";
}
