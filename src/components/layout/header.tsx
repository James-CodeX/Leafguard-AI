import { LeafIcon } from '@/components/icons/leaf-icon';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LeafIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-primary">
            LeafGuard AI
          </h1>
        </Link>
        {/* Future navigation links can go here */}
      </div>
    </header>
  );
}
