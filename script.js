// ฟังก์ชันสำหรับการจัดการ Tab Navigation
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // ลบคลาส active ทั้งหมด
        navLinks.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // เพิ่มคลาส active ให้กับลิงก์และส่วนที่เลือก
        this.classList.add('active');
        const target = this.getAttribute('href').substring(1);
        document.getElementById(target).classList.add('active');
    });
});

// การจัดการฟอร์ม
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
        console.log(data); // ตรวจสอบข้อมูลที่ได้รับ
        spinnerModal.style.display = 'none'; // ซ่อน spinner modal

        if (data.success) {
            modalMessage.innerHTML = '<i class="fas fa-check-circle" style="color: green; font-size: 48px;"></i><br>Booking successfully saved!';
        } else {
            modalMessage.innerHTML = '<i class="fas fa-times-circle" style="color: red; font-size: 48px;"></i><br>' + data.message;
        }

        modal.style.display = "flex";

        if (data.success) {
            form.reset(); // ล้างฟอร์มเมื่อบันทึกสำเร็จ
        }
    })
    .catch(error => {
        spinnerModal.style.display = 'none'; // ซ่อน spinner modal
        modalMessage.innerHTML = '<i class="fas fa-times-circle" style="color: red; font-size: 48px;"></i><br>There was an error.';
        modal.style.display = "flex";
    });

    spinnerModal.style.display = 'flex'; // แสดง spinner modal ขณะส่งข้อมูล
}

function closeModal() {
    modal.style.display = "none";
}
