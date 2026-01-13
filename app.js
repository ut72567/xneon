<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XNEON | Tech Redefined</title>
    
    <link rel="stylesheet" href="style.css">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body class="xneon-dark">

    <div id="side-menu" class="side-menu">
        <button class="close-btn" onclick="toggleMenu()">×</button>
        <a href="#">Contact Us</a>
        <a href="#" class="highlight">Repair & Replace</a>
        <a href="#" onclick="loadPage('account')">Account</a>
        <a href="#" id="auth-link" onclick="showSignupStep1()">Login / Sign Up</a>
    </div>

    <header class="top-header">
        <div class="menu-icon" onclick="toggleMenu()">☰</div>
        <img src="https://i.ibb.co/fVbfV7sd/IMG-20260113-163849-removebg-preview.png" alt="XNEON" class="brand-logo">
        <div class="search-icon" onclick="toggleSearch()">🔍</div>
    </header>

    <div id="search-overlay" class="search-overlay">
        <input type="text" id="search-input" class="search-input" placeholder="Search Smartphone, Buds...">
        <div id="search-results"></div>
        <button onclick="toggleSearch()" style="color:white; background:none; border:none; margin-top:10px;">Close</button>
    </div>

    <main id="main-view">
        <div class="loader" style="text-align:center; padding:50px;">Initializing XNEON Experience...</div>
    </main>

    <nav class="bottom-nav">
        <button onclick="loadPage('home')">🏠<span>Home</span></button>
        <button onclick="loadPage('categories')">📦<span>Categories</span></button>
        <button onclick="loadPage('orders')">🛍️<span>My Orders</span></button>
        <button onclick="loadPage('account')">👤<span>Account</span></button>
    </nav>

    <script type="module" src="app.js"></script>

    <script>
        // Basic UI Toggles that don't require Firebase
        function toggleMenu() {
            document.getElementById('side-menu').classList.toggle('open');
        }
        function toggleSearch() {
            document.getElementById('search-overlay').classList.toggle('active');
        }
    </script>
</body>
</html>
