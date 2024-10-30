// script.js

// จัดการการคลิกแท็บ
const tabs = document.querySelectorAll('.navbar-menu a');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        // ลบคลาส active จากแท็บและเนื้อหาทั้งหมด
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // เพิ่มคลาส active ให้กับแท็บและเนื้อหาที่ถูกคลิก
        const target = this.getAttribute('href');
        document.querySelector(target).classList.add('active');
        this.classList.add('active');

        // หากเป็นแท็บปฏิทินรายวัน ให้โหลดเนื้อหา
        if (target === '#calendarDay') {
            loadCalendar();
        }
    });
});

// ฟังก์ชันสำหรับโหลดปฏิทิน
function loadCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    // ตรวจสอบว่ามีการโหลดปฏิทินแล้วหรือไม่
    if (!calendarContainer.innerHTML.trim()) {
        // ทำการโหลดปฏิทินจากไฟล์ภายนอกหรือสร้างขึ้นด้วย JavaScript
        calendarContainer.innerHTML = '<p>กำลังโหลดปฏิทิน...</p>';
        // ตัวอย่างการสร้างปฏิทิน
        setTimeout(() => {
            calendarContainer.innerHTML = '<p>นี่คือปฏิทินรายวัน</p>';
        }, 1000);
    }
}

// ฟังก์ชันสำหรับการส่งฟอร์ม
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // แสดงสปินเนอร์
    document.getElementById('spinnerModal').style.display = 'flex';

    // เก็บข้อมูลจากฟอร์ม
    const formData = new FormData(bookingForm);

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์ (ตัวอย่าง)
    fetch('https://your-server-url.com/api/booking', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // ซ่อนสปินเนอร์
        document.getElementById('spinnerModal').style.display = 'none';
        // แสดงข้อความในโมดอล
        document.getElementById('modalMessage').textContent = 'การจองสำเร็จ!';
        document.getElementById('modal').style.display = 'flex';
        // รีเซ็ตฟอร์ม
        bookingForm.reset();
    })
    .catch(error => {
        document.getElementById('spinnerModal').style.display = 'none';
        document.getElementById('modalMessage').textContent = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
        document.getElementById('modal').style.display = 'flex';
    });
});

// ฟังก์ชันสำหรับปิดโมดอล
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
