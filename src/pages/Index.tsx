import { useState } from "react";
import Icon from "@/components/ui/icon";
import Navbar from "@/components/detailing/Navbar";
import BookingModal from "@/components/detailing/BookingModal";
import PageSections from "@/components/detailing/PageSections";

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDone, setBookingDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openBooking = (service = "") => {
    setSelectedService(service);
    setBookingStep(1);
    setBookingDone(false);
    setName("");
    setPhone("");
    setSelectedDate("");
    setSelectedTime("");
    setBookingOpen(true);
  };

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      <Navbar onBooking={() => openBooking()} />

      <PageSections onBooking={openBooking} />

      <BookingModal
        bookingOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        bookingStep={bookingStep}
        setBookingStep={setBookingStep}
        bookingDone={bookingDone}
        setBookingDone={setBookingDone}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        dates={dates}
      />

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <button onClick={() => openBooking()}
          className="text-white font-semibold px-5 py-3 rounded-full shadow-2xl transition-all flex items-center gap-2 text-sm"
          style={{ background: "#E03A2F" }}>
          <Icon name="Calendar" size={16} />
          Записаться
        </button>
      </div>
    </div>
  );
}
