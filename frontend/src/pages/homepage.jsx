// src/pages/homePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="flex flex-col min-h-screen">
    {/* Header */}
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold tracking-wide">
          Automated Timetable & Attendance
        </h1>
        <nav className="space-x-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <main className="flex-grow flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">
          Streamline Your Academic Workflow
        </h2>
        <p className="mb-8 text-gray-600 max-w-xl mx-auto">
          Manage schedules, track attendance, and coordinate faculty in one intuitive dashboard.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-800 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-700 border border-blue-700 rounded-md hover:bg-violet-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>

    {/* Features Section */}
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 grid gap-8 md:grid-cols-3 text-center">
        {[
          {
            title: "Smart Scheduling",
            description: "Generate clash-free timetables with a click.",
          },
          {
            title: "Real-time Attendance",
            description: "Record and monitor attendance from any device.",
          },
          {
            title: "Analytics & Reports",
            description: "Gain insights through automated reports.",
          },
        ].map(({ title, description }) => (
          <div
            key={title}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-100 text-center py-4 text-gray-600 text-sm">
      © {new Date().getFullYear()} Automated Timetable & Attendance
    </footer>
  </div>
);

export default HomePage;
