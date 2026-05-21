import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Spring Allergy Season: How to Help Your Pet",
    excerpt: "As the flowers bloom and pollen fills the air, many pets experience seasonal allergies. Learn to recognize the signs and find relief for your furry friend.",
    date: "May 15, 2025",
    category: "Pet Health",
    author: "Dr. Sarah Johnson",
    slug: "spring-allergy-season",
  },
  {
    title: "The Importance of Annual Wellness Exams",
    excerpt: "Regular checkups are essential for catching health issues early. Discover why annual exams are the cornerstone of preventive veterinary care.",
    date: "May 8, 2025",
    category: "Wellness",
    author: "Dr. Michael Chen",
    slug: "importance-annual-wellness",
  },
  {
    title: "Pet Dental Health: More Than Just Fresh Breath",
    excerpt: "Did you know that dental disease affects 80% of dogs and cats by age 3? Learn how proper dental care can extend your pet's life.",
    date: "May 1, 2025",
    category: "Dental Care",
    author: "Dr. Emily Rodriguez",
    slug: "pet-dental-health",
  },
  {
    title: "Understanding Your Pet's Nutritional Needs",
    excerpt: "Proper nutrition is the foundation of good health. We break down what your pet needs at every life stage for optimal wellbeing.",
    date: "April 24, 2025",
    category: "Nutrition",
    author: "Dr. Lisa Park",
    slug: "pet-nutrition-guide",
  },
  {
    title: "Preparing Your Pet for Summer Heat",
    excerpt: "Summer brings fun in the sun, but also heat-related risks for pets. Follow these tips to keep your pet safe and comfortable.",
    date: "April 17, 2025",
    category: "Seasonal Tips",
    author: "Dr. James Wilson",
    slug: "summer-heat-safety",
  },
  {
    title: "What to Do in a Pet Emergency",
    excerpt: "Knowing how to respond in an emergency can save your pet's life. Keep this guide handy for those unexpected situations.",
    date: "April 10, 2025",
    category: "Emergency",
    author: "Dr. Sarah Johnson",
    slug: "pet-emergency-guide",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Pet Health Blog
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Expert advice, health tips, and updates from the Oak Crest team.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-wide">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["All", "Pet Health", "Wellness", "Dental Care", "Nutrition", "Seasonal Tips", "Emergency"].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  cat === "All"
                    ? "bg-primary-500 text-white border-primary-500"
                    : "border-sage-200 text-sage-600 hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-sage-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white/40" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-sage-400">{post.date}</span>
                  </div>
                  <h2 className="font-semibold text-lg text-sage-900 mb-2 group-hover:text-primary-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-sage-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-sage-400" />
                      <span className="text-xs text-sage-500">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}