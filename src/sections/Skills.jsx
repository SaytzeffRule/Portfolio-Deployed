const SKILL_CATEGORIES = [
  {
    name: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML/CSS'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    name: 'DevOps & Cloud',
    skills: ['Docker', 'AWS', 'GitHub Actions', 'Nginx', 'Linux'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'VS Code', 'Figma', 'Webpack/Vite', 'Jira'],
  },
];

function Skills() {
  return (
    <section id="skills" className="bg-gray-50 dark:bg-gray-900/50 scroll-mt-20">
      <div className="section-container">
        <h2 className="section-title">
          <span className="font-mono text-sm text-primary-600 dark:text-primary-500">03. </span>
          Skills &amp; Technologies
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.name} className="card">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-500">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
