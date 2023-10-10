"use client";
import CustomizeUserLinks from "@/layout/CustomizeUserLinks/CustomizeUserLinks";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";

export default function Home() {
  const sprwadz = () => {
    console.log("fields");
  };
  return (
    <main className="min-h-[100vh]">
      {/* <button onClick={sprwadz}>SPRWAWDZ</button> */}
      <Navbar />
      <div className="lg:flex lg:justify-evenly lg:items-center gap-5">
        <LinkPreview />
        <CustomizeUserLinks />
      </div>
    </main>
  );
}
