import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Linkedin, Twitter, Mail, Award, Users, Star, Key } from 'lucide-react';

// Team member data structure - no changes needed here
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Vartika',
      role: 'Marketing & Partnerships Head',
      description: 'An IIM Grad who loves everything but management! Meet Vartika – Our lead on Programming and Content. ‘I am not up for sale, so don’t publish my bio’, she insists. So we dare upset our head of Programming and continue to write about her! Period.',
      image: 'https://www.acrossmedia.in/wp-content/uploads/2022/09/team-5.jpg'
    },
    {
      id: '2',
      name: 'Soma Chandra',
      role: 'Brand Solutions Lead',
      description: 'Tired of getting run-of-the mill proposals from her media and creative agencies, Soma saw the business opportunity for kick-starting an authentic & effective brand solutions enterprise. Rest, as they say, is history. Credited with launching alcohol beverages like Carlsberg and Tuborg in a Marketing career that spans over a decade, Soma has managed and led creative and media processes with agencies like Leo Burnett, M&C Saatchi Scarecrow and Starcom. Thanks to her diverse marketing background of leading marketing initiatives for brands like Domino’s, Daawat Basmati Rice, Freshlook Color-contact lenses amongst others, Soma is adept at identifying brand’s key challenges, and equally skilled at crafting effective solutions as well. An avid traveler, she lives by the mantra of ‘stop at nothing’.',
      image: 'https://www.acrossmedia.in/wp-content/uploads/2022/09/team-1.jpg'
    },
    {
      id: '3',
      name: 'Roheet Chaddha',
      role: 'Project Manager',
      description: 'His soft-skills, networking abilities & media relationships could have made him India’s leading Public Relations executive, but Roheet had different plans.In his career spanning 18 years, Roheet has led teams at the Country’s best experiential & media organisation such as Wizcraft International, Entertainment Network India (part of Times of India), Times Television and Hindustan Times. His heavily decorated chest wears medals of Iconic IPRs like Channel V Awards, India International Film Festival, Film Fare Awards, Femina Miss India, HT Leadership Summit, JK Racing Championship, India Fashion Week, to name a few.',
      image: 'https://www.acrossmedia.in/wp-content/uploads/2022/09/team-6.jpg'
    },
    {
      id: '4',
      name: 'Chetan Pratap',
      role: 'Revenue & Sponsorships Head',
      description: 'After an honour’s degree in Business Economics and an MBA from a premier college, one would aspire for a meaty role at an MNC. But, over everything else, Chetan chose Hindi copywriting at an Advertising Agency! Fast forward by 15 years – today he is on the speed-dial of India’s best Marketeers, churning out Branded Solutions for them and helping them solve their Business & Marketing challenges. And when his not doing that, you find him write White Papers on Marketing or teach at a B-School.A little bird tells us Chetan also helps his Bollywood writer-friends with their Screenplay. But why should that bother anyone, as long as the complimentary movie tickets keep flowing in to the team!',
      image: 'https://www.acrossmedia.in/wp-content/uploads/2022/09/team-7.jpg',
    }
  ];

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', stiffness: 100 }
  }
};

const Team = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-36 pb-24 text-center relative">
        {/* Subtle background glow */}
        <div className="absolute inset-0 -z-10 bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(224,38,129,0.2),rgba(255,255,255,0))]"></div>

        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Creative Minds Behind<br />
            <span className="text-pink-500">Across Media</span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our diverse team of creative professionals brings together years of experience, 
            innovative thinking, and a passion for delivering exceptional results for every client.
          </motion.p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                // Apply the gradient border wrapper to the last item, as in the screenshot
                className={index === teamMembers.length - 1 ? "p-px bg-gradient-to-br from-pink-500 to-cyan-400 rounded-3xl" : ""}
              >
                <div className="h-full bg-slate-900 rounded-3xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover"
                        src={member.image}
                        alt={member.name}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-pink-500 font-semibold text-md mt-1">{member.role}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-gray-400 leading-relaxed text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;