// script.js

var form = document.getElementById('myForm');
var modal = document.getElementById('myModal');
var modalMessage = document.getElementById('modalMessage');
var spinnerModal = document.getElementById('spinnerModal');

form.onsubmit = function(event) {
  event.preventDefault();

  var formData = new FormData(form);

  // เปลี่ยน 'YOUR_WEB_APP_URL' เป็น URL ของ Web App ที่คุณได้จากการ Deploy Google Apps Script
  fetch('https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec', {
    method: 'POST',
    mode: 'cors',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // เพื่อดูข้อมูลที่ได้รับจากเซิร์ฟเวอร์
    spinnerModal.style.display = 'none'; // ซ่อน spinner modal

    if (data.success) {
      modalMessage.innerHTML = '<span class="alert-icon alert-success">&#x2714;</span> Booking successfully saved!';
      form.reset(); // รีเซ็ตฟอร์มหลังจากการจองสำเร็จ
    } else {
      modalMessage.innerHTML = '<span class="alert-icon alert-error">&#x2716;</span> ' + data.message;
    }

    modal.style.display = "flex";
  })
  .catch(error => {
    spinnerModal.style.display = 'none'; // ซ่อน spinner modal
    modalMessage.innerHTML = '<span class="alert-icon alert-error">&#x2716;</span> There was an error.';
    modal.style.display = "flex";
  });

  spinnerModal.style.display = 'flex'; // แสดง spinner modal ขณะกำลังส่งข้อมูล
}

function closeModal() {
  modal.style.display = "none";
}
