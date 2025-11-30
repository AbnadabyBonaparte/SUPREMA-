import SustainabilityScanner from "@/components/SustainabilityScanner";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-gold bg-clip-text text-transparent">
          Beleza Consciente
        </h1>
        <p className="text-2xl text-gray-300 mt-6">
          Descubra se seus produtos são realmente bons para você e para o planeta
        </p>
      </div>

      <SustainabilityScanner />
    </div>
  );
}
