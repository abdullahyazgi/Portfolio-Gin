import Hero from "@/components/home/Hero";
import Link from "next/link";


export default function Home() {
  return (
    <section>
      <Hero />
      <div>
        <div><h4>Projects</h4><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p></div>
        <div><h4>Skills</h4><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p></div>
        <div><h4>Roadmap</h4><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p></div>
        <div><h4>Contact</h4><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p></div>

      </div>
      <hr />
    </section>
  );
}
