import React from "react";
import ProfileCard from "../../components/user/ProfileCard";

const ProfilePage = () => {
  return (
    <div className="bg-primaryBG py-12 xl:px-28 px-4">
      <div className="h-full mt-40"> 
          <ProfileCard />
        </div>
    </div>
  );
};

export default ProfilePage;
