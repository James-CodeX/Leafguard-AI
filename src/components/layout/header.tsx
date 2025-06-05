import { LeafIcon } from '@/components/icons/leaf-icon';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
          <div className="relative">
            <div className="bg-primary/10 p-2 rounded-full">
              <LeafIcon className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-headline font-bold gradient-text">
            LeafGuard AI
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 px-4">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Help
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
