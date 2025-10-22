import { NextRequest, NextResponse } from 'next/server'

interface ContentCard {
  id: string
  title: string
  description: string
  category: string
  content: string
  url?: string
}

// Curated content database organized by topics
const CONTENT_DATABASE: Record<string, ContentCard[]> = {
  'Technology': [
    {
      id: 'tech-1',
      title: 'The Rise of Edge Computing',
      description: 'How edge computing is revolutionizing data processing',
      category: 'Technology',
      content: 'Edge computing brings computation and data storage closer to the sources of data. This paradigm shift is reducing latency, improving response times, and enabling real-time processing for IoT devices, autonomous vehicles, and smart cities.',
      url: 'https://example.com/edge-computing'
    },
    {
      id: 'tech-2',
      title: 'Quantum Computing Breakthroughs',
      description: 'Latest advances in quantum computing technology',
      category: 'Technology',
      content: 'Researchers have achieved quantum supremacy in specific computational tasks. These quantum computers can solve certain problems exponentially faster than classical computers, opening new possibilities in cryptography, drug discovery, and optimization.',
    },
    {
      id: 'tech-3',
      title: '5G Networks Transform Connectivity',
      description: 'The impact of 5G on industries and daily life',
      category: 'Technology',
      content: '5G technology is delivering speeds up to 100 times faster than 4G, with ultra-low latency. This enables new applications in telemedicine, remote surgery, smart manufacturing, and immersive AR/VR experiences.',
    }
  ],
  'Science': [
    {
      id: 'sci-1',
      title: 'CRISPR Gene Editing Revolution',
      description: 'How gene editing is changing medicine',
      category: 'Science',
      content: 'CRISPR-Cas9 technology allows precise editing of DNA sequences. Scientists are using it to develop treatments for genetic diseases, create disease-resistant crops, and understand gene functions with unprecedented accuracy.',
    },
    {
      id: 'sci-2',
      title: 'Dark Matter Mystery Deepens',
      description: 'New theories about the invisible universe',
      category: 'Science',
      content: 'Despite making up 85% of the universe\'s matter, dark matter remains elusive. New detector experiments and theoretical frameworks are bringing us closer to understanding this fundamental component of our cosmos.',
    },
    {
      id: 'sci-3',
      title: 'Synthetic Biology Creates New Life Forms',
      description: 'Engineering organisms with custom DNA',
      category: 'Science',
      content: 'Scientists have created organisms with entirely synthetic genomes. This breakthrough enables the design of bacteria that produce biofuels, medicines, and materials, potentially revolutionizing manufacturing and sustainability.',
    }
  ],
  'AI & Machine Learning': [
    {
      id: 'ai-1',
      title: 'Large Language Models Transform Communication',
      description: 'How AI is revolutionizing human-computer interaction',
      category: 'AI & Machine Learning',
      content: 'Advanced language models can understand context, generate human-like text, and assist with complex tasks. They\'re being integrated into education, healthcare, customer service, and creative industries, fundamentally changing how we interact with technology.',
    },
    {
      id: 'ai-2',
      title: 'Computer Vision Achieves Human-Level Recognition',
      description: 'AI systems that see and understand the world',
      category: 'AI & Machine Learning',
      content: 'Modern computer vision systems can identify objects, faces, and scenes with accuracy matching or exceeding human capabilities. Applications range from autonomous vehicles to medical image analysis and wildlife conservation.',
    },
    {
      id: 'ai-3',
      title: 'Reinforcement Learning Masters Complex Games',
      description: 'AI learns through trial and error',
      category: 'AI & Machine Learning',
      content: 'Reinforcement learning algorithms have mastered games from Chess to Go to StarCraft, demonstrating strategic thinking and adaptability. These techniques are now being applied to real-world problems like robotics, traffic optimization, and resource management.',
    }
  ],
  'Health': [
    {
      id: 'health-1',
      title: 'Personalized Medicine Revolution',
      description: 'Treatments tailored to your genetic profile',
      category: 'Health',
      content: 'Genomic sequencing and AI are enabling doctors to customize treatments based on individual genetic makeup. This approach is improving cancer therapy outcomes, reducing adverse drug reactions, and optimizing prevention strategies.',
    },
    {
      id: 'health-2',
      title: 'Mental Health Tech Innovations',
      description: 'Digital tools for psychological wellbeing',
      category: 'Health',
      content: 'AI-powered apps, virtual reality therapy, and digital therapeutics are making mental health support more accessible. These tools provide 24/7 assistance, evidence-based interventions, and early detection of mental health issues.',
    },
    {
      id: 'health-3',
      title: 'Gut Microbiome and Health',
      description: 'The trillions of bacteria shaping our wellbeing',
      category: 'Health',
      content: 'Research reveals that gut bacteria influence not just digestion, but immunity, mood, and even brain function. Understanding the microbiome is leading to new treatments for obesity, depression, and autoimmune diseases.',
    }
  ],
  'Space': [
    {
      id: 'space-1',
      title: 'Mars Colonization Plans Progress',
      description: 'Making humanity a multi-planetary species',
      category: 'Space',
      content: 'Multiple space agencies and private companies are developing technologies for sustainable Mars habitats. In-situ resource utilization, radiation shielding, and closed-loop life support systems are making Mars colonization increasingly feasible.',
    },
    {
      id: 'space-2',
      title: 'James Webb Telescope Discoveries',
      description: 'Peering into the early universe',
      category: 'Space',
      content: 'The James Webb Space Telescope is revealing galaxies formed just after the Big Bang, detailed atmospheric compositions of exoplanets, and stunning images of star formation. These observations are rewriting our understanding of cosmic evolution.',
    },
    {
      id: 'space-3',
      title: 'Asteroid Mining Becomes Reality',
      description: 'Extracting resources from space rocks',
      category: 'Space',
      content: 'Companies are developing technology to mine asteroids for water, metals, and rare earth elements. This could provide resources for space exploration and potentially supply Earth with valuable materials while reducing environmental impact.',
    }
  ],
  'Environment': [
    {
      id: 'env-1',
      title: 'Carbon Capture Technologies Scale Up',
      description: 'Removing CO2 directly from the atmosphere',
      category: 'Environment',
      content: 'Direct air capture facilities are being deployed worldwide to remove carbon dioxide from the atmosphere. Combined with carbon storage and utilization technologies, these systems offer a path to negative emissions and climate stabilization.',
    },
    {
      id: 'env-2',
      title: 'Ocean Cleanup Projects Expand',
      description: 'Removing plastic from our seas',
      category: 'Environment',
      content: 'Innovative systems are collecting plastic waste from ocean gyres and river mouths. These efforts, combined with plastic bans and circular economy initiatives, are working to restore marine ecosystems and protect ocean life.',
    },
    {
      id: 'env-3',
      title: 'Renewable Energy Surpasses Fossil Fuels',
      description: 'The clean energy transition accelerates',
      category: 'Environment',
      content: 'Solar and wind power have become the cheapest sources of electricity in most regions. With improving battery storage and smart grid technology, renewable energy is rapidly displacing fossil fuels and reducing global emissions.',
    }
  ],
  'Business': [
    {
      id: 'biz-1',
      title: 'Remote Work Transforms Corporate Culture',
      description: 'The future of work is flexible',
      category: 'Business',
      content: 'Companies are adopting hybrid models that blend remote and office work. This shift is redefining productivity metrics, employee satisfaction, and real estate needs, while enabling access to global talent pools.',
    },
    {
      id: 'biz-2',
      title: 'Blockchain Beyond Cryptocurrency',
      description: 'Distributed ledgers revolutionize industries',
      category: 'Business',
      content: 'Blockchain technology is being applied to supply chain transparency, digital identity, smart contracts, and decentralized finance. These applications promise increased efficiency, reduced fraud, and disintermediation of traditional institutions.',
    },
    {
      id: 'biz-3',
      title: 'Subscription Economy Reshapes Commerce',
      description: 'From ownership to access-based models',
      category: 'Business',
      content: 'Subscription services have expanded beyond software to include cars, fashion, food, and entertainment. This model provides predictable revenue for businesses while offering consumers flexibility and convenience.',
    }
  ],
  'Gaming': [
    {
      id: 'game-1',
      title: 'Cloud Gaming Goes Mainstream',
      description: 'Play AAA games on any device',
      category: 'Gaming',
      content: 'Cloud gaming platforms stream high-quality games to phones, tablets, and low-end computers. This technology is democratizing access to gaming, eliminating expensive hardware requirements, and enabling instant play without downloads.',
    },
    {
      id: 'game-2',
      title: 'Virtual Reality Gaming Evolves',
      description: 'Immersive experiences become more realistic',
      category: 'Gaming',
      content: 'Next-generation VR headsets offer higher resolution, wider field of view, and haptic feedback that makes virtual worlds feel tangible. Social VR platforms are creating new forms of multiplayer interaction and presence.',
    },
    {
      id: 'game-3',
      title: 'Esports Reach Olympic Status',
      description: 'Competitive gaming gains mainstream recognition',
      category: 'Gaming',
      content: 'Esports tournaments fill stadiums and attract millions of viewers online. Prize pools rival traditional sports, professional leagues are forming, and gaming is being considered for inclusion in the Olympic Games.',
    }
  ],
  'Education': [
    {
      id: 'edu-1',
      title: 'AI Tutors Personalize Learning',
      description: 'Adaptive education for every student',
      category: 'Education',
      content: 'AI-powered tutoring systems adapt to each student\'s learning pace, style, and knowledge gaps. These tools provide instant feedback, identify struggling areas, and create personalized learning paths that improve outcomes.',
    },
    {
      id: 'edu-2',
      title: 'Virtual Labs Enable Remote Science',
      description: 'Conduct experiments from anywhere',
      category: 'Education',
      content: 'Virtual and augmented reality labs allow students to perform complex experiments safely and affordably. From chemistry simulations to virtual dissections, these tools expand access to hands-on science education.',
    },
    {
      id: 'edu-3',
      title: 'Micro-Credentials Transform Careers',
      description: 'Learn specific skills quickly',
      category: 'Education',
      content: 'Digital badges and micro-credentials allow professionals to demonstrate specific competencies. This granular approach to education enables rapid skill acquisition and career pivoting in a fast-changing job market.',
    }
  ],
  'default': [
    {
      id: 'def-1',
      title: 'Innovation in Unexpected Places',
      description: 'Breakthroughs happening across industries',
      category: 'General',
      content: 'From urban farming to neural interfaces, innovation is accelerating across all domains. Cross-disciplinary collaboration is producing solutions to humanity\'s greatest challenges and opening new frontiers of possibility.',
    },
    {
      id: 'def-2',
      title: 'The Power of Community',
      description: 'How collective action drives change',
      category: 'General',
      content: 'Online communities are organizing to solve local problems, fund creative projects, and support causes. This grassroots connectivity is demonstrating that ordinary people working together can create extraordinary impact.',
    },
    {
      id: 'def-3',
      title: 'Lifelong Learning Becomes Essential',
      description: 'Adapting to a rapidly changing world',
      category: 'General',
      content: 'The pace of technological change requires continuous skill development. Embracing curiosity and adaptability is becoming as important as traditional education for personal and professional success.',
    }
  ]
}

function getRelevantContent(preferences: string[]): ContentCard[] {
  const cards: ContentCard[] = []
  const usedIds = new Set<string>()

  // Get content matching user preferences
  preferences.forEach(pref => {
    const prefLower = pref.toLowerCase()
    Object.entries(CONTENT_DATABASE).forEach(([topic, topicCards]) => {
      if (topic.toLowerCase().includes(prefLower) || prefLower.includes(topic.toLowerCase())) {
        topicCards.forEach(card => {
          if (!usedIds.has(card.id)) {
            cards.push(card)
            usedIds.add(card.id)
          }
        })
      }
    })
  })

  // If no matches found, add some default content
  if (cards.length < 5) {
    CONTENT_DATABASE.default.forEach(card => {
      if (!usedIds.has(card.id)) {
        cards.push(card)
        usedIds.add(card.id)
      }
    })
  }

  // Shuffle the cards
  return cards.sort(() => Math.random() - 0.5)
}

export async function POST(request: NextRequest) {
  try {
    const { preferences } = await request.json()

    if (!preferences || !Array.isArray(preferences) || preferences.length === 0) {
      return NextResponse.json(
        { error: 'Preferences are required' },
        { status: 400 }
      )
    }

    const cards = getRelevantContent(preferences)

    return NextResponse.json({ cards: cards.slice(0, 10) })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
