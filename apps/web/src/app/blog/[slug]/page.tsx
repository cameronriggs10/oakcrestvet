import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, ArrowLeft } from "lucide-react";

// This would normally come from a CMS or database
const posts: Record<string, { title: string; content: string; date: string; author: string; category: string }> = {
  "spring-allergy-season": {
    title: "Spring Allergy Season: How to Help Your Pet",
    date: "May 15, 2025",
    author: "Dr. Sarah Johnson",
    category: "Pet Health",
    content: `
Just like humans, pets can suffer from seasonal allergies. As spring arrives and pollen counts rise, you may notice your pet showing signs of discomfort.

## Common Signs of Allergies in Pets
- Excessive scratching or licking
- Red, irritated skin
- Runny eyes or nose
- Sneezing
- Ear infections
- Paw chewing

## How to Help Your Pet
1. **Wipe down after walks**: Use a damp cloth to remove pollen from your pet's coat and paws after outdoor activities.
2. **Bathe regularly**: Frequent baths with a gentle, hypoallergenic shampoo can help remove allergens.
3. **Keep windows closed**: During high pollen days, keep windows closed to reduce indoor allergens.
4. **Air purifiers**: Consider using an air purifier with a HEPA filter in your home.
5. **Consult your vet**: If symptoms persist, we can recommend antihistamines or allergy testing.

## When to Visit the Vet
If your pet's symptoms are severe or not improving with at-home care, schedule an appointment. We can help determine the underlying cause and develop a treatment plan.

Remember, allergies can be managed! With the right approach, your pet can enjoy a comfortable spring season.
    `,
  },
  "importance-annual-wellness": {
    title: "The Importance of Annual Wellness Exams",
    date: "May 8, 2025",
    author: "Dr. Michael Chen",
    category: "Wellness",
    content: `
Annual wellness exams are the foundation of preventive veterinary care. These regular checkups are crucial for maintaining your pet's health and catching potential issues early.

## What We Check During an Annual Exam
- Overall body condition and weight
- Heart and lung sounds
- Eyes, ears, and mouth
- Skin and coat condition
- Joint mobility
- Abdominal palpation
- Vaccination status

## Why Annual Exams Matter
Pets age much faster than humans. A year between checkups is equivalent to 5-7 human years. Many health conditions can develop or progress significantly in that time.

## What to Expect
Your annual visit typically includes a thorough physical examination, discussion of any concerns, and recommendations for preventive care tailored to your pet's age and lifestyle.

Don't skip the annual checkup - it's the best investment in your pet's long-term health!
    `,
  },
};

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <section className="py-16 md:py-24">
        <div className="container-wide text-center">
          <h1 className="font-display text-3xl font-bold text-sage-900 mb-4">Post Not Found</h1>
          <Link href="/blog"><Button>Back to Blog</Button></Link>
        </div>
      </section>
    );
  }

  const paragraphs = post.content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-xl font-semibold text-sage-900 mt-8 mb-3">{block.replace('## ', '')}</h2>;
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').map((item, j) => (
        <li key={j} className="text-sage-700">{item.replace('- ', '')}</li>
      ));
      return <ul key={i} className="list-disc pl-6 space-y-1 text-sage-700 mb-4">{items}</ul>;
    }
    if (block.startsWith('1. ')) {
      const items = block.split('\n').map((item, j) => {
        const match = item.match(/^\d+\.\s+(.*)/);
        return <li key={j} className="text-sage-700">{match ? match[1] : item}</li>;
      });
      return <ol key={i} className="list-decimal pl-6 space-y-2 text-sage-700 mb-4">{items}</ol>;
    }
    return <p key={i} className="text-sage-700 leading-relaxed mb-4">{block}</p>;
  });

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-sm text-sage-400">{post.date}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-sage-900 mb-3">{post.title}</h1>
            <p className="text-sage-500">By {post.author}</p>
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-sage max-w-none">
            {paragraphs}
          </div>
        </div>
      </article>
    </>
  );
}