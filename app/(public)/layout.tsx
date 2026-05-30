import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScrollProvider from "@/components/providers/scroll-provider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollProvider>
      <Header />
      <main className="flex-grow pt-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
      <Footer />
    </ScrollProvider>
  );
}
