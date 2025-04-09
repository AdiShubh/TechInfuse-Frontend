

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">About TechInfuse</h1>
          <p className="text-base-content text-lg">
            Welcome to <span className="font-semibold">TechInfuse</span> – a place where code meets creativity!
          </p>
        </div>

        <div className="mt-10 space-y-8 text-base-content leading-relaxed">
          <p>
            At <span className="text-primary font-medium">TechInfuse</span>, we aim to simplify complex web development concepts and infuse tech wisdom into your learning journey. Whether you're a curious beginner or an experienced developer, our platform offers deep dives into the <span className="font-medium">MERN stack</span>, modern JavaScript, performance optimization, security, and more.
          </p>

          <p>
            Built with the latest technologies including <span className="font-semibold">React 19, TypeScript, Tailwind CSS, Node.js, and MongoDB</span>, TechInfuse is not just a blog – it’s a developer's playground and a personal knowledge base.
          </p>

          <p>
            This project is open-source, continuously evolving, and designed to help developers stay up to date with modern best practices in frontend and backend development.
          </p>

          <p>
            Got a topic in mind or want to contribute? <span className="text-primary font-medium">We'd love to hear from you!</span>
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-base-content">
            &copy; {new Date().getFullYear()} TechInfuse. Built with 💻 by developers, for developers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
