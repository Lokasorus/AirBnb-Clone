import Link from "next/link";
import Image from "next/image";
import { listing } from "@/data/listing";

const tourSections = [
  { title: "Living room 1", details: "Sofa · Air conditioning · Ceiling fan · TV", imageIds: ["living-room", "lounge", "kitchen"] },
  { title: "Living room 2", details: "Ceiling fan · Hot tub", imageIds: ["lounge", "bathroom", "living-room"] },
  { title: "Full kitchen", details: "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery", imageIds: ["kitchen", "living-room"] },
  { title: "Bedroom", details: "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Wifi", imageIds: ["bedroom", "living-room", "lounge"] },
  { title: "Full bathroom", details: "Hairdryer · Hot water · Shampoo · Shower gel", imageIds: ["bathroom", "lounge"] },
];

export default function PhotoTour() {
  return <main className="photo-tour"><header className="tour-header"><Link href="/" aria-label="Back to listing">‹</Link><strong>Photo tour</strong><div><button type="button" aria-label="Share photo tour">↗</button><button type="button" aria-label="Save photo tour">♡</button></div></header><div className="tour-strip">{listing.images.map((image) => <Link href={`/?photo=${image.id}`} key={image.id}><span style={{ backgroundImage: `url(${image.src})` }} /><small>{image.section}</small></Link>)}</div>{tourSections.map((section) => <section className="tour-section" key={section.title}><div className="tour-copy"><h1>{section.title}</h1><p>{section.details}</p></div><div className="tour-images">{section.imageIds.map((imageId, index) => { const image = listing.images.find((candidate) => candidate.id === imageId) ?? listing.images[0]; return <Link className={index === 0 ? "wide" : ""} href={`/?photo=${image.id}`} key={`${section.title}-${index}`}><Image src={image.src} alt={`${section.title} view`} width={900} height={600} unoptimized /></Link>; })}</div></section>)}</main>;
}