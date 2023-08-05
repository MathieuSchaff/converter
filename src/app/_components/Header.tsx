import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className={"flex justify-between items-center h-24 md-items-center px-8 shadow-md z-10 bg-zinc-700"} >
      <h1 className="text-1xl sm:text-2xl md:text-4xl lg:text-5xl text-honolulu uppercase tracking-widest">
        Converter
      </h1>
      <Navbar />
    </header >
  )
}
export default Header;
