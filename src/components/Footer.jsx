const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SaytzeffRule',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/akshit-sharma-0665b2246/',
  },
  {
    label: 'Email',
    href: 'mailto:akshitofficial001@gmail.com',
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {year} Akshit Sharma. All rights reserved.
        </p>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
