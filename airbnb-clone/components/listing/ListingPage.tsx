"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { listing } from "@/data/listing";

const sections = ["Photos", "Amenities", "Reviews", "Location"];

function scrollToSection(section: string) {
  document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

export default function ListingPage() {
  const [showAmenities, setShowAmenities] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncFromHistory = () => setSelectedImage(new URLSearchParams(window.location.search).get("photo"));
    syncFromHistory();
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") window.history.back();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const currentIndex = listing.images.findIndex((image) => image.id === selectedImage);
        const nextIndex = event.key === "ArrowRight" ? (currentIndex + 1) % listing.images.length : (currentIndex - 1 + listing.images.length) % listing.images.length;
        window.history.replaceState({}, "", `?photo=${listing.images[nextIndex].id}`);
        setSelectedImage(listing.images[nextIndex].id);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [selectedImage]);

  function openLightbox(imageId: string) {
    window.history.pushState({}, "", `?photo=${imageId}`);
    setSelectedImage(imageId);
  }

  return (
    <main>
      <div className="listing-shell">
        <header className="listing-header">
          <div><h1>{listing.title}</h1><p>{listing.subtitle}</p></div>
          <div className="header-actions" aria-label="Listing actions"><button type="button" className="text-action">↗ <span>Share</span></button><button type="button" className="text-action">♡ <span>Save</span></button></div>
        </header>
        <section id="photos" className="hero-gallery" aria-label="Property photos">
          {listing.images.map((image, index) => <button className={`gallery-tile gallery-tile-${index + 1}`} key={image.id} type="button" aria-label={`Open ${image.alt}`} onClick={() => openLightbox(image.id)} style={{ backgroundImage: `url(${image.src})` }} />)}
          <a className="show-all-photos" href="/photos">▧ Show all photos</a>
        </section>
      </div>

      <nav className="section-nav" aria-label="Listing sections"><div className="section-nav-inner"><div className="section-links">{sections.map((section) => <button key={section} type="button" onClick={() => scrollToSection(section)}>{section}</button>)}</div><div className="nav-booking"><span><strong>{listing.price}</strong> for {listing.nights} nights<br /><small>★ {listing.rating} · {listing.reviews} reviews</small></span><button type="button" className="pink-button compact">Reserve</button></div></div></nav>

      <div className="listing-shell detail-layout">
        <div className="listing-content">
          <section className="intro-section"><div><h2>{listing.title}</h2><p>{listing.location}</p></div><div className="rating-summary"><strong>★ {listing.rating}</strong> · {listing.reviews} reviews</div></section>
          <section className="host-summary"><div className="host-avatar">M</div><div><strong>Hosted by Mirashya Homes</strong><p>2 years hosting · Guest favourite</p></div></section>
          <section className="description-section"><h2>About this place</h2><p>Enjoy a peaceful stay in the heart of Candolim, with a private jacuzzi, a comfortable living room, and easy access to beaches, cafés, and popular attractions.</p><button type="button" className="underlined-action">Show more <span>›</span></button></section>
          <section id="amenities" className="amenities-section"><h2>What this place offers</h2><div className="amenity-grid">{listing.amenities.map((amenity) => <div className={`amenity ${amenity.unavailable ? "unavailable" : ""}`} key={amenity.label}><span className="amenity-icon" aria-hidden="true">{amenity.icon}</span><span>{amenity.label}</span></div>)}</div><button type="button" className="outline-button" onClick={() => setShowAmenities(true)}>Show all 50 amenities</button></section>
          <section className="calendar-section"><h2>5 nights in Candolim</h2><p>{listing.dates}</p><div className="calendar-grid"><CalendarMonth month="October 2026" start={1} /><CalendarMonth month="November 2026" start={0} /></div></section>
          <section id="reviews" className="reviews-section"><div className="review-score"><strong>4.95</strong><span>★</span><h2>Guest favourite</h2><p>This home is a guest favourite based on ratings, reviews and reliability.</p></div><div className="review-cards"><ReviewCard name="Amit" copy="Very helpful and responsive team. Safe and peaceful stay, loved everything about the property." /><ReviewCard name="Aheesh" copy="We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos." /></div></section>
          <section id="location" className="location-section"><h2>Where you&apos;ll be</h2><p>{listing.location}</p><div className="map-placeholder"><span className="map-marker">⌂</span><button type="button" aria-label="Zoom in">+</button><button type="button" aria-label="Zoom out">−</button></div><small>Exact location will be provided after booking.</small><h3>Neighbourhood highlights</h3><p>Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p><button type="button" className="underlined-action">Show more <span>›</span></button></section>
        </div>
        <aside className="reservation-column"><div className="offer-banner"><span aria-hidden="true">◆</span><span>Get 10% off your next stay.<br /><u>Terms apply</u></span><button type="button">Claim</button></div><div className="reservation-card"><div className="price-line"><strong>{listing.price}</strong> for {listing.nights} nights</div><div className="date-fields"><label>CHECK-IN <strong>10/18/2026</strong></label><label>CHECKOUT <strong>10/23/2026</strong></label><label className="guest-field">GUESTS <strong>2 guests</strong><span>⌄</span></label></div><div className="cancellation">Free cancellation before <strong>17 October</strong></div><button type="button" className="pink-button reserve-button">Reserve</button><p className="charge-note">You won&apos;t be charged yet</p></div><button type="button" className="report-action">⚑ Report this listing</button></aside>
      </div>
      {showAmenities && <AmenitiesModal onClose={() => setShowAmenities(false)} />}
      {selectedImage && <Lightbox imageId={selectedImage} closeButtonRef={closeButtonRef} onClose={() => window.history.back()} />}
    </main>
  );
}

function CalendarMonth({ month, start }: { month: string; start: number }) { const days = Array.from({ length: 35 }, (_, index) => index - start + 1); return <div className="calendar-month"><h3>{month}</h3><div className="weekday-row">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div><div className="day-grid">{days.map((day, index) => <span className={day === 18 || day === 23 ? "selected-day" : day < 1 ? "empty-day" : ""} key={`${month}-${index}`}>{day > 0 && day <= 31 ? day : ""}</span>)}</div></div>; }
function ReviewCard({ name, copy }: { name: string; copy: string }) { return <article className="review-card"><div className="review-avatar">{name[0]}</div><strong>{name}</strong><small>★★★★★ · 1 week ago</small><p>{copy}</p><button type="button" className="underlined-action">Show more</button></article>; }
function AmenitiesModal({ onClose }: { onClose: () => void }) { const groups = [{ title: "Bathroom", items: ["Hairdryer", "Cleaning products", "Shampoo", "Hot water", "Shower gel"] }, { title: "Bedroom and laundry", items: ["Washing machine", "Hangers", "Bed linen", "Room-darkening blinds", "Iron"] }, { title: "Entertainment", items: ["TV"] }, { title: "Parking and facilities", items: ["Free parking on premises", "Pool", "Hot tub", "Gym"] }, { title: "Services", items: ["Pets allowed", "Cleaning available during stay", "Long-term stays allowed", "Self check-in"] }]; return <div className="modal-backdrop" role="presentation" onClick={onClose}><section className="amenities-modal" role="dialog" aria-modal="true" aria-labelledby="amenities-title" onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={onClose} aria-label="Close amenities">×</button><h2 id="amenities-title">What this place offers</h2>{groups.map((group) => <div className="amenity-group" key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <div className="modal-amenity" key={item}><span aria-hidden="true">◇</span>{item}</div>)}</div>)}</section></div>; }

function Lightbox({ imageId, closeButtonRef, onClose }: { imageId: string; closeButtonRef: React.RefObject<HTMLButtonElement | null>; onClose: () => void }) {
  const image = listing.images.find((candidate) => candidate.id === imageId) ?? listing.images[0];
  return <div className="lightbox-backdrop" role="presentation" onClick={onClose}><section className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(event) => event.stopPropagation()}><button type="button" className="lightbox-close" ref={closeButtonRef} onClick={onClose} aria-label="Close photo viewer">×</button><Image src={image.src} alt={image.alt} width={1400} height={900} unoptimized /><p>{image.section}</p></section></div>;
}