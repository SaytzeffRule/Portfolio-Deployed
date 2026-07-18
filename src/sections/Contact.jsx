function Contact() {
  // TODO: Wire this form to a backend or a service like Formspree, EmailJS, etc.
  // For now, clicking Submit will log the data to the console.
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log('Contact form submission (TODO: wire to backend):', data);
    alert('Message sent! (This is a placeholder — replace with real backend logic.)');
  };

  return (
    <section id="contact" className="bg-gray-50 dark:bg-gray-900/50 scroll-mt-20">
      <div className="section-container">
        <h2 className="section-title">
          <span className="font-mono text-sm text-primary-600 dark:text-primary-500">05. </span>
          Get In Touch
        </h2>

        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            {/* TODO: replace with your preferred contact intro */}
            Whether you have a project idea, a job opportunity, or just want to say hi —
            feel free to reach out. I'll get back to you as soon as I can.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Your message..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center sm:w-auto">
              Send Message
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
