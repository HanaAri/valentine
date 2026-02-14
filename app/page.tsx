"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { Heart, Star } from "lucide-react"; // เพิ่ม Star เข้ามา

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ValentinePage() {
  const [step, setStep] = useState(0); 
  const [yesScale, setYesScale] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 100 }); 
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const noTexts = ["No 😢", "แน่ใจนะ?", "คิดดีๆ!", "ใจร้ายยย 🥺", "ยอมแพ้เถอะ 💕"];

  const handleNoClick = () => {
    setYesScale((prev) => Math.min(prev + 0.6, 15)); 
    setNoClickCount((prev) => Math.min(prev + 1, noTexts.length - 1));
    const range = 120 + (yesScale * 15);
    const randomX = (Math.random() - 0.5) * range * 2.5; 
    const randomY = (Math.random() * 100) + 150; 
    setNoPosition({ x: randomX, y: randomY });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);
    await supabase.from("valentineday").insert([{ message }]);
    setIsLoading(false);
    setStep(2); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- พื้นหลัง: หัวใจและดาวเยอะๆ (z-0) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* หัวใจดวงใหญ่ๆ */}
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-10 left-10 text-pink-400/40"><Heart size={120} fill="currentColor" /></motion.div>
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-10 right-10 text-red-400/40"><Heart size={140} fill="currentColor" /></motion.div>
        
        {/* ดาววิบวับสลับตำแหน่ง */}
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-1/4 right-20 text-yellow-400/50"><Star size={60} fill="currentColor" /></motion.div>
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="absolute bottom-1/3 left-20 text-yellow-300/40"><Star size={40} fill="currentColor" /></motion.div>
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-20 right-1/3 text-yellow-200/50"><Star size={30} fill="currentColor" /></motion.div>
        
        {/* หัวใจดวงเล็กๆ กระจายตัว */}
        <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-1/2 left-1/4 text-pink-300/30"><Heart size={50} fill="currentColor" /></motion.div>
        <motion.div animate={{ x: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-1/4 right-1/4 text-red-300/30"><Heart size={45} fill="currentColor" /></motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-1/3 left-10 text-pink-200/40"><Heart size={35} fill="currentColor" /></motion.div>
      </div>

      <motion.div 
        className="bg-white/80 backdrop-blur-2xl border border-white/40 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center z-10 min-h-[550px] flex flex-col relative"
      >
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center pt-6">
              <h1 className="text-4xl font-black text-pink-600 z-50 absolute top-10 left-0 right-0">รักเค้ามั้ย? 🥺</h1>
              
              <div className="flex-1 flex items-center justify-center w-full relative pt-20">
                <motion.button
                  animate={{ scale: yesScale }}
                  onClick={() => setStep(1)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-2xl shadow-xl z-40 text-2xl relative transition-all"
                >
                  Yes! 💕
                </motion.button>
                
                <motion.button
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  onClick={handleNoClick}
                  className="absolute bg-gray-200 text-gray-400 font-medium py-2 px-6 rounded-xl shadow-sm z-30 text-sm whitespace-nowrap"
                >
                  {noTexts[noClickCount]}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-5 text-left w-full h-full justify-center pt-4">
              <h1 className="text-3xl font-bold text-pink-600">Happy Valentine's 💖</h1>
              <p className="text-gray-600 font-medium">มีความในใจอะไร อยากบอกเค้ามั้ย?</p>
              <textarea
                className="w-full p-4 rounded-2xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white text-gray-800 text-lg shadow-inner"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg flex justify-center items-center gap-2 disabled:bg-gray-300"
              >
                {isLoading ? "กำลังส่ง..." : "ส่งความในใจ"} <Heart size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center justify-center gap-6 h-full min-h-[400px]">
               <div className="relative">
                {/* พลุหัวใจและดาวพุ่งกระจายหน้าสุดท้าย */}
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      y: [-20, -300], 
                      x: [(Math.random()-0.5)*400, (Math.random()-0.5)*700], 
                      opacity: [1, 0], 
                      scale: [0, 2, 0],
                      rotate: [0, 360]
                    }} 
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }} 
                    className="absolute text-pink-500"
                  >
                    {i % 2 === 0 ? <Heart size={24} fill="currentColor" /> : <Star size={24} fill="currentColor" className="text-yellow-400" />}
                  </motion.div>
                ))}
                <div className="text-9xl mb-4 animate-bounce relative z-10">🐰💖🐻</div>
              </div>
              <h2 className="text-3xl font-black text-pink-600">ได้รับแล้วนะ!</h2>
              <p className="text-gray-600 font-bold text-xl text-center px-4">ขอบคุณที่รักกันนะ 💕🥰</p>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
