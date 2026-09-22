export type ListingImage = {
  id: string;
  src: string;
  alt: string;
  section: string;
};

export type Amenity = {
  label: string;
  icon: string;
  unavailable?: boolean;
};

export const listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Serviced apartments for Rent in Candolim, Goa, India",
  location: "Candolim, Goa, India",
  rating: "4.95",
  reviews: 19,
  price: "₹28,499",
  nights: 5,
  dates: "18 Oct 2026 - 23 Oct 2026",
  images: [
    { id: "living-room", src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", alt: "Warm living room with a sofa and dining area", section: "Living room 1" },
    { id: "lounge", src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85", alt: "Seating area with a coffee table", section: "Living room 2" },
    { id: "kitchen", src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85", alt: "Bright modern kitchen", section: "Full kitchen" },
    { id: "bedroom", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85", alt: "Bedroom with natural light", section: "Bedroom" },
    { id: "bathroom", src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85", alt: "Clean tiled bathroom", section: "Full bathroom" },
  ] satisfies ListingImage[],
  amenities: [
    { label: "Kitchen", icon: "⌁" }, { label: "Wifi", icon: "◌" },
    { label: "Dedicated workspace", icon: "▣" }, { label: "Free parking on premises", icon: "▱" },
    { label: "Pool", icon: "≋" }, { label: "Hot tub", icon: "♨" },
    { label: "Pets allowed", icon: "♧" }, { label: "Exterior security cameras on property", icon: "▧" },
    { label: "Carbon monoxide alarm", icon: "▧", unavailable: true }, { label: "Smoke alarm", icon: "◉", unavailable: true },
  ] satisfies Amenity[],
};