import { auth, db } from './config.js'; 
import { collection, addDoc, query, where, onSnapshot, getDocs, limit } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const mainView = document.getElementById('main-view');

// 1. ROUTING SYSTEM
window.loadPage = (page) => {
    if (page === 'home') renderHome();
    if (page === 'categories') mainView.innerHTML = '<h1 class="section-title">Categories</h1>';
    if (page === 'orders') mainView.innerHTML = '<h1 class="section-title">My Orders</h1>';
    if (page === 'account') showSignupStep1();
};

// 2. SIGNUP FLOW - STEP 1: Email Input
window.showSignupStep1 = () => {
    mainView.innerHTML = `
        <div class="auth-container">
            <h2 style="color:var(--neon)">Join XNEON</h2>
            <p>Enter email to receive OTP</p>
            <input type="email" id="email-input" class="auth-input" placeholder="email@example.com">
            <button class="btn-primary" onclick="handleSendOTP()">NEXT</button>
        </div>
    `;
};

// 3. HANDLE OTP SENDING
window.handleSendOTP = async () => {
    const email = document.getElementById('email-input').value;
    if(!email) return alert("Enter email");

    const otp = Math.floor(1000 + Math.random() * 9000); 
    
    // Store OTP in Firestore temporarily
    await addDoc(collection(db, "temp_otps"), {
        email: email,
        otp: otp,
        createdAt: Date.now()
    });

    alert(`XNEON SECURITY: Your OTP is ${otp}`); // For production, use an email API
    showSignupStep2(email);
};

// 4. SIGNUP FLOW - STEP 2: OTP Verify
window.showSignupStep2 = (email) => {
    mainView.innerHTML = `
        <div class="auth-container">
            <h2>Verify Email</h2>
            <p>Code sent to ${email}</p>
            <input type="number" id="otp-input" class="auth-input" placeholder="0000">
            <button class="btn-primary" onclick="verifyOTP('${email}')">VERIFY</button>
        </div>
    `;
};

// 5. SIGNUP FLOW - STEP 3: Password & Success
window.verifyOTP = (email) => {
    // In a real app, you'd check Firestore here. For now, we proceed to password.
    mainView.innerHTML = `
        <div class="auth-container">
            <h2>Set Password</h2>
            <input type="password" id="pass1" class="auth-input" placeholder="New Password">
            <input type="password" id="pass2" class="auth-input" placeholder="Confirm Password">
            <button class="btn-primary" onclick="completeSignup('${email}')">FINISH</button>
        </div>
    `;
};

window.completeSignup = async (email) => {
    const p1 = document.getElementById('pass1').value;
    const p2 = document.getElementById('pass2').value;

    if(p1 !== p2) return alert("Passwords do not match!");

    try {
        await createUserWithEmailAndPassword(auth, email, p1);
        showFinalSuccess();
    } catch (err) {
        alert(err.message);
    }
};

function showFinalSuccess() {
    mainView.innerHTML = `
        <div class="auth-container" style="text-align:center">
            <div style="font-size:100px; color:var(--neon); margin-bottom:20px;">✔</div>
            <h2 style="color:var(--neon)">Congratulations!</h2>
            <p>Your account is created</p>
            <button class="btn-primary" onclick="loadPage('home')">CONTINUE</button>
        </div>
    `;
}

// 6. RENDER HOME (Newly Launched)
function renderHome() {
    mainView.innerHTML = '<h1 class="section-title">New Launches</h1><div id="p-grid" class="grid"></div>';
    const q = query(collection(db, "products"), where("isNewLaunch", "==", true));
    onSnapshot(q, (snapshot) => {
        const grid = document.getElementById('p-grid');
        grid.innerHTML = '';
        snapshot.forEach(doc => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.images[0]}">
                    <h3>${p.name}</h3>
                    <p>$${p.price}</p>
                    <button class="btn-primary" style="padding:5px; font-size:12px">BUY NOW</button>
                </div>`;
        });
    });
}

// LOAD HOME BY DEFAULT
loadPage('home');