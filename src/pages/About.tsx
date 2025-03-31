
import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="w-full bg-background px-6 md:px-16 py-20">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">About The Stoic Way</h1>
          <div className="w-16 h-0.5 bg-foreground mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg mb-6">
                The Stoic Way exists to revive and modernize ancient Stoic wisdom for today's challenges. We believe the principles of self-discipline, emotional control, and resilience are more relevant than ever in our distracted, comfort-seeking world.
              </p>
              <p className="text-lg mb-6">
                We strive to create a resource that offers practical, actionable advice grounded in timeless philosophical principles—without the academic jargon or new-age fluff that often dilutes wisdom.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why Stoicism?</h2>
              <p className="text-lg mb-6">
                Of all ancient philosophies, Stoicism stands out for its practicality and focus on what's within our control. It offers a framework for thriving in any circumstance—whether facing success, failure, wealth, poverty, health, or illness.
              </p>
              <p className="text-lg mb-6">
                Unlike fleeting self-help trends, Stoicism has been tested across millennia and cultures. Its practitioners have included emperors, slaves, soldiers, and statesmen—proving its value across all walks of life.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-semibold mb-6">The Philosophy Behind Our Work</h2>
            <p className="text-lg mb-6">
              We view Stoicism not as a rigid dogma but as a living, adaptable philosophy. While we honor the wisdom of Seneca, Epictetus, and Marcus Aurelius, we also integrate modern psychology, neuroscience, and behavioral economics when they align with and enhance Stoic principles.
            </p>
            <p className="text-lg mb-6">
              Our approach emphasizes:
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 text-lg">
              <li>Practical application over theoretical knowledge</li>
              <li>Gradual, consistent progress over dramatic transformation</li>
              <li>Evidence-based techniques supplemented by ancient wisdom</li>
              <li>Community support and accountability</li>
              <li>Accessibility for beginners while providing depth for advanced practitioners</li>
            </ul>
          </div>
          
          <div className="mt-16 bg-muted p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Personal Journey</h2>
            <p className="text-lg mb-6">
              The Stoic Way began when we discovered Stoicism during a period of personal hardship. What started as casual interest grew into a life-changing practice as we applied these principles to overcome challenges, build resilience, and find purpose.
            </p>
            <p className="text-lg">
              We created this resource to share what we've learned and to build a community of like-minded individuals committed to self-mastery through ancient wisdom and modern practice.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
