/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SplineSceneBasic } from "@/components/ui/demo";
import { Navbar } from "@/components/ui/navbar";
import DemoOne from "@/components/ui/feature-demo";
import { Footer } from "@/components/ui/footer-section";
import { WhatsAppChat } from "@/components/ui/whatsapp-chat";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white flex flex-col items-center relative overflow-x-hidden font-sans">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent" />
      </div>

      <Navbar />
      
      <main className="w-full flex flex-col items-center relative z-10">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
          <SplineSceneBasic />
        </div>
        
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <DemoOne />
        </div>
      </main>

      <Footer />
      
      {/* WhatsApp Chat Integration */}
      <WhatsAppChat 
        position="bottom-right"
      />
    </div>
  );
}
