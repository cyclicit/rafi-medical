import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
  });
  const [token, setToken] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const doctors = [
    { 
      id: 1, 
      name: 'ডাঃ রফিকুল ইসলাম', 
      specialty: 'মেডিসিন বিশেষজ্ঞ', 
      available: ['সকাল ৯টা-১২টা', 'বিকাল ৪টা-৮টা'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxmIXJ75EdZ8IQfPjXH1OWbsnYvpulJrbkrjmqyGh73H6MYa7QxtvQX8QfE5XRySV-SiQ&usqp=CAU'
    },
    { 
      id: 2, 
      name: 'ডাঃ শারমিন আক্তার', 
      specialty: 'গাইনি বিশেষজ্ঞ', 
      available: ['সকাল ১০টা-১টা'],
      image: 'https://img.freepik.com/premium-photo/young-female-bengali-doctor-smiling-portrait-photo_652053-19.jpg?w=360'
    },
    { 
      id: 3, 
      name: 'ডাঃ আব্দুল হালিম', 
      specialty: 'শিশু বিশেষজ্ঞ', 
      available: ['বিকাল ৩টা-৯টা'],
      image: 'https://img.freepik.com/premium-photo/indian-doctor-portrait_714173-116.jpg'
    },
    { 
      id: 4, 
      name: 'ডাঃ নাজমুল হক', 
      specialty: 'অর্থোপেডিক সার্জন', 
      available: ['সকাল ৮টা-১১টা', 'বিকাল ৫টা-৮টা'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KOnDS0sB-mitfKtPmMRPj77XHGbWBKDrUxVm05_PjDm5ipv0Ndab0Cf4QnHQ2iwm8Vw&usqp=CAU'
    },
  ];

  const medicalEquipment = [
    'https://i.ibb.co/nq7KQypH/medical-e1.jpg',
    'https://i.ibb.co/GvDDZ2h6/medical-e2.jpg',
    'https://i.ibb.co/WRP8rG4/medical-e3.jpg',
    'https://i.ibb.co/PGB1f1XS/medical-e4.jpg'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newToken = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      ...bookingData,
      token: newToken,
      doctorName: doctors.find(doc => doc.id === parseInt(bookingData.doctor))?.name || '',
    };
    setToken(newToken);
    setBookings([...bookings, newBooking]);
    setBookingData({
      name: '',
      phone: '',
      doctor: '',
      date: '',
      time: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToken = () => {
    setToken(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);
   

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="App">
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo-container" onClick={() => setActiveTab('home')}>
            <div className="logo">
              <div className="logo-icon">
                <div className="medical-symbol">+</div>
              </div>
              <div className="logo-text">
                <h1>রাফি মেডিকেল সেন্টার</h1>
                <p className="tagline">লালমনিরহাটের বিশ্বস্ত স্বাস্থ্য সেবা</p>
              </div>
            </div>
          </div>

          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li className={activeTab === 'home' ? 'active' : ''} onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}>
                হোম
              </li>
              <li className={activeTab === 'services' ? 'active' : ''} onClick={() => { setActiveTab('services'); setIsMenuOpen(false); }}>
                সেবাসমূহ
              </li>
              <li className={activeTab === 'doctors' ? 'active' : ''} onClick={() => { setActiveTab('doctors'); setIsMenuOpen(false); }}>
                ডাক্তারবৃন্দ
              </li>
              <li className={activeTab === 'booking' ? 'active' : ''} onClick={() => { setActiveTab('booking'); setIsMenuOpen(false); }}>
                বুকিং
              </li>
              <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => { setActiveTab('contact'); setIsMenuOpen(false); }}>
                যোগাযোগ
              </li>
            </ul>
           
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {activeTab === 'home' && (
            <>
              <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <div className="hero-text">
                    <h2>আপনার স্বাস্থ্য আমাদের অগ্রাধিকার</h2>
                    <p>আধুনিক প্রযুক্তি ও অভিজ্ঞ ডাক্তারদের মাধ্যমে সর্বোচ্চ মানের চিকিৎসা সেবা</p>
                    <div className="hero-buttons">
                      <button className="btn-small" onClick={() => setActiveTab('booking')}>
                        এপয়েন্টমেন্ট বুক করুন
                      </button>
                      <button className="btn-small" onClick={() => setActiveTab('doctors')}>
                        আমাদের ডাক্তারবৃন্দ
                      </button>
                    </div>
                  </div>
                  <div className="hero-image">
                    <img src="https://i.ibb.co/MDcwhtb4/rafi-medical.jpg" alt="Doctor" />
                  </div>
                </div>
              </section>

              <section className="doctors-preview">
                <div className="section-header">
                  <h2 className="section-title">আমাদের বিশেষজ্ঞ ডাক্তারবৃন্দ</h2>
                  <p className="section-subtitle">অভিজ্ঞ ডাক্তারদের সাথে আপনার চিকিৎসা</p>
                </div>
                <div className="doctors-slider">
                  {doctors.slice(0, 3).map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>
                      <div className="doctor-image">
                        <img src={doctor.image} alt={doctor.name} />
                      </div>
                      <div className="doctor-info">
                        <h3>{doctor.name}</h3>
                        <p className="specialty">{doctor.specialty}</p>
                        <button 
                          className="btn-small"
                          onClick={() => {
                            setActiveTab('doctors');
                          }}
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="view-all">
                  <button className="btn-secondary" onClick={() => setActiveTab('doctors')}>
                    সব ডাক্তার দেখুন →
                  </button>
                </div>
              </section>


               <section className="equipment-section">
                <div className="section-header">
                  <h2 className="section-title">আমাদের মেডিকেল যন্ত্রপাতি</h2>
                  <p className="section-subtitle">সর্বাধুনিক চিকিৎসা সরঞ্জাম</p>
                </div>
                <div className="equipment-grid">
                  {medicalEquipment.map((equip, index) => (
                    <div className="equipment-card" key={index}>
                      <div className="equipment-image">
                        <img src={equip} alt={`Medical Equipment ${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="cta-section">
                <div className="cta-content">
                  <h2>আজই আপনার অ্যাপয়েন্টমেন্ট বুক করুন</h2>
                  <p>সর্বোচ্চ মানের চিকিৎসা সেবা পেতে এখনই বুকিং করুন</p>
                  <button className="btn-small" onClick={() => setActiveTab('booking')}>
                    বুকিং করুন
                  </button>
                </div>
              </section>

              <section className="features-section">
                <div className="section-header">
                  <h2 className="section-title">আমাদের বিশেষ সুবিধাসমূহ</h2>
                  <p className="section-subtitle">আমরা যা অফার করি</p>
                </div>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <div className="feature-symbol">L</div>
                    </div>
                    <h3>আধুনিক ল্যাব</h3>
                    <p>সর্বাধুনিক প্রযুক্তির প্যাথলজি ল্যাবরেটরি</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <div className="feature-symbol">D</div>
                    </div>
                    <h3>অভিজ্ঞ ডাক্তার</h3>
                    <p>বিভিন্ন বিশেষজ্ঞের অভিজ্ঞ ডাক্তারগণ</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <div className="feature-symbol">E</div>
                    </div>
                    <h3>২৪/৭ এমার্জেন্সি</h3>
                    <p>জরুরী চিকিৎসা সেবা ও অ্যাম্বুলেন্স</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <div className="feature-symbol">M</div>
                    </div>
                    <h3>আধুনিক যন্ত্রপাতি</h3>
                    <p>সর্বাধুনিক চিকিৎসা সরঞ্জাম</p>
                  </div>
                </div>
              </section>

              

             
            </>
          )}

          {activeTab === 'services' && (
            <section className="services-section">
              <div className="section-header">
                <h2 className="section-title">আমাদের সেবাসমূহ</h2>
                <p className="section-subtitle">আমরা যে সকল সেবা প্রদান করি</p>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon">
                    <div className="service-symbol">P</div>
                  </div>
                  <h3>প্যাথলজি টেস্ট</h3>
                  <p>সব ধরনের রক্ত পরীক্ষা, ইউরিন টেস্ট, এক্স-রে, আল্ট্রাসনোগ্রাফি ইত্যাদি</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <div className="service-symbol">E</div>
                  </div>
                  <h3>ইসিজি</h3>
                  <p>হৃদরোগ নির্ণয়ের জন্য ইসিজি পরীক্ষা</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <div className="service-symbol">V</div>
                  </div>
                  <h3>টিকা প্রদান</h3>
                  <p>সব ধরনের ভ্যাকসিন ও ইমিউনাইজেশন সেবা</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <div className="service-symbol">A</div>
                  </div>
                  <h3>২৪/৭ এমার্জেন্সি</h3>
                  <p>জরুরী চিকিৎসা সেবা ও অ্যাম্বুলেন্স সুবিধা</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <div className="service-symbol">F</div>
                  </div>
                  <h3>ফার্মেসি সেবা</h3>
                  <p>সকল ধরনের ঔষধের প্রাপ্যতা</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <div className="service-symbol">H</div>
                  </div>
                  <h3>ইনডোর সেবা</h3>
                  <p>আধুনিক সুবিধা সম্বলিত হাসপাতাল সেবা</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'doctors' && (
            <section className="doctors-section">
              <div className="section-header">
                <h2 className="section-title">আমাদের বিশেষজ্ঞ ডাক্তারবৃন্দ</h2>
                <p className="section-subtitle">অভিজ্ঞ ডাক্তারদের সাথে আপনার চিকিৎসা</p>
              </div>
              <div className="doctors-grid">
                {doctors.map((doctor) => (
                  <div className="doctor-card" key={doctor.id}>
                    <div className="doctor-image">
                      <img src={doctor.image} alt={doctor.name} />
                    </div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialty">{doctor.specialty}</p>
                      <div className="availability">
                        <h4>সাক্ষাতের সময়:</h4>
                        <ul>
                          {doctor.available.map((time, index) => (
                            <li key={index}>⌚ {time}</li>
                          ))}
                        </ul>
                      </div>
                      <button 
                        className="btn-primary"
                        onClick={() => {
                          setActiveTab('booking');
                          setBookingData(prev => ({...prev, doctor: doctor.id}));
                        }}
                      >
                        বুকিং করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'booking' && (
            <section className="booking-section">
              <div className="section-header">
                <h2 className="section-title">ডাক্তার এপয়েন্টমেন্ট বুকিং</h2>
                <p className="section-subtitle">সহজেই অনলাইনে বুকিং করুন</p>
              </div>
              
              {token ? (
                <div className="booking-confirmation">
                  <div className="confirmation-card">
                    <div className="confirmation-icon success">
                      ✓
                    </div>
                    <h3>আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে!</h3>
                    <div className="confirmation-details">
                      <p><strong>টোকেন নম্বর:</strong> <span className="token">{token}</span></p>
                      <p><strong>ডাক্তারের নাম:</strong> {bookings.find(b => b.token === token)?.doctorName}</p>
                      <p><strong>তারিখ:</strong> {bookings.find(b => b.token === token)?.date}</p>
                      <p><strong>সময়:</strong> {bookings.find(b => b.token === token)?.time}</p>
                      <p className="note">অনুগ্রহ করে এই নম্বরটি সংরক্ষণ করুন এবং নির্ধারিত সময়ে ক্লিনিকে উপস্থিত হন।</p>
                    </div>
                    <div className="confirmation-actions">
                      <button className="btn-primary" onClick={resetToken}>
                        নতুন বুকিং করুন
                      </button>
                      <button className="btn-secondary" onClick={() => window.print()}>
                        প্রিন্ট করুন
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="booking-form-container">
                  <form onSubmit={handleBookingSubmit} className="booking-form">
                    <div className="form-group">
                      <label htmlFor="name">আপনার নাম</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">মোবাইল নম্বর</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="০১XXXXXXXXX"
                        pattern="[0-9]{11}"
                        title="11 digit mobile number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="doctor">ডাক্তার নির্বাচন করুন</label>
                      <select
                        id="doctor"
                        name="doctor"
                        value={bookingData.doctor}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- ডাক্তার নির্বাচন করুন --</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="date">তারিখ</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="time">সময়</label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={bookingData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary">
                      বুকিং কনফার্ম করুন
                    </button>
                  </form>
                  <div className="booking-info">
                    <h3>বুকিং সম্পর্কিত তথ্য</h3>
                    <ul>
                      <li>✓ অনলাইনে সহজেই বুকিং করুন</li>
                      <li>✓ নির্ধারিত সময়ে উপস্থিত হন</li>
                      <li>✓ টোকেন নম্বর সংরক্ষণ করুন</li>
                      <li>✓ জরুরী প্রয়োজনে কল করুন ০১৭৯৮-৯৮০৯৩৮</li>
                    </ul>
                    <div className="booking-note">
                      <h4>নোট:</h4>
                      <p>বুকিং কনফার্ম করার পর আপনাকে একটি টোকেন নম্বর প্রদান করা হবে। অনুগ্রহ করে এই নম্বরটি সংরক্ষণ করুন এবং ডাক্তারের চেম্বারে উপস্থিত হওয়ার সময় এটি সঙ্গে আনুন।</p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === 'contact' && (
            <section className="contact-section">
              <div className="section-header">
                <h2 className="section-title">যোগাযোগ করুন</h2>
                <p className="section-subtitle">আমরা আপনার সেবায় সর্বদা প্রস্তুত</p>
              </div>
              <div className="contact-container">
                <div className="contact-info">
                  <div className="contact-card">
                    <div className="contact-icon">
                      📍
                    </div>
                    <h3>ঠিকানা</h3>
                    <p>মিশন মোড়, লালমনিরহাট</p>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">
                      📞
                    </div>
                    <h3>ফোন নম্বর</h3>
                    <p>০১৭৯৮-৯৮০৯৩৮</p>
                    <p>০১৭৯৬-০০৬১৩৪</p>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">
                      ✉️
                    </div>
                    <h3>ইমেইল</h3>
                    <p>info@rafimedical.com</p>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">
                      🕒
                    </div>
                    <h3>খোলার সময়</h3>
                    <p>সকাল ৮টা - রাত ১০টা</p>
                    <p>(প্রতিদিন)</p>
                  </div>
                </div>
                <div className="contact-form-container">
                  <form className="contact-form">
                    <h3>আমাদেরকে বার্তা পাঠান</h3>
                    <div className="form-group">
                      <input type="text" placeholder="আপনার নাম" required />
                    </div>
                    <div className="form-group">
                      <input type="email" placeholder="আপনার ইমেইল" required />
                    </div>
                    <div className="form-group">
                      <input type="tel" placeholder="আপনার ফোন নম্বর" required />
                    </div>
                    <div className="form-group">
                      <textarea placeholder="আপনার বার্তা" rows="4" required></textarea>
                    </div>
                    <button type="submit" className="btn-primary">
                      বার্তা পাঠান
                    </button>
                  </form>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo" onClick={() => setActiveTab('home')}>
                <div className="footer-medical-symbol">+</div>
                <h3>রাফি মেডিকেল সেন্টার</h3>
              </div>
              <p>লালমনিরহাটের অন্যতম সেরা ডায়াগনস্টিক সেন্টার ও চিকিৎসা সেবা প্রদানকারী প্রতিষ্ঠান।</p>
              <div className="footer-social">
                <a href="#">FB</a>
                <a href="#">YT</a>
                <a href="#">WA</a>
              </div>
            </div>
            <div className="footer-links">
              <h3>দ্রুত লিংক</h3>
              <ul>
                <li onClick={() => setActiveTab('home')}>→ হোম</li>
                <li onClick={() => setActiveTab('services')}>→ সেবাসমূহ</li>
                <li onClick={() => setActiveTab('doctors')}>→ ডাক্তারবৃন্দ</li>
                <li onClick={() => setActiveTab('booking')}>→ বুকিং</li>
                <li onClick={() => setActiveTab('contact')}>→ যোগাযোগ</li>
              </ul>
            </div>
            <div className="footer-services">
              <h3>আমাদের সেবা</h3>
              <ul>
                <li>→ প্যাথলজি টেস্ট</li>
                <li>→ ইসিজি</li>
                <li>→ টিকা প্রদান</li>
                <li>→ জরুরী সেবা</li>
                <li>→ ফার্মেসি</li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>যোগাযোগ</h3>
              <p>📍 মিশন মোড়, লালমনিরহাট</p>
              <p>📞 ০১৭৯৮-৯৮০৯৩৮</p>
              <p>✉️ info@rafimedical.com</p>
              <p>🕒 সকাল ৮টা - রাত ১০টা</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} রাফি মেডিকেল সেন্টার. সকল স্বত্ব সংরক্ষিত.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;