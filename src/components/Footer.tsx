function Footer() {
  return (
    <footer className="bg-red-500 text-white p-4 flex flex-col md:flex-row justify-between items-center w-full text-center md:text-left text-sm">
      <div>
        <p className="font-medium">Designed & Built by Joachim Gerard</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <div className="mt-2 md:mt-0">
        <p>
          Built with <span className="font-semibold">React</span>,{" "}
          <span className="font-semibold">TypeScript</span>, and{" "}
          <span className="font-semibold">Tailwind CSS</span>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
