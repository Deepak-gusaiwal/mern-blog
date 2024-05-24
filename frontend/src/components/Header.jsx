import React from "react";
import { Button, Container, Logo } from "./helper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../redux/basicSlice";
// icons
import { RxCross2 } from "react-icons/rx";
import { HiBars2 } from "react-icons/hi2";
const Header = () => {
  const { isNavOpen } = useSelector((state) => state.basicSlice);
  const dispatch = useDispatch();

  const navHandler = () => {
    dispatch(toggleNav());
  };
  return (
    <header className="bg-slate-200 flex items-center">
      <Container className="flex w-full items-center md:gap-4 gap-2 justify-between">
        <Logo />
        <ul
          className={`menu flex md:gap-4 gap-2 capitalize md:ml-auto z-50 ${
            isNavOpen && "active"
          }`}
        >
          <li>
            <Link onClick={navHandler} to="/">Home</Link>
          </li>
          <li>
            <Link onClick={navHandler} to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link onClick={navHandler} to="/media">media</Link>
          </li>
          <li>
            <Link onClick={navHandler} to="/write">write</Link>
          </li>
        </ul>
        <div className="flex gap-2 items-center">
          <Button className="btn1" to="/login">
            Login
          </Button>
          <Button className="btn2" to="/signup">
            Signup
          </Button>
          <Button className="btn1 hidden" to="/logout">
            logout
          </Button>

          <button
            onClick={navHandler}
            className="bg-zinc-300 border-2 border-zinc-500 hover:bg-zinc-200 p-2 rounded-full md:hidden"
          >
            {isNavOpen ? (
              <RxCross2 size={"1.5rem"} />
            ) : (
              <HiBars2 size={"1.5rem"} />
            )}
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
