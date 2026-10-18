export const metadata = {
  title: "Admin Portal - NextGen Build-a-thon",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-400">NextGen CMS Admin</h1>
        <div className="text-sm text-gray-400">Secure Portal</div>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
