import { useState, useEffect } from 'react';

const ChevronDown = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
);
const Phone = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
);
const Clock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default function EnhancedOrthoHospital() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [activeDoc, setActiveDoc] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [counters, setCounters] = useState({ patients: 0, surgeries: 0, doctors: 0, years: 0 });
  const [showEmergencyWidget, setShowEmergencyWidget] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', department: '', date: '', doctor: '', message: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        patients: prev.patients < 5000 ? prev.patients + 50 : 5000,
        surgeries: prev.surgeries < 12000 ? prev.surgeries + 120 : 12000,
        doctors: prev.doctors < 45 ? prev.doctors + 1 : 45,
        years: prev.years < 20 ? prev.years + 0.5 : 20
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { title: 'Knee Replacement', icon: '🦵', desc: 'Robotic-assisted minimally invasive surgery', color: 'from-blue-400' },
    { title: 'Hip Replacement', icon: '🦴', desc: 'Advanced hip care with custom protocols', color: 'from-cyan-400' },
    { title: 'Spine Care', icon: '🩻', desc: 'Expert treatment for all spinal conditions', color: 'from-purple-400' },
    { title: 'Fracture Treatment', icon: '🚑', desc: '24/7 emergency trauma care', color: 'from-red-400' },
    { title: 'Sports Injury', icon: '⚽', desc: 'Athletic rehabilitation programs', color: 'from-green-400' },
    { title: 'Physiotherapy', icon: '💪', desc: 'Post-surgery recovery support', color: 'from-orange-400' },
  ];

  const doctors = [
    {
      name: 'Dr. D. Sridhar',
      specialty: 'Orthopaedic Surgeon',
      quals: 'D.Ortho, MS.Ortho, DNB.Ortho, Fellow.Ilizarov',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop',
      availability: 'Mon - Sun, 24 Hours',
      rating: 4.9
    },
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', condition: 'Knee Replacement', text: "Dr. Sridhar performed my knee replacement with utmost care. I'm walking normally again after just 6 weeks!", rating: 5, image: '👨‍💼' },
    { name: 'Meena Singh', condition: 'Spine Surgery', text: 'The entire team at Sri Dharson was professional and compassionate. My back pain is completely gone.', rating: 5, image: '👩‍💼' },
    { name: 'Vikram Patel', condition: 'Sports Injury', text: "I'm back to playing cricket thanks to their rehabilitation program. Highly recommend!", rating: 5, image: '👨‍🦱' },
  ];

  const faqs = [
    { q: 'How do I book an appointment?', a: 'You can book using our online form, WhatsApp, or call us at +91 87782 31048. Our team will confirm within 24 hours.' },
    { q: 'What is the recovery time after knee replacement?', a: 'Most patients return to normal activities in 6-8 weeks. Full recovery typically takes 3-6 months with proper physiotherapy.' },
    { q: 'Do you have emergency services?', a: 'Yes! We provide 24/7 emergency orthopedic care for trauma and acute injuries.' },
    { q: 'What insurance does the hospital accept?', a: 'We accept all major insurance providers including Aditya Birla, HDFC, ICICI, and others. Call us for specific details.' },
    { q: 'Can I get a second opinion?', a: 'Absolutely. We encourage second opinions. Our specialists are happy to review your case.' },
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Name is required';
    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Phone number must have at least 10 digits';
    }
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.department?.trim()) errors.department = 'Please select a department';
    if (!formData.date?.trim()) {
      errors.date = 'Please select a date';
    } else {
      const sel = new Date(formData.date); sel.setHours(0,0,0,0);
      const today = new Date(); today.setHours(0,0,0,0);
      if (sel < today) errors.date = 'Please select today or a future date';
    }
    return errors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => { const n = {...prev}; delete n[name]; return n; });
  };

  const handleFormSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setIsSubmitting(true);
    const hospitalPhoneNumber = '918778231048';
    const msg = `🏥 *NEW APPOINTMENT REQUEST* 🏥\n\n*Patient Details:*\n👤 Name: ${formData.name}\n📱 Phone: ${formData.phone}\n📧 Email: ${formData.email}\n\n*Appointment Details:*\n🏥 Department: ${formData.department}\n📅 Preferred Date: ${formData.date}\n👨‍⚕️ Preferred Doctor: ${formData.doctor || 'Any Available'}\n\n*Additional Notes:*\n${formData.message || 'No additional notes'}\n\n---\nPlease confirm this appointment with the patient as soon as possible.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${hospitalPhoneNumber}&text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      setAppointmentData({ name: formData.name, phone: formData.phone, email: formData.email, department: formData.department, date: formData.date, doctor: formData.doctor });
      setShowConfirmation(true);
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', email: '', department: '', date: '', doctor: '', message: '' });
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    const msg = `Hi SRI DHARSON HOSPITAL,\n\nI would like to book an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nDepartment: ${formData.department}\nPreferred Date: ${formData.date}\n\nPlease confirm my appointment.`;
    window.open(`https://api.whatsapp.com/send?phone=918778231048&text=${encodeURIComponent(msg)}`, '_blank');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900">
      {/* Emergency Call Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showEmergencyWidget && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-red-500 w-72">
            <p className="text-sm font-bold text-red-600 mb-2">🚨 24/7 Emergency Care</p>
            <a href="tel:+918778231048" className="block bg-red-600 text-white py-2 px-4 rounded-lg text-center font-bold hover:bg-red-700 mb-2">
              Call Now: +91 87782 31048
            </a>
            <button onClick={() => setShowEmergencyWidget(false)} className="w-full text-xs text-slate-500 hover:text-slate-700">Close</button>
          </div>
        )}
        <button onClick={() => setShowEmergencyWidget(!showEmergencyWidget)} className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all ml-auto">
          <Phone size={24} />
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Appointment Scheduled!</h2>
            <p className="text-slate-700 mb-4 font-semibold text-lg">Your appointment request has been sent to our hospital.</p>
            <p className="text-slate-600 mb-8 text-sm">Our team will contact you shortly to confirm your appointment.</p>
            <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl p-6 text-left space-y-3 mb-6 border-2 border-green-200">
              {[['Name', appointmentData?.name], ['Phone', appointmentData?.phone], ['Department', appointmentData?.department], ['Date', appointmentData?.date]].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">{label}:</span>
                  <span className={label === 'Department' ? 'text-cyan-600 font-bold' : 'text-slate-600'}>{val}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800"><strong>📱 Appointment confirmation message has been sent via WhatsApp to the hospital</strong></p>
            </div>
            <button onClick={() => setShowConfirmation(false)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all hover:scale-105">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-4 font-bold sticky top-0 z-40 shadow-lg">
        🚨 24/7 Emergency Care Available | Call: +91 87782 31048
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-12 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">🏥 SRI DHARSON HOSPITAL</h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">ORTHO HOSPITAL EXCELLENCE</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scrollToSection('services')} className="hidden sm:block px-4 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors">Services</button>
            <button onClick={() => scrollToSection('doctors')} className="hidden sm:block px-4 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors">Doctors</button>
            <button onClick={() => scrollToSection('appointment')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-black leading-tight">Advanced Orthopaedic Care</h2>
            <p className="text-xl text-slate-200">World-class orthopedic treatment with expert surgeons, cutting-edge technology, and compassionate care. Get back to life faster.</p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => scrollToSection('appointment')} className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-full font-black text-lg hover:bg-cyan-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                Schedule Appointment
              </button>
              <button onClick={() => scrollToSection('doctors')} className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-black text-lg hover:bg-cyan-400 hover:text-slate-900 transition-all">
                Meet Specialists
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop" alt="Hospital" className="rounded-3xl shadow-2xl object-cover h-96 w-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Happy Patients', value: counters.patients, icon: '👥' },
              { label: 'Successful Surgeries', value: counters.surgeries, icon: '✅' },
              { label: 'Expert Doctors', value: counters.doctors, icon: '👨‍⚕️' },
              { label: 'Years of Experience', value: Math.round(counters.years), icon: '⭐' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{stat.value.toLocaleString()}</p>
                <p className="text-slate-600 font-semibold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Our Services</h2>
            <p className="text-xl text-slate-600">Comprehensive orthopedic care for all bone and joint conditions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className={`bg-gradient-to-br ${service.color} to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer`}>
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-black mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-700 font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Our Specialists</h2>
            <p className="text-xl text-slate-600">Highly qualified and experienced orthopedic experts</p>
          </div>
          <div className="flex justify-center">
            {doctors.map((doctor, i) => (
              <div key={i} onClick={() => setActiveDoc(i)} className={`rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer max-w-sm w-full ${activeDoc === i ? 'ring-4 ring-cyan-400' : ''}`}>
                <img src={doctor.image} alt={doctor.name} className="w-full h-80 object-cover" />
                <div className="p-8 bg-gradient-to-b from-white to-slate-50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-black">{doctor.name}</h3>
                    <span className="text-yellow-500 font-black">★ {doctor.rating}</span>
                  </div>
                  <p className="text-cyan-600 font-bold mb-3">{doctor.specialty}</p>
                  <p className="text-sm text-slate-600 mb-3">📚 {doctor.quals}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-blue-50 p-3 rounded-xl">
                    <Clock size={16} /> {doctor.availability}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Patient Stories</h2>
            <p className="text-xl text-slate-600">Real experiences from our satisfied patients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-5xl">{test.image}</div>
                  <div>
                    <p className="font-bold text-lg">{test.name}</p>
                    <p className="text-sm text-slate-500">{test.condition}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, j) => <span key={j} className="text-yellow-400 text-xl">★</span>)}
                </div>
                <p className="text-slate-700 italic">"{test.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-cyan-400 transition-colors">
                <button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-colors">
                  <p className="text-lg font-bold text-left">{faq.q}</p>
                  <ChevronDown className={`transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 bg-blue-50 border-t-2 border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment */}
      <section id="appointment" className="py-24 bg-gradient-to-b from-slate-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-10 border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-black text-center mb-3">Book Your Appointment</h2>
            <p className="text-center text-slate-300 mb-10">Schedule a consultation with our expert specialists</p>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Full Name *"
                    className={`w-full p-4 rounded-2xl bg-white/10 border text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors ${formErrors.name ? 'border-red-400' : 'border-white/20'}`} />
                  {formErrors.name && <p className="text-red-300 text-sm mt-2">⚠️ {formErrors.name}</p>}
                </div>
                <div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number *"
                    className={`w-full p-4 rounded-2xl bg-white/10 border text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors ${formErrors.phone ? 'border-red-400' : 'border-white/20'}`} />
                  {formErrors.phone && <p className="text-red-300 text-sm mt-2">⚠️ {formErrors.phone}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email Address *"
                    className={`w-full p-4 rounded-2xl bg-white/10 border text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors ${formErrors.email ? 'border-red-400' : 'border-white/20'}`} />
                  {formErrors.email && <p className="text-red-300 text-sm mt-2">⚠️ {formErrors.email}</p>}
                </div>
                <div>
                  <select name="department" value={formData.department} onChange={handleFormChange}
                    className={`w-full p-4 rounded-2xl bg-white/10 border text-white focus:outline-none focus:border-cyan-400 transition-colors ${formErrors.department ? 'border-red-400' : 'border-white/20'}`}>
                    <option value="" className="bg-slate-900">Select Department *</option>
                    {['Knee Replacement','Hip Replacement','Spine Care','Fracture Treatment','Sports Injury'].map(d => (
                      <option key={d} value={d} className="bg-slate-900">{d}</option>
                    ))}
                  </select>
                  {formErrors.department && <p className="text-red-300 text-sm mt-2">⚠️ {formErrors.department}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange}
                    className={`w-full p-4 rounded-2xl bg-white/10 border text-white focus:outline-none focus:border-cyan-400 transition-colors ${formErrors.date ? 'border-red-400' : 'border-white/20'}`} />
                  {formErrors.date && <p className="text-red-300 text-sm mt-2">⚠️ {formErrors.date}</p>}
                </div>
                <select name="doctor" value={formData.doctor} onChange={handleFormChange}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                  <option value="" className="bg-slate-900">Select Doctor (Optional)</option>
                  {doctors.map((doc, i) => <option key={i} value={doc.name} className="bg-slate-900">{doc.name}</option>)}
                </select>
              </div>
              <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Describe your condition or medical history..." rows="4"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors" />
              <div className="flex flex-col gap-3">
                <button type="button" onClick={handleFormSubmit} disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? '⏳ Processing...' : '✅ Confirm Appointment'}
                </button>
                <button type="button" onClick={handleWhatsAppDirect}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-95">
                  💬 Book via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">📍 Location</h3>
              <a href="https://maps.app.goo.gl/8bDWSszrfBM7e1mK8?g_st=aw" target="_blank" rel="noopener noreferrer"
                className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 block bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 p-8 transition-all hover:shadow-xl">
                <div className="text-6xl mb-4">📍</div>
                <h4 className="text-2xl font-black text-white mb-2">SRI DHARSON HOSPITAL</h4>
                <p className="text-white/90 mb-4">Namakkal, Tamil Nadu, India</p>
                <span className="inline-block bg-white text-cyan-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">Open in Google Maps</span>
              </a>
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">📞 Contact Info</h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-slate-400 text-sm mb-2 font-semibold">Hospital Name</p>
                  <h4 className="text-2xl font-black">SRI DHARSON HOSPITAL</h4>
                </div>
                <a href="tel:+918778231048" className="block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl p-6 transition-all hover:shadow-lg">
                  <p className="text-white/80 text-sm mb-2 font-semibold">Emergency & Appointments</p>
                  <p className="text-3xl font-black">+91 87782 31048</p>
                </a>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-slate-400 text-sm mb-2 font-semibold">📍 Location</p>
                  <p className="text-lg font-semibold">Namakkal, Tamil Nadu, India</p>
                </div>
                <a href="mailto:sridharsonhospital@gmail.com" className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <p className="text-slate-400 text-sm mb-2 font-semibold">📧 Email Us</p>
                  <p className="text-lg font-bold text-cyan-300">sridharsonhospital@gmail.com</p>
                </a>
                <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6">
                  <p className="text-slate-300 text-sm mb-2 font-semibold">🚨 Emergency Support</p>
                  <p className="text-2xl font-black text-red-300">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
            <p className="mb-2">© 2026 SRI DHARSON HOSPITAL. All Rights Reserved.</p>
            <p className="text-xs">🏥 Ortho Hospital | Trusted by 5000+ Patients</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
