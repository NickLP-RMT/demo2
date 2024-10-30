body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  position: relative;
  padding-bottom: 10px;
}

.form-container h2::before {
  content: '\1F4C5';
  font-size: 30px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
}

.form-container h2::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 200px;
  height: 4px;
  background-color: #2196F3;
  border-radius: 2px;
}

label {
  font-weight: bold;
  margin-top: 10px;
  display: block;
  color: #333;
}

input[type="date"],
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

input[type="submit"],
.calendar-btn,
.translator-btn {
  font-size: 16px;
}

input[type="submit"] {
  width: 100%;
  padding: 10px 20px;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px;
  border-radius: 10px;
  text-align: center;
}

.modal-content p {
  margin: 0;
  padding: 10px 0;
}

.close-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #45a049;
}

.calendar-btn {
  background-color: #2196F3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  display: block;
  text-align: center;
  text-decoration: none;
}

.calendar-btn:hover {
  background-color: #0b7dda;
}

.translator-btn {
  background-color: #ffeb3b;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 10px;
}

.translator-btn:hover {
  background-color: #fdd835;
}

.spinner-modal {
  display: none;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert-icon {
  font-weight: bold;
  margin-right: 10px;
}

.alert-error {
  color: red;
}

.alert-success {
  color: green;
}
