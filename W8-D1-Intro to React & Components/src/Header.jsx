function Header(){
  return(
    <header className="flex justify-between px-20 pt-5 text-[20px] font-bold">
      <h1 className="cursor-pointer">HK</h1>
      <nav className="flex gap-10">
        <a href="#" className="cursor-pointer">About</a>
        <a href="#" className="cursor-pointer">Contact</a>
      </nav>
    </header>
  );
}

export default Header;