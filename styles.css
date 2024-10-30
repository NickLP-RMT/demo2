/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(to right, #e0eafc, #cfdef3);
    color: #333;
}

/* Navbar Styles */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2196F3;
    padding: 10px 20px;
}

.navbar-logo a {
    color: #fff;
    font-size: 24px;
    text-decoration: none;
    font-weight: 600;
}

.navbar-logo i {
    margin-right: 10px;
}

.navbar-menu {
    list-style: none;
    display: flex;
}

.navbar-menu li {
    margin-left: 20px;
}

.navbar-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.navbar-menu a:hover,
.navbar-menu a.active {
    background-color: #1976d2;
}

/* Main Content Styles */
main {
    padding: 40px 20px;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

/* Form Styles */
.form-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
}

.form-container h2::before {
    content: '\f274'; /* Font Awesome Unicode for calendar-check */
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
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

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    font-weight: 500;
    margin-bottom: 5px;
    display: block;
    color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.time-group {
    display: flex;
    justify-content: space-between;
}

.time-group > div {
    width: 48%;
}

button[type="submit"] {
    width: 100%;
    padding: 15px;
    background-color: #4CAF50;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
}

button[type="submit"]:hover {
    background-color: #45a049;
}

/* Calendar and Translator Buttons */
.calendar-btn,
.translator-btn {
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 12px;
    margin-top: 15px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
}

.calendar-btn {
    background-color: #2196F3;
    color: white;
}

.calendar-btn:hover {
    background-color: #1976d2;
}

.translator-btn {
    background-color: #ffeb3b;
    color: black;
}

.translator-btn:hover {
    background-color: #fdd835;
}

/* Modal Styles */
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
    padding: 30px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    text-align: center;
}

.close-btn {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-btn:hover {
    background-color: #45a049;
}

/* Spinner Styles */
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
    border: 12px solid #f3f3f3;
    border-radius: 50%;
    border-top: 12px solid #3498db;
    width: 90px;
    height: 90px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Other Section Styles */
section h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

section p {
    font-size: 18px;
    color: #555;
    text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar-menu {
        flex-direction: column;
        align-items: flex-start;
    }

    .navbar-menu li {
        margin-left: 0;
        margin-top: 10px;
    }

    .time-group {
        flex-direction: column;
    }

    .time-group > div {
        width: 100%;
        margin-bottom: 20px;
    }
}
