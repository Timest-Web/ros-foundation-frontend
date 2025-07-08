import Image from "next/image";
import Link from "next/link";
import React from "react";
import avatar from "../../../public/images/placeholder_beneficiary.jpg";

export default function ProfileCard() {
  return (
    <section className="border border-neutral-300 rounded-md p-4 flex justify-between w-[37rem]">
      <div className="flex gap-8">
        <Image className="w-12 h-12 rounded-full" src={avatar} alt="" />
        <div className="flex flex-col gap-1">
          <h3 className="font-righteous text-text-dark">Urel Dave</h3>
          <p className="font-plus_jakarta_sans text-text-dark text-xs">
            20 yrs
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-righteous text-text-dark">Nationality</h3>
          <p className="font-plus_jakarta_sans text-text-dark text-xs">
            Nigerian
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-righteous text-text-dark">School</h3>
          <p className="font-plus_jakarta_sans text-text-dark text-xs">
            University of Lagos
          </p>
        </div>
      </div>
      <Link className="font-semibold text-primary-100 text-xs" href="/profile">
        Edit Profile
      </Link>
    </section>
  );
}
