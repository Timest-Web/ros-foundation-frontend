import Image from "next/image";
import Link from "next/link";
import React from "react";
import avatar from "../../../../public/images/placeholder_beneficiary.jpg";


interface ProfileCardProps{
  href:string;
}

export default function ProfileCard(props:ProfileCardProps) {
  return (
    <section className="border border-neutral-300 rounded-md p-2 lg:p-4 flex justify-between lg:w-[37rem]">
      <div className="flex gap-2 lg:gap-8">
        <Image className="w-5 h-5 lg:w-12 lg:h-12 rounded-full" src={avatar} alt="" />
        <div className="flex flex-col lg:gap-1">
          <h3 className="font-righteous text-xs lg:text-base text-text-dark">Urel Dave</h3>
          <p className="font-plus_jakarta_sans text-[0.65rem] text-text-dark lg:text-xs">
            20 yrs
          </p>
        </div>
        <div className="flex flex-col lg:gap-1">
          <h3 className="font-righteous text-xs lg:text-base text-text-dark">Nationality</h3>
          <p className="font-plus_jakarta_sans text-[0.65rem] text-text-dark lg:text-xs">
            Nigerian
          </p>
        </div>
        <div className="flex flex-col lg:gap-1">
          <h3 className="font-righteous text-xs lg:text-base text-text-dark">School</h3>
          <p className="font-plus_jakarta_sans text-[0.65rem] text-text-dark lg:text-xs">
            University of Lagos
          </p>
        </div>
      </div>
      <Link className="font-semibold text-primary-100 text-[0.6rem] lg:text-xs font-plus_jakarta_sans" href={props.href}>
        Edit Profile
      </Link>
    </section>
  );
}
