import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Mail, Phone, Link, Briefcase, GraduationCap, Code, Heart, User } from 'lucide-react';

/**
 * Utility function to generate unique IDs for list items
 */
const generateId = () => Math.random().toString(36).substring(2, 9);

// --- Initial Data Structure (Updated with Summary and Hobbies) ---
const initialResumeData = {
  personal: {
    name: 'Jane Doe',
    title: 'Senior Product Designer',
    phone: '(555) 123-4567',
    email: 'jane.doe@example.com',
    linkedin: 'linkedin.com/in/janedoe',
  },
  summary: 'A highly creative and user-focused Senior Product Designer with 5+ years of experience leading end-to-end design for SaaS and mobile platforms. Proven ability to translate complex business goals into intuitive, accessible, and delightful user experiences.',
  education: [
    { id: generateId(), institution: 'State University', degree: 'M.S. Human-Computer Interaction', years: '2018 - 2020' },
    { id: generateId(), institution: 'Art & Design College', degree: 'B.A. Graphic Design', years: '2014 - 2018' },
  ],
  experience: [
    {
      id: generateId(),
      company: 'Innovate Solutions Inc.',
      role: 'Senior UX Designer',
      years: '2022 - Present',
      description: '• Led end-to-end design for flagship mobile application, increasing user engagement by 30%.\n• Developed and maintained the internal design system, cutting design-to-development handover time by 20%.\n• Mentored junior designers on best practices and modern design tools.',
    },
    {
      id: generateId(),
      company: 'Creative Studio Co.',
      role: 'Product Designer',
      years: '2020 - 2022',
      description: '• Designed and launched responsive web platforms, resulting in a 15% reduction in customer support tickets.\n• Conducted over 50 hours of usability testing and competitive analysis.',
    },
  ],
  skills: 'Figma, Sketch, Adobe XD, HTML/CSS, Prototyping, Usability Testing, Design Systems, Agile',
  hobbies: 'Photography, Hiking, Reading science fiction, Digital painting',
};

// --- Custom Components ---

/**
 * Resizable Textarea Component
 */
const ResizableTextarea = ({ value, onChange, placeholder = '' }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full resize-none overflow-hidden rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
      rows="1"
    />
  );
};

/**
 * Input Field Component for Forms
 */
const InputField = ({ label, type = 'text', name, value, onChange }) => (
  <div className="mb-3">
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
    />
  </div>
);

// --- Form Sections ---

const PersonalInfoForm = ({ data, onChange }) => (
  <div className="space-y-3">
    <h3 className="mb-4 text-xl font-bold text-indigo-800">Personal Information</h3>
    <InputField label="Full Name" name="name" value={data.name} onChange={onChange} />
    <InputField label="Professional Title" name="title" value={data.title} onChange={onChange} />
    <InputField label="Email" name="email" value={data.email} onChange={onChange} />
    <InputField label="Phone" name="phone" value={data.phone} onChange={onChange} />
    <InputField label="LinkedIn URL" name="linkedin" value={data.linkedin} onChange={onChange} />
  </div>
);

const SummaryForm = ({ data, onChange }) => (
  <div className="mt-6 space-y-3">
    <h3 className="mb-4 text-xl font-bold text-indigo-800 flex items-center">
        <User className="mr-2 h-5 w-5 text-teal-600" />
        Professional Summary
    </h3>
    <ResizableTextarea
      value={data}
      onChange={(e) => onChange(e.target.value)}
      placeholder="A concise summary of your career highlights and goals..."
    />
  </div>
);

const SkillsForm = ({ data, onChange }) => (
  <div className="mt-6 space-y-3">
    <h3 className="mb-4 text-xl font-bold text-indigo-800 flex items-center">
        <Code className="mr-2 h-5 w-5 text-teal-600" />
        Key Skills
    </h3>
    <label className="mb-1 block text-sm font-medium text-gray-700">Skills (Comma separated)</label>
    <ResizableTextarea
      value={data}
      onChange={(e) => onChange(e.target.value)}
      placeholder="e.g., React, JavaScript, AWS, Figma"
    />
  </div>
);

const HobbiesForm = ({ data, onChange }) => (
  <div className="mt-6 space-y-3">
    <h3 className="mb-4 text-xl font-bold text-indigo-800 flex items-center">
        <Heart className="mr-2 h-5 w-5 text-teal-600" />
        Hobbies/Interests
    </h3>
    <label className="mb-1 block text-sm font-medium text-gray-700">Hobbies (Comma separated)</label>
    <ResizableTextarea
      value={data}
      onChange={(e) => onChange(e.target.value)}
      placeholder="e.g., Photography, Hiking, Volunteering"
    />
  </div>
);

const DynamicArrayForm = ({ title, icon: Icon, items, onItemChange, onItemAdd, onItemRemove }) => (
  <div className="mt-6 space-y-4">
    <h3 className="text-xl font-bold text-indigo-800 flex items-center">
      <Icon className="mr-2 h-5 w-5 text-teal-600" />
      {title}
    </h3>
    {items.map((item, index) => (
      <div key={item.id} className="rounded-xl border border-indigo-100 p-4 shadow-md bg-white">
        <div className="flex justify-end">
          <button
            onClick={() => onItemRemove(item.id)}
            className="text-xs font-semibold text-red-500 hover:text-red-700 transition duration-150 p-1 rounded-full hover:bg-red-50"
          >
            Remove Entry
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.keys(item).filter(key => key !== 'id').map(key => (
            <div key={key} className={key === 'description' ? 'sm:col-span-2' : ''}>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {key === 'description' ? (
                <ResizableTextarea
                  value={item[key]}
                  onChange={(e) => onItemChange(item.id, key, e.target.value)}
                  placeholder="Describe your role or achievements (use bullet points or hyphens for list formatting)"
                />
              ) : (
                <input
                  type="text"
                  value={item[key]}
                  onChange={(e) => onItemChange(item.id, key, e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
    <button
      onClick={onItemAdd}
      className="w-full rounded-lg bg-teal-500 px-4 py-2 text-white font-semibold shadow-lg hover:bg-teal-600 transition duration-200 text-sm transform hover:scale-[1.01]"
    >
      + Add New {title.slice(0, -1)}
    </button>
  </div>
);

// --- Resume Preview Components ---

const ContactItem = ({ Icon, text, link, isLink = true }) => (
  <div className="flex items-center text-xs sm:text-sm">
    <Icon className="mr-1.5 h-3 w-3 text-teal-600" />
    {isLink ? (
      <a href={link} className="hover:underline text-gray-700" target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ) : (
      <span className="text-gray-700">{text}</span>
    )}
  </div>
);

const ResumeSectionTitle = ({ Icon, title }) => (
  <h2 className="mt-6 mb-2 border-b-2 border-teal-500 pb-1 text-xl font-extrabold uppercase text-indigo-900 tracking-wider flex items-center">
    <Icon className="mr-2 h-5 w-5 text-teal-600" />
    {title}
  </h2>
);

const ResumeSummary = ({ text }) => (
    <p className="text-sm text-gray-700 mt-2 italic border-l-4 border-teal-300 pl-3 leading-relaxed">
        {text}
    </p>
);

const ResumeExperience = ({ company, role, years, description }) => (
  <div className="mb-4">
    <div className="flex justify-between items-start">
      <h3 className="text-md font-bold text-indigo-800">{role}</h3>
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{years}</span>
    </div>
    <p className="text-sm italic text-gray-700 mb-1">{company}</p>
    <p className="text-sm text-gray-800 whitespace-pre-line leading-snug">
      {description.split('\n').map((line, index) => {
        const trimmed = line.trim();
        // Convert * or - to bullet points for display
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          return (
            <span key={index} className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500">
              {trimmed.substring(1).trim()}
            </span>
          );
        }
        // Preserve other lines as is
        return trimmed ? <span key={index} className="block">{trimmed}</span> : null;
      })}
    </p>
  </div>
);

const ResumeEducation = ({ institution, degree, years }) => (
  <div className="mb-3">
    <div className="flex justify-between items-start">
      <h3 className="text-md font-semibold text-gray-900">{degree}</h3>
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{years}</span>
    </div>
    <p className="text-sm italic text-gray-700">{institution}</p>
  </div>
);

const ResumeSkillsOrHobbies = ({ list }) => (
    <div className="mt-2 text-sm">
        <ul className="flex flex-wrap gap-2">
            {list.map((item, index) => (
                <li key={index} className="px-3 py-1 bg-teal-50 text-indigo-800 rounded-full shadow-sm text-xs font-semibold border border-teal-200">
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const ResumePreview = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills, hobbies } = data;

  // Function to format lists nicely
  const formatList = (text) => text.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const formattedSkills = formatList(skills);
  const formattedHobbies = formatList(hobbies);

  return (
    <div ref={ref} className="bg-white p-8 shadow-2xl w-full h-full min-h-[850px] resume-paper">
      {/* Header - Name and Title */}
      <header className="border-b-4 border-indigo-900 pb-3 mb-4">
        <h1 className="text-4xl font-black text-indigo-900 uppercase tracking-widest">
          {personal.name || 'Your Name'}
        </h1>
        <p className="text-xl font-light text-teal-600 mt-1 mb-3">
          {personal.title || 'Professional Title'}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 justify-start">
          {personal.email && <ContactItem Icon={Mail} text={personal.email} link={`mailto:${personal.email}`} isLink={true} />}
          {personal.phone && <ContactItem Icon={Phone} text={personal.phone} isLink={false} />}
          {personal.linkedin && <ContactItem Icon={Link} text="LinkedIn Profile" link={`https://${personal.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}`} isLink={true} />}
        </div>
      </header>

      {/* Summary Section */}
      {summary && <ResumeSummary text={summary} />}

      {/* Experience Section */}
      {experience.length > 0 && (
        <>
          <ResumeSectionTitle Icon={Briefcase} title="Professional Experience" />
          {experience.map(exp => (
            <ResumeExperience key={exp.id} {...exp} />
          ))}
        </>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <>
          <ResumeSectionTitle Icon={GraduationCap} title="Education" />
          {education.map(edu => (
            <ResumeEducation key={edu.id} {...edu} />
          ))}
        </>
      )}


      {/* Skills Section */}
      {formattedSkills.length > 0 && (
        <>
          <ResumeSectionTitle Icon={Code} title="Technical Skills" />
          <ResumeSkillsOrHobbies list={formattedSkills} />
        </>
      )}

      {/* Hobbies Section */}
      {formattedHobbies.length > 0 && (
        <>
          <ResumeSectionTitle Icon={Heart} title="Interests & Hobbies" />
          <ResumeSkillsOrHobbies list={formattedHobbies} />
        </>
      )}
    </div>
  );
});

// --- Main App Component ---

const App = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const resumeRef = useRef(null);

  // Handler for updating personal info, summary, skills, or hobbies (all string fields)
  const handleStringChange = useCallback((key, value) => {
    if (key in resumeData.personal) {
      // Handle personal info fields
      setResumeData(prev => ({
        ...prev,
        personal: { ...prev.personal, [key]: value }
      }));
    } else {
      // Handle top-level string fields (summary, skills, hobbies)
      setResumeData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  }, [resumeData.personal]);

  // Handler for updating array items (Experience/Education)
  const handleItemChange = useCallback((section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  // Handler for adding new array items
  const handleItemAdd = useCallback((section, structure) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { id: generateId(), ...structure }]
    }));
  }, []);

  // Handler for removing array items
  const handleItemRemove = useCallback((section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  // Print function to generate PDF/Hardcopy
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      {/* Print CSS for clean output */}
      <style>{`
        @media print {
          .print-hidden {
            display: none !important;
          }
          .resume-paper {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 24px !important;
            min-height: 100vh !important;
          }
          body, html {
            height: auto;
            overflow: visible;
            background: white !important;
          }
        }
      `}</style>

      <header className="print-hidden mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-900">
          <span className="text-teal-600">Creative</span> Resume Builder
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Input your details and see the real-time, professional preview!
        </p>
        <button
          onClick={handlePrint}
          className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-bold text-white shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.03] active:scale-95"
        >
          Print/Save as PDF
        </button>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Column: Input Form (Hidden on Print) */}
        <div className="lg:col-span-1 print-hidden rounded-xl bg-white p-6 shadow-2xl h-fit sticky top-4">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-2">Edit Resume Details</h2>

          {/* Personal Info */}
          <PersonalInfoForm data={resumeData.personal} onChange={(e) => handleStringChange(e.target.name, e.target.value)} />

          {/* Personal Summary */}
          <SummaryForm
            data={resumeData.summary}
            onChange={(value) => handleStringChange('summary', value)}
          />

          {/* Experience */}
          <DynamicArrayForm
            title="Professional Experience"
            icon={Briefcase}
            items={resumeData.experience}
            onItemChange={(id, field, value) => handleItemChange('experience', id, field, value)}
            onItemAdd={() => handleItemAdd('experience', { company: '', role: '', years: '', description: '' })}
            onItemRemove={(id) => handleItemRemove('experience', id)}
          />

          {/* Education */}
          <DynamicArrayForm
            title="Education History"
            icon={GraduationCap}
            items={resumeData.education}
            onItemChange={(id, field, value) => handleItemChange('education', id, field, value)}
            onItemAdd={() => handleItemAdd('education', { institution: '', degree: '', years: '' })}
            onItemRemove={(id) => handleItemRemove('education', id)}
          />

          {/* Skills */}
          <SkillsForm
            data={resumeData.skills}
            onChange={(value) => handleStringChange('skills', value)}
          />

          {/* Hobbies */}
          <HobbiesForm
            data={resumeData.hobbies}
            onChange={(value) => handleStringChange('hobbies', value)}
          />
        </div>

        {/* Right Column: Resume Preview (Visible on Print) */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 print-hidden">Resume Preview</h2>
          <ResumePreview ref={resumeRef} data={resumeData} />
        </div>
      </main>
    </div>
  );
};

export default App;
