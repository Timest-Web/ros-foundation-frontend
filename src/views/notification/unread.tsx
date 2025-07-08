import React from "react";

export default function UnreadMessages() {
  return (
    <main>
      <p className="font-plus_jakarta_sans text-xs text-text-dark mb-6">Awesome!! we have some updates for you</p>
      <div className="text-text-dark flex justify-between">
        <div>
          <h3 className="font-ar-one-sans font-bold">
            Your Profile verification was Declined at stage 1
          </h3>
          <p className="font-plus_jakarta_sans text-xs">
            We urge you to review your submissions update your profile and save
            for revaulation
          </p>
          <p className="font-plus_jakarta_sans text-xs font-bold">Now</p>
        </div>
        <div className="font-plus_jakarta_sans font-bold text-xs">
          Read Message
        </div>
      </div>
    </main>
  );
}
