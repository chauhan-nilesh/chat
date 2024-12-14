import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function BottomNavbar() {
    return (
        <div data-theme="light" className="btm-nav lg:hidden bottom-0">
            <NavLink data-theme="light" to="/chat" className={({ isActive }) => `${isActive ? "active text-black-600 font-bold" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="home">
                    <path fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023" transform="translate(2.5 2)"></path>
                </svg>
                <span className="btm-nav-label text-xs lg:text-sm">Home</span>
            </NavLink>
            <NavLink data-theme="light" to="track" className={({ isActive }) => `${isActive ? "active text-black-600 font-bold" : ""}`}>
                <svg width="25px" height="28px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.69 122.88"><path d="M31.54,86.92c-1.74,0-3.15-1.41-3.15-3.15c0-1.74,1.41-3.15,3.15-3.15H55c1.74,0,3.15,1.41,3.15,3.15 c0,1.74-1.41,3.15-3.15,3.15H31.54L31.54,86.92z M31.54,42.27c-1.74,0-3.15-1.41-3.15-3.15c0-1.74,1.41-3.15,3.15-3.15h41.61 c1.74,0,3.15,1.41,3.15,3.15c0,1.74-1.41,3.15-3.15,3.15H31.54L31.54,42.27z M7.33,0h90.02c2.02,0,3.85,0.82,5.18,2.15 c1.33,1.33,2.15,3.16,2.15,5.18v108.21c0,2.02-0.82,3.85-2.15,5.18c-1.33,1.33-3.16,2.15-5.18,2.15H7.33 c-2.02,0-3.85-0.82-5.18-2.15C0.82,119.4,0,117.57,0,115.55V7.33c0-2.02,0.82-3.85,2.15-5.18C3.48,0.82,5.31,0,7.33,0L7.33,0z M97.36,6.3H7.33c-0.28,0-0.54,0.12-0.73,0.3C6.42,6.8,6.3,7.05,6.3,7.33v108.21c0,0.28,0.12,0.54,0.31,0.72 c0.19,0.19,0.45,0.31,0.73,0.31h90.02c0.28,0,0.54-0.12,0.72-0.31c0.19-0.19,0.31-0.45,0.31-0.72V7.33c0-0.28-0.12-0.54-0.31-0.73 C97.89,6.42,97.64,6.3,97.36,6.3L97.36,6.3z M31.54,64.59c-1.74,0-3.15-1.41-3.15-3.15c0-1.74,1.41-3.15,3.15-3.15h41.61 c1.74,0,3.15,1.41,3.15,3.15c0,1.74-1.41,3.15-3.15,3.15H31.54L31.54,64.59z" /></svg>
                <span className="btm-nav-label text-xs lg:text-sm">Track</span>
            </NavLink>
            <NavLink data-theme="light" to="account" className={({ isActive }) => `${isActive ? "active text-black-600 font-bold" : ""}`}>
                <svg width="25px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="style=linear">
                        <g id="profile">
                            <path id="vector" d="M12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path id="rec" d="M5 18.5714C5 16.0467 7.0467 14 9.57143 14H14.4286C16.9533 14 19 16.0467 19 18.5714C19 20.465 17.465 22 15.5714 22H8.42857C6.53502 22 5 20.465 5 18.5714Z" stroke="#000000" stroke-width="1.5" />
                        </g>
                    </g>
                </svg>
                <span className="btm-nav-label text-xs lg:text-sm">Account</span>
            </NavLink>

        </div>
    )
}

export default BottomNavbar