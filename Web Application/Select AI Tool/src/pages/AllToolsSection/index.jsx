import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loader";

const AllToolsSection = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tools`);
        // Filter out featured tools
        const nonFeaturedTools = res.data.filter(tool => !tool.featured);

        // Shuffle and pick first 6
        const shuffled = nonFeaturedTools.sort(() => 0.5 - Math.random());
        const randomSix = shuffled.slice(0, 6);

        setTools(randomSix);
      } catch (err) {
        console.error("Error fetching tools:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  if (loading) return <Loading />;

  if (!tools.length) return <p className="text-center mt-10">No tools available.</p>;

  return (
    <div className="flex flex-wrap justify-start gap-4">
      {tools.map((tool) => (
        <div
          key={tool._id}
          className="flex-[1_1_20rem] bg-bg-secondary-background rounded-lg px-6 py-6 flex flex-col justify-between border-2 border-border-primary shadow-[3px_4px_1px_#000000]"
        >
          {/* Tool Header */}
          <div className="flex items-start gap-4 mb-3">
            <img
              src={tool.image_url || "/images/img_group_353.svg"}
              alt={tool.name}
              className="w-16 h-16 flex-shrink-0 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-text-primary leading-tight">
                  {tool.name}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <img src="/images/img_vector_amber_a400.svg" alt="star" className="w-2.5 h-2.5" />
                  <span className="text-sm font-medium text-text-muted">{tool.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm text-black bg-white border border-black rounded-full px-2 py-1 shadow-[1px_2px_1px_#000000]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-normal mb-3">
            {tool.new_description || tool.description}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span>{tool.date || "Unknown Date"}</span>
              <div className="w-1.25 h-1.25 bg-text-mutedMedium rounded-sm"></div>
              <span>{tool.pricing || "Free/Paid"}</span>
            </div>
            <a
              href={tool.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-black shadow-[1px_2px_1px_#000000] text-sm font-medium hover:scale-105 transition-transform duration-150"
            >
              Visit Website
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllToolsSection;
