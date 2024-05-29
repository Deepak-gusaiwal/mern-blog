import React from "react";
import { useSelector } from "react-redux";
import { Container, Section } from "../components/helper";

const Profile = () => {
  const { userData } = useSelector((state) => state.userSlice);
  const { _id, email, name, avtar } = userData;
  console.log("userData", userData);
  return (
    <Section className="bg-slate-100">
      <Container className="grid md:grid-cols-3 gap-2 ">
         <div>
         <div className="imgBox mx-auto w-[200px] aspect-square bg-purple-500 text-center flex justify-center items-center text-[clamp(4rem,6vw,6rem)] rounded-full text-white shadow-lg select-none">
            A
          </div>
         </div>
        <div className="md:col-span-2 ">
          <div className="itemBox border-b-2 border-slate-300">
            <span className="md:min-w-52 min-w-20 inline-block capitalize ">
              ID
            </span>
            <span>: {_id}</span>
          </div>

          <div className="itemBox border-b-2 border-slate-300">
            <span className="md:min-w-52 min-w-20 inline-block capitalize ">
              name
            </span>
            <span>: {name}</span>
          </div>
          <div className="itemBox border-b-2 border-slate-300">
            <span className="md:min-w-52 min-w-20 inline-block capitalize ">
              email
            </span>
            <span>: {email}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Profile;
