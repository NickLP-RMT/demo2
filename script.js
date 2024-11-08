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

// ตั้งค่าข้อมูลกราฟและการกำหนดค่าต่าง ๆ
document.addEventListener("DOMContentLoaded", function() {
    // ภาพรวมการจองทั้งหมด (กราฟวงกลม)
    const bookingOverviewCanvas = document.getElementById('bookingOverviewChart');
    bookingOverviewCanvas.style.width = '100%'; // ให้กราฟเต็มพื้นที่ container
    bookingOverviewCanvas.style.height = '100%'; // ให้กราฟเต็มพื้นที่ container
    
    const bookingOverviewCtx = document.getElementById('bookingOverviewChart').getContext('2d');
    const bookingOverviewChart = new Chart(bookingOverviewCtx, {
        type: 'pie',
        data: {
            labels: ['SOM SAN', 'GOOK SAN', 'POOKY SAN', 'L SAN'], // แทนชื่อของล่าม
            datasets: [{
                label: 'Total Bookings',
                data: [40, 30, 20, 10], // ตัวอย่างข้อมูลสำหรับการจองแต่ละคน
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });

// การจองตามวันที่ (Stacked Bar Chart แยกตามล่าม)
const bookingHeatmapCanvas = document.getElementById('bookingHeatmapChart');
bookingHeatmapCanvas.height = 300; // ลดความสูงของกราฟลง
    
const bookingHeatmapCtx = document.getElementById('bookingHeatmapChart').getContext('2d');
const bookingHeatmapChart = new Chart(bookingHeatmapCtx, {
    type: 'bar',
    data: {
        labels: ['01/11', '02/11', '03/11', '04/11', '05/11', '06/11', '07/11'], // วันที่
        datasets: [
            {
                label: 'SOM SAN',
                data: [1, 2, 1, 3, 1, 2, 3],
                backgroundColor: '#FF6384',
            },
            {
                label: 'GOOK SAN',
                data: [2, 1, 3, 1, 2, 1, 1],
                backgroundColor: '#36A2EB',
            },
            {
                label: 'POOKY SAN',
                data: [1, 3, 1, 2, 3, 1, 1],
                backgroundColor: '#FFCE56',
            },
            {
                label: 'L SAN',
                data: [2, 1, 0, 1, 1, 3, 2],
                backgroundColor: '#4BC0C0',
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            x: {
                title: { display: true, text: 'วันที่' },
                stacked: true
            },
            y: {
                title: { display: true, text: 'จำนวนการจอง' },
                stacked: true
            }
        }
    }
});

    // การใช้ช่วงเวลาในการจองประจำวัน (กราฟแท่ง)
    const timeUsageCanvas = document.getElementById('timeUsageChart');
    timeUsageCanvas.height = 300; // ลดความสูงของกราฟลง
    
    const timeUsageCtx = document.getElementById('timeUsageChart').getContext('2d');
    const timeUsageChart = new Chart(timeUsageCtx, {
        type: 'line',
        data: {
            labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
            datasets: [
                {
                    label: 'SOM SAN',
                    data: [1, 2, 0, 3, 1, 4, 2, 3, 0],
                    borderColor: '#FF6384',
                    fill: false
                },
                {
                    label: 'GOOK SAN',
                    data: [2, 1, 3, 2, 0, 1, 4, 2, 1],
                    borderColor: '#36A2EB',
                    fill: false
                },
                {
                    label: 'POOKY SAN',
                    data: [1, 3, 1, 0, 2, 3, 1, 2, 4],
                    borderColor: '#FFCE56',
                    fill: false
                },
                {
                    label: 'L SAN',
                    data: [0, 2, 1, 2, 3, 1, 0, 2, 3],
                    borderColor: '#4BC0C0',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                x: { title: { display: true, text: 'ช่วงเวลา' } },
                y: { title: { display: true, text: 'จำนวนการจอง' } }
            }
        }
    });
});

// ฟังก์ชันสำหรับการปิดโมดอล
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = "none");
}

// การจัดการฟอร์มจอง
var form = document.getElementById('myForm');
var bookingModal = document.getElementById('myModal');
var modalMessage = document.getElementById('modalMessage');
var spinnerModal = document.getElementById('spinnerModal');

// ซ่อน spinner modal ในการโหลดหน้าเว็บครั้งแรก
spinnerModal.style.display = 'none';

form.onsubmit = function(event) {
    event.preventDefault();

    spinnerModal.style.display = 'flex'; // แสดง spinner modal ขณะส่งข้อมูล

    var formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbzb1E4usV64THPhxqOiXyJkCHbtdd5qUkUnPpGmg2y6XUPRQfqMPL2o_X-UYwilYQ0/exec', {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        spinnerModal.style.display = 'none'; // ซ่อน spinner modal เมื่อส่งข้อมูลเสร็จสิ้น

        if (data.success) {
            modalMessage.className = "message-box success-message"; // คลาสสำหรับสีเขียวใน CSS
            modalMessage.innerHTML = '<img src="icons/success-icon.png" alt="Success Icon" class="message-icon"><i class="fas fa-check-circle" style="font-size: 48px;"></i><br>Booking successfully saved!';
        } else {
            modalMessage.className = "message-box error-message";
            modalMessage.innerHTML = '<img src="icons/TimeError.png" alt="Warning Icon" class="message-icon"><i class="fas fa-times-circle" style="color: red; font-size: 48px;"></i><br>' + data.message;
        }

        bookingModal.style.display = "flex";

        if (data.success) {
            form.reset(); // ล้างฟอร์มเมื่อบันทึกสำเร็จ
        }
    })
    .catch(error => {
        spinnerModal.style.display = 'none'; // ซ่อน spinner modal เมื่อเกิดข้อผิดพลาด
        modalMessage.className = "message-box error-message";
        modalMessage.innerHTML = '<i class="fas fa-times-circle" style="color: red; font-size: 48px;"></i><br>There was an error.';
        bookingModal.style.display = "flex";
        console.error(error);
    });
}

// ปิดโมดอลเมื่อคลิกนอกพื้นที่
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

/* --------------------- Calendar Script --------------------- */

// ปฏิทิน
const calendarDays = document.getElementById('calendarDays');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const todayButton = document.getElementById('todayButton'); 
const calendarModal = document.getElementById("calendarModal");
const calendarModalClose = document.getElementById("calendarModalClose");
const spinner = document.getElementById('calendarSpinner');
const calendarRefreshButton = document.getElementById("calendarRefresh");

const modalText = document.getElementById("modalText");
const eventTable = document.getElementById("eventTable");

const timeSlots = [
    '0700_0730', '0730_0800', '0800_0830', '0830_0900', '0900_0930', '0930_1000',
    '1000_1030', '1030_1100', '1100_1130', '1130_1200',
    '1200_1230', '1230_1300', '1300_1330', '1330_1400',
    '1400_1430', '1430_1500', '1500_1530', '1530_1600',
    '1600_1630', '1630_1700', '1700_1730', '1730_1800',
    '1800_1830', '1830_1900', '1900_1930', '1930_2000'
];

const dateToday = new Date();
let currentMonth = dateToday.getMonth();
let currentYear = dateToday.getFullYear();
let currentDay = null;

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar(month, year) {
    calendarDays.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // เพิ่มช่องว่างสำหรับวันก่อนหน้าเดือน
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        calendarDays.appendChild(emptyCell);
    }

    // เพิ่มช่องวันที่
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');

        if (day === todayDate && month === todayMonth && year === todayYear) {
            dayCell.classList.add('today');
        }

        dayCell.innerHTML = `<p>${day}</p>`;

        dayCell.addEventListener('click', () => {
            currentDay = day; // บันทึกวันที่ปัจจุบันที่เลือก
            loadEventsForDay(year, month + 1, day);
        });

        // ตรวจสอบว่ามีการจองหรือไม่
        const requestUrl = `https://script.google.com/macros/s/AKfycbzb1E4usV64THPhxqOiXyJkCHbtdd5qUkUnPpGmg2y6XUPRQfqMPL2o_X-UYwilYQ0/exec?page=calendar&date=${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;

        fetch(requestUrl)
            .then(response => response.json())
            .then(events => {
                if (events.length > 0) {
                    dayCell.classList.add('has-event'); // เพิ่มคลาส has-event หากมีการจองในวันนั้น
                }
            })
            .catch(error => {
                console.error(error);
            });

        calendarDays.appendChild(dayCell);
    }
}

// ฟังก์ชันโหลดเหตุการณ์ในวันนั้น
function loadEventsForDay(year, month, day) {
    const calendarSpinner = document.getElementById('calendarSpinner');
    calendarSpinner.classList.add('active'); // แสดง Spinner

    const requestUrl = `https://script.google.com/macros/s/AKfycbzb1E4usV64THPhxqOiXyJkCHbtdd5qUkUnPpGmg2y6XUPRQfqMPL2o_X-UYwilYQ0/exec?page=calendar&date=${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(events => {
            calendarSpinner.classList.remove('active'); // ซ่อน Spinner
            timeSlots.forEach(time => {
                document.getElementById(`somSan_${time}`).textContent = '';
                document.getElementById(`gookSan_${time}`).textContent = '';
                document.getElementById(`pookySan_${time}`).textContent = '';
                document.getElementById(`lSan_${time}`).textContent = '';
            });

            if (events.length === 0) {
                modalText.textContent = "No events for this day.";
                eventTable.style.display = 'none';
            } else {
                eventTable.style.display = '';
                events.forEach(event => {
                    let timeFromSlot = event.timeFrom.replace(':', '');
                    let timeToSlot = event.timeTo.replace(':', '');

                    while (timeFromSlot < timeToSlot) {
                        let slot = getTimeSlot(timeFromSlot);

                        if (slot) {
                            let cellId = '';
                            if (event.translator === 'SOM SAN') {
                                cellId = `somSan_${slot}`;
                            } else if (event.translator === 'GOOK SAN') {
                                cellId = `gookSan_${slot}`;
                            } else if (event.translator === 'POOKY SAN') {
                                cellId = `pookySan_${slot}`;
                            } else if (event.translator === 'L SAN') {
                                cellId = `lSan_${slot}`;
                            }

                            if (cellId) {
                                const cell = document.getElementById(cellId);
                                if (cell) {
                                   cell.textContent = event.work;
                                }
                            }
                        }

                        // เพิ่มเวลาขึ้น 30 นาที
                        timeFromSlot = incrementTimeSlotBy30Minutes(timeFromSlot);
                    }
                });
                modalText.textContent = `Details for ${months[month - 1]} ${day}, ${year}`;
            }

            calendarModal.style.display = "flex"; // แสดงโมดาล
        })
        .catch(error => {
            calendarSpinner.classList.remove('active'); // ซ่อน Spinner
            modalText.textContent = "An error occurred while fetching data.";
            eventTable.style.display = "none"; // ซ่อนตารางหากเกิดข้อผิดพลาด
            calendarModal.style.display = "flex"; // แสดงโมดาลพร้อมข้อความผิดพลาด
            console.error(error);
        });
}

function getTimeSlot(timeFrom) {
    const slots = {
        '0700': '0700_0730', '0730': '0730_0800', '0800': '0800_0830', '0830': '0830_0900', '0900': '0900_0930', '0930': '0930_1000',
        '1000': '1000_1030', '1030': '1030_1100', '1100': '1100_1130', '1130': '1130_1200',
        '1200': '1200_1230', '1230': '1230_1300', '1300': '1300_1330', '1330': '1330_1400',
        '1400': '1400_1430', '1430': '1430_1500', '1500': '1500_1530', '1530': '1530_1600',
        '1600': '1600_1630', '1630': '1630_1700', '1700': '1700_1730', '1730': '1730_1800',
        '1800': '1800_1830', '1830': '1830_1900', '1900': '1900_1930', '1930': '1930_2000'
    };

    return slots[timeFrom] || null;
}

function incrementTimeSlotBy30Minutes(timeSlot) {
    let hour = parseInt(timeSlot.slice(0, 2));
    let minute = parseInt(timeSlot.slice(2));

    minute += 30;
    if (minute >= 60) {
        minute = 0;
        hour += 1;
    }

    return ('0' + hour).slice(-2) + ('0' + minute).slice(-2);
}

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    renderCalendar(currentMonth, currentYear);
}

calendarRefreshButton.addEventListener('click', () => {
    if (currentDay) {
        loadEventsForDay(currentYear, currentMonth + 1, currentDay);
    }
});

todayButton.addEventListener('click', () => {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar(currentMonth, currentYear);
});

prevMonth.addEventListener('click', () => changeMonth(-1));
nextMonth.addEventListener('click', () => changeMonth(1));

calendarModalClose.onclick = function() {
    calendarModal.style.display = "none";
}

// ฟังก์ชัน Login สำหรับ Translator Only
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');

loginForm.onsubmit = function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const password = passwordInput.value;
    let redirectUrl = '';

    if (userName === 'Som san' && password === 'rmtsom2024') {
        redirectUrl = 'somsan.html';
    } else if (userName === 'Gook san' && password === 'gook1234') {
        redirectUrl = 'gooksan.html';
    } else if (userName === 'Pooky san' && password === 'pooky1234') {
        redirectUrl = 'pookysan.html';
    } else if (userName === 'L san' && password === 'l1234') {
        redirectUrl = 'lsan.html';
    } else {
        modalMessage.className = "message-box error-message";
        modalMessage.innerHTML = '<img src="icons/error-icon.png" alt="Error Icon" class="message-icon"><i class="fas fa-times-circle" style="color: red; font-size: 48px;"></i><br>Password incorrect';
        bookingModal.style.display = "flex";  // แสดงโมดาล
        return;
    }

    window.location.href = redirectUrl;
    loginForm.reset();
};

passwordInput.addEventListener('input', function() {
    modalMessage.textContent = '';
});

renderCalendar(currentMonth, currentYear);
