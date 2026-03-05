# 🚨 RapidRescue – Real-Time Emergency Help Platform

RapidRescue is a **real-time emergency assistance platform** designed to help people quickly request help and connect with nearby volunteers during emergencies.

The platform allows users to send an emergency alert with their **live location**, and nearby volunteers can respond instantly through a **real-time notification system**.

This project demonstrates modern full-stack development using **real-time technologies, geolocation services, and modern web frameworks**.

---

## 🛠 Technology Stack

- **Frontend:** Next.js (React framework), Tailwind CSS  
- **Backend & Database:** Supabase (PostgreSQL, authentication, storage)  
- **Real-Time Communication:** Supabase Realtime / WebSockets  
- **Maps & Location:** OpenStreetMap, Leaflet  
- **Deployment:** Vercel  
- **Others:** Browser Geolocation API for capturing user location

---

## 🌍 Problem Statement

In many regions, people struggle to get immediate help during emergencies such as:

- Medical emergencies
- Accidents
- Security threats
- Natural disasters

Traditional emergency systems are often:

- Slow
- Overloaded
- Unavailable in rural areas

RapidRescue aims to create a **community-powered emergency response system** where nearby volunteers can quickly respond to help requests.

---

## 🎯 Project Goals

The goal of this project is to build a platform that:

- Allows users to **send emergency alerts instantly**
- Shares the **user's real-time location**
- Notifies **nearby volunteers immediately**
- Provides **live communication between users and helpers**
- Displays emergencies on a **live map**

---

## 🧠 Key Features

### 🚨 Emergency Alert System
Users can press a **panic button** to instantly send an emergency alert containing:

- User ID
- Timestamp
- Location coordinates
- Emergency message

---

### 📍 Live Location Sharing
The system captures the user's **GPS location** using the browser's geolocation API.

Example:

```javascript
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
});
