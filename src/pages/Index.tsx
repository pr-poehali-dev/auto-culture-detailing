import { useState } from "react";
import Icon from "@/components/ui/icon";
import Navbar from "@/components/detailing/Navbar";
import BookingModal from "@/components/detailing/BookingModal";
import PageSections from "@/components/detailing/PageSections";

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openBooking = () => {
    setBookingDone(false);
    setName("");
    setPhone("");
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      <Navbar onBooking={openBooking} />

      <PageSections onBooking={openBooking} />

      <BookingModal
        bookingOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        bookingDone={bookingDone}
        setBookingDone={setBookingDone}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
      />

      <div className="fixed bottom-6 right-6 z-40">
        <button onClick={openBooking}
          className="text-white font-semibold px-5 py-3 rounded-full shadow-2xl transition-all flex items-center gap-2 text-sm"
          style={{ background: "#E03A2F" }}>
          <Icon name="Calendar" size={16} />
          Записаться
        </button>
      </div>
    </div>
  );
}
