import React, { useEffect, useState } from "react";

const LinktreePage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Tambahkan animasi masuk saat halaman dibuka
    setTimeout(() => setAnimate(true), 500);
  }, []);

  const links = [
    { title: "Instagram", url: "https://instagram.com/pro.fajar_/", icon: "📸" },
    { title: "Linkedin", url: "https://www.linkedin.com/in/muhammad-fajar-sholehuddin-maulana-putra-b901572a1/", icon: "📖" },
    { title: "GitHub", url: "https://github.com/sholehuddinn", icon: "💻" },
    { title: "Facebook", url: "https://www.facebook.com/profile.php?id=100048192135710", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Foto Profil */}
      <div
        className={`transform transition duration-700 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="avatar mb-5 d-flex">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://th.bing.com/th/id/OIP.zJ1pB1J-UuEOQ4lq0aqwrgHaFd?rs=1&pid=ImgDetMain" // Ganti dengan URL foto Anda
              alt="Profile"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Muhammad Fajar Sholehuddin Maulana Putra</h1>
        <p className="text-center mt-2 text-gray-200">Mahasiswa Teknik Informatika Universitas Dr. Soetomo</p>
      </div>

      {/* Deskripsi Animasi Masuk */}
      <div
        className={`text-center mb-10 transform transition duration-700 ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <p className="text-lg mt-2">
          "Temukan semua tautan penting saya di bawah ini!"
        </p>
      </div>

      {/* Link Buttons */}
      <div className="w-full max-w-md">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-block mb-4 text-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
          >
            <span>{link.icon}</span>
            <span>{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinktreePage;
