// ฟังก์ชันสำหรับการจัดการ Tab Navigation
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');


// ตั้งค่าการซ่อน spinner modal โดยค่าเริ่มต้น
spinnerModal.style.display = 'none'; // ซ่อน spinner modal ในการโหลดครั้งแรก


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

        bookingModal.style.display = "flex";

        if (data.success) {
            form.reset(); // ล้างฟอร์มเมื่อบันทึกสำเร็จ
        }
    })
    .catch(error => {
        spinnerModal.style.display = 'none'; // ซ่อน spinner modal
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
        const requestUrl = `https://script.google.com/macros/s/AKfycbwzFXSq1cWuTMrEPzzKSsztUa2Ql6rRPc7zGunqTINMObAOxyOFUjn9YlGLg1HmUOao/exec?page=calendar&date=${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;

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

function loadEventsForDay(year, month, day) {
    const calendarSpinner = document.getElementById('calendarSpinner');
    calendarSpinner.classList.add('active'); // แสดง Spinner

    const requestUrl = `https://script.google.com/macros/s/AKfycbwzFXSq1cWuTMrEPzzKSsztUa2Ql6rRPc7zGunqTINMObAOxyOFUjn9YlGLg1HmUOao/exec?page=calendar&date=${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(events => {
            calendarSpinner.classList.remove('active'); // ซ่อน Spinner

            // ล้างข้อมูลเดิมในตาราง
            timeSlots.forEach(time => {
                document.getElementById(`somSan_${time}`).textContent = '';
                document.getElementById(`gookSan_${time}`).textContent = '';
                document.getElementById(`pookySan_${time}`).textContent = '';
                document.getElementById(`lSan_${time}`).textContent = '';
                // ลบคลาส has-event หากมีการอัพเดตข้อมูลใหม่
                document.getElementById(`somSan_${time}`).classList.remove('has-event');
                document.getElementById(`gookSan_${time}`).classList.remove('has-event');
                document.getElementById(`pookySan_${time}`).classList.remove('has-event');
                document.getElementById(`lSan_${time}`).classList.remove('has-event');
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
                                    cell.classList.add('has-event');
                                }
                            }
                        }

                        // เพิ่มเวลาขึ้น 30 นาที
                        timeFromSlot = incrementTimeSlotBy30Minutes(timeFromSlot);
                    }
                });
                modalText.textContent = `Details for ${months[month - 1]} ${day}, ${year}`;
            }

            calendarModal.style.display = "flex"; // แสดงโมดอล
        })
        .catch(error => {
            calendarSpinner.classList.remove('active'); // ซ่อน Spinner
            modalText.textContent = "An error occurred while fetching data.";
            eventTable.style.display = "none"; // ซ่อนตารางหากเกิดข้อผิดพลาด
            calendarModal.style.display = "flex"; // แสดงโมดอลพร้อมข้อความผิดพลาด
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

// ปิดโมดอลเมื่อคลิกนอกพื้นที่
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

renderCalendar(currentMonth, currentYear);

// เพิ่ม event listener สำหรับปุ่มรีเฟรชภายใน calendarModal
calendarRefreshButton.addEventListener('click', () => {
    if (currentDay) {
        loadEventsForDay(currentYear, currentMonth + 1, currentDay);
    }
});

// ฟังก์ชันสำหรับการปิดโมดอลจากปุ่ม Close
function closeModal() {
    calendarModal.style.display = "none";
}
