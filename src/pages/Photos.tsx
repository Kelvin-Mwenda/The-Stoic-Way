
import React from "react";
import Layout from "../components/Layout";

const Photos = () => {
  // Sample image data - in a real app, this might come from an API
  const images = [
    {
      id: 1,
      src: "/lovable-uploads/615f8e1f-bee9-4125-9f05-5306f721a36d.png",
      alt: "Portrait 1",
      category: "Portrait",
    },
    {
      id: 2,
      src: "/lovable-uploads/615f8e1f-bee9-4125-9f05-5306f721a36d.png",
      alt: "Portrait 2",
      category: "Portrait",
    },
    {
      id: 3,
      src: "/lovable-uploads/615f8e1f-bee9-4125-9f05-5306f721a36d.png",
      alt: "Editorial 1",
      category: "Editorial",
    },
    {
      id: 4,
      src: "/lovable-uploads/615f8e1f-bee9-4125-9f05-5306f721a36d.png",
      alt: "Editorial 2",
      category: "Editorial",
    },
    {
      id: 5,
      src: "/lovable-uploads/615f8e1f-bee9-4125-9f05-5306f721a36d.png",
      alt: "Editorial 3",
      category: "Editorial",
    },
    {
      id: 6,
      src: "/lovable-uploads/615f8e1f-bee9-4125-9f05-5306f721a36d.png",
      alt: "Portrait 3",
      category: "Portrait",
    },
  ];

  return (
    <Layout>
      <div className="w-full bg-background px-6 md:px-16 py-20">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Photography</h1>
          <div className="w-16 h-0.5 bg-foreground mb-10"></div>
          
          <div className="flex gap-4 mb-12 flex-wrap">
            <button className="px-6 py-2 bg-muted text-foreground">All</button>
            <button className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors">Portraits</button>
            <button className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors">Editorial</button>
            <button className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors">Black & White</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="group relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium">{image.alt}</p>
                    <p className="text-white/70 text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Photos;
